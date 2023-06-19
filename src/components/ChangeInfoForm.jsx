import {
  Avatar,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useChangeClientInfo } from '../api/profile/changeClientInfo'
import { useClientInfo } from '../api/profile/useGetClientInfo'
import { AuthContext } from '../context/AuthContext'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'

const ChangeInfoForm = () => {
  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  const { clientInfo, error, isLoading } = useClientInfo(currentUser.fullname)

  const changeClientInfoMutation = useChangeClientInfo()

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Password updated successfully',
  })
  const errorToast = useErrorToast({
    title: 'Error',
    description: 'Something went wrong',
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: currentUser.fullname,
      email: clientInfo?.email,
      contactnumber: clientInfo?.contactnumber,
    },
  })

  const onSubmit = (data) => {
    changeClientInfoMutation
      .mutateAsync({
        fullname: currentUser.fullname,
        email: data.email,
        contactnumber: data.contactnumber,
      })
      .then((res) => {
        successToast()
      })
      .catch((e) => {
        errorToast()
      })
  }

  useEffect(() => {
    setValue('email', clientInfo?.email)
    setValue('contactnumber', clientInfo?.contactnumber)
  }, [clientInfo])
  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing="4"
      w="85%"
      maxW="500px"
      mx="auto"
    >
      <Avatar size="2xl" name={currentUser.fullname} src="" />

      <FormControl isInvalid={errors.fullname}>
        <FormLabel>Full Name</FormLabel>
        <Input type="text" disabled {...register('fullname')} />

        <FormErrorMessage>This field is required</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" disabled={isAdmin} {...register('email')} />
      </FormControl>

      <FormControl isInvalid={errors.contactnumber}>
        <FormLabel>Contact Number</FormLabel>
        <Input type="tel" disabled={isAdmin} {...register('contactnumber')} />
      </FormControl>

      <ButtonGroup colorScheme="purple">
        <Button type="submit" isLoading={isSubmitting} isDisabled={isAdmin}>
          Apply
        </Button>
        <Button type="reset" variant="outline" isDisabled={isAdmin}>
          Reset
        </Button>
      </ButtonGroup>
    </VStack>
  )
}

export default ChangeInfoForm
