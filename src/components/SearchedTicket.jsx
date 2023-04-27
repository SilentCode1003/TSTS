import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchedTicket = ({ searchedTicket }) => {
  const [badgeColor, setBadgeColor] = useState('gray')

  useEffect(() => {
    switch (searchedTicket.ticketstatus) {
      case 'NEW': {
        setBadgeColor('purple')
        break
      }
      case 'OPEN': {
        setBadgeColor('yellow')
        break
      }
      case 'PENDING': {
        setBadgeColor('red')
        break
      }
      case 'CLOSED': {
        setBadgeColor('gray')
      }
      case 'RESOLVED': {
        setBadgeColor('green')
      }
      default:
        break
    }
  }, [searchedTicket.ticketstatus])

  return (
    <LinkBox>
      <LinkOverlay
        as={Link}
        to={`/admin/ticket-view/${searchedTicket.ticketid}`}
      >
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
                <Badge colorScheme={badgeColor}>
                  {searchedTicket.ticketstatus}
                </Badge>
              </HStack>
            </Stack>
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  )
}

export default SearchedTicket
