import { Outlet } from 'react-router-dom'
import KnowledgeBaseSideBar from '../components/KnowledgeBaseSideBar'
import { parts, preloading } from '../data/markdowns'

export const topics = [
  {
    id: 1,
    title: "ITD's Parts",
    content: parts,
  },
  {
    id: 2,
    title: 'PC Preload Procedure',
    content: preloading,
  },
]

function KnowledgeBase() {
  return (
    <div className="p-8 grid grid-cols-[3fr_9fr]">
      <KnowledgeBaseSideBar topics={topics} />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default KnowledgeBase
