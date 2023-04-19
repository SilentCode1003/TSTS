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
import { useGetIssue } from '../api/ticket-assignment/getIssue'
import { filesToBase64 } from '../utils/convertToBase64'

const TicketAssignment = () => {
  const concerns = useGetConcern()
  const { data: posIssues, mutate: getIssue } = useGetIssue()
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
  const watchConcern = watch('concernType')
  const watchRequester = watch('requesterName')
  const watchPersonnel = watch('assignedTo')

  const onSubmit = (data) => {
    const fileListArray = Array.from(data.attachments)
    const base64FilesArray = filesToBase64(fileListArray)
    data.attachments = base64FilesArray
    console.log(data)
    uploadTicket.mutate(data)
  }

  useEffect(() => {
    getIssue(watchConcern)
  }, [watchConcern])

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
    <Box p={['4', null, '8']}>
      <Flex direction="column" gap="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket Assignment
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gap="4">
            {/* title - /concern
            issue type - /WIP
            requester - /client
            requester email - /client
            description
            priority - /priority
            status - /status
            assigned to - /personel
            department - /personel
            attachments
            comments
            */}
            <FormControl isInvalid={errors.concernType}>
              <FormLabel htmlFor="concern-type">Concern Type</FormLabel>

              <Select
                id="concern-type"
                {...register('concernType', { required: true })}
                placeholder="Select concern type"
              >
                {concerns.data?.data.map((concern) => (
                  <option key={concern.concerncode} value={concern.concernname}>
                    {concern.concernname}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.issueType}>
              <FormLabel htmlFor="issue-type">Issue Type</FormLabel>

              <Select
                id="issue-type"
                {...register('issueType', { required: true })}
                placeholder="Select issue type"
              >
                {posIssues?.data?.map((issue) => (
                  <option key={issue.issuecode} value={issue.issuename}>
                    {issue.issuename}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.requesterName}>
              <FormLabel htmlFor="requester-name">Requester Name</FormLabel>

              <Select
                id="requester-name"
                {...register('requesterName', { required: true })}
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

            <FormControl isInvalid={errors.ticketStatus}>
              <FormLabel htmlFor="ticket-status">Ticket Status</FormLabel>

              <Select
                id="ticket-status"
                {...register('ticketStatus', { required: true })}
                placeholder="Select ticket status"
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
