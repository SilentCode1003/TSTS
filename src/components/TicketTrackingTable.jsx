function TicketTrackingTable({ data }) {
  return (
    <div>
      {!data ? (
        'No data'
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ticket No.</th>
              <th>Client/Store</th>
              <th>Date Created</th>
              <th>Date Updated</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Urgency</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr>
                <td>{item.ticketNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TicketTrackingTable
