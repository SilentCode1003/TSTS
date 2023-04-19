import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import TopCards from '../components/TopCards'
import NavigationCards from '../components/NavigationCards'

const Dashboard = () => {
  return (
    <Box p="8">
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Dashboard
        </Heading>

        <TopCards />
        <NavigationCards />
      </Stack>
    </Box>
  )
}

export default Dashboard
