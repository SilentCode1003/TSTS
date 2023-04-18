import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

const KnowledgeContent = () => {
  const { topicId } = useParams()

  return (
    <Box>
      <Heading>Content for topic number {topicId}</Heading>
    </Box>
  )
}

export default KnowledgeContent
