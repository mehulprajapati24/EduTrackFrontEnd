import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  // Fetch the schedule data from the backend
  useEffect(() => {
    const getSchedule = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get('http://localhost:5000/getSchedule', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSchedule(response.data.schedule);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    getSchedule();
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, [navigate]);

  // Helper function to render class details or "Not Available"
  const renderClassDetails = (classData, notAvailableText = 'Not Available') => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-blue-700">Type:</span>
          <span className="text-blue-600">{classData?.type || notAvailableText}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-blue-700">Subject:</span>
          <span className="text-blue-600">{classData?.subject || notAvailableText}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-blue-700">Faculty:</span>
          <span className="text-blue-600">{classData?.faculty || notAvailableText}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-blue-700">Time:</span>
          <span className="text-blue-600">{classData?.time || notAvailableText}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-blue-700">Location:</span>
          <span className="text-blue-600">{classData?.location || notAvailableText}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 md:py-40 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">Class Schedule Overview</h1>
      </div>

      {/* Card Container */}
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {schedule.length === 0 ? (
          <>
            {/* First Card - Not Available */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Current Class Details</h2>
              {renderClassDetails(null)}
            </div>

            {/* Second Card - Not Available */}
            <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Next Class Details</h2>
              {renderClassDetails(null)}
            </div>
          </>
        ) : schedule.length === 1 ? (
          <>
            {/* First Card - Current Class */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Current Class Details</h2>
              {renderClassDetails(schedule[0])}
            </div>

            {/* Second Card - Not Available */}
            <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Next Class Details</h2>
              {renderClassDetails(null)}
            </div>
          </>
        ) : (
          <>
            {/* First Card - Current Class */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Current Class Details</h2>
              {renderClassDetails(schedule[0])}
            </div>

            {/* Second Card - Next Class */}
            <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Next Class Details</h2>
              {renderClassDetails(schedule[1])}
            </div>
          </>
        )}
      </div>

      {/* Button Section */}
      <div className="text-center mt-12">
        <a
          href="/timetable"
          className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          View Timetable
        </a>
      </div>
    </div>
  );
};

export default Schedule;
