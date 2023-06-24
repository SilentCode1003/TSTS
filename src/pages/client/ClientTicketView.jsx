import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import loadable from '@loadable/component'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetServiceTicketId } from '../../api/client/client-ticket-tracking/getServiceTicketId'
import { useSearchTicket } from '../../api/reporting/searchTicket'
import { useSearchRequestTicket } from '../../api/request-ticket-details/searchRequestTicket'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const RequestDetails = loadable(() => import('../../components/RequestDetails'))
const TicketViewComments = loadable(() =>
  import('../../components/TicketViewComments')
)
const TicketViewReplyCard = loadable(() =>
  import('../../components/TicketViewReplyCard')
)
const TicketViewTopCard = loadable(() =>
  import('../../components/TicketViewTopCard')
)

const ClientTicketView = () => {
  const { currentUser } = useContext(AuthContext)

  const { requestId } = useParams()

  const [requestTicket, setRequestTicket] = useState()
  const [serviceTicketId, setServiceTicketId] = useState()
  const [searchedTicket, setSearchedTicket] = useState()

  const requestTicketMutation = useSearchRequestTicket(requestId)

  const serviceTicketIdMutation = useGetServiceTicketId(requestId)

  const searchTicketMutation = useSearchTicket(serviceTicketId)

  useEffect(() => {
    const fetchRequestTicket = async () => {
      try {
        const requestTicketData = await requestTicketMutation.mutateAsync({
          requestid: requestId,
        })
        setRequestTicket(requestTicketData.data[0])
      } catch (e) {
        console.log(e)
      }
    }

    fetchRequestTicket()
  }, [requestId])

  useEffect(() => {
    const fetchServiceTicketId = async () => {
      try {
        const requestTicketData = await serviceTicketIdMutation.mutateAsync({
          requestid: requestId,
        })
        setServiceTicketId(requestTicketData.data[0]?.ticketid)
      } catch (e) {
        console.log(e)
      }
    }

    fetchServiceTicketId()
  }, [requestTicket])

  useEffect(() => {
    searchTicketMutation
      .mutateAsync({
        ticketid: serviceTicketId,
      })
      .then((data) => {
        setSearchedTicket(data.data[0])
      })
      .catch((e) => {
        console.log(e)
      })
  }, [serviceTicketId])

  if (requestTicket?.requestby !== currentUser.fullname) {
    return <Text>No result</Text>
  }

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket View
        </Heading>
      </Stack>

      <Grid gap="8">
        <RequestDetails searchedTicket={requestTicket} />

        {serviceTicketId && (
          <>
            <TicketViewTopCard searchedTicket={searchedTicket} />

            <TicketViewComments searchedTicket={searchedTicket} />
          </>
        )}

        {searchedTicket?.ticketstatus !== 'CLOSED' && (
          <TicketViewReplyCard searchedTicket={searchedTicket} />
        )}
      </Grid>
    </Box>
  )
}

export default ClientTicketView
