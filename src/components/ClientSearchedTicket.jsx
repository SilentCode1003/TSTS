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
import { Link } from 'react-router-dom'
import { useBadgeColor } from '../hooks/useBadgeColor'

const ClientSearchedTicket = ({ requestTicket }) => {
  const badgeColor = useBadgeColor(requestTicket)

  return (
    <LinkBox>
      <LinkOverlay as={Link} to={`/ticket-view/${requestTicket.requestid}`}>
        <Card
          direction={['column', null, 'row']}
          variant="elevated"
          alignItems="center"
        >
          <CardHeader>
            <Heading size="md">{requestTicket.requestid}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<Divider />}>
              <HStack>
                <Heading size="xs">Subject</Heading>
                <Text fontSize="sm">{requestTicket.concern}</Text>
              </HStack>

              <HStack>
                <Heading size="xs">Concern</Heading>
                <Text fontSize="sm">{requestTicket.concern}</Text>
              </HStack>

              <HStack>
                <Heading size="xs">Issue</Heading>
                <Text fontSize="sm">{requestTicket.issue}</Text>
              </HStack>

              <HStack>
                <Heading size="xs">Status</Heading>
                <Badge colorScheme={badgeColor}>{requestTicket.status}</Badge>
              </HStack>
            </Stack>
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  )
}

export default ClientSearchedTicket
