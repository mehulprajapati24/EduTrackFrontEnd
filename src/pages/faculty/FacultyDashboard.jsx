import React, { useEffect, useState } from 'react'
import FacultySidebar from './FacultySidebar'
import FacultyChatbot from './FacultyChatbot'
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const FacultyDashboard = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const checkFacultyData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("http://localhost:5000/faculty/getProfile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/faculty/login");
          } else {
            setIsLoading(false); // Authorization successful
          }
        } else {
          navigate("/faculty/login");
        }
      } catch (error) {
        navigate("/faculty/login");
      }
    };

    checkFacultyData();
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
        <FacultySidebar/>
        <div className='pl-80 py-16'>
            <Outlet />
        </div>
        <div className='fixed right-0 bottom-[30px]'>
            <FacultyChatbot/>
        </div>
    </div>
  )
}

export default FacultyDashboard