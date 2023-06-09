import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Send, Trash2 } from 'react-feather'
import { useForm } from 'react-hook-form'
import { usePostTicketComment } from '../api/ticket-view/postTicketComment'
import { AuthContext } from '../context/AuthContext'
import useConfirm from '../hooks/useConfirm'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'
import { filesTo5LSerializedData } from '../utils/fileData'

const TicketViewReplyCard = ({ searchedTicket }) => {
  const [showReplyArea, setShowReplyArea] = useState(false)
  const [ResetConfirmDialog, confirmReset] = useConfirm('Are you sure?', 'All')
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const uploadTicketComment = usePostTicketComment(searchedTicket?.ticketid)

  const { currentUser } = useContext(AuthContext)

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Comment submitted',
  })
  const errorToast = useErrorToast({
    title: 'Error',
    description: 'Something went wrong',
  })

  const onSubmit = async (data) => {
    let base64FilesArray = ''

    if (data.attachments.length) {
      const fileListArray = Array.from(data.attachments)
      try {
        base64FilesArray = await filesTo5LSerializedData(fileListArray)
      } catch (e) {
        errorToast()
        return
      }
    }
    data.ticketid = searchedTicket?.ticketid
    data.attachment = base64FilesArray
    data.commentby = currentUser.fullname
    delete data.attachments

    try {
      await uploadTicketComment.mutateAsync(data)
    } catch (e) {
      errorToast()
      return
    }

    console.log(data)
    successToast()
    reset()
  }

  const toggleShowReplyArea = () => {
    setShowReplyArea((prev) => !prev)
  }

  const handleReset = async () => {
    const ans = await confirmReset()

    if (!ans) return
    toggleShowReplyArea()
    reset()
  }

  if (!searchedTicket) return

  return !showReplyArea ? (
    <Card>
      <CardBody>
        <Flex justifyContent="end">
          <Button
            onClick={toggleShowReplyArea}
            colorScheme="purple"
            leftIcon={<Send size={16} />}
            size="sm"
          >
            Reply
          </Button>
        </Flex>
      </CardBody>
    </Card>
  ) : (
    <>
      <ResetConfirmDialog />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>
            <VStack spacing="4">
              <FormControl isInvalid={errors.comment}>
                <Textarea
                  rows={10}
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
            <ButtonGroup w="100%" justifyContent="flex-end" size="sm">
              <Button
                leftIcon={<Send size={16} />}
                type="submit"
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
              <Button
                leftIcon={<Trash2 size={16} />}
                isLoading={isSubmitting}
                onClick={handleReset}
              >
                Discard
              </Button>
            </ButtonGroup>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

export default TicketViewReplyCard
