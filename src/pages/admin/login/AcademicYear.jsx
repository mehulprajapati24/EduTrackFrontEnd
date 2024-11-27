import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcademicYear = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('Odd');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://edutrackbackend-itns.onrender.com/admin/add-academicyear', {
        academicYear,
        semester,
      });

      if (response.data.success) {
        toast.success(response.data.message, {
            autoClose: 2000
          });
        setAcademicYear('');
        setSemester('Odd');
        setMessage("");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Add Academic Year and Semester</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="academicYear">
            Academic Year (e.g., 2024-2025)
          </label>
          <input
            type="text"
            id="academicYear"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="2024-2025"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="semester">
            Semester
          </label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Academic Year
        </button>
        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default AcademicYear;
