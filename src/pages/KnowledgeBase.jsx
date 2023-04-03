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
    <div className="grid grid-cols-1 md:grid-cols-[4fr_8fr] relative">
      <KnowledgeBaseSideBar />
      <div className="p-8 md:py-8 md:pl-4 md:pr-8">
        <Outlet />
      </div>
    </div>
  )
}

export default KnowledgeBase
