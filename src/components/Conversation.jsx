import { useEffect, useState } from 'react'
import chatData from '../data/chat.json'
import Message from './Message'

function Conversation({ chatId }) {
  const [chat, setChat] = useState(chatData)
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message) return

    setChat((prev) => [
      {
        id: crypto.randomUUID(),
        message,
        sender: 'You',
        createdAt:
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString(),
      },
      ...prev,
    ])

    setMessage('')
  }

  useEffect(() => {
    console.log(chatId)
    if (!chatId || isNaN(chatId)) {
      setChat(chatData)
    }
  }, [chatId])

  return (
    <>
      <div className="p-4 flex flex-col-reverse gap-4 overflow-x-auto">
        {chat.map((message) => (
          <Message message={message} />
        ))}
      </div>

      <div className="p-4 mt-auto bg-red-300">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            placeholder="Send message..."
            className="w-full px-4 py-2 rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default Conversation
