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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdDelete, MdReply } from 'react-icons/md'
import useConfirm from '../hooks/useConfirm'
import { filesTo5LSerializedData } from '../utils/fileData'

const TicketViewReplyCard = () => {
  const [showReplyArea, setShowReplyArea] = useState(false)
  const [ResetConfirmDialog, confirmReset] = useConfirm('Are you sure?', 'All')
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

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
    data.attachments = base64FilesArray

    console.log(data)
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

  return !showReplyArea ? (
    <Card>
      <CardBody>
        <Flex justifyContent="end">
          <Button
            onClick={toggleShowReplyArea}
            colorScheme="purple"
            leftIcon={<MdReply />}
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
                leftIcon={<MdReply />}
                type="submit"
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
              <Button
                leftIcon={<MdDelete />}
                type="reset"
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
