// SelectAcademicYearSemester.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrincipalSelectAcademicYearSemester = () => {
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('https://edutrackbackend-aq9w.onrender.com/admin/academicyears');
        setAcademicYearsList(response.data.years);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };

    fetchAcademicYears();
  }, []);

  const handleSaveSelection = async () => {
    if (selectedAcademicYear && selectedSemester) {
        try {
            // Make POST request
            const response = await axios.post('https://edutrackbackend-aq9w.onrender.com/admin/selected-year', {
              academicYear: selectedAcademicYear,
              semester: selectedSemester,
            });
      
            // Check if the request was successful
            if (response.data.success) {
              // Show success toast
              toast.success(`Selected: ${selectedAcademicYear} - ${selectedSemester}`, {
                autoClose: 2000,
              });
            } else {
              // Show error message from response if provided
              toast.error(response.data.message || 'Failed to save selection.');
            }
          } catch (error) {
            // Show error if the request fails
            toast.error('An error occurred while saving the selection.'+error);
          }
    } else {
      toast.error('Please select both academic year and semester.', { autoClose: 2000 });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h2 className="text-3xl font-bold text-center mb-8">Select Academic Year and Semester</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="selectAcademicYear">
            Academic Year
          </label>
          <select
            id="selectAcademicYear"
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Academic Year</option>
            {academicYearsList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="selectSemester">
            Semester
          </label>
          <select
            id="selectSemester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select Semester</option>
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
          </select>
        </div>
        <button
          onClick={handleSaveSelection}
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded mt-4 hover:bg-blue-600"
        >
          Save Selection
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrincipalSelectAcademicYearSemester;
