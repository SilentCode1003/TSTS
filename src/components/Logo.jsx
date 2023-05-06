import { Flex, Image } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { AuthContext } from '../context/AuthContext'

const Logo = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Flex justifyContent="center" alignItems="center">
      <Link to={currentUser.role === 'ADMINISTRATOR' ? '/admin' : '/'}>
        <Image w="100px" src={logo} />
      </Link>
    </Flex>
  )
}

export default Logo
