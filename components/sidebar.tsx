'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from 'lucide-react'

type Channel = {
  id: string
  name: string
}

type SidebarProps = {
  channels: Channel[]
  currentChannel: string
  onChannelSelect: (channelId: string) => void
  onCreateChannel: (channelName: string) => void
}

export function Sidebar({ channels, currentChannel, onChannelSelect, onCreateChannel }: SidebarProps) {
  const [newChannelName, setNewChannelName] = useState('')

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault()
    if (newChannelName.trim()) {
      onCreateChannel(newChannelName)
      setNewChannelName('')
    }
  }

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Canais</h2>
      <ul className="space-y-2 flex-1 overflow-y-auto">
        {channels.map(channel => (
          <li
            key={channel.id}
            className={`cursor-pointer p-2 rounded ${channel.id === currentChannel ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => onChannelSelect(channel.id)}
          >
            # {channel.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateChannel} className="mt-4 flex items-center">
        <Input
          type="text"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
          placeholder="Novo canal"
          className="flex-1 mr-2 bg-gray-700 text-white"
        />
        <Button type="submit" size="icon" variant="ghost">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}