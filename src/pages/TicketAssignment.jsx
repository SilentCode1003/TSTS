import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetClient } from '../api/ticket-assignment/getClient'
import { useGetConcern } from '../api/ticket-assignment/getConcern'
import { useGetPersonel } from '../api/ticket-assignment/getPersonel'
import { useGetPriority } from '../api/ticket-assignment/getPriority'
import { useGetStatus } from '../api/ticket-assignment/getStatus'
import { usePostTicket } from '../api/ticket-assignment/postTicket'
import TicketAssignmentTable from '../components/TicketAssignmentTable'

const TicketAssignment = () => {
  const concerns = useGetConcern()
  const clients = useGetClient()
  const priorities = useGetPriority()
  const statuses = useGetStatus()
  const personnel = useGetPersonel()
  const uploadTicket = usePostTicket()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm()
  const watchRequester = watch('requester')
  const watchPersonnel = watch('assignedTo')

  const onSubmit = (data) => {
    uploadTicket.mutate(data)
  }

  useEffect(() => {
    setValue(
      'requesterEmail',
      clients.data?.data.find((o) => o.fullname === watchRequester)?.email || ''
    )
  }, [watchRequester])

  useEffect(() => {
    setValue(
      'department',
      personnel.data?.data.find((o) => o.fullname === watchPersonnel)
        ?.department || ''
    )
  }, [watchPersonnel])

  return (
    <Box p="8">
      <Flex direction="column" gap="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket Assignment
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gap="4">
            {/* title - /concern
            requester - /client
            requester email - /client
            description
            priority - /priority
            status - WIP
            assigned to - /personel
            department - /personel
            attachments
            comments
            */}
            <FormControl isInvalid={errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>

              <Select
                id="title"
                {...register('title', { required: true })}
                placeholder="Select a title"
              >
                {concerns.data?.data.map((concern) => (
                  <option key={concern.concerncode} value={concern.concernname}>
                    {concern.concernname}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.requester}>
              <FormLabel htmlFor="requester">Requester</FormLabel>

              <Select
                id="requester"
                {...register('requester', { required: true })}
                placeholder="Select name"
              >
                {clients.data?.data.map((client) => (
                  <option key={client.clientid} value={client.fullname}>
                    {client.fullname}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.requesterEmail}>
              <FormLabel htmlFor="requester-email">Requester Email</FormLabel>

              <Input
                type="email"
                id="requester-email"
                isDisabled
                {...register('requesterEmail')}
              />
            </FormControl>

            <FormControl isInvalid={errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>

              <Textarea
                id="description"
                {...register('description', { required: true })}
                isInvalid={errors.description}
              />

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.priority}>
              <FormLabel htmlFor="priority">Priority</FormLabel>

              <Select
                id="priority"
                {...register('priority', { required: true })}
                placeholder="Select priority"
              >
                {priorities.data?.data.map((priority) => (
                  <option
                    key={priority.prioritycode}
                    value={priority.priorityname}
                  >
                    {priority.priorityname}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.status}>
              <FormLabel htmlFor="status">Status</FormLabel>

              <Select
                id="status"
                {...register('status', { required: true })}
                placeholder="Select status"
              >
                {statuses.data?.data.map((status) => (
                  <option key={status.statuscode} value={status.statusname}>
                    {status.statusname}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.assignedTo}>
              <FormLabel htmlFor="assigned-to">Assigned To</FormLabel>

              <Select
                id="assigned-to"
                {...register('assignedTo', { required: true })}
                placeholder="Select a personnel"
              >
                {personnel.data?.data.map((person) => (
                  <option key={person.personelid} value={person.fullname}>
                    {person.fullname}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.department}>
              <FormLabel htmlFor="department">Department</FormLabel>

              <Input
                type="text"
                id="department"
                isDisabled
                // {...register('department', { required: true })}
                {...register('department')}
              />
            </FormControl>

            <FormControl isInvalid={errors.attachments}>
              <FormLabel htmlFor="attachments">Attachments</FormLabel>

              <Input
                type="file"
                id="attachments"
                // {...register('attachments', { required: true })}
                {...register('attachments')}
                multiple
              />
            </FormControl>

            <FormControl isInvalid={errors.comments}>
              <FormLabel htmlFor="comments">Comments:</FormLabel>

              <Textarea id="comments" {...register('comments')} />
            </FormControl>
          </Grid>

          <VStack mt="4">
            <ButtonGroup justifyContent="center">
              <Button type="submit" colorScheme="purple">
                Submit
              </Button>
              <Button type="reset" onClick={() => reset()}>
                Reset
              </Button>
            </ButtonGroup>
          </VStack>
        </form>

        <TicketAssignmentTable />
      </Flex>
    </Box>
  )
}

export default TicketAssignment
