import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchRequestTicket } from '../../api/request-ticket-details/searchRequestTicket'
import RequestDetails from '../../components/RequestDetails'
import RequesterDetails from '../../components/RequesterDetails'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useGetRequesterDetails } from '../../api/request-ticket-details/getRequesterDetails'

const RequestTicketDetails = () => {
  const { requestId } = useParams()

  const navigate = useNavigate()

  const [searchedTicket, setSearchedTicket] = useState()
  const [requester, setRequester] = useState()

  const { isLoading, error, mutateAsync } = useSearchRequestTicket(requestId)
  const requesterDetailsMutation = useGetRequesterDetails(
    searchedTicket?.requestby
  )

  const handleClick = () => {
    navigate(
      `/admin/child-ticket?requestid=${searchedTicket.requestid}&concern=${searchedTicket.concern}&issue=${searchedTicket.issue}&requestername=${searchedTicket.requestby}&description=${searchedTicket.description}`
    )
  }

  useEffect(() => {
    mutateAsync({
      requestid: requestId,
    })
      .then((data) => {
        setSearchedTicket(data.data[0])
      })
      .catch((e) => {
        console.log(e)
      })
    // const fetchRequestTicket = async () => {
    //   try {
    //     const requestTicket = await mutateAsync({
    //       requestid: requestId,
    //     })
    //     setSearchedTicket(requestTicket.data[0])
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // fetchRequestTicket()
  }, [requestId])

  useEffect(() => {
    requesterDetailsMutation
      .mutateAsync({
        requestby: searchedTicket?.requestby,
      })
      .then((data) => {
        setRequester(data.data[0])
      })
      .catch((e) => {
        console.log(e)
      })
    // const fetchRequesterDetails = async () => {
    //   try {
    //     const requesterDetails = await requesterDetailsMutation.mutateAsync({
    //       requestby: searchedTicket?.requestby,
    //     })
    //     setRequester(requesterDetails.data[0])
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // fetchRequesterDetails()
  }, [searchedTicket])

  if (!searchedTicket) {
    return (
      <Box p={['4', null, '8']}>
        <Stack direction="column" spacing="8" alignItems="center">
          <Heading textAlign="center" size={['lg', null, 'xl']}>
            Request Ticket Details
          </Heading>

          <Text>No Data</Text>
        </Stack>
      </Box>
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Request Ticket Details
        </Heading>

        <Grid templateColumns={['1fr', null, '3fr 2fr']} gap="8">
          <GridItem>
            <RequestDetails searchedTicket={searchedTicket} />
          </GridItem>

          <GridItem>
            <RequesterDetails requester={requester} />
          </GridItem>
        </Grid>

        <Card>
          <HStack>
            <Button colorScheme="purple" onClick={handleClick}>
              Create/Assign Ticket
            </Button>
          </HStack>
        </Card>
      </Stack>
    </Box>
  )
}

export default RequestTicketDetails
