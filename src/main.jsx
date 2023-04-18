import { ChakraProvider } from '@chakra-ui/react'
import loadable from '@loadable/component'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ClientProtectedRoute from './components/ClientProtectedRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const AdminLayout = loadable(() => import('./layouts/AdminLayout'))
const ClientLayout = loadable(() => import('./layouts/ClientLayout'))
const KnowledgeContent = loadable(() => import('./components/KnowledgeContent'))
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

const queryClient = new QueryClient()

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
        children: [
          {
            path: '/admin/knowledge-base/:topicId',
            element: <KnowledgeContent />,
          },
        ],
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
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
