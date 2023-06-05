import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'

const TicketSubmission = () => {
  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket Submission
        </Heading>
      </Stack>
    </Box>
  )
}

export default TicketSubmission
