import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageFaculties = () => {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  
  useEffect(() => {
    // Fetch available academic years
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
  
  // Fetch faculties data
  useEffect(() => {
    if(selectedAcademicYear && semester){
    const fetchFaculties = async () => {
      try {
        const response = await axios.post("https://edutrackbackend-77k7.onrender.com/admin/manage-faculties",{
          academicYear : selectedAcademicYear,
          semester
        });
        setFaculties(response.data.faculties);
        setFilteredFaculties(response.data.faculties); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }
  }, [selectedAcademicYear, semester]);

  // Filter faculties based on the search term
  useEffect(() => {
    const filtered = faculties.filter(
      (faculty) =>
        faculty.enrollment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaculties(filtered);
  }, [searchTerm, faculties]);

  const handleUpdate = (id) => {
    // console.log(`Update faculty with ID: ${id}`);
    // Implement the update logic here
    navigate('/admin/update-faculty', {
      state: {
        id
      }
    });
  };

  const handleDelete = async (id) => {
    // console.log(`Delete faculty with ID: ${id}`);
    // Implement the delete logic here
    const response = await axios.post('https://edutrackbackend-77k7.onrender.com/admin/delete-faculty', {
      id
    });
    setFaculties(faculties.filter((faculty) => faculty._id !== id));
    setFilteredFaculties(faculties.filter((faculty) => faculty._id !== id));
    toast.success("Faculty deleted successfully!", { autoClose: 2000 });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Faculties</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <Link to="/admin/add-faculty">
            Add Faculty
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
        placeholder="Search by employee ID or name"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Employee ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((faculty) => (
                <tr
                  key={faculty._id}
                  className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{faculty.enrollment}</td>
                  <td className="py-3 px-4">{faculty.name}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                      onClick={() => handleUpdate(faculty._id)}>
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(faculty._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center">
                  No faculties found
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

export default ManageFaculties;
