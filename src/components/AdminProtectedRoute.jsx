import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const AdminProtectedRoute = ({ children }) => {
  const currentUser = useAuthStore((state) => state.currentUser)

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (currentUser.role !== 'ADMINISTRATOR') {
    return <Navigate to="/login" />
  }

  return children
}

export default AdminProtectedRoute
