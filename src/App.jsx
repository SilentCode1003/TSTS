import { useState } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

const navShowingClasses =
  'items-center justify-center grid-cols-[125px_minmax(0,_1fr)] sm:grid-cols-[250px_minmax(0,_1fr)]'
const caretShowingClasses =
  'left-[96px] sm:left-[220px] items-center justify-center'

function App() {
  const [navIsCollapsed, setNavIsCollapsed] = useState(true)

  const toggleNav = () => {
    setNavIsCollapsed((prev) => !prev)
  }

  return (
    <div className={`grid ${!navIsCollapsed && navShowingClasses}`}>
      <div
        onClick={toggleNav}
        className={`w-14 h-14 bg-white border-2 border-red-500 rounded-full flex absolute top-1/2 z-50 cursor-pointer ${
          !navIsCollapsed
            ? caretShowingClasses
            : '-left-7 items-center justify-end'
        }`}
      >
        {!navIsCollapsed ? (
          <MdArrowBackIosNew className="text-2xl text-red-500" />
        ) : (
          <MdArrowForwardIos className="text-2xl text-red-500" />
        )}
      </div>

      {!navIsCollapsed && (
        <NavigationBar isAdmin={true} setNavIsCollapsed={setNavIsCollapsed} />
      )}
      <Outlet />
    </div>
  )
}

export default App

// splash screen
// ticket history(folder)
// concern input(drop down)
// breadcrumb
// make login
// dock on left side
// fixed side bar
