import { Box, Heading, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetContent } from '../api/knowledge-base/getContent'

const KnowledgeContent = () => {
  const { topicId } = useParams()
  const { isLoading, error, data: content } = useGetContent(topicId)

  if (isLoading) {
    return <Spinner color="purple.500" />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <Box>
      <Heading>{content?.data?.title}</Heading>
      <Text>{content?.data?.content}</Text>
    </Box>
  )
}

export default KnowledgeContent
