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
  const [weeklyTimetable, setWeeklyTimetable] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
  });

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const faculties = ['RU', 'PMS', 'ADS', 'PS', 'PSP', 'KJS', 'PDS', 'RFR'];
  const [classes, setClasses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [times, setTimes] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get("https://edutrackbackend-rjl9.onrender.com/admin/validate", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.error) {
            navigate("/admin/login");
          } else {
            setAdmin(response.data.admin);


          }
        } else {
          navigate("/admin/login");
        }
      } catch (error) {
        toast.error("An error occurred while fetching admin data.");
        console.log("Error:", error);
      }
    };

    fetchAdminData();
  }, [navigate]);

  useEffect(() => {
    if (academicYear && semester) {
      getClasses();
      getTimes();
    }
  }, [academicYear, semester]);

  useEffect(() => {
    if (academicYear && semester && selectedClass) {
      getBatches();
    }
  }, [academicYear, semester, selectedClass]);

  const handleSessionChange = (day, index, field, value) => {
    const updatedDaySessions = [...weeklyTimetable[day]];
    updatedDaySessions[index][field] = value;
    setWeeklyTimetable({ ...weeklyTimetable, [day]: updatedDaySessions });
  };

  const handleAddSession = (day) => {
    setWeeklyTimetable({
      ...weeklyTimetable,
      [day]: [
        ...weeklyTimetable[day],
        { time: '', subject: '', type: 'Lecture', batch: '', faculty: '', location: ''}
      ]
    });
  };

  const handleRemoveSession = (day, index) => {
    const updatedDaySessions = weeklyTimetable[day].filter((_, i) => i !== index);
    setWeeklyTimetable({ ...weeklyTimetable, [day]: updatedDaySessions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(academicYear, semester, selectedClass, weeklyTimetable);

    try {
      const response = await axios.post("https://edutrackbackend-rjl9.onrender.com/admin/create-timetable", {
        academicYear,
        semester,
        selectedClass,
        weeklyTimetable,
      });

      toast.success(response.data.message, {
        autoClose: 2000
      });

      // setAcademicYear('');
      // setSemester('');
      // setSelectedClass('');
      // setWeeklyTimetable({
      //   Monday: [],
      //   Tuesday: [],
      //   Wednesday: [],
      //   Thursday: [],
      //   Friday: [],
      //   Saturday: []
      // });
    } catch (error) {
      toast.error("An error occurred while submitting the timetable.");
      console.log("Error:", error);
    }
  };

  const getClasses = async () => {
    const response = await axios.get('https://edutrackbackend-rjl9.onrender.com/admin/getclasses', {
      params: {
        academicYear,
        semester,
      },
    });
    // console.log(response.data.classes);
    setClasses(response.data.classes);
    // setBatches(response.data.batches);
  };

  const getBatches = async () => {
    const response = await axios.get('https://edutrackbackend-rjl9.onrender.com/admin/getbatches', {
      params: {
        academicYear,
        semester,
        selectedClass
      },
    });
    //console.log(response.data.batches);
    setBatches(response.data.batches);
  };

  const getTimes = async () => {
    const response = await axios.get('https://edutrackbackend-rjl9.onrender.com/admin/gettimes', {
      params: {
        academicYear,
        semester,
      },
    });
    setTimes(response.data.times);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="w-[800px] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add Timetable</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Academic Year and Semester */}
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

          {/* Class */}
          <div className="w-full">
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

          {/* Timetable for all days */}
          {daysOfWeek.map((day) => (
            <div key={day}>
              <h3 className="text-xl font-bold mt-4 mb-2">{day}</h3>

              {weeklyTimetable[day].map((session, index) => (
                <div key={index} className="space-y-4 border-t pt-4">
                  
                  {/* Time From and To */}
                  <div className="flex space-x-4">
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium">Time:</label>
                      <select
                        value={session.time} 
                        onChange={(e) => handleSessionChange(day, index, 'time', e.target.value)} 
                        required 
                        className="block w-full mt-1 p-2 border rounded-md"
                      >
                        <option value="">Select Time</option>
                        {times.map((time, index) => (
                          index < times.length - 1 && (
                            <option key={time} value={`${time} to ${times[index + 1]}`}>
                              {time} to {times[index + 1]}
                            </option>
                          )
                        ))}
                        </select>
                    </div>
                  </div>

                  {/* Subject and Type */}
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-medium">Type:</label>
                      <select 
                        value={session.type} 
                        onChange={(e) => handleSessionChange(day, index, 'type', e.target.value)} 
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
                          onChange={(e) => handleSessionChange(day, index, 'subject', e.target.value)} 
                          required 
                          className="block w-full mt-1 p-2 border rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Batch and Faculty */}
                  {session.type !== 'Break' && session.type !== 'Lecture' && (
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Batch:</label>
                        <select 
                          value={session.batch} 
                          onChange={(e) => handleSessionChange(day, index, 'batch', e.target.value)} 
                          className="block w-full mt-1 p-2 border rounded-md"
                        >
                          <option value="">Select Batch</option>
                          {batches.map((batch) => (
                            <option key={batch} value={batch}>{batch}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Faculty and Location */}
                  {session.type !== 'Break' && session.type !== 'No Teaching Load' && (
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Faculty:</label>
                        <select 
                          value={session.faculty} 
                          onChange={(e) => handleSessionChange(day, index, 'faculty', e.target.value)} 
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
                          onChange={(e) => handleSessionChange(day, index, 'location', e.target.value)} 
                          required 
                          className="block w-full mt-1 p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  )}

                  {/* Remove Session */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSession(day, index)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove Session
                  </button>
                </div>
              ))}

              {/* Add Session */}
              <button
                type="button"
                onClick={() => handleAddSession(day)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add Session for {day}
              </button>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit Timetable
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ManageTimetable;
