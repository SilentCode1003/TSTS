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

const TicketSearch = () => {
  const { ticketId } = useParams()

  const searchedTickets = [
    {
      ticketid: '2023042610011',
      subject: 'POS SCANNER ISOLATION[JOSEPH ORENCIO]2023042610011',
      ticketstatus: 'NEW',
      datecreated: '2023-04-26 09:11',
      statusdetail: 'Due in 3 days',
    },
    {
      ticketid: '2023042610011',
      subject: 'POS SCANNER ISOLATION[JOSEPH ORENCIO]2023042610011',
      ticketstatus: 'NEW',
      datecreated: '2023-04-26 09:11',
      statusdetail: 'Due in 3 days',
    },
  ]

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
          {searchedTickets.length > 0 &&
            searchedTickets.map((ticket) => (
              <Card
                key={ticket.ticketid}
                direction={['column', null, 'row']}
                variant="elevated"
                alignItems="center"
              >
                <CardHeader>
                  <Heading size="md">{ticket.ticketid}</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<Divider />}>
                    <HStack>
                      <Heading size="xs">Subject</Heading>
                      <Text fontSize="sm">{ticket.subject}</Text>
                    </HStack>

                    <HStack>
                      <Heading size="xs">Date created</Heading>
                      <Text fontSize="sm">{ticket.datecreated}</Text>
                    </HStack>

                    <HStack>
                      <Heading size="xs">Due date</Heading>
                      <Text fontSize="sm">{ticket.statusdetail}</Text>
                    </HStack>

                    <HStack>
                      <Heading size="xs">Status</Heading>
                      <Badge>{ticket.ticketstatus}</Badge>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
            ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

export default TicketSearch
