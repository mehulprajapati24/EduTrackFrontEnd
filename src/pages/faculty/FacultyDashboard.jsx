import React, { useEffect } from 'react'
import FacultySidebar from './FacultySidebar'
import FacultyChatbot from './FacultyChatbot'
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const FacultyDashboard = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const checkFacultyData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://edutrackbackend-u70s.onrender.com/faculty/getProfile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/faculty/login");
          }
        } else {
          navigate("/faculty/login");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    checkFacultyData();
  }, [navigate]);

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