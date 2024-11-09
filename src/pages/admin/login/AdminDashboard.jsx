import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Chatbot from './Chatbot'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://edu-track-backend-ten.vercel.app/admin/validate", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/admin/login");
          }
        } else {
          navigate("/admin/login");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchAdminData();
  }, [navigate]);


  return (
    <div>
        <Sidebar/>
        <div className='pl-80 py-16'>
            <Outlet />
        </div>
        <div className='fixed right-0 bottom-[30px]'>
            <Chatbot/>
        </div>
    </div>
  )
}

export default AdminDashboard