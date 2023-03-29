import { useState } from 'react'
import Conversation from '../components/Conversation'
import chatsData from '../data/chats.json'

function Communication() {
  const [chats, setChats] = useState(chatsData)
  const [selectedChatId, setSelectedChatId] = useState()

  return (
    <div className="flex max-h-screen">
      <div className="min-w-[300px] p-2 border-r-2 overflow-x-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex gap-2 items-center p-2 border-b border-red-500 hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedChatId(chat.id)}
          >
            <div className="min-w-[32px] w-8 h-8 rounded-full bg-red-500 border border-white"></div>
            <div className="truncate">
              <p className="font-bold">{chat.name}</p>
              <p className="w-full italic truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col">
        <Conversation chatId={selectedChatId} />
      </div>
    </div>
  )
}

export default Communication
