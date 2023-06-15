import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSearchRequestTicket } from '../api/request-ticket-details/searchRequestTicket'
import { TicketAttachments } from '../components/TicketViewTopCard'

const RequestTicketDetails = () => {
  const { requestId } = useParams()
  const [searchParams] = useSearchParams()

  const [searchedTicket, setSearchedTicket] = useState()

  const { isLoading, error, mutateAsync } = useSearchRequestTicket(requestId)

  useEffect(() => {
    const fetchRequestTicket = async () => {
      try {
        const requestTicket = await mutateAsync({
          requestid: requestId,
        })
        setSearchedTicket(requestTicket.data[0])
      } catch (e) {
        console.log(e)
      }
    }

    fetchRequestTicket()
  }, [requestId])

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

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Request Ticket Details
        </Heading>

        <Card>
          <CardHeader>
            <Heading size="md">Request Details</Heading>
          </CardHeader>

          <CardBody>
            <Stack
              direction="column"
              spacing="2"
              fontSize="sm"
              divider={<Divider />}
            >
              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Request ID</Text>
                <Text>{searchedTicket?.requestid}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Requested By</Text>
                <Text>{searchedTicket?.requestby}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Date Requested</Text>
                <Text>{searchedTicket?.requestdate}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Concern</Text>
                <Text>{searchedTicket?.concern}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Issue</Text>
                <Text>{searchedTicket?.issue}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Description</Text>
                <Textarea
                  isDisabled
                  value={searchedTicket?.description}
                  rows={15}
                />
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Attachments</Text>
                <SimpleGrid columns={['1', null, '2']}>
                  {searchedTicket?.attachement && (
                    <TicketAttachments searchedTicket={searchedTicket} />
                  )}
                  {!searchedTicket?.attachement && <Text>No attachments</Text>}
                </SimpleGrid>
              </Grid>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Box>
  )
}

export default RequestTicketDetails
