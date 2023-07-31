import { BellIcon } from '@chakra-ui/icons'
import {
  Box,
  Circle,
  Divider,
  Grid,
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
  // Dummy notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      content: 'Ticket #202305050001 has been closed',
    },
    {
      id: 2,
      content: 'New ticket #202305050002',
    },
    {
      id: 3,
      content: 'Thank you 5L!',
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

            <PopoverBody h="250px" overflowY="auto" p="0">
              {notifications.length <= 0 && (
                <Grid w="100%" h="100%" placeContent="center">
                  No new notifications
                </Grid>
              )}
              <Stack
                bgColor="gray.50"
                direction="column"
                spacing="0"
                divider={<Divider />}
              >
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
