import { useAtom } from 'jotai'
import { Navigate } from 'react-router-dom'
import { isAdminStore, isLoggedInStore } from '../store/authStore'

function ClientProtectedRoute({ children }) {
  const [isLoggedIn] = useAtom(isLoggedInStore)
  const [isAdmin] = useAtom(isAdminStore)

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (isAdmin) {
    return <Navigate to="/login" />
  }

  return children
}

export default ClientProtectedRoute
