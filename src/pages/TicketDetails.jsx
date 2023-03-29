import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import ticketsData from '../data/tickets.json'

function TicketDetails() {
  const { ticketId } = useParams()
  let ticket = ticketsData.find((t) => t.ticketNumber === Number(ticketId))

  if (!ticket) {
    ticket = {}
  }

  return (
    <div className="p-8 flex flex-col gap-4 items-center">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Ticket Details
      </h1>
      <Card classNames="p-8 w-3/4">
        <ul className="flex flex-col gap-4">
          {Object.keys(ticket).map((key) => (
            <li
              key={key}
              className="grid grid-cols-1 gap-1 md:grid-cols-[3fr_4fr]"
            >
              <span className="text-xl">{key}</span>{' '}
              <span className="font-bold text-xl">{ticket[key]}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default TicketDetails
