import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

const RequesterDetails = ({ requester }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Requester Details</Heading>
      </CardHeader>

      <CardBody>
        <Stack
          direction="column"
          spacing="2"
          fontSize="sm"
          divider={<Divider />}
        >
          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="4">
            <Text as="b">Name</Text>
            <Text>{requester?.fullname}</Text>
          </Grid>

          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="4">
            <Text as="b">Email</Text>
            <Text>{requester?.email}</Text>
          </Grid>

          <Grid templateColumns={['1fr', null, '3fr 9fr']} gap="4">
            <Text as="b">Contact Number</Text>
            <Text>{requester?.contactnumber}</Text>
          </Grid>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default RequesterDetails
