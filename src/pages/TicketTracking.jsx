import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'

const TicketTracking = () => {
  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket Tracking
        </Heading>
      </Stack>
    </Box>
  )
}

export default TicketTracking
