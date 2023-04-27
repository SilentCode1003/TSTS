import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

const SearchedTicket = ({ searchedTicket }) => {
  return (
    <Card
      direction={['column', null, 'row']}
      variant="elevated"
      alignItems="center"
    >
      <CardHeader>
        <Heading size="md">{searchedTicket.ticketid}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<Divider />}>
          <HStack>
            <Heading size="xs">Subject</Heading>
            <Text fontSize="sm">{searchedTicket.subject}</Text>
          </HStack>

          <HStack>
            <Heading size="xs">Date created</Heading>
            <Text fontSize="sm">{searchedTicket.datecreated}</Text>
          </HStack>

          <HStack>
            <Heading size="xs">Due date</Heading>
            <Text fontSize="sm">{searchedTicket.statusdetail}</Text>
          </HStack>

          <HStack>
            <Heading size="xs">Status</Heading>
            <Badge>{searchedTicket.ticketstatus}</Badge>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default SearchedTicket
