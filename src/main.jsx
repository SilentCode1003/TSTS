import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import TicketAssignment from './pages/TicketAssignment'
import TicketTracking from './pages/TicketTracking'
import KnowledgeBase from './pages/KnowledgeBase'
import Reporting from './pages/Reporting'
import Communication from './pages/Communication'
import Automation from './pages/Automation'

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
        element: <TicketAssignment />,
      },
      {
        path: '/ticket-tracking',
        element: <TicketTracking />,
      },
      {
        path: '/knowledge-base',
        element: <KnowledgeBase />,
      },
      {
        path: '/reporting',
        element: <Reporting />,
      },
      {
        path: '/communication',
        element: <Communication />,
      },
      {
        path: '/automation',
        element: <Automation />,
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
