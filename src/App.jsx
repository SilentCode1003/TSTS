import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftBar from './components/LeftBar'
import TopBar from './components/TopBar'

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <LeftBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Box h="100vh">
        <Grid templateRows="64px 1fr">
          <TopBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

          <Outlet />
        </Grid>
      </Box>
    </Box>
  )
}

export default App
