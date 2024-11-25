import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrincipalImportGoogleSheets = () => {
  const [sheetLink, setSheetLink] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('Odd');
  const [loading, setLoading] = useState(false); // Loading state for loader
  const [academicYearsList, setAcademicYearsList] = useState([]);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('https://edutrackbackend-77k7.onrender.com/admin/academicyears');
        setAcademicYearsList(response.data.years);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };

    fetchAcademicYears();
  }, []);

  const extractSheetId = (url) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sheetLink && academicYear && semester) {
      const sheetId = extractSheetId(sheetLink);

      if (sheetId) {
        console.log('Extracted Google Sheet ID:', sheetId);

        try {
          setLoading(true);  // Show loader

          // Send the Google Sheet ID, academic year, and semester
          const response = await axios.post('https://edutrackbackend-77k7.onrender.com/admin/add-sheet-id', { 
            sheetId,
            academicYear,
            semester 
          });

          toast.success(response.data.message, {
            autoClose: 2000
          });

          setLoading(false);  // Hide loader
          setSheetLink('');
          setAcademicYear('');
          setSemester('Odd');

        } catch (error) {
          console.error('Error adding sheet ID:', error);
          setLoading(false);  // Hide loader
          toast.error('There was an error adding the sheet ID.', {
            autoClose: 2000
          });
        }

      } else {
        toast.error('Please enter a valid Google Sheets link', {
          autoClose: 2000
        });
        setSheetLink('');
      }
    } else {
      toast.error('Please fill all fields (Google Sheets link, Academic Year, and Semester).', {
        autoClose: 2000
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 rounded flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Import Google Sheets</h2>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="sheetLink">
              Google Sheets Link
            </label>
            <input
              type="url"
              id="sheetLink"
              name="sheetLink"
              value={sheetLink}
              onChange={(e) => setSheetLink(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="academicYear">
              Academic Year
            </label>
            <select
              id="academicYear"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Academic Year</option>
              {academicYearsList.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="semester">
              Semester
            </label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Odd">Odd</option>
              <option value="Even">Even</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Import Data
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrincipalImportGoogleSheets;
