import { useState } from 'react'
import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashbordLayout' 
import Register from './pages/dashboard/user/register/Register' 
import Login from './pages/dashboard/user/login/Login'
import { ToastContainer } from 'react-toastify'
function App() {
  const router =createBrowserRouter(
   [{
      path :'/',
      element: <AuthLayout/>,
      children : [
        {
        path:'/register',
        element:<Register/>
      },
      {path :'/login',
        element:<Login/>
      }

      ]
    },
    {
      path :'/dashboard',
      element: <DashboardLayout/>
    },
  ]
  )
  return (
    <>
    <ToastContainer/>
    <RouterProvider router={router}/>
     <div className='main'>
      </div>
    </>
   
  )
}

export default App
