import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Grid,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGetStatus } from '../api/ticket-assignment/getStatus'
import { usePostTicketStatusUpdate } from '../api/ticket-view/postTicketStatusUpdate'
import { AuthContext } from '../context/AuthContext'
import useConfirm from '../hooks/useConfirm'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'
import ErrorMessage from './UI/ErrorMessage'
import LoadingSpinner from './UI/LoadingSpinner'
import { useEffect } from 'react'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import { useParams } from 'react-router-dom'

const TicketViewRightCard = ({ searchedTicket, setLastAction }) => {
  if (!searchedTicket) return

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'Once the ticket is closed, it will become read-only and cannot be edited. Are you absolutely certain you want to proceed?'
  )
  const { data: statuses, isLoading, error } = useGetStatus()

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()
  const ticketStatusMutation = usePostTicketStatusUpdate(
    searchedTicket.ticketid
  )
  const { currentUser } = useContext(AuthContext)
  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Ticket updated successfully',
  })
  const errorToast = useErrorToast({
    title: 'Error',
    description: 'Something went wrong',
  })

  const onSubmit = async (data) => {
    const ans = await confirm()

    if (!ans) return

    setLastAction(data.selectedStatus)

    try {
      await ticketStatusMutation.mutateAsync({
        ticketid: searchedTicket.ticketid,
        ticketstatus: data.selectedStatus,
        commentby: currentUser.fullname,
      })
    } catch (e) {
      errorToast()
      console.log(e)
      return
    }

    setValue('selectedStatus', data.selectedStatus)
    successToast()
  }

  useEffect(() => {
    setValue('selectedStatus', searchedTicket.ticketstatus)
  }, [searchedTicket.ticketstatus])

  return (
    <>
      <ConfirmDialog />
      <Card position={['static', null, 'sticky']} top={0}>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction="column"
              spacing="2"
              fontSize="sm"
              divider={<Divider />}
            >
              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Requester Name</Text>
                <Text>{searchedTicket.requestername}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Requester Email</Text>
                <Text>{searchedTicket.requesteremail}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Priority</Text>
                <Text>{searchedTicket.priority}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Ticket Status</Text>
                {isLoading && <LoadingSpinner />}
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                {!isLoading && !error && (
                  <Select {...register('selectedStatus', { required: true })}>
                    {statuses?.data.map((status) => (
                      <option key={status.statuscode} value={status.statusname}>
                        {status.statusname}
                      </option>
                    ))}
                  </Select>
                )}
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Date Created</Text>
                <Text>{searchedTicket.datecreated}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Due Date</Text>
                <Text>{searchedTicket.duedate}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Status Detail</Text>
                <Text>{searchedTicket.statusdetail}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Assigned To</Text>
                <Text>{searchedTicket.assignedto}</Text>
              </Grid>

              <Grid templateColumns="1fr" gap="1">
                <Text as="b">Department</Text>
                <Text>{searchedTicket.department}</Text>
              </Grid>

              <Grid mt="4" templateColumns="1fr" gap="1">
                <ButtonGroup size="xs" justifyContent="space-around">
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    colorScheme="blackAlpha"
                  >
                    Submit
                  </Button>
                  <Button isLoading={isSubmitting} type="reset">
                    Reset
                  </Button>
                </ButtonGroup>
              </Grid>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </>
  )
}

export default TicketViewRightCard
