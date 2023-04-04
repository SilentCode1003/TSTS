import { useEffect, useState } from 'react'
import TicketTrackingTable from '../components/TicketTrackingTable'
import ticketsData from '../data/tickets.json'
import { useDebounce } from '../hooks/useDebounce'

function TicketTracking() {
  const [searchInput, setSearchInput] = useState('')
  const [tickets, setTickets] = useState(ticketsData)
  const query = useDebounce(searchInput, 500)

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    let filteredArr

    if (searchInput === '' || !searchInput) {
      filteredArr = ticketsData
    }

    filteredArr = ticketsData.filter((obj) => {
      return Object.values(obj).some((val) => {
        if (typeof val === 'string') {
          return val.toLowerCase().includes(searchInput.toLowerCase())
        } else if (typeof val === 'number') {
          return val.toString().includes(searchInput)
        }
      })
    })

    setTickets(filteredArr)
  }, [query])

  return (
    <div className="w-auto h-screen p-8 flex flex-col gap-8 overflow-x-auto">
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
