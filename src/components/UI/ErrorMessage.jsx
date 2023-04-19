import { Grid, Text } from '@chakra-ui/react'
import React from 'react'

const ErrorMessage = ({ children }) => {
  return (
    <Grid w="100%" h="100%" placeItems="center" alignSelf="center">
      <Text color="red.400" fontWeight="bold">
        {children}
      </Text>
    </Grid>
  )
}

export default ErrorMessage
