import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ClientProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (currentUser.role !== 'CLIENT') {
    return <Navigate to="/login" />
  }

  return children
}

export default ClientProtectedRoute
