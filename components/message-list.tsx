'use client'

import { useEffect, useRef } from 'react'

type Message = {
  id: string
  user: string
  text: string
  file?: string
  timestamp: number
}

type MessageListProps = {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <div key={message.id} className="bg-white rounded-lg p-3 shadow">
          <div className="flex items-center mb-2">
            <span className="font-bold mr-2">{message.user}</span>
            <span className="text-gray-500 text-sm">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p>{message.text}</p>
          {message.file && (
            <a href={message.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Arquivo anexado
            </a>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}