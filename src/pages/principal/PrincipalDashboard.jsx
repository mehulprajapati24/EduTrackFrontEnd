import React, { useEffect, useState } from 'react'
import PrincipalSidebar from './PrincipalSidebar'
import { Outlet } from 'react-router-dom'
import PrincipalChatbot from './PrincipalChatbot'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const fetchPrincipalData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://edutrackbackend-itns.onrender.com/principal/validate", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/principal/login");
          } else {
            setIsLoading(false); // Authorization successful
          }
        } else {
          navigate("/principal/login");
        }
      } catch (error) {
        navigate("/principal/login");
      }
    };

    fetchPrincipalData();
  }, [navigate]);


  if (isLoading) {
    // Render loading spinner
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-blue-500 text-lg font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

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