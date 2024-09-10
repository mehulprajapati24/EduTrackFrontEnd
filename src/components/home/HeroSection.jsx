import React from 'react';
import backgroundImage from '../../assets/form-bg.jpeg';
import { FaPlay } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Path to your image
      }}
    >
      {/* Black overlay to darken the background */}
      <div className="absolute inset-0 bg-[#091131f7] opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4 sm:px-6 md:px-8 lg:px-12 my-[-40px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          EDU-TRACK <br /> 
          <span className='text-[#F82249]'>MANAGEMENT</span> SYSTEM
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8">
          U. V. Patel College of Engineering, Ganpat University
        </p>

        {/* Play Button */}
        <a
          href="https://youtu.be/OsoXEo1wpYI?si=RbziMJBAdjlvdDuv"
          className="mb-6"
        >
          <div
            className="flex items-center justify-center bg-[#F82249] p-4 rounded-full"
            style={{ width: '60px', height: '60px' }}
          >
            <FaPlay size={24} color="white" />
          </div>
        </a>

        {/* About Button */}
        <a
          href="http://youtu.be/OsoXEo1wpYI?si=RbziMJBAdjlvdDuv"
          className="text-white"
        >
          <button
            className="border-2 border-[#F82249] rounded-3xl px-6 py-3 text-white bg-transparent hover:bg-[#F82249] transition-colors duration-500 ease-in-out"
          >
            About the University
          </button>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
