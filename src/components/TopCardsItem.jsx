import { Card, CardBody, CardHeader, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const TopCardsItem = ({ header, children }) => {
  return (
    <Card>
      <CardHeader maxH="64px">
        <Text size="md">{header}</Text>
      </CardHeader>
      <CardBody noOfLines="1">
        <Stack>
          <Text as="b" fontSize="3xl" textAlign="end">
            {children}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default TopCardsItem
