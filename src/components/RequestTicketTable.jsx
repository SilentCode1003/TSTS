import {
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import LoadingSpinner from './UI/LoadingSpinner'
import ErrorMessage from './UI/ErrorMessage'

const RequestTicketTable = () => {
  let isLoading
  let error
  let data = [
    {
      ticketid: 'SR-202310003',
      concern: 'POS ISOLATION',
      issue: 'NO POWER',
      requestername: '3790 BURGOS',
    },
  ]

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  if (data.length <= 0) {
    return (
      <Text fontSize="sm" color="green.400">
        No ticket requests :^&#41; {/* :^) */}
      </Text>
    )
  }

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
          {data?.map((ticket) => (
            <Tr key={ticket.ticketid}>
              <Td>
                <Link
                  as={RouterLink}
                  to={`/admin/ticket-assignment?concern=${ticket.concern}&issue=${ticket.issue}&requestername=${ticket.requestername}`}
                  color="blue"
                >
                  {ticket.ticketid}
                </Link>
              </Td>
              <Td>{ticket.concern}</Td>
              <Td>{ticket.issue}</Td>
              <Td>{ticket.requestername}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default RequestTicketTable
