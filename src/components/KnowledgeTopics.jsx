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

const topicsData = [
  {
    id: 1,
    title: "ITD's Parts",
  },
  {
    id: 2,
    title: 'PC Preload Procedure',
  },
]

const KnowledgeTopics = () => {
  const [knowledgeTopics, setKnowledgeTopics] = useState(topicsData)

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
        {knowledgeTopics.map((topic) => (
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
