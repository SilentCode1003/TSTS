import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MdFileUpload } from 'react-icons/md'
import chatData from '../data/chat.json'
import Message from './Message'

function Conversation({ chatId }) {
  const [chat, setChat] = useState(chatData)
  const [message, setMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message) return

    setChat((prev) => [message, ...prev])

    setMessage('')
  }

  const handleInputChange = (e) => {
    const message = {
      id: crypto.randomUUID(),
      sender: 'You',
      type: 'TEXT',
      message: e.target.value,
      createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    }

    setMessage(message)
  }

  const handleFileChange = (e) => {
    const validFiles = ['image/jpeg', 'image/png']
    const file = e.target.files[0]
    let message

    if (validFiles.includes(file.type)) {
      message = {
        id: crypto.randomUUID(),
        sender: 'You',
        type: 'IMAGE',
        src: URL.createObjectURL(file),
        createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      }
    } else {
      message = {
        id: crypto.randomUUID(),
        sender: 'You',
        type: 'DOCUMENT',
        href: URL.createObjectURL(file),
        fileName: file.name,
        createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      }
    }

    console.log(e)

    setUploadedFile(file)
    setChat((prev) => [message, ...prev])
    setUploadedFile('')
  }

  useEffect(() => {
    if (!chatId || isNaN(chatId)) {
      setChat(chatData)
    }
  }, [chatId])

  return (
    <>
      <div className="p-4 flex flex-col-reverse gap-4 overflow-y-auto overflow-x-hidden">
        <AnimatePresence>
          {chat.map((message) => (
            <Message key={message.id} message={message} type={message.type} />
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 mt-auto bg-red-300">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <label
            htmlFor="file"
            className="p-2 flex justify-center items-center border border-red-400 bg-white text-black rounded cursor-pointer"
          >
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />
            {uploadedFile?.name || <MdFileUpload className="text-red-500" />}
          </label>
          <input
            type="text"
            placeholder="Send message..."
            className="w-full px-4 py-2 rounded-md"
            value={message?.message || ''}
            onChange={handleInputChange}
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
