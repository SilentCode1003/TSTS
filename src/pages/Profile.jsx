import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useClientInfo } from '../api/profile/useGetClientInfo'
import { AuthContext } from '../context/AuthContext'
import ChangePasswordForm from '../components/ChangePasswordForm'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'
  const { fullName } = useParams()

  const { clientInfo, error, isLoading } = useClientInfo(currentUser.fullname)

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

  const onSubmit = (e) => {
    console.log(e)
  }

  useEffect(() => {
    setValue('email', clientInfo?.email)
    setValue('contactnumber', clientInfo?.contactnumber)
  }, [clientInfo])

  if (currentUser.fullname !== fullName) {
    return
  }

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Profile Information
        </Heading>

        <VStack divider={<Divider />} spacing="8">
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
              <Input
                type="tel"
                disabled={isAdmin}
                {...register('contactnumber')}
              />
            </FormControl>

            <ButtonGroup colorScheme="purple">
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={isAdmin}
              >
                Apply
              </Button>
              <Button type="reset" variant="outline" isDisabled={isAdmin}>
                Reset
              </Button>
            </ButtonGroup>
          </VStack>

          <ChangePasswordForm />
        </VStack>
      </Stack>
    </Box>
  )
}

export default Profile
