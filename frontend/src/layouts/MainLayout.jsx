import React from 'react'
import Navbar from '../component/navBar'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
