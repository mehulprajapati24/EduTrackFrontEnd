import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Footer from './pages/footer/Footer'
import StudentChatbot from './pages/chatbot/StudentChatbot'
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function App() {

  const navigate = useNavigate();
  useEffect(() => {
    const checkStudentData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://edu-track-back-end.vercel.app/fetchProfile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    checkStudentData();
  }, [navigate]);

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Header/>
      <div className='min-h-[calc(100vh-150px)]'>
        <Outlet/>
      </div>
      <div className='fixed right-0 bottom-[30px] z-10'>
            <StudentChatbot/>
        </div>
      <Footer/>
    </div>
  )
}

export default App
