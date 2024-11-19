'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from './sidebar'
import { MessageList } from './message-list'
import { MessageInput } from './message-input'
import { createChannel, sendMessage } from './actions/actions'

type Message = {
  id: string
  user: string
  text: string
  file?: string
  timestamp: number
  channel: string
}

type Channel = {
  id: string
  name: string
}

export function ChatApp() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [user, setUser] = useState('')
  const [channels, setChannels] = useState<Channel[]>([{ id: 'general', name: 'general' }, {id: "dkgldfjk123", name: "f35 labs" }])
  const [currentChannel, setCurrentChannel] = useState('general')
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)

    newSocket.on('connect', () => setIsConnected(true))
    newSocket.on('disconnect', () => setIsConnected(false))
    newSocket.on('message', (msg: Message) => {
      setMessages(messages => [...messages, msg])
    })
    newSocket.on('new_channel', (channel: Channel) => {
      setChannels(prevChannels => [...prevChannels, channel])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (user.trim() && socket) {
      socket.emit('set_user', user)
      setIsConnected(true)
    }
  }

  const handleSendMessage = async (text: string, file?: File) => {
    if (socket && (text.trim() || file)) {
      const newMessage: Omit<Message, 'id'> = {
        user,
        text,
        timestamp: Date.now(),
        channel: currentChannel
      }

      if (file) {
        // Aqui você implementaria a lógica para fazer upload do arquivo
        // e obter a URL do arquivo enviado
        // newMessage.file = await uploadFile(file)
      }

      await sendMessage(currentChannel, newMessage)
      socket.emit('message', { ...newMessage, channel: currentChannel })
    }
  }

  const handleCreateChannel = async (channelName: string) => {
    if (channelName.trim()) {
      const newChannel = await createChannel(channelName)
      if (newChannel) {
        socket?.emit('new_channel', newChannel)
        setChannels(prevChannels => [...prevChannels, newChannel])
      }
    }
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Digite seu nome de usuário"
              required
            />
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        channels={channels}
        currentChannel={currentChannel}
        onChannelSelect={setCurrentChannel}
        onCreateChannel={handleCreateChannel}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow">
          <h1 className="text-xl font-bold p-4">#{currentChannel}</h1>
        </div>
        <MessageList messages={messages.filter(m => m.channel === currentChannel)} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}