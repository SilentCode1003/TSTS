import { BellIcon, ChevronRightIcon, Search2Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react'
import React from 'react'

const TopBar = ({ onClose, onOpen, isOpen }) => {
  return (
    <Flex
      p={[2, null, 3]}
      bg="purple.300"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack w="50%" direction="row" spacing="4">
        <Button p="1" borderRadius="full" colorScheme="purple" onClick={onOpen}>
          <ChevronRightIcon boxSize="8" />
        </Button>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            h="100%"
            colorScheme="blackAlpha"
            variant="filled"
            size="sm"
            placeholder="Search ticket number"
          />
        </InputGroup>
      </Stack>

      <Box position="relative">
        <BellIcon boxSize="8" color="white" />
        <Box
          h="3"
          w="3"
          borderRadius="full"
          position="absolute"
          bottom="0"
          right="0"
          bg="red.300"
        ></Box>
      </Box>
    </Flex>
  )
}

export default TopBar
