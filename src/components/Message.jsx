import { motion } from 'framer-motion'
import { MdDownload } from 'react-icons/md'

function Message({ message, type }) {
  let initialX
  let exitX

  if (message.sender === 'You') {
    initialX = 300
    exitX = -300
  } else {
    initialX = -300
    exitX = 300
  }

  return (
    <motion.div
      initial={{ x: initialX, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: exitX, opacity: 0 }}
      className={`max-w-7xl p-4 rounded-lg ${
        message.sender === 'You'
          ? 'ml-auto bg-red-500 text-white'
          : 'mr-auto bg-white border border-red-500'
      }`}
    >
      <div>
        {type === 'TEXT' && (
          <p className="mb-2 break-words">{message.message}</p>
        )}
        {type === 'IMAGE' && <img src={message.src} />}
        {type === 'DOCUMENT' && (
          <a
            href={message.href}
            className="italic underline underline-offset-2"
            download
          >
            <span>
              {message.fileName} <MdDownload className="inline-block" />
            </span>
          </a>
        )}
        <p className="italic text-sm">{message.createdAt}</p>
      </div>
    </motion.div>
  )
}

export default Message
