import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    if(selectedAcademicYear && semester){
      const fetchStudents = async () => {
        try {
          const response = await axios.post("http://localhost:5000/admin/manage-students", {
            academicYear : selectedAcademicYear,
            semester
          });
          setStudents(response.data.students);
          setFilteredStudents(response.data.students); // Initialize filtered list
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
  
      fetchStudents();
    }
  }, [selectedAcademicYear, semester]);

  useEffect(() => {
    // Fetch available academic years
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/academicyears');
        setAcademicYearsList(response.data.years);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };
    fetchAcademicYears();
  }, []);

  // Filter students based on the search term
  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.enrollment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleUpdate = (id) => {
    // console.log(`Update student with ID: ${id}`);
    // Implement the update logic here
    navigate('/admin/update-student', {
      state: {
        id
      }
    });
  };

  const handleDelete = async (id) => {
    // console.log(`Delete student with ID: ${id}`);
    // Implement the delete logic here
    const response = await axios.post('http://localhost:5000/admin/delete-student', {
      id
    });
    setStudents(students.filter((student) => student._id !== id));
    setFilteredStudents(students.filter((student) => student._id !== id));
    toast.success("Student deleted successfully!", { autoClose: 2000 });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Students</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        <Link to="/admin/add-student">
          Add Student
        </Link>
        </button>
      </div>

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

      <input
        type="text"
        placeholder="Search by enrollment or name"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Enrollment</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{student.enrollment}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                      onClick={() => handleUpdate(student._id)}>
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageStudents;
