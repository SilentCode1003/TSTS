import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
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
import { NavigationCard } from './NavigationCard'

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
          <NavigationCard key={item.name} item={item} />
        ))}

      {!userIsAdmin &&
        clientItems.map((item) => (
          <NavigationCard key={item.name} item={item} />
        ))}
    </SimpleGrid>
  )
}

export default NavigationCards
