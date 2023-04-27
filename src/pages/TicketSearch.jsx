import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import ErrorMessage from '../components/UI/ErrorMessage'
import SearchedTicket from '../components/SearchedTicket'

const TicketSearch = () => {
  const { ticketId } = useParams()
  const { data: allTickets, isLoading, error } = useGetTickets()
  const searchedTicket = allTickets?.data?.find(
    (ticket) => ticket.ticketid === ticketId
  )

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <VStack>
          <Heading textAlign="center" size={['lg', null, 'xl']} maxW="350px">
            Results for {ticketId}
          </Heading>
        </VStack>

        {/* TODO: Make this a component */}
        <SimpleGrid columns="1" spacing="4">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {!isLoading && !error && !searchedTicket && (
            <Text textAlign="center" fontSize="3xl">
              No results
            </Text>
          )}
          {searchedTicket && <SearchedTicket searchedTicket={searchedTicket} />}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

export default TicketSearch
