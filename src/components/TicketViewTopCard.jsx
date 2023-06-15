import { DownloadIcon } from '@chakra-ui/icons'
import {
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
import React from 'react'
import { Link } from 'react-router-dom'
import { serializedDataToFile } from '../utils/fileData'

export const TicketAttachments = ({ searchedTicket }) => {
  const files = searchedTicket.attachement.split(' 5LJOIN ')

  return files.map((file) => {
    const { fileName, fileData } = serializedDataToFile(file)

    return (
      <Link key={fileName} to={fileData} download={fileName}>
        {fileName} <DownloadIcon color="blue" />
      </Link>
    )
  })
}

const TicketViewTopCard = ({ searchedTicket }) => {
  if (!searchedTicket) return

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Ticket Details</Heading>
      </CardHeader>

      <CardBody>
        <Stack
          direction="column"
          spacing="2"
          fontSize="sm"
          divider={<Divider />}
        >
          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
            <Text as="b">Ticket ID</Text>
            <Text>{searchedTicket.ticketid}</Text>
          </Grid>

          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
            <Text as="b">Subject</Text>
            <Text>{searchedTicket.subject}</Text>
          </Grid>

          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
            <Text as="b">Concern</Text>
            <Text>{searchedTicket.concern}</Text>
          </Grid>

          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
            <Text as="b">Issue</Text>
            <Text>{searchedTicket.issue}</Text>
          </Grid>

          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
            <Text as="b">Comment</Text>
            <Text>{searchedTicket.comment}</Text>
          </Grid>

          <Grid templateColumns="1fr" gap="1">
            <Text as="b">Description</Text>
            <Textarea isDisabled value={searchedTicket.description} rows={10} />
          </Grid>

          <Grid templateColumns="1fr" gap="1">
            <Text as="b">Attachments</Text>
            <SimpleGrid columns={['1', null, '2']}>
              {searchedTicket.attachement && (
                <TicketAttachments searchedTicket={searchedTicket} />
              )}
              {!searchedTicket.attachement && <Text>No attachments</Text>}
            </SimpleGrid>
          </Grid>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default TicketViewTopCard
