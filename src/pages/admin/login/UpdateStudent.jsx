import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UpdateStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [studentId, setStudentId] = useState([]);
    const [academicYearsList, setAcademicYearsList] = useState([]);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
    const [sem, setSem] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [hostellerCommuter, setHostellerCommuter] = useState("");
  const [semester, setSemester] = useState("");
  const [phone, setPhone] = useState("");
  const [parentsPhone, setParentsPhone] = useState("");
  const [gnuEmail, setGnuEmail] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [classField, setClassField] = useState(""); // 'class' is a reserved word in JS

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://edutrackbackend-aq9w.onrender.com/admin/update-student-with-data", {
        id: studentId,
        academicYear: selectedAcademicYear,
        sem,
        enrollment,
        name,
        branch,
        hostellerCommuter,
        semester,
        phone,
        parentsPhone,
        gnuEmail,
        email,
        batch,
        classField,
      });
    //   alert();
      toast.success("Student updated successfully!", { autoClose: 2000 });
    //   window.location.reload();
    setSelectedAcademicYear("");
    setSem("");
    setEnrollment("");
    setName("");
    setBranch("");
    setHostellerCommuter("");
    setSemester("");
    setPhone("");
    setParentsPhone("");
    setGnuEmail("");
    setEmail("");
    setBatch("");
    setClassField("");
    
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  useEffect(() => {

    const fetchStudentById = async ()=> {
    const response = await axios.post("https://edutrackbackend-aq9w.onrender.com/admin/get-student-for-update", {
        id
    });
     const student = response.data.student;


     setStudentId(student._id);
    setSelectedAcademicYear(student.academicYear);
    setSem(student.sem);
    setEnrollment(student.enrollment);
    setName(student.name);
    setBranch(student.branch);
    setHostellerCommuter(student.hostellercommuter);
    setSemester(student.semester);
    setPhone(student.phone);
    setParentsPhone(student.parentsphone);
    setGnuEmail(student.gnuemail);
    setEmail(student.email);
    setBatch(student.batch);
    setClassField(student.class);
    }

    fetchStudentById();
  },[]);

  
  useEffect(() => {
    // Fetch available academic years
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Update Student</h1>
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
          <label className="block text-gray-700 font-bold mb-2">Sem</label>
          <select
            className="w-full p-2 rounded border"
            value={sem}
            onChange={(e) => setSem(e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
          </select>
        </div>

          <div>
            <label className="block font-medium mb-1">Enrollment</label>
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
            <label className="block font-medium mb-1">Hosteller/Commuter</label>
            <input
              type="text"
              value={hostellerCommuter}
              onChange={(e) => setHostellerCommuter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Hosteller or Commuter"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Semester</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter semester"
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
            <label className="block font-medium mb-1">Parent's Phone</label>
            <input
              type="text"
              value={parentsPhone}
              onChange={(e) => setParentsPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter parent's phone number"
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
            <label className="block font-medium mb-1">Personal Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter personal email"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Batch</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter batch"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Class</label>
            <input
              type="text"
              value={classField}
              onChange={(e) => setClassField(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter class"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Student
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateStudent;
