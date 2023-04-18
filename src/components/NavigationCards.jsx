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
    url: '/admin',
    icon: <MdDashboard />,
  },
  {
    name: 'Ticket Assignment',
    url: '/admin/ticket-assignment',
    icon: <MdAssignmentAdd />,
  },
  {
    name: 'Ticket Tracking',
    url: '/admin/ticket-tracking',
    icon: <MdTrackChanges />,
  },
  {
    name: 'Knowledge Base',
    url: '/admin/knowledge-base',
    icon: <MdLightbulb />,
  },
  {
    name: 'Reporting',
    url: '/admin/reporting',
    icon: <MdReport />,
  },
  {
    name: 'Communication',
    url: '/admin/communication',
    icon: <MdChat />,
  },
  {
    name: 'Automation',
    url: '/admin/automation',
    icon: <MdSettings />,
  },
]

export const clientItems = [
  {
    name: 'Dashboard',
    url: '/',
    icon: <MdDashboard />,
  },
  {
    name: 'Ticket Submission',
    url: '/ticket-submission',
    icon: <MdNewspaper />,
  },
  {
    name: 'Communication',
    url: '/communication',
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