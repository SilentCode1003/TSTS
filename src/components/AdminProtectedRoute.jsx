import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
  let loggedIn = true
  let isAdmin = true

  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  if (!isAdmin) {
    return <Navigate to="/login" />
  }

  return children
}

export default AdminProtectedRoute
