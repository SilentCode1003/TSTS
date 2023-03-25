function TicketAssignmentTable({ tickets }) {
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticketNumber}>
              <td className="p-1 text-center text-xs">{ticket.ticketNumber}</td>
              <td className="p-1 text-center text-xs">{ticket.client}</td>
              <td className="p-1 text-center text-xs">{ticket.dateCreated}</td>
              <td className="p-1 text-center text-xs">{ticket.priority}</td>
              <td className="p-1 text-center text-xs">{ticket.status}</td>
              <td className="p-1 text-center text-xs">{ticket.dueDate}</td>
              <td className="p-1 text-center text-xs">{ticket.urgency}</td>
              <td className="p-1 text-center grid grid-cols-3 gap-2">
                <button className="py-1 px-2 bg-red-500 rounded text-white hover:bg-red-700 text-xs text-center grid place-content-center">
                  Test
                </button>
                <button className="py-1 px-2 bg-red-500 rounded text-white hover:bg-red-700 text-xs text-center grid place-content-center">
                  Test
                </button>
                <button className="py-1 px-2 bg-red-500 rounded text-white hover:bg-red-700 text-xs text-center grid place-content-center">
                  Test
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