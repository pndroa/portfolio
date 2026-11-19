import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react";
import { useMemo } from "react";

import { AssistantModal } from "@/components/assistant-ui/elements/assistant-modal.aui";
import { createChatAdapter } from "@/components/chat/adapter";
import { chatText, ChatTextContext } from "@/components/chat/i18n";
import type { Lang } from "@/i18n/ui";

export default function ChatWidget({ lang }: { lang: Lang }) {
  const t = chatText[lang];
  const adapter = useMemo(() => createChatAdapter(t), [t]);
  const runtime = useLocalRuntime(adapter);

  return (
    <ChatTextContext value={t}>
      <AssistantRuntimeProvider runtime={runtime}>
        <AssistantModal />
      </AssistantRuntimeProvider>
    </ChatTextContext>
  );
}
