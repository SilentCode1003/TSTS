import {
  Box,
  Heading,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useGetClientRequestTickets } from '../api/client/client-ticket-tracking/getClientRequestTickets'
import ErrorMessage from '../components/UI/ErrorMessage'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { AuthContext } from '../context/AuthContext'

const ClientTicketTracking = () => {
  const { currentUser } = useContext(AuthContext)

  const [data, setData] = useState([])

  const {
    isLoading,
    error,
    mutateAsync: getData,
  } = useGetClientRequestTickets(currentUser.fullname)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData({ requestby: currentUser.fullname })
        setData(res.data)
      } catch (e) {}
    }

    fetchData()
  }, [])

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket Tracking
        </Heading>

        {error ? (
          <ErrorMessage>{error.message}</ErrorMessage>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : data.length <= 0 ? (
          <Text textAlign="center" fontSize="3xl">
            No results
          </Text>
        ) : (
          <TableContainer maxW="calc(100vw - 250px)">
            <Table size="sm" variant="striped">
              <Thead>
                <Tr>
                  <Th>Request Id</Th>
                  <Th>Concern</Th>
                  <Th>Issue</Th>
                  <Th>Request Date</Th>
                </Tr>
              </Thead>

              <Tbody>
                {data?.map((ticket) => (
                  <Tr key={ticket.requestid}>
                    <Td>
                      <Link
                        as={RouterLink}
                        to={`/ticket-view/${ticket.requestid}`}
                        color="blue"
                      >
                        {ticket.requestid}
                      </Link>
                    </Td>
                    <Td>{ticket.concern}</Td>
                    <Td>{ticket.issue}</Td>
                    <Td>{ticket.createddate}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Box>
  )
}

export default ClientTicketTracking
