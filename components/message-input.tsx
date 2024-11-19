'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, Smile } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

type MessageInputProps = {
  onSendMessage: (text: string, file?: File) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onSendMessage('', file)
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 flex items-center space-x-2">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="flex-1"
      />
      <Button type="button" size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()}>
        <Paperclip className="h-5 w-5" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button type="button" size="icon" variant="ghost" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <Smile className="h-5 w-5" />
      </Button>
      <Button type="submit" size="icon">
        <Send className="h-5 w-5" />
      </Button>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </form>
  )
}