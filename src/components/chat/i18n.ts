import { createContext, useContext } from "react";

import type { Lang } from "@/i18n/ui";

const de = {
  title: "Ergüns KI-Assistent",
  welcome: "Was möchten Sie über Ergün wissen?",
  placeholder: "Ihre Frage …",
  messageInput: "Nachricht eingeben",
  send: "Nachricht senden",
  cancelSending: "Senden abbrechen",
  stopGenerating: "Antwort stoppen",
  scrollToBottom: "Nach unten scrollen",
  copy: "Kopieren",
  openAssistant: "Chat öffnen",
  closeAssistant: "Chat schließen",
  resize: "Größe ändern",
  addAttachments: "Anhang hinzufügen",
  newThread: "Neue Unterhaltung",
  threads: "Unterhaltungen",
  reset: "Gespräch zurücksetzen",
  regenerate: "Antwort neu generieren",
  edit: "Bearbeiten",
  cancel: "Abbrechen",
  update: "Absenden",
  previous: "Vorherige Version",
  next: "Nächste Version",
  retry: "Erneut versuchen",
  resume: "Fortsetzen",
  refused: "Darauf kann ich leider nicht antworten.",
  errors: {
    rate_limited:
      "Sie schreiben gerade sehr schnell. Bitte warten Sie einen Moment.",
    daily_limit_reached:
      "Der Assistent hat für heute sein Limit erreicht. Bitte versuchen Sie es morgen wieder oder nutzen Sie das Kontaktformular.",
    turnstile_failed:
      "Die Sicherheitsprüfung ist fehlgeschlagen. Bitte laden Sie die Seite neu.",
    session_failed:
      "Die Sicherheitsprüfung ist fehlgeschlagen. Bitte laden Sie die Seite neu.",
    network_error:
      "Keine Verbindung zum Assistenten. Bitte prüfen Sie Ihre Internetverbindung.",
    generic:
      "Der Assistent ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.",
  },
};

export type ChatText = typeof de;

const en: ChatText = {
  title: "Ergün's AI assistant",
  welcome: "What would you like to know about Ergün?",
  placeholder: "Your question …",
  messageInput: "Message input",
  send: "Send message",
  cancelSending: "Cancel sending",
  stopGenerating: "Stop generating",
  scrollToBottom: "Scroll to bottom",
  copy: "Copy",
  openAssistant: "Open chat",
  closeAssistant: "Close chat",
  resize: "Resize",
  addAttachments: "Add attachments",
  newThread: "New Thread",
  threads: "Threads",
  reset: "Reset conversation",
  regenerate: "Regenerate response",
  edit: "Edit",
  cancel: "Cancel",
  update: "Send",
  previous: "Previous version",
  next: "Next version",
  retry: "Try again",
  resume: "Resume",
  refused: "I'm sorry, I can't answer that.",
  errors: {
    rate_limited: "You're sending messages very quickly. Please wait a moment.",
    daily_limit_reached:
      "The assistant has reached its limit for today. Please try again tomorrow or use the contact form.",
    turnstile_failed: "The security check failed. Please reload the page.",
    session_failed: "The security check failed. Please reload the page.",
    network_error:
      "Can't reach the assistant. Please check your internet connection.",
    generic: "The assistant is currently unavailable. Please try again later.",
  },
};

export const chatText: Record<Lang, ChatText> = { de, en };

export const ChatTextContext = createContext<ChatText>(de);

export function useChatText(): ChatText {
  return useContext(ChatTextContext);
}
