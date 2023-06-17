import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import KnowledgeTopics from '../../components/KnowledgeTopics'

const KnowledgeBase = () => {
  return (
    <Flex direction={['column', null, 'row']} p={['4', null, '8']} gap="8">
      <Box w={['auto', null, '250px']}>
        <KnowledgeTopics />
      </Box>

      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default KnowledgeBase
