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
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const checkStudentData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://edutrackbackend-aq9w.onrender.com/fetchProfile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/login");
          } else {
            setIsLoading(false); // Authorization successful
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkStudentData();
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
