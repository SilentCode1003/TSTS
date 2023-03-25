import { MdDownload } from 'react-icons/md'

function Message({ message, type }) {
  return (
    <div
      className={`max-w-full p-4 rounded ${
        message.sender === 'You'
          ? 'ml-auto bg-red-500 text-white'
          : 'mr-auto bg-white border border-red-500'
      }`}
    >
      <div>
        {type === 'TEXT' && <p className="mb-2">{message.message}</p>}
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
    </div>
  )
}

export default Message
