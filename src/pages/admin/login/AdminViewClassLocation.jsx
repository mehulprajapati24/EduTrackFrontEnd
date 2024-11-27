import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminViewClassLocation = () => {
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null); // For error state
  const [isClass, setIsClass] = useState(false);
  const [information, setInformation] = useState([]);

  const fetchClassOptions = async () => {
    try {
      const response = await axios.post(
        'https://edutrackbackend-itns.onrender.com/admin/get-class-timetables-sheetname',
        {
          academicYear: selectedAcademicYear,
          semester,
        }
      );
      setOptions(response.data.sheets);
    } catch (error) {
      console.error('Error fetching timetable options:', error);
      setError('Failed to load timetable options');
    }
  };

  useEffect(() => {
    if (selectedAcademicYear && semester) {
      fetchClassOptions();
    }
  }, [selectedAcademicYear, semester]);

  const handleClassSelection = async (selectedClass) => {
    setSelectedClass(selectedClass);
    try {
      const response = await axios.post(
        'https://edutrackbackend-itns.onrender.com/admin/get-location-based-on-class-selection',
        {
          academicYear: selectedAcademicYear,
          semester,
          selectedClass,
        }
      );
      setInformation(response.data.information);
      setIsClass(response.data.isClass);
    } catch (error) {
      console.error('Error fetching class information:', error);
      setError('Failed to load class information');
    }
  };

  useEffect(() => {
    // Fetch available academic years
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('https://edutrackbackend-itns.onrender.com/admin/academicyears');
        setAcademicYearsList(response.data.years);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };
    fetchAcademicYears();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">View Class Location</h1>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Academic Year</label>
          <select
            className="w-full p-2 rounded border"
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
          >
            <option value="">Select Academic Year</option>
            {academicYearsList.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Semester</label>
          <select
            className="w-full p-2 rounded border"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="w-full md:w-1/2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => handleClassSelection(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Class
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedAcademicYear && semester && selectedClass ? (
        information.length > 0 ? (
        
        <div className="bg-white p-6 rounded shadow-lg">
          {isClass ? (
            <div className="p-4 border-b">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Class Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p><span className="font-bold text-gray-700">Type:</span> {information[0]?.type}</p>
                <p><span className="font-bold text-gray-700">Time:</span> {information[0]?.time}</p>
                <p><span className="font-bold text-gray-700">Subject:</span> {information[0]?.subject}</p>
                <p><span className="font-bold text-gray-700">Faculty:</span> {information[0]?.faculty}</p>
                <p><span className="font-bold text-gray-700">Location:</span> {information[0]?.location}</p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">All Batches of Class Information</h2>
              {information.map((info, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200"
                >
                  <p><span className="font-bold text-gray-700">Type:</span> {info.type}</p>
                  <p><span className="font-bold text-gray-700">Time:</span> {info.time}</p>
                  <p><span className="font-bold text-gray-700">Subject:</span> {info.subject}</p>
                  <p><span className="font-bold text-gray-700">Class Batch:</span> {info.classbatch}</p>
                  <p><span className="font-bold text-gray-700">Faculty:</span> {info.faculty}</p>
                  <p><span className="font-bold text-gray-700">Location:</span> {info.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        ) : (
          <div className="bg-white p-6 rounded shadow-lg">
          <div className="p-4 border-b">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Class Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p><span className="font-bold text-gray-700">Type:</span> Not Available</p>
                  <p><span className="font-bold text-gray-700">Time:</span> Not Available</p>
                  <p><span className="font-bold text-gray-700">Subject:</span> Not Available</p>
                  <p><span className="font-bold text-gray-700">Faculty:</span> Not Available</p>
                  <p><span className="font-bold text-gray-700">Location:</span> Not Available</p>
                </div>
              </div>
        </div>
        )
      ) : null}
    </div>
  );
};

export default AdminViewClassLocation;
