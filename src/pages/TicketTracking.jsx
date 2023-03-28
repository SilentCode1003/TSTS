import TicketTrackingTable from '../components/TicketTrackingTable'

function TicketTracking() {
  return (
    <div className="p-8">
      <p className="text-2xl md:text-4xl font-bold text-center">
        Ticket Tracking
      </p>

      <TicketTrackingTable />
    </div>
  )
}

export default TicketTracking
