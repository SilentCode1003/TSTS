import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Automation from './pages/Automation'
import ClientHome from './pages/ClientHome'
import ClientLayout from './pages/ClientLayout'
import Communication from './pages/Communication'
import Dashboard from './pages/Dashboard'
import KnowledgeBase from './pages/KnowledgeBase'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Reporting from './pages/Reporting'
import TicketAssignment from './pages/TicketAssignment'
import TicketDetails from './pages/TicketDetails'
import TicketSubmission from './pages/TicketSubmission'
import TicketTracking from './pages/TicketTracking'

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
        path: '/ticket-tracking/:ticketId',
        element: <TicketDetails />,
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
    element: <ClientLayout />,
    children: [
      {
        path: '/client',
        element: <ClientHome />,
      },
      {
        path: '/client/ticket-submission',
        element: <TicketSubmission />,
      },
      {
        path: '/client/communication',
        element: <Communication />,
      },
    ],
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
