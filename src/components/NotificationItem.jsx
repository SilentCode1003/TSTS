import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import React from 'react'

const NotificationItem = ({ children, notificationId, setNotifications }) => {
  const handleCloseNotification = () => {
    setNotifications((prev) => {
      return prev.filter((notification) => notification.id !== notificationId)
    })
  }

  return (
    <Box fontSize="sm">
      <HStack justifyContent="space-between">
        <Text>{children}</Text>
        <Button size="xs" onClick={handleCloseNotification}>
          <MdClose />
        </Button>
      </HStack>
    </Box>
  )
}

export default NotificationItem
