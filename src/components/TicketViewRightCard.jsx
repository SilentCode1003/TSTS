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
import React from 'react'
import { useForm } from 'react-hook-form'
import { useGetStatus } from '../api/ticket-assignment/getStatus'
import useConfirm from '../hooks/useConfirm'
import ErrorMessage from './UI/ErrorMessage'
import LoadingSpinner from './UI/LoadingSpinner'

const TicketViewRightCard = ({ searchedTicket }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'Once the ticket is closed, it will become read-only and cannot be edited. Are you absolutely certain you want to proceed?'
  )
  const { data: statuses, isLoading, error } = useGetStatus()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { selectedStatus: searchedTicket.ticketstatus },
  })

  const onSubmit = async (data) => {
    const ans = await confirm()

    if (!ans) return

    console.log(data)
  }

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
