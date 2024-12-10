import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageClassBatch = () => {
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [classBatchData, setClassBatchData] = useState([{ className: '', batches: [''] }]);

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
    const newClassBatchData = [...classBatchData];
    newClassBatchData[index].className = e.target.value;
    setClassBatchData(newClassBatchData);
  };

  const handleBatchChange = (classIndex, batchIndex, e) => {
    const newClassBatchData = [...classBatchData];
    newClassBatchData[classIndex].batches[batchIndex] = e.target.value;
    setClassBatchData(newClassBatchData);
  };

  const addClassField = () => {
    setClassBatchData([...classBatchData, { className: '', batches: [''] }]);
  };

  const removeClassField = (index) => {
    const newClassBatchData = classBatchData.filter((_, i) => i !== index);
    setClassBatchData(newClassBatchData);
  };

  const addBatchField = (classIndex) => {
    const newClassBatchData = [...classBatchData];
    newClassBatchData[classIndex].batches.push('');
    setClassBatchData(newClassBatchData);
  };

  const removeBatchField = (classIndex, batchIndex) => {
    const newClassBatchData = [...classBatchData];
    newClassBatchData[classIndex].batches = newClassBatchData[classIndex].batches.filter((_, i) => i !== batchIndex);
    setClassBatchData(newClassBatchData);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    console.log(academicYear);
    console.log(semester);
    console.log(classBatchData);

    try {
      const response = await axios.post("https://edutrackbackend-aq9w.onrender.com/admin/create-class-batch", {
        academicYear: academicYear,
        semester: semester,
        classes: classBatchData,
      });

      setAcademicYear('');
      setSemester('');
      setClassBatchData([{ className: '', batches: [''] }]);

      toast.success("Classes and Batches added successfully", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to add classes and batches");
    }
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

      {classBatchData.map((classData, classIndex) => (
        <div key={classIndex} className="mb-4">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Class {classIndex + 1}</label>
            <div className="flex items-center">
              <input
                type="text"
                value={classData.className}
                onChange={(e) => handleClassChange(classIndex, e)}
                className="p-2 w-full rounded-lg border"
                placeholder="Enter class name"
                required
              />
              <button
                type="button"
                onClick={() => removeClassField(classIndex)}
                className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
              >
                Remove Class
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Batches for Class {classIndex + 1}</label>
            {classData.batches.map((batch, batchIndex) => (
              <div key={batchIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => handleBatchChange(classIndex, batchIndex, e)}
                  className="p-2 w-full rounded-lg border"
                  placeholder="Enter batch name"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeBatchField(classIndex, batchIndex)}
                  className="ml-2 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                >
                  Remove Batch
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBatchField(classIndex)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add Batch
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addClassField}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mb-4"
      >
        Add Class
      </button>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 block"
      >
        Submit
      </button>

      <ToastContainer />
    </div>
  );
};

export default ManageClassBatch;