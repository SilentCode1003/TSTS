import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function KnowledgeBaseSideBar({ topics }) {
  const [searchTerm, setSearchTerm] = useState('')

  if (!topics || topics.length < 1) {
    return (
      <div className="w-full">
        <p>No topics</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">Knowledge Base</h1>
      <div>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <ul>
        {topics?.map((topic) => (
          <li key={topic.id}>
            <NavLink to={`/knowledge-base/${topic.id}`}>{topic.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KnowledgeBaseSideBar
