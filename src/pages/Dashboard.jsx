import { Box, Heading, Stack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import TopCards from '../components/TopCards'
import NavigationCards from '../components/NavigationCards'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Dashboard
        </Heading>

        {isAdmin && <TopCards />}
        <NavigationCards />
      </Stack>
    </Box>
  )
}

export default Dashboard
