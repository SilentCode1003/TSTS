import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

const Dashboard = () => {
  return (
    <Box p="4">
      <Stack direction="column" spacing="4">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Dashboard
        </Heading>

        {/* Maybe make this a component */}
        <SimpleGrid columns={[1, 2, 3]} spacing="4">
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

          <Card></Card>
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

export default Dashboard
