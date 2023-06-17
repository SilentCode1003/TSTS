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
import { useGetAssignTicketDetails } from '../../api/dashboard/getAssignTicketDetail'
import ErrorMessage from '../UI/ErrorMessage'
import LoadingSpinner from '../UI/LoadingSpinner'

const DoneTicketTable = () => {
  const { data: tickets, isLoading, error } = useGetAssignTicketDetails()

  const data = tickets?.data

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  if (data.length <= 0) {
    return <Text fontSize="sm">No done tickets</Text>
  }

  return (
    <TableContainer maxH="300px" overflowY="auto">
      <Table size="sm" variant="striped">
        <TableCaption>Done tickets</TableCaption>

        <Thead>
          <Tr>
            <Th>Ticket Id</Th>
            <Th>Subject</Th>
            <Th>Report Date</Th>
            <Th>Assigned To</Th>
            <Th>Assigned By</Th>
          </Tr>
        </Thead>

        <Tbody fontSize="sm" fontWeight="normal">
          {data?.map((ticket) => (
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
              <Td>{ticket.reportdate}</Td>
              <Td>{ticket.assignto}</Td>
              <Td>{ticket.assignby}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default DoneTicketTable
