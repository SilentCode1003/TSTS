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
        <Avatar size="xl" cursor="pointer" src="" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>User</PopoverHeader>
        <PopoverBody>
          <VStack>
            <Box>
              <Button colorScheme="purple" onClick={handleLogout}>
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
