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
import { useGetTicketRequests } from '../api/dashboard/getTicketRequests'
import ErrorMessage from './UI/ErrorMessage'
import LoadingSpinner from './UI/LoadingSpinner'

const RequestTicketTable = () => {
  const { isLoading, error, data: ticketRequests } = useGetTicketRequests()
  const data = ticketRequests?.data

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
            <Th>Request Id</Th>
            <Th>Concern</Th>
            <Th>Issue</Th>
            <Th>Requester Name</Th>
          </Tr>
        </Thead>

        <Tbody fontSize="sm" fontWeight="normal">
          {data?.map((ticket) => (
            <Tr key={ticket.requestid}>
              <Td>
                <Link
                  as={RouterLink}
                  to={`/admin/request-ticket/${ticket.requestid}?concern=${ticket.concern}&issue=${ticket.issue}&requestername=${ticket.requestby}`}
                  color="blue"
                >
                  {ticket.requestid}
                </Link>
              </Td>
              <Td>{ticket.concern}</Td>
              <Td>{ticket.issue}</Td>
              <Td>{ticket.requestby}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default RequestTicketTable
