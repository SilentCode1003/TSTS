import { Box, Circle, Grid, GridItem } from '@chakra-ui/react'
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
      w={isCollapsed ? '100px' : '250px'}
      bg="purple.400"
      borderRight="2px"
      borderColor="purple.500"
      position="relative"
      transition="width 250ms ease"
    >
      <Circle
        as="button"
        size="8"
        bg="white"
        position="absolute"
        top="13%"
        right={isCollapsed ? '-17.5%' : '-7%'} // Arbitrary values only :(
        border="2px"
        borderColor="purple.500"
        onClick={toggleCollapse}
        color="purple.500"
        fontSize="2xl"
        transition="all 250ms ease"
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Circle>
      <Grid h="100%" templateRows="2fr 2fr 8fr">
        <GridItem>
          <Logo />
        </GridItem>

        <GridItem>
          <UserCard />
        </GridItem>

        <GridItem>
          <NavigationLinks />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default LeftBar
