import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageClassBatch = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [classes, setClasses] = useState(['']);
  const [batches, setBatches] = useState(['']);

  // Example options
  const academicYears = ['2024-2025', '2025-2026', '2026-2027'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];


  const handleAcademicYearChange = (e) => {
    setAcademicYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleClassChange = (index, e) => {
    const newClasses = [...classes];
    newClasses[index] = e.target.value;
    setClasses(newClasses);
  };

  const handleBatchChange = (index, e) => {
    const newBatches = [...batches];
    newBatches[index] = e.target.value;
    setBatches(newBatches);
  };

  const addClassField = () => {
    setClasses([...classes, '']);
  };

  const addBatchField = () => {
    setBatches([...batches, '']);
  };

  const removeClassField = (index) => {
    const newClasses = classes.filter((_, i) => i !== index);
    setClasses(newClasses);
  };

  const removeBatchField = (index) => {
    const newBatches = batches.filter((_, i) => i !== index);
    setBatches(newBatches);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    console.log(academicYear);
    console.log(semester);
    console.log(classes);
    console.log(batches);

    const response = await axios.post("http://localhost:5000/admin/create-class-batch", {
        academicYear: academicYear,
        semester: semester,
        classes: classes,
        batches: batches
    });

    setAcademicYear('');
    setSemester('');
    setClasses(['']);
    setBatches(['']);

    toast.success("Classes and Batches added successfully", {
        autoClose: 2000
    });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Manage Class and Batch</h1>

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
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

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
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Classes</label>
        {classes.map((cls, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={cls}
              onChange={(e) => handleClassChange(index, e)}
              className="p-2 w-full rounded-lg border"
              placeholder="Enter class"
              required
            />
            <button
              type="button"
              onClick={() => removeClassField(index)}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addClassField}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Add Class
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Batches</label>
        {batches.map((batch, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={batch}
              onChange={(e) => handleBatchChange(index, e)}
              className="p-2 w-full rounded-lg border"
              placeholder="Enter batch"
              required
            />
            <button
              type="button"
              onClick={() => removeBatchField(index)}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addBatchField}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Add Batch
        </button>
      </div>

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

export default ManageClassBatch;
