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
  VStack,
} from '@chakra-ui/react'
import React from 'react'
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
  return (
    <Box position="relative">
      <Popover>
        <PopoverTrigger>
          <Box>
            <BellIcon boxSize="8" color="white" cursor="pointer" />
            <NotificationBellCircle />
          </Box>
        </PopoverTrigger>

        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverCloseButton />

            <PopoverBody>
              <VStack>
                {/* Make this dynamic */}
                <NotificationItem />
                <Divider />
                <NotificationItem />
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  )
}

export default NotificationBell
