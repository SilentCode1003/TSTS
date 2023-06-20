import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import loadable from '@loadable/component'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetTopics } from '../api/knowledge-base/getTopics'
const ErrorMessage = loadable(() => import('./UI/ErrorMessage'))
const LoadingSpinner = loadable(() => import('./UI/LoadingSpinner'))

const KnowledgeContent = () => {
  const { topicId } = useParams()
  const { isLoading, error, data } = useGetTopics()
  const topicList = data?.data

  const content = topicList.find((topic) => topic.postid === parseInt(topicId))

  if (!content) {
    return (
      <Text fontSize="3xl" textAlign="center">
        Not found
      </Text>
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <Flex direction="column" gap="8">
      <Heading size="2xl" textAlign="center">
        {content?.title}
      </Heading>
      <Text whiteSpace="break-spaces">{content?.content}</Text>
      {content?.attachment && <p>There are some attachement(s)</p>}
    </Flex>
  )
}

export default KnowledgeContent
