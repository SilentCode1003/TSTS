import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const UserCard = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useContext(AuthContext)

  const { isOpen, onToggle, onClose } = useDisclosure()

  const goToProfile = () => {
    if (currentUser.role === 'ADMINISTRATOR') {
      navigate(`/admin/profile/${currentUser.fullname}`)
    } else {
      navigate(`/profile/${currentUser.fullname}`)
    }
    onClose()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Avatar
          size="lg"
          name={currentUser.fullname}
          cursor="pointer"
          src=""
          onClick={onToggle}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{currentUser.fullname}</PopoverHeader>
        <PopoverBody>
          <VStack>
            <Box w="100%">
              <Button
                w="100%"
                colorScheme="purple"
                variant="link"
                onClick={goToProfile}
              >
                Profile Settings
              </Button>
            </Box>

            <Box w="100%">
              <Button
                w="100%"
                colorScheme="purple"
                variant="outline"
                onClick={handleLogout}
              >
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
