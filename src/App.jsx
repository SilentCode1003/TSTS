import { Box, Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftBar from './components/LeftBar'
import TopBar from './components/TopBar'

const App = () => {
  return (
    <Flex>
      <LeftBar />

      <Box h="100vh" flex="1" overflowY="auto">
        <Grid templateRows="64px 1fr">
          <TopBar />

          <Outlet />
        </Grid>
      </Box>
    </Flex>
  )
}

export default App
