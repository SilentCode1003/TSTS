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

const ClientTopConcernsTable = () => {
  let isLoading
  let error
  let data = []

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  if (data.length <= 0) {
    return <Text fontSize="sm">No concerns available</Text>
  }

  return (
    <TableContainer maxH="300px" overflowY="auto">
      <Table size="sm" variant="striped">
        <TableCaption>Top Concerns</TableCaption>

        <Thead>
          <Tr>
            <Th>Placeholder</Th>
            <Th>Placeholder</Th>
            <Th>Placeholder</Th>
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

export default ClientTopConcernsTable
