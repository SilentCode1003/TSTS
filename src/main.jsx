import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ClientProtectedRoute from './components/ClientProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import ClientLayout from './layouts/ClientLayout'
import Automation from './pages/Automation'
import Communication from './pages/Communication'
import Dashboard from './pages/Dashboard'
import KnowledgeBase from './pages/KnowledgeBase'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Reporting from './pages/Reporting'
import TicketAssignment from './pages/TicketAssignment'
import TicketSubmission from './pages/TicketSubmission'
import TicketTracking from './pages/TicketTracking'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ClientProtectedRoute>
        <ClientLayout />
      </ClientProtectedRoute>
    ),
    children: [
      {
        path: '/ticket-submission',
        element: <TicketSubmission />,
      },
      {
        path: '/communication',
        element: <Communication />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: '/admin',
        element: <Dashboard />,
      },
      {
        path: '/admin/ticket-assignment',
        element: <TicketAssignment />,
      },
      {
        path: '/admin/ticket-tracking',
        element: <TicketTracking />,
      },
      {
        path: '/admin/knowledge-base',
        element: <KnowledgeBase />,
      },
      {
        path: '/admin/reporting',
        element: <Reporting />,
      },
      {
        path: '/admin/communication',
        element: <Communication />,
      },
      {
        path: '/admin/automation',
        element: <Automation />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
