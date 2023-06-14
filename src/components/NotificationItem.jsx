import { Box, Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { X } from 'react-feather'

const NotificationItem = ({ children, notificationId, setNotifications }) => {
  const handleCloseNotification = () => {
    setNotifications((prev) => {
      return prev.filter((notification) => notification.id !== notificationId)
    })
  }

  return (
    <Box p="2" fontSize="sm">
      <HStack justifyContent="space-between">
        <Text>{children}</Text>
        <Button size="xs" onClick={handleCloseNotification}>
          <X size={12} />
        </Button>
      </HStack>
    </Box>
  )
}

export default NotificationItem
