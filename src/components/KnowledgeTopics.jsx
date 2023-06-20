import { Search2Icon } from '@chakra-ui/icons'
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGetTopics } from '../api/knowledge-base/getTopics'
import loadable from '@loadable/component'
const ErrorMessage = loadable(() => import('./UI/ErrorMessage'))
const LoadingSpinner = loadable(() => import('./UI/LoadingSpinner'))

const KnowledgeTopics = () => {
  const { isLoading, error, data: knowledgeTopics } = useGetTopics()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTopics = knowledgeTopics?.data?.filter((topic) => {
    return `${topic.title}`.toLowerCase().includes(searchTerm.toLowerCase())
  })

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <VStack w="100%" alignItems="start">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}

        {filteredTopics?.map((topic) => (
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
