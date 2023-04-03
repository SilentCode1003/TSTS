import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { topics } from './KnowledgeBase'

function KnowledgeBaseTopic() {
  const { topicId } = useParams()

  let topic = topics.find((t) => t.id === Number(topicId))
  if (!topic) {
    topic = {}
  }

  return (
    <div className="w-full prose break-words">
      <h2 className="text-center" id={topic.id}>
        {topic.title}
      </h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.content}</ReactMarkdown>
    </div>
  )
}

export default KnowledgeBaseTopic
