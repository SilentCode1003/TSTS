import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useChangeAdminPassword } from '../api/profile/changeAdminPassword'
import { useChangeClientPassword } from '../api/profile/changeClientPassword'
import { AuthContext } from '../context/AuthContext'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'

const ChangePasswordForm = () => {
  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const changeAdminPasswordMutation = useChangeAdminPassword()
  const changeClientPasswordMutation = useChangeClientPassword()

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Password updated successfully',
  })
  const errorToast = useErrorToast({
    title: 'Error',
    description: 'Something went wrong',
  })

  const handleChangePassword = (data) => {
    let mutation

    if (isAdmin) {
      mutation = changeAdminPasswordMutation
    } else {
      mutation = changeClientPasswordMutation
    }

    mutation
      .mutateAsync({
        fullname: currentUser.fullname,
        oldpassword: data.oldpassword,
        newpassword: data.newpassword,
      })
      .then((res) => {
        if (res.msg === 'incorrect') {
          throw new Error('Incorrect password')
        }
        successToast()
        reset()
      })
      .catch((e) => {
        errorToast()
      })
  }

  return (
    <VStack
      as="form"
      spacing="4"
      w="85%"
      maxW="500px"
      mx="auto"
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <FormControl isInvalid={errors.oldpassword}>
        <FormLabel>Old Password</FormLabel>
        <Input
          type="password"
          {...register('oldpassword', { required: true })}
        />

        <FormErrorMessage>This field is required</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.newpassword}>
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          {...register('newpassword', { minLength: 5, required: true })}
        />

        <FormErrorMessage>
          This field is required (min 5 characters)
        </FormErrorMessage>
      </FormControl>

      <ButtonGroup colorScheme="purple">
        <Button type="submit" isLoading={isSubmitting}>
          Change password
        </Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
      </ButtonGroup>
    </VStack>
  )
}

export default ChangePasswordForm
