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
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.content}</ReactMarkdown>
    </div>
  )
}

export default KnowledgeBaseTopic
