import React, { useState } from 'react';

const FacultyHomePage = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  const currentClass = {
    type: 'Lecture',
    location: 'Room 101',
    time: '10:00 AM - 11:00 AM'
  };

  const nextClass = {
    type: 'Lab',
    location: 'Lab 205',
    time: '11:30 AM - 1:00 PM'
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hello, Prof. Sahil Jain</h1>
        <button
          onClick={toggleAvailability}
          className={`py-2 px-6 rounded-lg text-white text-lg font-semibold transition-all duration-300 ${
            isAvailable ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isAvailable ? 'Available' : 'Unavailable'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Current Class/Lab Details */}
        <div className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Class/Lab</h2>
          <div className="text-lg">
            <p className="mb-2">
              <strong>Type:</strong> {currentClass.type}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {currentClass.location}
            </p>
            <p className="mb-2">
              <strong>Time:</strong> {currentClass.time}
            </p>
          </div>
        </div>

        {/* Next Class/Lab Details */}
        <div className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Next Class/Lab</h2>
          <div className="text-lg">
            <p className="mb-2">
              <strong>Type:</strong> {nextClass.type}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {nextClass.location}
            </p>
            <p className="mb-2">
              <strong>Time:</strong> {nextClass.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyHomePage;
