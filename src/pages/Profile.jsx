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
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useClientInfo } from '../api/profile/useGetClientInfo'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { fullName } = useParams()

  const { clientInfo, error, isLoading } = useClientInfo(currentUser.fullname)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

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

  const handleChangePassword = () => {
    console.log(oldPassword)
    console.log(newPassword)
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
              <Input type="email" {...register('email')} />
            </FormControl>

            <FormControl isInvalid={errors.contactnumber}>
              <FormLabel>Contact Number</FormLabel>
              <Input type="tel" {...register('contactnumber')} />
            </FormControl>

            <ButtonGroup colorScheme="purple">
              <Button type="submit" isLoading={isSubmitting}>
                Apply
              </Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </ButtonGroup>
          </VStack>

          <VStack
            as="form"
            spacing="4"
            w="85%"
            maxW="500px"
            mx="auto"
            onSubmit={handleChangePassword}
          >
            <FormControl>
              <FormLabel>Old Password</FormLabel>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>

            <ButtonGroup colorScheme="purple">
              <Button type="submit">Change password</Button>
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  setOldPassword('')
                  setNewPassword('')
                }}
              >
                Reset
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </Stack>
    </Box>
  )
}

export default Profile
