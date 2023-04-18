import { Search2Icon } from '@chakra-ui/icons'
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGetTopics } from '../api/knowledge-base/getTopics'

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

      <VStack alignItems="start">
        {isLoading && <Spinner />}

        {knowledgeTopics?.map((topic) => (
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

        {error && <p>{error.message}</p>}
      </VStack>
    </VStack>
  )
}

export default KnowledgeTopics
