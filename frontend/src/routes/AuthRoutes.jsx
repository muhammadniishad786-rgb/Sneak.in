import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Navbar from '../component/navBar'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import ProtectedRoutes from './ProtectedRoutes'
import Admin from "../pages/Admin"

function AuthRoutes() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* protected Route */}
        <Route element={<ProtectedRoutes />}>
         <Route path='/profile' element={<Profile />} />
         <Route path='/admin' element={<Admin />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AuthRoutes
