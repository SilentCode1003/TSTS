import { useEffect, useState } from 'react'
import Accordion from '../components/Accordion'

const items = [
  {
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.',
  },
  {
    title: 'Why use React?',
    content:
      'React allows for the creation of reusable UI components, making development faster and more efficient.',
  },
  {
    title: 'How do you use React?',
    content:
      'React can be used with JavaScript, TypeScript, and other languages. It can also be used with various other libraries and frameworks, such as Redux and Next.js.',
  },
]

function KnowledgeBase() {
  const [searchedItems, setSearchedItems] = useState(items)
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      `${item.title} ${item.content}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    setSearchedItems(filteredItems)
  }, [searchTerm])

  return (
    <div className="p-8 flex flex-col gap-8 items-center">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Knowledge Base
      </h1>

      <div className="w-full md:w-1/2 rounded">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search your issue"
          className="w-full py-4 px-8 md:text-xl bg-gray-50 border text-gray-900 rounded-md"
        />
      </div>

      <Accordion items={searchedItems} />
    </div>
  )
}

export default KnowledgeBase
