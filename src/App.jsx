import { Grid, GridItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LeftBar from './components/LeftBar'
import TopBar from './components/TopBar'

const App = () => {
  const [leftBarIsShowing, setLeftBarIsShowing] = useState(true)

  const toggleLeftBar = () => {
    setLeftBarIsShowing((prev) => !prev)
  }

  return (
    <Grid
      h="100vh"
      templateColumns={{
        base: '150px 1fr',
        md: '250px 1fr',
      }}
    >
      <GridItem>
        {leftBarIsShowing && <LeftBar toggleLeftBar={toggleLeftBar} />}
      </GridItem>

      <GridItem colSpan={leftBarIsShowing ? 1 : 2} overflowY="auto">
        <Grid templateRows="64px 1fr">
          <TopBar />

          <Outlet />
        </Grid>
      </GridItem>
    </Grid>
  )
}

export default App
