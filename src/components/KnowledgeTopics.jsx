import { Search2Icon } from '@chakra-ui/icons'
import {
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  VStack,
} from '@chakra-ui/react'
import loadable from '@loadable/component'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetTopics } from '../api/knowledge-base/getTopics'
import { AuthContext } from '../context/AuthContext'
import { Plus } from 'react-feather'
const ErrorMessage = loadable(() => import('./UI/ErrorMessage'))
const LoadingSpinner = loadable(() => import('./UI/LoadingSpinner'))

const KnowledgeTopics = () => {
  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  const { isLoading, error, data: knowledgeTopics } = useGetTopics()
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTopics = knowledgeTopics?.data?.filter((topic) => {
    return `${topic.title}`.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const navigate = useNavigate()

  return (
    <VStack w="100%" alignItems="start" spacing="8">
      <Heading size="md" textAlign="center">
        Knowledge Base
      </Heading>

      <HStack>
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

        {isAdmin && (
          <Button
            colorScheme="purple"
            onClick={() => navigate('/admin/knowledge-base/create')}
          >
            <Plus />
          </Button>
        )}
      </HStack>

      <VStack w="100%" alignItems="start">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}

        {filteredTopics?.map((topic) => (
          <Link
            key={topic.postid}
            as={NavLink}
            to={`${isAdmin ? '/admin/' : '/'}knowledge-base/${topic.postid}`}
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
