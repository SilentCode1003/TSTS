import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import TicketViewReplyCard from '../components/TicketViewReplyCard'
import TicketViewTopCard from '../components/TicketViewTopCard'

const TicketView = () => {
  const { ticketId } = useParams()
  const { data: allTickets, isLoading, error } = useGetTickets()
  const searchedTicket =
    allTickets?.data?.find((ticket) => ticket.ticketid === ticketId) || {}

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket View
        </Heading>

        <Grid templateColumns={['1fr', null, '2fr 1fr']} gap="8">
          <GridItem>
            <Grid gap="8">
              <TicketViewTopCard searchedTicket={searchedTicket} />

              <TicketViewReplyCard />
            </Grid>
          </GridItem>

          <GridItem>
            <Card>
              <CardBody>
                <Stack
                  direction="column"
                  spacing="2"
                  fontSize="sm"
                  divider={<Divider />}
                >
                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Requester Name</Text>
                    <Text>{searchedTicket.requestername}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Requester Email</Text>
                    <Text>{searchedTicket.requesteremail}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Priority</Text>
                    <Text>{searchedTicket.priority}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Ticket Status</Text>
                    <Text>{searchedTicket.ticketstatus}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Date Created</Text>
                    <Text>{searchedTicket.datecreated}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Due Date</Text>
                    <Text>{searchedTicket.duedate}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Status Detail</Text>
                    <Text>{searchedTicket.statusdetail}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Assigned To</Text>
                    <Text>{searchedTicket.assignedto}</Text>
                  </Grid>

                  <Grid templateColumns="1fr" gap="1">
                    <Text as="b">Department</Text>
                    <Text>{searchedTicket.department}</Text>
                  </Grid>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  )
}

export default TicketView
