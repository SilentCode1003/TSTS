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
  const location = useLocation()
  const [navShouldShow, setNavShouldShow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const leftConstraintRef = useRef(null)
  const rightConstraintRef = useRef(null)
  const [position, setPosition] = useState('')

  const handleMouseMove = (event) => {
    const pageWidth = window.innerWidth
    const midpoint = pageWidth / 2
    const cursorX = event.clientX
    const newPosition = cursorX < midpoint ? 'left' : 'right'
    setPosition(newPosition)
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
    <motion.div className="h-screen w-screen fixed pointer-events-none">
      <div ref={leftConstraintRef} className="w-20 h-screen fixed left-5"></div>
      <div
        ref={rightConstraintRef}
        className="w-20 h-screen fixed right-5"
      ></div>

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
              className="p-8 w-4/6 md:w-2/6 h-screen bg-red-500 shadow-2xl"
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
            dragConstraints={
              position === 'right' ? rightConstraintRef : leftConstraintRef
            }
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={handleMouseMove}
            onTap={toggleNavBar}
            whileDrag={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            dragElastic={1}
            className="h-20 w-20 bg-red-500 border-2 border-white rounded-full fixed bottom-5 right-5 cursor-pointer grid place-items-center place-content-center pointer-events-auto shadow-md z-10"
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
