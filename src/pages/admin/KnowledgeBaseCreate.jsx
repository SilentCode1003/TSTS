import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { useGetCategories } from '../../api/knowledge-base/getCategories'
import { useSaveTopic } from '../../api/knowledge-base/saveTopic'
import { AuthContext } from '../../context/AuthContext'
import { useErrorToast, useSuccessToast } from '../../hooks/useToastFeedback'
import { filesTo5LSerializedData } from '../../utils/fileData'

const KnowledgeBaseCreate = () => {
  const { currentUser } = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Ticket submitted successfully',
  })
  const errorToast = useErrorToast({
    title: 'Error',
    description: 'Something went wrong',
  })

  const { isLoading, error, data: categories } = useGetCategories()

  const saveTopicMutation = useSaveTopic()

  const onSubmit = async (data) => {
    let base64FilesArray = ''
    if (data.attachements.length) {
      const fileListArray = Array.from(data.attachements)
      try {
        base64FilesArray = await filesTo5LSerializedData(fileListArray)
      } catch (e) {
        errorToast()
        return
      }
    }

    saveTopicMutation
      .mutateAsync({
        ...data,
        attachements: base64FilesArray,
        postby: currentUser.fullname,
      })
      .then(() => {
        successToast()
        reset()
      })
      .catch((e) => {
        errorToast({ description: e.message })
      })
  }

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Create Content
        </Heading>

        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.title}>
            <FormLabel>Title</FormLabel>

            <Input type="text" {...register('title', { required: true })} />

            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.category}>
            <FormLabel>Category</FormLabel>

            <Input
              list="categories"
              {...register('category', { required: true })}
            />
            <datalist id="categories">
              {categories?.data.map((category) => (
                <option
                  key={category.categorycode}
                  value={category.categoryname}
                >
                  {category.categoryname}
                </option>
              ))}
            </datalist>

            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.content}>
            <FormLabel>Content</FormLabel>

            <Textarea
              as={TextareaAutosize}
              maxRows={15}
              isInvalid={errors.content}
              {...register('content', { required: true })}
            />

            <FormErrorMessage>This field is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.attachements}>
            <FormLabel>Attachments</FormLabel>

            <Input type="file" multiple {...register('attachements')} />
          </FormControl>

          <ButtonGroup colorScheme="purple">
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </ButtonGroup>
        </VStack>
      </Stack>
    </Box>
  )
}

export default KnowledgeBaseCreate
