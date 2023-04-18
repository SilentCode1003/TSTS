import React from 'react'
import { Navigate } from 'react-router-dom'

const ClientProtectedRoute = ({ children }) => {
  let loggedIn = true

  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  return children
}

export default ClientProtectedRoute
