import React, { useState, useEffect } from 'react'
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const [hideLeft, setHideLeft] = useState("-left-[1000px]");
    const [profileInitial, setProfileInitial] = useState("");
    const menuItems = ["home", "Schedule Overview", "timetable", "faculty location", "contact"];

    useEffect(()=>{
        const getProfile = async () => {
          try {
            const token = localStorage.getItem('accessToken');
            if (token) {
              // Make a GET request and pass the headers as the second argument
              const response = await axios.get('https://edutrackbackend-77k7.onrender.com/getProfile', {
                headers: {
                  Authorization: `Bearer ${token}`  // authorization header
                }
              });
              setProfileInitial(response.data.profile); // Assuming the data returned has a "schedule" key
            } else {
              navigate("/login");
            }
          } catch (error) {
            console.log(error);
          }
        }
        getProfile();
      },[])

    const onOpen = () => {
        setHideLeft("left-0");
    }

    const onClose = () => {
        setHideLeft("-left-[1000px]");
    }

  return (
    <>
    <div className='max-[900px]:hidden'>
        <DesktopNav menuItems={menuItems} profileInitial={profileInitial}/>
    </div>
    <div className='min-[900px]:hidden'>
        <MobileNav menuItems={menuItems} profileInitial={profileInitial} onClose={onClose} onOpen={onOpen} hideLeft={hideLeft}/>
    </div>
    </>
  )
}

export default Header