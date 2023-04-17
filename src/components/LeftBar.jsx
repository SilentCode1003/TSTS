import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Logo from './Logo'
import NavigationLinks from './NavigationLinks'
import UserCard from './UserCard'

const LeftBar = () => {
  return (
    <Box p={[2, null, 3]} bg="purple.400">
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
