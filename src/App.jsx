import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      {/* LeftBar */}
      <div></div>

      {/* Content */}
      <div>
        {/* TopBar */}
        <div></div>
        {/* Outlet */}
        <Outlet />
      </div>
    </div>
  )
}

export default App
