import { Search2Icon } from '@chakra-ui/icons'
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useGetTopics } from '../api/knowledge-base/getTopics'
import LoadingSpinner from './UI/LoadingSpinner'

const KnowledgeTopics = () => {
  const { isLoading, error, data: knowledgeTopics } = useGetTopics()

  return (
    <VStack alignItems="start" spacing="8">
      <Heading textAlign="center">Knowledge Base</Heading>

      <InputGroup w="100%">
        <InputLeftElement>
          <Search2Icon />
        </InputLeftElement>

        <Input
          variant="outline"
          colorScheme="purple"
          placeholder="Search topics"
        />
      </InputGroup>

      <VStack w="100%" alignItems="start">
        {isLoading && <LoadingSpinner />}
        {error && <Text color="red">{error.message}</Text>}

        {knowledgeTopics?.data?.map((topic) => (
          <Link
            key={topic.id}
            as={NavLink}
            to={`/admin/knowledge-base/${topic.id}`}
            _activeLink={{
              color: 'purple.500',
            }}
          >
            {topic.title}
          </Link>
        ))}
      </VStack>
    </VStack>
  )
}

export default KnowledgeTopics
