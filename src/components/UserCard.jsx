import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const UserCard = () => {
  const handleLogout = () => {
    console.log('Log out user')
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar size="xl" bg="purple.600" cursor="pointer" src="" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>User</PopoverHeader>
        <PopoverBody>
          <VStack>
            <Box w="100%">
              <Button w="100%" colorScheme="purple" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default UserCard
