function Message({ message }) {
  return (
    <div
      className={`max-w-full p-4 rounded ${
        message.sender === 'You'
          ? 'ml-auto bg-red-500 text-white'
          : 'mr-auto bg-white border border-red-500'
      }`}
    >
      <div>
        <p className="mb-2">{message.message}</p>
        <p className="italic text-sm">{message.createdAt}</p>
      </div>
    </div>
  )
}

export default Message
