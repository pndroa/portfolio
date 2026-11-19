import type { ChatModelAdapter, ThreadMessage } from "@assistant-ui/react";

import { type ChatMessage, ChatError, streamChat } from "@/components/chat/api";
import type { ChatText } from "@/components/chat/i18n";

const MAX_HISTORY = 10;
const MAX_MESSAGE_CHARS = 500;

function toChatMessages(messages: readonly ThreadMessage[]): ChatMessage[] {
  const history = messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      role: message.role as ChatMessage["role"],
      content: message.content
        .flatMap((part) => (part.type === "text" ? [part.text] : []))
        .join("")
        .slice(0, MAX_MESSAGE_CHARS),
    }))
    .filter((message) => message.content.trim().length > 0)
    .slice(-MAX_HISTORY);

  while (history[0]?.role === "assistant") {
    history.shift();
  }

  return history;
}

function errorMessage(t: ChatText, error: unknown): string {
  if (error instanceof ChatError && error.code in t.errors) {
    return t.errors[error.code as keyof ChatText["errors"]];
  }
  return t.errors.generic;
}

export function createChatAdapter(t: ChatText): ChatModelAdapter {
  return {
    async *run({ messages, abortSignal }) {
      let text = "";

      try {
        for await (const event of streamChat(
          toChatMessages(messages),
          abortSignal,
        )) {
          if (event.type === "delta") {
            text += event.text;
            yield { content: [{ type: "text", text }] };
          }

          if (event.type === "error") {
            throw new ChatError(event.error);
          }

          if (event.type === "done" && event.stopReason === "refusal") {
            yield { content: [{ type: "text", text: t.refused }] };
          }
        }
      } catch (error) {
        if (abortSignal.aborted) throw error;
        throw new Error(errorMessage(t, error));
      }
    },
  };
}
