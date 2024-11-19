'use server'

import { v4 as uuidv4 } from 'uuid'

type Message = {
  id: string
  user: string
  text: string
  file?: string
  timestamp: number
}

type Channel = {
  id: string
  name: string
}

// Simula um banco de dados
let channels: Channel[] = [{ id: 'general', name: 'general' }, {id: "dkgldfjk123", name: "f35 labs" }]
let messages: { [channelId: string]: Message[] } = { general: [] }

export async function createChannel(name: string): Promise<Channel | null> {
  const newChannel: Channel = { id: uuidv4(), name }
  channels.push(newChannel)
  messages[newChannel.id] = []
  return newChannel
}

export async function sendMessage(channelId: string, message: Omit<Message, 'id'>): Promise<Message> {
  const newMessage: Message = { ...message, id: uuidv4() }
  messages[channelId].push(newMessage)
  return newMessage
}

export async function getChannels(): Promise<Channel[]> {
  return channels
}

export async function getMessages(channelId: string): Promise<Message[]> {
  return messages[channelId] || []
}