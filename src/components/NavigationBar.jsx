import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MdClose, MdMenu } from 'react-icons/md'
import NavigationLinks from './NavigationLinks'

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

export const clientItems = [
  {
    name: 'Ticket Submission',
    url: '/ticket-submission',
  },
  {
    name: 'Communication',
    url: '/communication',
  },
]

function NavigationBar({ isAdmin }) {
  let itemsToShow
  const location = useLocation()
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

  useEffect(() => {
    hideNavBar()
  }, [location])

  return (
    <motion.div
      ref={constraintsRef}
      className="h-screen w-screen fixed pointer-events-none"
    >
      <AnimatePresence>
        {navShouldShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hideNavBar}
            className="w-full h-screen fixed bg-black bg-opacity-50 pointer-events-auto"
          >
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{
                ease: 'easeInOut',
              }}
              onClick={(e) => e.stopPropagation()}
              className="p-8 w-4/6 md:w-2/6 h-screen bg-red-500"
            >
              <ul className="flex flex-col gap-8 text-white items-center">
                <Link to="/">Logo</Link>
                {isAdmin && <NavigationLinks items={adminItems} />}
                {!isAdmin && <NavigationLinks items={clientItems} />}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <AnimatePresence>
          <motion.button
            drag
            dragConstraints={constraintsRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onTap={toggleNavBar}
            className="h-20 w-20 bg-red-500 border-2 border-white rounded-full fixed bottom-5 right-5 cursor-pointer grid place-items-center place-content-center pointer-events-auto z-10"
          >
            {!navShouldShow && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.3 }}
                exit={{ scale: 1 }}
              >
                <MdMenu className="text-3xl text-white" />
              </motion.div>
            )}
            {navShouldShow && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.3 }}
                exit={{ scale: 1 }}
              >
                <MdClose className="text-3xl text-white" />
              </motion.div>
            )}
          </motion.button>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default NavigationBar
