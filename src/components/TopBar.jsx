import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationBell from './NotificationBell'

const TopBar = () => {
  const [searchTicketId, setSearchTicketId] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSearchTicketId(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchTicketId) {
      return
    }

    navigate(`/admin/ticket-search/${searchTicketId}`)
  }

  return (
    <Flex
      p={[2, null, 3]}
      bg="purple.400"
      alignItems="center"
      justifyContent="space-between"
      gap="4"
    >
      <Box w={['90%', null, '380px']}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <InputGroup size="xs">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
              size="xs"
            />
            <Input
              variant="filled"
              size="xs"
              placeholder="Search ticket number"
              value={searchTicketId}
              onChange={handleChange}
            />
          </InputGroup>
        </form>
      </Box>
      <NotificationBell />
    </Flex>
  )
}

export default TopBar
