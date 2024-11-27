import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";

const UpdateTimetable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [classFaculty, setClassFaculty] = useState('');
  const [weeklyTimetable, setWeeklyTimetable] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  // Fetch existing timetable data by ID
  useEffect(() => {
    const fetchTimetableById = async () => {
      try {
        const response = await axios.post("https://edutrackbackend-itns.onrender.com/admin/get-timetable-for-update", { id });
        const timetable = response.data.timetable;

        setSelectedAcademicYear(timetable.academicYear);
        setSemester(timetable.semester);
        setClassFaculty(timetable.class || timetable.facultyName);
        setWeeklyTimetable(timetable.weeklyTimetable);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        toast.error("Failed to fetch timetable.");
      }
    };

    if (id) fetchTimetableById();
  }, [id]);

  // Fetch academic years
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get("https://edutrackbackend-itns.onrender.com/admin/academicyears");
        setAcademicYearsList(response.data.years);
      } catch (error) {
        console.error("Error fetching academic years:", error);
      }
    };

    fetchAcademicYears();
  }, []);

  const handleAddBatch = (day) => {
    setWeeklyTimetable((prev) => ({
      ...prev,
      [day]: [...prev[day], []],
    }));
  };

  const handleAddSession = (day, batchIndex) => {
    setWeeklyTimetable((prev) => {
      const updatedDay = [...prev[day]];
      updatedDay[batchIndex] = [...updatedDay[batchIndex], {}];
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleSessionChange = (day, batchIndex, sessionIndex, field, value) => {
    setWeeklyTimetable((prev) => {
      const updatedDay = [...prev[day]];
      const updatedBatch = [...updatedDay[batchIndex]];
      updatedBatch[sessionIndex] = { ...updatedBatch[sessionIndex], [field]: value };
      updatedDay[batchIndex] = updatedBatch;
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://edutrackbackend-itns.onrender.com/admin/update-timetable-with-data", {
        id,
        academicYear: selectedAcademicYear,
        semester,
        classFaculty,
        weeklyTimetable,
      });

      setSelectedAcademicYear('');
    setSemester('');
    setClassFaculty('');
    setWeeklyTimetable({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    });
    
      toast.success("Timetable updated successfully!");
      
    } catch (error) {
      console.error("Error updating timetable:", error);
      toast.error("Failed to update timetable.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Update Timetable</h1>

      <div className="w-[800px] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Academic Year:</label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                required
                className="block w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select Academic Year</option>
                {academicYearsList.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
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
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Class/Faculty:</label>
            <input
              type="text"
              value={classFaculty}
              onChange={(e) => setClassFaculty(e.target.value)}
              required
              className="block w-full mt-1 p-2 border rounded-md"
              placeholder="Enter class or faculty"
            />
          </div>

          {Object.keys(weeklyTimetable).map((day) => (
            <div key={day} className="mb-4">
              <h3 className="text-lg font-bold capitalize">{day}</h3>
              {weeklyTimetable[day].map((batch, batchIndex) => (
                <div key={batchIndex} className="ml-4">
                  <h4 className="font-semibold">Batch {batchIndex + 1}</h4>
                  {batch.map((session, sessionIndex) => (
                    <div key={sessionIndex} className="space-y-2 ml-4 border p-2 rounded mb-2">
                      <input
                        type="text"
                        placeholder="Type"
                        value={session.type || ''}
                        onChange={(e) => handleSessionChange(day, batchIndex, sessionIndex, 'type', e.target.value)}
                        className="block w-full mt-1 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Time"
                        value={session.time || ''}
                        onChange={(e) => handleSessionChange(day, batchIndex, sessionIndex, 'time', e.target.value)}
                        className="block w-full mt-1 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Subject"
                        value={session.subject || ''}
                        onChange={(e) => handleSessionChange(day, batchIndex, sessionIndex, 'subject', e.target.value)}
                        className="block w-full mt-1 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Class or Batch"
                        value={session.classbatch || ''}
                        onChange={(e) => handleSessionChange(day, batchIndex, sessionIndex, 'classbatch', e.target.value)}
                        className="block w-full mt-1 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Faculty"
                        value={session.faculty || ''}
                        onChange={(e) => handleSessionChange(day, batchIndex, sessionIndex, 'faculty', e.target.value)}
                        className="block w-full mt-1 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={session.location || ''}
                        onChange={(e) => handleSessionChange(day, batchIndex, sessionIndex, 'location', e.target.value)}
                        className="block w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddSession(day, batchIndex)}
                    className="text-blue-500 underline"
                  >
                    Add Session
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddBatch(day)}
                className="text-green-500 underline mt-2"
              >
                Add Batch
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Update Timetable
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateTimetable;
