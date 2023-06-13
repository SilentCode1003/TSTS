import { ChakraProvider } from '@chakra-ui/react'
import loadable from '@loadable/component'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ClientProtectedRoute from './components/ClientProtectedRoute'
import LoadingFallback from './components/LoadingFallback'
import AuthContextProvider from './context/AuthContext'
import SystemSettingsContextProvider from './context/SystemSettingsContext'
import './index.css'

const ChildTicket = loadable(() => import('./pages/ChildTicket'))
const KnowledgeBaseDefault = loadable(() =>
  import('./pages/KnowledgeBaseDefault')
)
const AdminLayout = loadable(() => import('./layouts/AdminLayout'))
const ClientLayout = loadable(() => import('./layouts/ClientLayout'))
const KnowledgeContent = loadable(() => import('./components/KnowledgeContent'))
const Automation = loadable(() => import('./pages/Automation'))
const Dashboard = loadable(() => import('./pages/Dashboard'))
const KnowledgeBase = loadable(() => import('./pages/KnowledgeBase'))
const Login = loadable(() => import('./pages/Login'))
const NotFound = loadable(() => import('./pages/NotFound'))
const Reporting = loadable(() => import('./pages/Reporting'))
const TicketAssignment = loadable(() => import('./pages/TicketAssignment'))
const RequestTicket = loadable(() => import('./pages/RequestTicket'))
const TicketTracking = loadable(() => import('./pages/TicketTracking'))
const TicketSearch = loadable(() => import('./pages/TicketSearch'))
const TicketView = loadable(() => import('./pages/TicketView'))

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
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/request-ticket',
        element: <RequestTicket />,
      },
      {
        path: '/ticket-view/:ticketId',
        element: <TicketView />,
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
            path: '/admin/knowledge-base',
            element: <KnowledgeBaseDefault />,
          },
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
        path: '/admin/child-ticket',
        element: <ChildTicket />,
      },
      {
        path: '/admin/automation',
        element: <Automation />,
      },
      {
        path: '/admin/ticket-search/:ticketId',
        element: <TicketSearch />,
      },
      {
        path: '/admin/ticket-view/:ticketId',
        element: <TicketView />,
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
    <SystemSettingsContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Suspense fallback={<LoadingFallback />}>
              <RouterProvider router={router} />
            </Suspense>
          </ChakraProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthContextProvider>
    </SystemSettingsContextProvider>
  </React.StrictMode>
)
