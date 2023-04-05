import loadable from '@loadable/component'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ClientProtectedRoute from './components/ClientProtectedRoute'
import './index.css'
const CommunicationConversation = loadable(() =>
  import('./pages/CommunicationConversation')
)
const KnowledgeBaseTopic = loadable(() => import('./pages/KnowledgeBaseTopic'))
const Automation = loadable(() => import('./pages/Automation'))
const ClientHome = loadable(() => import('./pages/ClientHome'))
const ClientLayout = loadable(() => import('./pages/ClientLayout'))
const Communication = loadable(() => import('./pages/Communication'))
const Dashboard = loadable(() => import('./pages/Dashboard'))
const KnowledgeBase = loadable(() => import('./pages/KnowledgeBase'))
const Login = loadable(() => import('./pages/Login'))
const NotFound = loadable(() => import('./pages/NotFound'))
const Reporting = loadable(() => import('./pages/Reporting'))
const TicketAssignment = loadable(() => import('./pages/TicketAssignment'))
const TicketDetails = loadable(() => import('./pages/TicketDetails'))
const TicketSubmission = loadable(() => import('./pages/TicketSubmission'))
const TicketTracking = loadable(() => import('./pages/TicketTracking'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AdminProtectedRoute>
        <App />
      </AdminProtectedRoute>
    ),
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
        children: [
          {
            path: '/knowledge-base/:topicId',
            element: <KnowledgeBaseTopic />,
          },
        ],
      },
      {
        path: '/reporting',
        element: <Reporting />,
      },
      {
        path: '/communication',
        element: <Communication />,
        children: [
          {
            path: '/communication/:clientId',
            element: <CommunicationConversation />,
          },
        ],
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
    element: (
      <ClientProtectedRoute>
        <ClientLayout />
      </ClientProtectedRoute>
    ),
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
