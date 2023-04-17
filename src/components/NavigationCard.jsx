import { Card, CardBody, CardHeader, Flex } from '@chakra-ui/react'
import React from 'react'

export const NavigationCard = ({ item }) => {
  return (
    <Card
      _hover={{
        shadow: 'md',
      }}
      role="group"
      cursor="pointer"
    >
      <CardHeader h="70px">{item.name}</CardHeader>
      <CardBody fontSize="6xl">
        <Flex
          alignItems="center"
          justifyContent="center"
          color="gray.600"
          _groupHover={{
            color: 'purple.400',
          }}
          transition="color 250ms ease"
        >
          {item.icon}
        </Flex>
      </CardBody>
    </Card>
  )
}
