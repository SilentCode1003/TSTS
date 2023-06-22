import { Box, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import loadable from '@loadable/component'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchTicket } from '../api/reporting/searchTicket'
import { AuthContext } from '../context/AuthContext'

const TicketViewComments = loadable(() =>
  import('../components/TicketViewComments')
)
const TicketViewReplyCard = loadable(() =>
  import('../components/TicketViewReplyCard')
)
const TicketViewRightCard = loadable(() =>
  import('../components/TicketViewRightCard')
)
const TicketViewTopCard = loadable(() =>
  import('../components/TicketViewTopCard')
)

const TicketView = () => {
  const { ticketId } = useParams()
  const [searchedTicket, setSearchedTicket] = useState(null)
  const { isLoading, error, mutateAsync } = useSearchTicket(ticketId)

  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  useEffect(() => {
    mutateAsync({
      ticketid: ticketId,
    })
      .then((data) => {
        setSearchedTicket(data.data[0])
      })
      .catch((e) => {
        console.log(e)
      })
    // const fetchTicket = async () => {
    //   try {
    //     const ticket = await mutateAsync({
    //       ticketid: ticketId,
    //     })
    //     setSearchedTicket(ticket.data[0])
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // fetchTicket()
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

              {isAdmin &&
                searchedTicket?.ticketstatus !== 'CLOSED' &&
                searchedTicket?.ticketstatus !== 'RESOLVED' && (
                  <TicketViewReplyCard searchedTicket={searchedTicket} />
                )}

              {!isAdmin && searchedTicket?.ticketstatus !== 'CLOSED' && (
                <TicketViewReplyCard searchedTicket={searchedTicket} />
              )}
            </Grid>
          </GridItem>

          {isAdmin && (
            <GridItem>
              <TicketViewRightCard searchedTicket={searchedTicket} />
            </GridItem>
          )}
        </Grid>
      </Stack>
    </Box>
  )
}

export default TicketView
