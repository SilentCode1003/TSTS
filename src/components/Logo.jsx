import React from 'react'
import logo from '../assets/logo.svg'
import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Link to="/">
        <Image w="100px" src={logo} />
      </Link>
    </Flex>
  )
}

export default Logo
