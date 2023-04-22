import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import NotificationBell from './NotificationBell'

const TopBar = () => {
  return (
    <Flex
      p={[2, null, 3]}
      bg="purple.400"
      alignItems="center"
      justifyContent="space-between"
      gap="4"
    >
      <InputGroup w={['90%', null, '380px']} size="xs">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
          size="xs"
        />
        <Input variant="filled" size="xs" placeholder="Search ticket number" />
      </InputGroup>

      <NotificationBell />
    </Flex>
  )
}

export default TopBar
