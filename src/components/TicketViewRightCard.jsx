import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Grid,
  HStack,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGetStatus } from '../api/ticket-assignment/getStatus'
import ErrorMessage from './UI/ErrorMessage'
import LoadingSpinner from './UI/LoadingSpinner'
import { useForm } from 'react-hook-form'

const TicketViewRightCard = ({ searchedTicket }) => {
  const { data: statuses, isLoading, error } = useGetStatus()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { selectedStatus: searchedTicket.ticketstatus },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Card>
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

            <ButtonGroup size="xs" justifyContent="space-around">
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="purple"
              >
                Submit
              </Button>
              <Button isLoading={isSubmitting} type="reset">
                Reset
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </CardBody>
    </Card>
  )
}

export default TicketViewRightCard
