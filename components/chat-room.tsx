'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  user: string
  text: string
}

export function ChatRoom() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3000') // Substitua pela URL do seu servidor
    setSocket(newSocket)

    newSocket.on('connect', () => setIsConnected(true))
    newSocket.on('disconnect', () => setIsConnected(false))
    newSocket.on('chat message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nickname.trim() && socket) {
      socket.emit('set nickname', nickname)
      setIsConnected(true)
    }
  }

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && socket) {
      socket.emit('chat message', { user: nickname, text: message })
      setMessage('')
    }
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Entre no Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNicknameSubmit} className="space-y-4">
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Digite seu nickname"
              required
            />
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Chat Room - {nickname}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.user === nickname ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}>
              <span className="font-bold">{msg.user}: </span>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleMessageSubmit} className="w-full flex space-x-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem"
            className="flex-grow"
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardFooter>
    </Card>
  )
}