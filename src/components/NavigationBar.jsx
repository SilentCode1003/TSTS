import React, { useState } from 'react'
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
  const [navShouldShow, setNavShouldShow] = useState(true)

  const showNavBar = () => {
    setNavShouldShow(true)
  }

  const hideNavBar = () => {
    setNavShouldShow(false)
  }

  const toggleNavBar = () => {
    setNavShouldShow((prev) => !prev)
  }

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
    <>
      {navShouldShow && (
        <div
          onClick={hideNavBar}
          className="w-full h-screen fixed bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-8 w-2/6 h-screen bg-red-500"
          >
            <ul className="flex flex-col gap-8 text-white items-center">
              <Link to="/">Logo</Link>
              {itemsToShow}
            </ul>
          </div>
        </div>
      )}
      <div
        onClick={toggleNavBar}
        className="h-20 w-20 bg-red-500 rounded-full fixed bottom-5 right-5"
      ></div>
    </>
  )
}

export default NavigationBar
