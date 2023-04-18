import { ChakraProvider } from '@chakra-ui/react'
import loadable from '@loadable/component'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ClientProtectedRoute from './components/ClientProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import ClientLayout from './layouts/ClientLayout'
const Automation = loadable(() => import('./pages/Automation'))
const Communication = loadable(() => import('./pages/Communication'))
const Dashboard = loadable(() => import('./pages/Dashboard'))
const KnowledgeBase = loadable(() => import('./pages/KnowledgeBase'))
const Login = loadable(() => import('./pages/Login'))
const NotFound = loadable(() => import('./pages/NotFound'))
const Reporting = loadable(() => import('./pages/Reporting'))
const TicketAssignment = loadable(() => import('./pages/TicketAssignment'))
const TicketSubmission = loadable(() => import('./pages/TicketSubmission'))
const TicketTracking = loadable(() => import('./pages/TicketTracking'))

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
