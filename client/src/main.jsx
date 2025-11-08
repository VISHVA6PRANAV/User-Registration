import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'
import Admin from './pages/Admin.jsx'
import CheckIn from './pages/CheckIn.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App />,
    children: [
      { index: true, element: <Register /> },
      { path: 'verify', element: <Verify /> },
      { path: 'admin', element: <Admin /> },
      { path: 'checkin', element: <CheckIn /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
