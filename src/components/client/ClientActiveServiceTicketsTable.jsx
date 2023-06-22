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
import { useGetServiceTickets } from '../../api/client/dashboard/getServiceTickets'
import { AuthContext } from '../../context/AuthContext'
import ErrorMessage from '../UI/ErrorMessage'
import LoadingSpinner from '../UI/LoadingSpinner'

const ClientActiveRequestsTable = () => {
  const { currentUser } = useContext(AuthContext)

  const [data, setData] = useState([])

  const {
    isLoading,
    error,
    mutateAsync: getData,
  } = useGetServiceTickets(currentUser.fullname)

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

    // const fetchData = async () => {
    //   try {
    //     const res = await getData({ requestby: currentUser.fullname })

    //     setData(res.data)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // fetchData()
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
            <Th>Service Id</Th>
            <Th>Request Date</Th>
            <Th>Concern</Th>
            <Th>Issue</Th>
            <Th>Date Created</Th>
            <Th>Assigned To</Th>
            <Th>Priority</Th>
            <Th>Ticket Status</Th>
            <Th>Due Date</Th>
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
              <Td>{ticket.ticketid}</Td>
              <Td>{ticket.requestdate}</Td>
              <Td>{ticket.concern}</Td>
              <Td>{ticket.issue}</Td>
              <Td>{ticket.datecreated}</Td>
              <Td>{ticket.assignto}</Td>
              <Td>{ticket.priority}</Td>
              <Td>{ticket.ticketstatus}</Td>
              <Td>{ticket.duedate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ClientActiveRequestsTable
