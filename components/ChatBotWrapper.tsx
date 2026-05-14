'use client'

import ChatBot from './ChatBot'

export default function ChatBotWrapper() {
  return (
    <ChatBot
      showChatToggle={false}
      showWhatsApp={true}
    />
  )
}
