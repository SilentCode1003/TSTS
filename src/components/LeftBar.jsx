import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import Logo from './Logo'
import NavigationLinks from './NavigationLinks'
import UserCard from './UserCard'

const LeftBar = () => {
  return (
    <Box>
      <Grid>
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
