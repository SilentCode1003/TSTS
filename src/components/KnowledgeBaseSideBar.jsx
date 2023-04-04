import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { topics } from '../pages/KnowledgeBase'

function KnowledgeBaseSideBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTopics = topics.filter((topic) =>
    `${topic.title}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!topics || topics.length < 1) {
    return (
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center">Knowledge Base</h1>
        <p>No topics</p>
      </div>
    )
  }

  return (
    <div className="pl-8 pr-4 w-full lg:h-screen lg:sticky top-0 overflow-y-auto">
      <h1 className="mt-24 mb-8 text-2xl font-bold">Knowledge Base</h1>
      <ul className="flex flex-col gap-2">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          className="py-2 px-4 mb-6 w-full border bg-gray-100 rounded-sm text-gray-900"
        />
        {filteredTopics?.map((topic) => (
          <li key={topic.id} className="truncate">
            <NavLink
              to={`/knowledge-base/${topic.id}#${topic.id}`}
              className={({ isActive, isPending }) =>
                isPending
                  ? 'text-gray-500'
                  : isActive
                  ? 'text-red-500 underline underline-offset-4'
                  : 'underline underline-offset-4'
              }
            >
              {topic.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KnowledgeBaseSideBar
