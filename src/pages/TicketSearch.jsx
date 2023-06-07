import { Box, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchTicket } from '../api/reporting/searchTicket'
import SearchedTicket from '../components/SearchedTicket'
import ErrorMessage from '../components/UI/ErrorMessage'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const TicketSearch = () => {
  const [searchedTicket, setSearchedTicket] = useState(null)
  const { ticketId } = useParams()
  const { mutateAsync, isLoading, error } = useSearchTicket(ticketId)

  useEffect(() => {
    mutateAsync({
      ticketid: `${ticketId}`,
    }).then((res) => {
      setSearchedTicket(res.data[0])
    })
  }, [ticketId])

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <VStack>
          <Heading textAlign="center" size={['lg', null, 'xl']} maxW="350px">
            Results for {ticketId}
          </Heading>
        </VStack>

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
