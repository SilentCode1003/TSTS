import { BellIcon, Search2Icon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'

const TopBar = () => {
  return (
    <Flex
      p={[2, null, 3]}
      bg="purple.300"
      alignItems="center"
      justifyContent="space-between"
      gap="4"
    >
      <InputGroup w={['90%', null, '50%']}>
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
