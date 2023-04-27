import React from 'react'
import { useParams } from 'react-router-dom'

const TicketView = () => {
  const { ticketId } = useParams()

  return <div>{ticketId}</div>
}

export default TicketView
