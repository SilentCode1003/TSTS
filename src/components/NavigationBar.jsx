import React, { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

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
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  const showNavBar = () => {
    setNavShouldShow(true)
  }

  const hideNavBar = () => {
    setNavShouldShow(false)
  }

  const toggleNavBar = () => {
    if (isDragging) return
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
    <motion.div ref={constraintsRef} className="h-screen w-screen fixed">
      <AnimatePresence>
        {navShouldShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hideNavBar}
            className="w-full h-screen fixed bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{
                ease: 'easeInOut',
              }}
              onClick={(e) => e.stopPropagation()}
              className="p-8 w-2/6 h-screen bg-red-500"
            >
              <ul className="flex flex-col gap-8 text-white items-center">
                <Link to="/">Logo</Link>
                {itemsToShow}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <motion.button
          drag
          dragConstraints={constraintsRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onTap={toggleNavBar}
          className="h-20 w-20 bg-red-500 border-2 border-white rounded-full fixed bottom-5 right-5 cursor-pointer"
        ></motion.button>
      </div>
    </motion.div>
  )
}

export default NavigationBar
