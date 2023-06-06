import { Box, Heading, Stack } from '@chakra-ui/react'
import loadable from '@loadable/component'
import React, { useContext } from 'react'
import NavigationCards from '../components/NavigationCards'
import { AuthContext } from '../context/AuthContext'

const ClientTopCards = loadable(() => import('../components/ClientTopCards'))
const TopCards = loadable(() => import('../components/TopCards'))

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
        {!isAdmin && <ClientTopCards />}
        <NavigationCards />
      </Stack>
    </Box>
  )
}

export default Dashboard
