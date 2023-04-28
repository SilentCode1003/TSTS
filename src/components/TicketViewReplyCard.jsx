import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { filesTo5LSerializedData } from '../utils/fileData'

const TicketViewReplyCard = () => {
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

  return (
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
            <Button type="submit" colorScheme="purple" isLoading={isSubmitting}>
              Submit
            </Button>
            <Button type="reset" isLoading={isSubmitting}>
              Reset
            </Button>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Card>
  )
}

export default TicketViewReplyCard
