import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

function App() {
  return (
    <div>
      <NavigationBar isAdmin={true} />

      <Outlet />
    </div>
  )
}

export default App
