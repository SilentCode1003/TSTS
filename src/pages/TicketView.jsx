import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import { serializedDataToFile } from '../utils/fileData'

const TicketView = () => {
  const { ticketId } = useParams()
  const { data: allTickets, isLoading, error } = useGetTickets()
  const searchedTicket =
    allTickets?.data?.find((ticket) => ticket.ticketid === ticketId) || {}
  const attachments = () => {
    const files = searchedTicket.attachement.split(' 5LJOIN ')

    return files.map((file) => {
      const { fileName, fileData } = serializedDataToFile(file)

      return (
        <Link key={fileName} href={fileData} download={fileName}>
          {fileName} <DownloadIcon color="blue" />
        </Link>
      )
    })
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket View
        </Heading>

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
                <Text as="b">Requester Name</Text>
                <Text>{searchedTicket.requestername}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Requester Email</Text>
                <Text>{searchedTicket.requesteremail}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Priority</Text>
                <Text>{searchedTicket.priority}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Ticket Status</Text>
                <Text>{searchedTicket.ticketstatus}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Date Created</Text>
                <Text>{searchedTicket.datecreated}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Due Date</Text>
                <Text>{searchedTicket.duedate}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Status Detail</Text>
                <Text>{searchedTicket.statusdetail}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Assigned To</Text>
                <Text>{searchedTicket.assignedto}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Department</Text>
                <Text>{searchedTicket.department}</Text>
              </Grid>

              <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="1">
                <Text as="b">Comment</Text>
                <Text>{searchedTicket.comment}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Description</Text>
                <Textarea isDisabled value={searchedTicket.description} />
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Attachments</Text>
                <SimpleGrid columns={['1', null, '2']}>
                  {searchedTicket.attachement && attachments()}
                  {!searchedTicket.attachement && <Text>No attachments</Text>}
                </SimpleGrid>
              </Grid>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
              <VStack spacing="4">
                <FormControl isInvalid={errors.comment}>
                  <Textarea
                    placeholder="Comment"
                    {...register('comment', { required: true })}
                  />

                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="file">Attach File(s)</FormLabel>
                  <Input
                    type="file"
                    id="file"
                    {...register('attachments')}
                    multiple
                  />
                </FormControl>
              </VStack>
            </CardBody>

            <CardFooter>
              <ButtonGroup w="100%" justifyContent="flex-end">
                <Button
                  type="submit"
                  colorScheme="purple"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
                <Button type="reset" isLoading={isSubmitting}>
                  Reset
                </Button>
              </ButtonGroup>
            </CardFooter>
          </form>
        </Card>
      </Stack>
    </Box>
  )
}

export default TicketView
