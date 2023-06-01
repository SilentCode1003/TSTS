import { Box, Flex, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { adminItems, clientItems } from './NavigationCards'

const NavigationLink = ({ item, isCollapsed }) => {
  return (
    <Link
      as={NavLink}
      to={item.url}
      _activeLink={{ backgroundColor: 'purple.500' }}
      w="100%"
      role="group"
      p={isCollapsed ? '1' : '3'}
      end
    >
      <Flex
        direction={isCollapsed ? 'column' : 'row'}
        gap={isCollapsed ? '2' : '4'}
        alignItems="center"
        color="white"
        textAlign="center"
        _groupHover={{
          color: 'purple.100',
        }}
      >
        <Box fontSize="3xl">{item.icon}</Box>
        <Box fontSize={isCollapsed ? 'xs' : 'md'}>{item.name}</Box>
      </Flex>
    </Link>
  )
}

const NavigationLinks = ({ isCollapsed }) => {
  let isAdmin = true

  return (
    <VStack
      alignItems={isCollapsed ? 'center' : 'start'}
      spacing={isCollapsed ? '1' : '2'}
    >
      {isAdmin
        ? adminItems.map((item) => (
            <NavigationLink
              key={item.name}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))
        : clientItems.map((item) => (
            <NavigationLink
              key={item.name}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
    </VStack>
  )
}

export default NavigationLinks
