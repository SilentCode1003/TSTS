import { Card, CardBody, CardHeader, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export const adminItems = [
  {
    name: 'Dashboard',
    url: '/',
  },
  {
    name: 'Ticket Assignment',
    url: '/ticket-assignment',
  },
  {
    name: 'Ticket Tracking',
    url: '/ticket-tracking',
  },
  {
    name: 'Knowledge Base',
    url: '/knowledge-base',
  },
  {
    name: 'Reporting',
    url: '/reporting',
  },
  {
    name: 'Communication',
    url: '/communication',
  },
  {
    name: 'Automation',
    url: '/automation',
  },
]

export const clientItems = [
  {
    name: 'Dashboard',
    url: '/client',
  },
  {
    name: 'Ticket Submission',
    url: '/client/ticket-submission',
  },
  {
    name: 'Communication',
    url: '/client/communication',
  },
]

const NavigationCards = () => {
  let userIsAdmin = true

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="4">
      {userIsAdmin &&
        adminItems.map((item) => (
          <Card>
            <CardHeader>{item.name}</CardHeader>
            <CardBody>icon</CardBody>
          </Card>
        ))}
      {!userIsAdmin &&
        clientItems.map((item) => (
          <Card>
            <CardHeader>{item.name}</CardHeader>
            <CardBody>icon</CardBody>
          </Card>
        ))}
    </SimpleGrid>
  )
}

export default NavigationCards
