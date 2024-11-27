import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UpdateFaculty = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [facultyId, setFacultyId] = useState([]);
    const [academicYearsList, setAcademicYearsList] = useState([]);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [phone, setPhone] = useState("");
  const [gnuEmail, setGnuEmail] = useState("");
  const [facultyClassField, setFacultyClassField] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/update-faculty-with-data", {
        id: facultyId,
        academicYear: selectedAcademicYear,
        enrollment,
        name,
        branch,
        semester,
        phone,
        gnuEmail,
        facultyClassField
      });
    //   alert();
      toast.success("Faculty updated successfully!", { autoClose: 2000 });
    //   window.location.reload();
    setSelectedAcademicYear("");
    setEnrollment("");
    setName("");
    setBranch("");
    setSemester("");
    setPhone("");
    setGnuEmail("");
    setFacultyClassField("");
    
    } catch (error) {
      console.error("Error adding faculty:", error);
      alert("Failed to add faculty.");
    }
  };

  useEffect(() => {

    const fetchFacultyById = async ()=> {
    const response = await axios.post("http://localhost:5000/admin/get-faculty-for-update", {
        id
    });
     const faculty = response.data.faculty;


     setFacultyId(faculty._id);
    setSelectedAcademicYear(faculty.academicYear);
    setEnrollment(faculty.enrollment);
    setName(faculty.name);
    setBranch(faculty.branch);
    setSemester(faculty.semester);
    setPhone(faculty.phone);
    setGnuEmail(faculty.gnuemail);
    setFacultyClassField(faculty.facultyClassField);
    }

    fetchFacultyById();
  },[]);

  
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Update Faculty</h1>
      <form className="max-w-3xl mx-auto bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

          <div>
            <label className="block font-medium mb-1">Employee Id</label>
            <input
              type="text"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter enrollment number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter branch"
            />
          </div>
        
          
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter phone number"
            />
          </div>
         
          <div>
            <label className="block font-medium mb-1">GNU Email</label>
            <input
              type="email"
              value={gnuEmail}
              onChange={(e) => setGnuEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter GNU email"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Faculty's Short Name</label>
            <input
              type="text"
              value={facultyClassField}
              onChange={(e) => setFacultyClassField(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter faculty's short name"
            />
          </div>
        
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Faculty
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateFaculty;
