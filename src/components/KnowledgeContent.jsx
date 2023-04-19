import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetContent } from '../api/knowledge-base/getContent'
import LoadingSpinner from './UI/LoadingSpinner'

const KnowledgeContent = () => {
  const { topicId } = useParams()
  const { isLoading, error, data: content } = useGetContent(topicId)

  if (isLoading) {
    return <LoadingSpinner />
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
