import { SimpleGrid } from '@chakra-ui/react'
import React, { useContext } from 'react'
import {
  BookOpen,
  CornerDownRight,
  Home,
  PlusSquare,
  Rss,
  Settings,
  Table,
} from 'react-feather'
import { AuthContext } from '../context/AuthContext'
import { NavigationCard } from './NavigationCard'

export const adminItems = [
  {
    name: 'Dashboard',
    url: '/admin',
    icon: <Home />,
  },
  {
    name: 'Ticket Assignment',
    url: '/admin/ticket-assignment',
    icon: <PlusSquare />,
  },
  {
    name: 'Child Ticket',
    url: '/admin/child-ticket',
    icon: <CornerDownRight />,
  },
  {
    name: 'Ticket Tracking',
    url: '/admin/ticket-tracking',
    icon: <Table />,
  },
  {
    name: 'Knowledge Base',
    url: '/admin/knowledge-base',
    icon: <BookOpen />,
  },
  {
    name: 'Reporting',
    url: '/admin/reporting',
    icon: <Rss />,
  },
  {
    name: 'Automation',
    url: '/admin/automation',
    icon: <Settings />,
  },
]

export const clientItems = [
  {
    name: 'Dashboard',
    url: '/',
    icon: <Home />,
  },
  {
    name: 'Request Ticket',
    url: '/request-ticket',
    icon: <CornerDownRight />,
  },
  {
    name: 'Ticket Tracking',
    url: '/ticket-tracking',
    icon: <Table />,
  },
  {
    name: 'Knowledge Base',
    url: '/knowledge-base',
    icon: <BookOpen />,
  },
]

const NavigationCards = () => {
  const { currentUser } = useContext(AuthContext)
  const isAdmin = currentUser.role === 'ADMINISTRATOR'

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="4">
      {isAdmin &&
        adminItems.map((item) => (
          <NavigationCard key={item.name} item={item} />
        ))}

      {!isAdmin &&
        clientItems.map((item) => (
          <NavigationCard key={item.name} item={item} />
        ))}
    </SimpleGrid>
  )
}

export default NavigationCards
