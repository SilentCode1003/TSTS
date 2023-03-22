import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'

function App() {
  return (
    <div>
      <NavigationBar />

      <Outlet />

      <Footer />
    </div>
  )
}

export default App
