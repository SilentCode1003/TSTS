import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'

const RequestTicket = () => {
  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Request Ticket
        </Heading>
      </Stack>
    </Box>
  )
}

export default RequestTicket
