import { Card, CardBody, CardHeader, Flex, SimpleGrid } from '@chakra-ui/react'
import {
  MdAssignmentAdd,
  MdChat,
  MdDashboard,
  MdLightbulb,
  MdNewspaper,
  MdReport,
  MdSettings,
  MdTrackChanges,
} from 'react-icons/md'
import React from 'react'

export const adminItems = [
  {
    name: 'Dashboard',
    url: '/',
    icon: <MdDashboard />,
  },
  {
    name: 'Ticket Assignment',
    url: '/ticket-assignment',
    icon: <MdAssignmentAdd />,
  },
  {
    name: 'Ticket Tracking',
    url: '/ticket-tracking',
    icon: <MdTrackChanges />,
  },
  {
    name: 'Knowledge Base',
    url: '/knowledge-base',
    icon: <MdLightbulb />,
  },
  {
    name: 'Reporting',
    url: '/reporting',
    icon: <MdReport />,
  },
  {
    name: 'Communication',
    url: '/communication',
    icon: <MdChat />,
  },
  {
    name: 'Automation',
    url: '/automation',
    icon: <MdSettings />,
  },
]

export const clientItems = [
  {
    name: 'Dashboard',
    url: '/client',
    icon: <MdDashboard />,
  },
  {
    name: 'Ticket Submission',
    url: '/client/ticket-submission',
    icon: <MdNewspaper />,
  },
  {
    name: 'Communication',
    url: '/client/communication',
    icon: <MdChat />,
  },
]

const NavigationCards = () => {
  let userIsAdmin = true

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="4">
      {userIsAdmin &&
        adminItems.map((item) => (
          <Card
            key={item.name}
            _hover={{
              shadow: 'md',
            }}
            role="group"
            cursor="pointer"
          >
            <CardHeader>{item.name}</CardHeader>
            <CardBody fontSize="6xl">
              <Flex
                alignItems="center"
                justifyContent="center"
                color="gray.600"
                _groupHover={{
                  color: 'purple.400',
                }}
              >
                {item.icon}
              </Flex>
            </CardBody>
          </Card>
        ))}

      {!userIsAdmin &&
        clientItems.map((item) => (
          <Card key={item.name}>
            <CardHeader>{item.name}</CardHeader>
            <CardBody fontSize="4xl">
              <Flex alignItems="center" justifyContent="center">
                {item.icon}
              </Flex>
            </CardBody>
          </Card>
        ))}
    </SimpleGrid>
  )
}

export default NavigationCards
