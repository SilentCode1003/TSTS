import Conversation from '../components/Conversation'
import { useParams } from 'react-router-dom'

function CommunicationConversation() {
  const { clientId } = useParams()

  return (
    <div className="w-full flex flex-col">
      <Conversation chatId={clientId} />
    </div>
  )
}

export default CommunicationConversation
