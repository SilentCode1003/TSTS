import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import NotificationBell from './NotificationBell'

const TopBar = () => {
  const [searchTicketId, setSearchTicketId] = useState('')
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  const handleChange = (e) => {
    const trimmedInput = e.target.value.trimStart()
    setSearchTicketId(trimmedInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchTicketId || searchTicketId === '') {
      if (isAdmin) {
        navigate('/admin/ticket-tracking')
      } else {
        navigate('/ticket-tracking')
      }
      return
    }

    if (isAdmin) {
      navigate(`/admin/ticket-search/${searchTicketId}`)
    } else {
      navigate(`/ticket-search/${searchTicketId}`)
    }
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
              name="search"
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
