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
import { useContext, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useGetActiveRequests } from '../../api/client/dashboard/getActiveRequests'
import { AuthContext } from '../../context/AuthContext'
import ErrorMessage from '../UI/ErrorMessage'
import LoadingSpinner from '../UI/LoadingSpinner'

const ClientActiveRequestTable = () => {
  const { currentUser } = useContext(AuthContext)

  const [data, setData] = useState([])

  const {
    isLoading,
    error,
    mutateAsync: getData,
  } = useGetActiveRequests(currentUser.fullname)

  useEffect(() => {
    getData({
      requestby: currentUser.fullname,
    })
      .then((data) => {
        setData(data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  if (data.length <= 0) {
    return <Text fontSize="sm">No active requests</Text>
  }

  return (
    <TableContainer maxH="500px" overflowY="auto">
      <Table size="sm" variant="striped">
        <TableCaption>Active Request Tickets</TableCaption>

        <Thead>
          <Tr>
            <Th>Request Id</Th>
            <Th>Concern</Th>
            <Th>Issue</Th>
            <Th>Request Date</Th>
          </Tr>
        </Thead>

        <Tbody fontSize="sm" fontWeight="normal">
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
  )
}

export default ClientActiveRequestTable
