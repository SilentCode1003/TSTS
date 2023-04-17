import { Grid, Heading } from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
  return (
    <Grid p="4" h="100vh" placeItems="center" bg="purple.400">
      <Heading textAlign="center" color="white" fontSize={['4xl', null, '6xl']}>
        Page Not Found
      </Heading>
    </Grid>
  )
}

export default NotFound
