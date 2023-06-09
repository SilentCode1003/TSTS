import { Box, Button, Circle, Grid, GridItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import Logo from './Logo'
import NavigationLinks from './NavigationLinks'
import UserCard from './UserCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const LeftBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <Box
      p={[2, null, 3]}
      h="100vh"
      w={isCollapsed ? '120px' : '250px'}
      bg="purple.400"
      borderRight="2px"
      borderColor="purple.500"
      transition="width 250ms ease"
      overflowY="auto"
      overflowX="hidden"
    >
      <Grid gap="8">
        <GridItem>
          <Logo />
        </GridItem>

        <GridItem placeSelf="center">
          <UserCard />
        </GridItem>

        <GridItem>
          <NavigationLinks isCollapsed={isCollapsed} />
        </GridItem>

        <Button
          colorScheme="purple"
          onClick={toggleCollapse}
          fontSize="2xl"
          transition="all 250ms ease"
          placeSelf="center"
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>
      </Grid>
    </Box>
  )
}

export default LeftBar
