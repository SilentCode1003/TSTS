import { BellIcon } from '@chakra-ui/icons'
import {
  Box,
  Circle,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import NotificationItem from './NotificationItem'

const NotificationBellCircle = () => {
  return (
    <Circle
      size="3"
      position="absolute"
      bottom="0"
      right="0"
      bg="red.300"
    ></Circle>
  )
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      content: 'Ticket #202305050001 has been closed',
    },
    {
      id: 2,
      content: 'New ticket #202305050002',
    },
  ])

  return (
    <Box position="relative">
      <Popover isLazy>
        <PopoverTrigger>
          <Box cursor="pointer">
            <BellIcon boxSize="8" color="white" />
            {notifications.length > 0 && <NotificationBellCircle />}
          </Box>
        </PopoverTrigger>

        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverCloseButton />

            <PopoverBody>
              <Stack direction="column" divider={<Divider />}>
                {notifications.length <= 0 && <Text>No new notifications</Text>}
                {notifications.length > 0 &&
                  notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notificationId={notification.id}
                      setNotifications={setNotifications}
                    >
                      {notification.content}
                    </NotificationItem>
                  ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  )
}

export default NotificationBell
