import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility function to convert 24-hour time to 12-hour format with AM/PM
const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const ManageSession = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [times, setTimes] = useState(['']);

  // Example options
  const academicYears = ['2024-2025', '2025-2026', '2026-2027'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleAcademicYearChange = (e) => {
    setAcademicYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleTimeChange = (index, e) => {
    const newTimes = [...times];
    newTimes[index] = e.target.value;
    setTimes(newTimes);
  };

  const addTimeField = () => {
    setTimes([...times, '']);
  };

  const removeTimeField = (index) => {
    const newTimes = times.filter((_, i) => i !== index);
    setTimes(newTimes);
  };

  const handleSubmit = async () => {
    // Handle form submission logic
    console.log(academicYear, semester, times.map(formatTime));

    const response = await axios.post('http://localhost:5000/admin/create-session', {
      academicYear,
      semester,
      times: times.map(formatTime),
    });

    setAcademicYear('');
    setSemester('');
    setTimes(['']);

    toast.success(response.data.message, {
      autoClose: 2000,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Manage Session</h1>

      {/* Academic Year */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Academic Year</label>
        <select
          value={academicYear}
          onChange={handleAcademicYearChange}
          className="p-2 w-full rounded-lg border"
          required
        >
          <option value="">Select Academic Year</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Semester */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Semester</label>
        <select
          value={semester}
          onChange={handleSemesterChange}
          className="p-2 w-full rounded-lg border"
          required
        >
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {/* Time Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Time(s)</label>
        {times.map((time, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(index, e)}
              className="p-2 w-full rounded-lg border"
              required
            />
            <button
              type="button"
              onClick={() => removeTimeField(index)}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTimeField}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Add Time
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default ManageSession;
