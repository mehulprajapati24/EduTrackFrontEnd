import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
        <Sidebar/>
        <div className='pl-80 py-16'>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminDashboard