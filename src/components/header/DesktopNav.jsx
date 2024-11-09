import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesktopNav = ({ menuItems, profileInitial }) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate(); // Use React Router's navigate function

  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };

  const handleOptionClick = () => {
    navigate('/profile');
    setShowOptions(false); // Hide options when one is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login'); // Use navigate for client-side routing
  };

  return (
    <nav className="shadow-md fixed z-50 bg-[#010562] backdrop-blur-3xl-md w-full">
      <div className="mx-5 flex justify-between items-center py-4">
        {/* Brand Logo */}
        <h1 className='font-bold text-2xl text-white'>Edu-Track</h1>
        
        {/* Menu Items */}
        <ul className="flex space-x-8">
          {menuItems.map((item, index) => (
            <li key={index} className="capitalize text-white hover:text-[#F82249] cursor-pointer transition-colors duration-500 ease-in-out">
              <Link to={item === "home" ? "/" : `/${item.toLowerCase()}`} className='font-medium capitalize text-secondary'>{item}</Link>
            </li>
          ))}
        </ul>

        {/* Profile Circle */}
        <div className="relative flex items-center space-x-4">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F82249] text-white font-semibold cursor-pointer"
            onClick={toggleOptions}
          >
            {profileInitial}
          </div>
          {showOptions && (
            <div className="absolute right-0 top-10 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleOptionClick}
                >
                  <Link to="/profile" onClick={handleOptionClick}>
                    Profile
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout} // Use handleLogout here
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
