import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export default function App(){
  const { pathname } = useLocation()
  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Registration</h1>
        <nav className="flex gap-4 text-sm">
          <Link className={pathname==='/'?'font-semibold':''} to="/">Register</Link>
          <Link className={pathname.startsWith('/admin')?'font-semibold':''} to="/admin">Admin</Link>
          <Link className={pathname.startsWith('/checkin')?'font-semibold':''} to="/checkin">Check-In</Link>
        </nav>
      </header>
      <main className="bg-white rounded-2xl shadow p-6">
        <Outlet />
      </main>
      <footer className="text-center text-xs text-gray-500 mt-6">MERN • Tailwind • QR Attendance</footer>
    </div>
  )
}