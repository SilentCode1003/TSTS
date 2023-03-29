import { useState } from 'react'
import TicketTrackingTable from '../components/TicketTrackingTable'
import ticketsData from '../data/tickets.json'

function TicketTracking() {
  const [searchInput, setSearchInput] = useState('')
  const [tickets, setTickets] = useState(ticketsData)

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <p className="text-2xl md:text-4xl font-bold text-center">
        Ticket Tracking
      </p>

      <div>
        <input
          type="text"
          id="search"
          onChange={handleSearchChange}
          value={searchInput}
          placeholder="Search"
          className="py-2 px-4 w-full sm:w-1/2 border bg-gray-100 rounded-sm text-gray-900"
        />
      </div>

      <TicketTrackingTable tickets={tickets} />
    </div>
  )
}

export default TicketTracking
