import { MdSubdirectoryArrowRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function TicketAssignmentTable({ tickets }) {
  const navigate = useNavigate()

  const handleClick = (ticket) => {
    navigate(`/ticket-tracking/${ticket}`)
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Ticket No.
            </th>
            <th scope="col" className="px-6 py-3">
              Client/Store
            </th>
            <th scope="col" className="px-6 py-3">
              Date Created
            </th>
            <th scope="col" className="px-6 py-3">
              Priority
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3">
              Urgency
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket Details
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticketNumber} className="border-b border-gray-200">
              <td className="p-1 text-center text-xs">{ticket.ticketNumber}</td>
              <td className="p-1 text-center text-xs">{ticket.client}</td>
              <td className="p-1 text-center text-xs">{ticket.dateCreated}</td>
              <td className="p-1 text-center text-xs">{ticket.priority}</td>
              <td className="p-1 text-center text-xs">{ticket.status}</td>
              <td className="p-1 text-center text-xs">{ticket.dueDate}</td>
              <td className="p-1 text-center text-xs">{ticket.urgency}</td>
              <td className="p-1 text-center grid place-content-center place-items-center">
                <button
                  onClick={() => handleClick(ticket.ticketNumber)}
                  className="py-1 px-2 bg-teal-500 rounded text-white hover:bg-teal-700 text-xs text-center grid place-content-center"
                >
                  <MdSubdirectoryArrowRight />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketAssignmentTable
