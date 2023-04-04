import React from 'react'
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
    <div className="w-auto h-screen p-8 flex flex-col gap-8 overflow-y-auto">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Ticket Details
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card classNames="p-8">
          <ul className="flex flex-col gap-4">
            {Object.keys(ticket).map((key) => (
              <React.Fragment key={key}>
                <li className="grid grid-cols-1 gap-1 md:grid-cols-2">
                  <span className="text-xl">{key}</span>{' '}
                  <span className="font-bold text-xl">{ticket[key]}</span>
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>
        </Card>
        <Card classNames="p-8 max-w-[500px] grid gap-4">
          <p className="font-bold text-xl">Ticket History</p>
          <div className="flex flex-col gap-2 prose">
            {/* TODO: Make ticket history dynamic */}
            <div>
              <p className="font-bold">Opened</p>
              <p className="italic">March 20, 2023 10:17:00AM</p>
            </div>
            <div>
              <p className="font-bold">Updated</p>
              <ul>
                <li>
                  <p className="italic">March 20, 2023 10:17:00AM</p>
                  <p>Client 1 sets something to something</p>
                </li>
                <li>
                  <p className="italic">March 20, 2023 10:17:00AM</p>
                  <p>Assigned person sets something</p>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Resolved</p>
              <p className="italic">March 21, 2023 8:57:09AM</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TicketDetails
