import { Box, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchTicket } from '../api/reporting/searchTicket'
import TicketViewComments from '../components/TicketViewComments'
import TicketViewReplyCard from '../components/TicketViewReplyCard'
import TicketViewRightCard from '../components/TicketViewRightCard'
import TicketViewTopCard from '../components/TicketViewTopCard'

const TicketView = () => {
  const { ticketId } = useParams()
  const [searchedTicket, setSearchedTicket] = useState(null)
  const [lastAction, setLastAction] = useState(null)
  // const { data: allTickets, isLoading, error } = useGetTickets()
  // const searchedTicket =
  //   allTickets?.data?.find((ticket) => ticket.ticketid === ticketId) || {}
  const { isLoading, error, mutateAsync } = useSearchTicket(ticketId)

  console.log(searchedTicket)

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticket = await mutateAsync({
          ticketid: ticketId,
        })
        setSearchedTicket(ticket.data[0])
      } catch (e) {
        console.log(e)
      }
    }

    fetchTicket()
  }, [ticketId])

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

              <TicketViewComments searchedTicket={searchedTicket} />

              {lastAction !== 'CLOSED' &&
                lastAction !== 'RESOLVED' &&
                searchedTicket?.ticketstatus !== 'CLOSED' &&
                searchedTicket?.ticketstatus !== 'RESOLVED' && (
                  <TicketViewReplyCard searchedTicket={searchedTicket} />
                )}
            </Grid>
          </GridItem>

          <GridItem>
            <TicketViewRightCard
              searchedTicket={searchedTicket}
              setLastAction={setLastAction}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  )
}

export default TicketView
