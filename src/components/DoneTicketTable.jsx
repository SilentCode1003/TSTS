import {
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const DoneTicketTable = () => {
  const [data, setData] = useState([
    {
      ticketid: 'SR-202310003',
      subject: 'POS ISOLATION[3111 CTS MACTAN]SR-202310003',
      assignedto: 'Jum Kloe Buhisan',
    },
    {
      ticketid: 'SR-202310005',
      subject: 'POS ISOLATION[3111 CTS MACTAN]SR-202310005',
      assignedto: 'Joseph Orencio',
    },
  ])

  return (
    <TableContainer>
      <Table size="sm" variant="striped">
        <TableCaption>Done tickets</TableCaption>

        <Thead>
          <Tr>
            <Th>Ticket Id</Th>
            <Th>Subject</Th>
            <Th>Assigned To</Th>
          </Tr>
        </Thead>

        <Tbody fontSize="sm" fontWeight="normal">
          {data.map((ticket) => (
            <Tr key={ticket.ticketid}>
              <Td>
                <Link
                  as={RouterLink}
                  to={`/admin/ticket-view/${ticket.ticketid}`}
                  color="blue"
                >
                  {ticket.ticketid}
                </Link>
              </Td>
              <Td>{ticket.subject}</Td>
              <Td>{ticket.assignedto}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default DoneTicketTable
