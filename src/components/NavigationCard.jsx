import { Card, CardBody, CardHeader, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationCard = ({ item }) => {
  return (
    <Link to={item.url}>
      <Card
        _hover={{
          shadow: 'md',
        }}
        role="group"
        cursor="pointer"
      >
        <CardHeader h="70px">{item.name}</CardHeader>
        <CardBody>
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
    </Link>
  )
}
