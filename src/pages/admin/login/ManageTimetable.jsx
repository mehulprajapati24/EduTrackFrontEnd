import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageTimetable = () => {

  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [day, setDay] = useState('');
  const [sessions, setSessions] = useState([
    { timeFrom: '', timeTo: '', subject: '', type: 'Lecture', batch: '', faculty: '', location: '', freeSessionBatch: '' }
  ]);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const faculties = ['Dr. Smith', 'Prof. John', 'Ms. Angela', 'Dr. Adams', 'Prof. Clara'];
  const [classes, setClasses] = useState([]);
  const [batches, setBatches] = useState([]);


  useEffect(() => {
    if (academicYear && semester) {
      getClassesBatches();
    }
  }, [academicYear, semester]);


  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("http://localhost:5000/admin/validate", {
            headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.data.error) {
        console.log("No token");
        navigate("/admin/login");
        } else {
            setAdmin(response.data.admin);
        }
        }else {
          navigate("/admin/login");
      }
    }catch (error) {
      toast.error("An error occurred while fetching admin data.");
      console.log("Error:", error);
  }
};

  fetchAdminData();
}, [navigate]);


  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
    setSessions(updatedSessions);
  };

  const handleAddSession = () => {
    setSessions([...sessions, { timeFrom: '', timeTo: '', subject: '', type: 'Lecture', batch: '', faculty: '', location: '', freeSessionBatch: '' }]);
  };

  const handleRemoveSession = (index) => {
    if (sessions.length > 1) {
      const updatedSessions = sessions.filter((_, i) => i !== index);
      setSessions(updatedSessions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert('Timetable submitted!');

    console.log(academicYear, semester, selectedClass, day, sessions);

    const response = await axios.post("http://localhost:5000/admin/create-timetable", {
      academicYear,
      semester,
      day,
      selectedClass,
      sessions,
    });

    toast.success(response.data.message, {
      autoClose: 2000
    });

    setAcademicYear('');
    setSemester('');
    setDay('');
    setSelectedClass('');
    setSessions([
      { timeFrom: '', timeTo: '', subject: '', type: 'Lecture', batch: '', faculty: '', location: '', freeSessionBatch: '' }
    ]);
  };

  const getClassesBatches = async () => {
    console.log(academicYear, semester);
    const response = await axios.get('http://localhost:5000/admin/getclassesbatches', {
      params: {
        academicYear,
        semester,
      },
    });
    // console.log(response.data.classes);
    setClasses(response.data.classes);
    setBatches(response.data.batches);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="w-[800px] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add Timetable</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* First Row: Academic Year and Semester */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Academic Year:</label>
              <select 
                value={academicYear} 
                onChange={(e) => setAcademicYear(e.target.value)} 
                required 
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select Academic Year</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Semester:</label>
              <select 
                value={semester} 
                onChange={(e) => setSemester(e.target.value)} 
                required 
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select Semester</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Second Row: Class and Day */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Class:</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)} 
                required 
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Day:</label>
              <select 
                value={day} 
                onChange={(e) => setDay(e.target.value)} 
                required 
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
          </div>

          {sessions.map((session, index) => (
            <div key={index} className="space-y-4 border-t pt-4">
              
              {/* Time From and Time To in one row */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">Time From:</label>
                  <input 
                    type="time" 
                    value={session.timeFrom} 
                    onChange={(e) => handleSessionChange(index, 'timeFrom', e.target.value)} 
                    required 
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">Time To:</label>
                  <input 
                    type="time" 
                    value={session.timeTo} 
                    onChange={(e) => handleSessionChange(index, 'timeTo', e.target.value)} 
                    required 
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Subject and Type in one row */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">Type:</label>
                  <select 
                    value={session.type} 
                    onChange={(e) => handleSessionChange(index, 'type', e.target.value)} 
                    required 
                    className="block w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Lab">Lab</option>
                    <option value="Break">Break</option>
                    <option value="No Teaching Load">No Teaching Load</option>
                  </select>
                </div>

                {session.type !== 'Break' && session.type !== 'No Teaching Load' && (
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">Subject:</label>
                    <input 
                      type="text" 
                      value={session.subject} 
                      onChange={(e) => handleSessionChange(index, 'subject', e.target.value)} 
                      placeholder="Enter Subject" 
                      required 
                      className="block w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Show Batch if type is Lab or No Teaching Load */}
              {(session.type === 'Lab' || session.type === 'No Teaching Load') && (
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">{session.type === 'No Teaching Load' ? 'Free Session Batch:' : 'Batch:'}</label>
                    <select 
                      value={session.type === 'No Teaching Load' ? session.freeSessionBatch : session.batch} 
                      onChange={(e) => handleSessionChange(index, session.type === 'No Teaching Load' ? 'freeSessionBatch' : 'batch', e.target.value)} 
                      required 
                      className="block w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Select {session.type === 'No Teaching Load' ? 'Free Session Batch' : 'Batch'}</option>
                      {batches.map((batch) => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Show Faculty and Location if type is not Break and not No Teaching Load */}
              {session.type !== 'Break' && session.type !== 'No Teaching Load' && (
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">Faculty:</label>
                    <select 
                      value={session.faculty} 
                      onChange={(e) => handleSessionChange(index, 'faculty', e.target.value)} 
                      required 
                      className="block w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Select Faculty</option>
                      {faculties.map((faculty) => (
                        <option key={faculty} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="block text-gray-700 font-medium">Location:</label>
                    <input 
                      type="text" 
                      value={session.location} 
                      onChange={(e) => handleSessionChange(index, 'location', e.target.value)} 
                      placeholder="Enter Location" 
                      required 
                      className="block w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              )}

              {/* Remove button for each session */}
              <button 
                type="button" 
                onClick={() => handleRemoveSession(index)} 
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove Session
              </button>
            </div>
          ))}

          {/* Add Session Button */}
          <button 
            type="button" 
            onClick={handleAddSession} 
            className="text-blue-500 hover:text-blue-700 mt-4"
          >
            Add Session
          </button>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit Timetable
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageTimetable;
