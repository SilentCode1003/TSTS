import { Box, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import TicketViewReplyCard from '../components/TicketViewReplyCard'
import TicketViewRightCard from '../components/TicketViewRightCard'
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
            <TicketViewRightCard searchedTicket={searchedTicket} />
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  )
}

export default TicketView
