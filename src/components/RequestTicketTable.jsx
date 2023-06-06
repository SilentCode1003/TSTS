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
import { Link as RouterLink } from 'react-router-dom'

const RequestTicketTable = () => {
  return (
    <TableContainer maxH="300px" overflowY="auto">
      <Table size="sm" variant="striped">
        <TableCaption>Ticket Requests</TableCaption>

        <Thead>
          <Tr>
            <Th>Ticket Id</Th>
            <Th>Concern</Th>
            <Th>Issue</Th>
            <Th>Requester Name</Th>
          </Tr>
        </Thead>

        <Tbody fontSize="sm" fontWeight="normal">
          {/* {data?.map((ticket) => (
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
              <Td>{ticket.assignto}</Td>
              <Td>{ticket.assignby}</Td>
            </Tr>
          ))} */}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default RequestTicketTable
