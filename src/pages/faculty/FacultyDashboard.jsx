import React from 'react'
import { Outlet } from 'react-router-dom'
import FacultySidebar from './FacultySidebar'

const FacultyDashboard = () => {
  return (
    <div>
        <FacultySidebar/>
        <div className='pl-80 py-16'>
            <Outlet />
        </div>
    </div>
  )
}

export default FacultyDashboard