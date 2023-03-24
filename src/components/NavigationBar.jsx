import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const adminItems = [
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

export const clientItems = ['Ticket Submission', 'Communication']

function NavigationBar({ isAdmin }) {
  let itemsToShow

  if (isAdmin) {
    itemsToShow = adminItems.map((item, index) => (
      <li key={index}>
        <NavLink
          to={item.url}
          className={({ isActive, isPending }) =>
            isPending ? 'text-gray-400' : isActive ? 'pb-2 border-b-2' : ''
          }
        >
          {item.name}
        </NavLink>
      </li>
    ))
  } else {
    itemsToShow = clientItems.map((item, index) => (
      <li key={index}>
        <NavLink
          to={item.url}
          className={({ isActive, isPending }) =>
            isPending ? 'text-gray-400' : isActive ? 'pb-2 border-b-2' : ''
          }
        >
          {item.name}
        </NavLink>
      </li>
    ))
  }

  return (
    <div className="p-4 w-full md:h-[64px] bg-red-500">
      <ul className="h-full flex gap-2 md:gap-10 items-center justify-center flex-col md:flex-row list-none text-white text-center">
        <Link to="/">Logo</Link>
        {itemsToShow}
      </ul>
    </div>
  )
}

export default NavigationBar
