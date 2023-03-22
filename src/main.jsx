import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/ticket-assignment',
        element: <div>Ticket Assignment</div>,
      },
      {
        path: '/ticket-tracking',
        element: <div>Ticket Tracking</div>,
      },
      {
        path: '/knowledge-base',
        element: <div>Knowledge Base</div>,
      },
      {
        path: '/reporting',
        element: <div>Reporting</div>,
      },
      {
        path: '/communication',
        element: <div>Communication</div>,
      },
      {
        path: '/automation',
        element: <div>Automation</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/client',
    element: <div>Client/User</div>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
