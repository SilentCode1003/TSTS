import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
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
import TextareaAutosize from 'react-textarea-autosize'
import { useGetConcern } from '../api/ticket-assignment/getConcern'
import { useGetIssue } from '../api/ticket-assignment/getIssue'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'
import { filesTo5LSerializedData } from '../utils/fileData'

const RequestTicket = () => {
  const concerns = useGetConcern()
  const { data: posIssues, mutate: getIssue } = useGetIssue()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm()

  const watchConcern = watch('concernType')

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Ticket submitted successfully',
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

    const postData = {
      attachment: base64FilesArray,
      concerntype: data.concernType,
      description: data.description,
      issuetype: data.issueType,
    }

    try {
      console.log(postData)
      // await uploadTicket.mutateAsync(transformedData)
    } catch (e) {
      errorToast()
      return
    }
    successToast()
    reset()
  }

  useEffect(() => {
    getIssue(watchConcern)
  }, [watchConcern])

  return (
    <Box p={['4', null, '8']}>
      <Flex direction="column" gap="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Request Ticket
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gap="4">
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

            <FormControl isInvalid={errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>

              <Textarea
                as={TextareaAutosize}
                maxRows={15}
                id="description"
                {...register('description', { required: true })}
                isInvalid={errors.description}
              />

              <FormErrorMessage>This field is required</FormErrorMessage>
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
          </Grid>

          <VStack mt="4">
            <ButtonGroup justifyContent="center">
              <Button
                leftIcon={<CheckIcon />}
                type="submit"
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                type="reset"
                isLoading={isSubmitting}
                onClick={() => reset()}
              >
                Reset
              </Button>
            </ButtonGroup>
          </VStack>
        </form>
      </Flex>
    </Box>
  )
}

export default RequestTicket
