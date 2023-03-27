import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

function App() {
  return (
    <>
      <NavigationBar isAdmin={true} />

      <Outlet />
    </>
  )
}

export default App
