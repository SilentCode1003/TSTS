import { Grid, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <Grid w="100%" h="100%" placeItems="center" alignSelf="center">
      <Spinner thickness="4px" size="xl" color="purple.400" />
    </Grid>
  )
}

export default LoadingSpinner
