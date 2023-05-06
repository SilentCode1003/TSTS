import React from 'react'
import logo from '../assets/logo.svg'
import { Box, Flex, HStack, Image } from '@chakra-ui/react'

const Logo = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Image w="100px" src={logo} />
    </Flex>
  )
}

export default Logo
