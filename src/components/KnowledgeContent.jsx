import { Box, Heading, Text } from '@chakra-ui/react'
import loadable from '@loadable/component'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetContent } from '../api/knowledge-base/getContent'
const ErrorMessage = loadable(() => import('./UI/ErrorMessage'))
const LoadingSpinner = loadable(() => import('./UI/LoadingSpinner'))

const KnowledgeContent = () => {
  const { topicId } = useParams()
  const { isLoading, error, data: content } = useGetContent(topicId)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <Box>
      <Heading>{content?.data?.title}</Heading>
      <Text>{content?.data?.content}</Text>
    </Box>
  )
}

export default KnowledgeContent
