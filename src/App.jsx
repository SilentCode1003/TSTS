import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftBar from './components/LeftBar'
import TopBar from './components/TopBar'

const App = () => {
  return (
    <Grid templateColumns={['120px 1fr', null, '250px 1fr']}>
      <LeftBar />

      <Box h="100vh" overflowY="auto">
        <Grid templateRows="64px 1fr">
          <TopBar />

          <Outlet />
        </Grid>
      </Box>
    </Grid>
  )
}

export default App
