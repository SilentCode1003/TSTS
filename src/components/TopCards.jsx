import React from 'react'
import {
  SimpleGrid,
  Card,
  CardHeader,
  Stack,
  CardBody,
  Text,
  GridItem,
} from '@chakra-ui/react'

const TopCards = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing="4">
      <Card>
        <CardHeader>
          <Text size="md">New Tickets</Text>
        </CardHeader>
        <CardBody noOfLines="1">
          <Stack>
            <Text as="b" fontSize="3xl" textAlign="end">
              3
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Text size="md">Urgent Tickets</Text>
        </CardHeader>
        <CardBody noOfLines="1">
          <Stack>
            <Text as="b" fontSize="3xl" textAlign="end">
              12
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <GridItem colSpan="2" rowSpan="2">
        <Card h="100%">Bar Graph</Card>
      </GridItem>
    </SimpleGrid>
  )
}

export default TopCards
