import { useEffect, useState } from 'react'
import chatData from '../data/chat.json'

function Conversation({ chatId }) {
  const [chat, setChat] = useState(chatData)

  useEffect(() => {
    console.log(chatId)
    if (!chatId || isNaN(chatId)) {
      setChat([])
    } else {
      setChat(chatData)
    }
  }, [chatId])

  return (
    <>
      <div className="p-4 flex flex-col-reverse gap-4 overflow-x-auto">
        {chat.map((message) => (
          <div
            key={message.id}
            className={`w-2/3 p-4 rounded ${
              message.sender === 'You'
                ? 'ml-auto bg-red-500 text-white'
                : 'bg-white border border-red-500'
            }`}
          >
            <div>
              <p>{message.message}</p>
              <p>{message.createdAt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto bg-red-300">
        <form className="flex gap-4">
          <input
            type="text"
            placeholder="Send message..."
            className="w-full px-4 py-2 rounded-md"
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
