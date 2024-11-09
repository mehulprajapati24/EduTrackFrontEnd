import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav = ({ menuItems, onClose, onOpen, hideLeft, profileInitial }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State to manage profile menu visibility

  const handleMenuItemClick = () => {
    onClose(); // Close the menu when a menu item is clicked
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen); // Toggle the profile menu
  };

  return (
    <div className="fixed w-full z-50 bg-[#010562] backdrop-blur-3xl-md shadow-md p-4">
      {/* Mobile Menu Header */}
      <div className="flex justify-between items-center">
        {/* Brand Logo */}
        <h1 className='font-bold text-2xl text-white'>Edu-Track</h1>

        {/* Hamburger Icon and Profile Initial */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Icon */}
          <div className="text-3xl cursor-pointer text-white" onClick={onOpen}>
            &#9776; {/* Hamburger icon */}
          </div>
          {/* Profile Circle */}
          <div 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F82249] text-white font-semibold cursor-pointer relative" 
            onClick={toggleProfileMenu}
          >
            {profileInitial}
            {profileMenuOpen && (
              <div className="absolute top-12 right-0 bg-gray-800 text-white shadow-lg rounded-lg">
                <ul className="flex flex-col p-2">
                  <li className="p-2 hover:bg-gray-700 cursor-pointer">
                    <Link to="/profile" className='font-medium capitalize text-secondary' onClick={handleMenuItemClick}>Profile</Link>
                  </li>
                  <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                  }}>
                    <Link to="/logout" className='font-medium capitalize text-secondary' onClick={handleMenuItemClick}>Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 ${hideLeft} w-[250px] h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-50`}
      >
        {/* Close Button and Menu Title */}
        <div className="flex justify-between items-center p-4">
          <div className="text-xl font-bold">Menu</div>
          <div className="text-3xl cursor-pointer" onClick={onClose}>
            &times; {/* Close icon */}
          </div>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-4 p-4">
          {menuItems.map((item, index) => (
            <li key={index} className="capitalize text-white cursor-pointer">
              <Link 
                to={item === "home" ? "/" : `${item.toLowerCase()}`} 
                className='font-medium capitalize text-secondary'
                onClick={handleMenuItemClick} // Close menu on click
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
