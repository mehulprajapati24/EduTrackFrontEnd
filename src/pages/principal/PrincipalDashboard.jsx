import React, { useEffect } from 'react'
import PrincipalSidebar from './PrincipalSidebar'
import { Outlet } from 'react-router-dom'
import PrincipalChatbot from './PrincipalChatbot'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPrincipalData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("http://localhost:5000/principal/validate", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/principal/login");
          }
        } else {
          navigate("/principal/login");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchPrincipalData();
  }, [navigate]);


  return (
    <div>
        <PrincipalSidebar/>
        <div className='pl-80 py-16'>
            <Outlet />
        </div>
        <div className='fixed right-0 bottom-[30px]'>
            <PrincipalChatbot/>
        </div>
    </div>
  )
}

export default PrincipalDashboard