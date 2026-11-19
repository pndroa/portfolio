import { site } from "@/data/site";

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

type Session = {
  token: string;
  expiresAt: number;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type StreamEvent =
  | { type: "delta"; text: string }
  | { type: "done"; stopReason: string | null }
  | { type: "error"; error: string };

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SESSION_REFRESH_MARGIN_MS = 60_000;

export class ChatError extends Error {
  code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

let turnstileLoader: Promise<Turnstile> | null = null;
let session: Session | null = null;
let pendingSession: Promise<string> | null = null;

function loadTurnstile(): Promise<Turnstile> {
  turnstileLoader ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SRC;
    script.async = true;

    script.onload = () => {
      const turnstile = (window as Window & { turnstile?: Turnstile })
        .turnstile;
      if (turnstile) resolve(turnstile);
      else reject(new ChatError("turnstile_failed"));
    };

    script.onerror = () => {
      turnstileLoader = null;
      reject(new ChatError("turnstile_failed"));
    };

    document.head.append(script);
  });

  return turnstileLoader;
}

async function getTurnstileToken(): Promise<string> {
  const turnstile = await loadTurnstile();

  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    container.style.cssText =
      "position:fixed;right:1rem;bottom:5rem;z-index:60";
    document.body.append(container);

    const cleanup = () => {
      turnstile.remove(widgetId);
      container.remove();
    };

    const widgetId = turnstile.render(container, {
      sitekey: site.chat.turnstileSiteKey,
      appearance: "interaction-only",
      theme: "dark",
      language: document.documentElement.lang,
      callback: (token: string) => {
        cleanup();
        resolve(token);
      },
      "error-callback": () => {
        cleanup();
        reject(new ChatError("turnstile_failed"));
      },
    });
  });
}

async function createSession(): Promise<string> {
  const token = await getTurnstileToken();

  const response = await fetch(`${site.chat.endpoint}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  }).catch(() => {
    throw new ChatError("network_error");
  });

  if (!response.ok) {
    throw new ChatError("session_failed");
  }

  const data = (await response.json()) as {
    session: string;
    expiresIn: number;
  };
  session = {
    token: data.session,
    expiresAt: Date.now() + data.expiresIn * 1000,
  };

  return session.token;
}

export async function getSession(forceNew = false): Promise<string> {
  if (
    !forceNew &&
    session &&
    Date.now() < session.expiresAt - SESSION_REFRESH_MARGIN_MS
  ) {
    return session.token;
  }

  pendingSession ??= createSession().finally(() => {
    pendingSession = null;
  });

  return pendingSession;
}

function parseSseBlock(block: string): StreamEvent | null {
  let event = "message";
  let data = "";

  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data:")) data += line.slice(5).trim();
  }

  if (!data) return null;

  const payload = JSON.parse(data);

  if (event === "delta") return { type: "delta", text: payload.text };
  if (event === "done") return { type: "done", stopReason: payload.stopReason };
  if (event === "error") return { type: "error", error: payload.error };
  return null;
}

async function postChat(
  messages: ChatMessage[],
  signal: AbortSignal,
  token: string,
): Promise<Response> {
  try {
    return await fetch(`${site.chat.endpoint}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new ChatError("network_error");
  }
}

export async function* streamChat(
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<StreamEvent> {
  let response = await postChat(messages, signal, await getSession());

  if (response.status === 401) {
    response = await postChat(messages, signal, await getSession(true));
  }

  if (!response.ok || !response.body) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new ChatError(data?.error ?? `http_${response.status}`);
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) return;

    buffer += value;
    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() ?? "";

    for (const block of blocks) {
      const event = parseSseBlock(block);
      if (event) yield event;
    }
  }
}
