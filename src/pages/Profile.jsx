import { Box, Divider, Heading, Stack, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ChangeInfoForm from '../components/ChangeInfoForm'
import ChangePasswordForm from '../components/ChangePasswordForm'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { fullName } = useParams()

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
          <ChangeInfoForm />
          <ChangePasswordForm />
        </VStack>
      </Stack>
    </Box>
  )
}

export default Profile
