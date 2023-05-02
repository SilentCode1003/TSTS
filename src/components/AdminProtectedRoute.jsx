import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (currentUser.role !== 'ADMINISTRATOR') {
    return <Navigate to="/login" />
  }

  return children
}

export default AdminProtectedRoute
