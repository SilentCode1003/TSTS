import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

function ClientLayout() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  )
}

export default ClientLayout
