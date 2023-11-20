import { useState } from 'react'
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom" 
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
