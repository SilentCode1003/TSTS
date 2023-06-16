import { Box, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProtectedRequestTicket } from '../api/client/client-ticket-search/getRequestTicket'
import ErrorMessage from '../components/UI/ErrorMessage'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { AuthContext } from '../context/AuthContext'
import SearchedTicket from '../components/SearchedTicket'
import ClientSearchedTicket from '../components/ClientSearchedTicket'

const ClientTicketSearch = () => {
  const { currentUser } = useContext(AuthContext)

  const { requestId } = useParams()

  const [requestTicket, setRequestTicket] = useState(null)

  const { mutateAsync, isLoading, error } =
    useGetProtectedRequestTicket(requestId)

  useEffect(() => {
    mutateAsync({
      requestid: `${requestId}`,
      requestby: currentUser.fullname,
    }).then((res) => {
      setRequestTicket(res.data[0])
    })
  }, [requestId])

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <VStack>
          <Heading textAlign="center" size={['lg', null, 'xl']} maxW="350px">
            Results for {requestId}
          </Heading>
        </VStack>

        <SimpleGrid columns="1" spacing="4">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {!isLoading && !error && !requestTicket && (
            <Text textAlign="center" fontSize="3xl">
              No results
            </Text>
          )}
          {requestTicket && (
            <ClientSearchedTicket requestTicket={requestTicket} />
          )}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

export default ClientTicketSearch
