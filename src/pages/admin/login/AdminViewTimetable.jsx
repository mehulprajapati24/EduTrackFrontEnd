import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminViewTimetable = () => {
  const [times, setTimes] = useState([]);
  const [timetable, setTimetable] = useState(null);
  const [academicYear, setAcademicYear] = useState(''); // Default as empty string
  const [semester, setSemester] = useState(''); // Default as empty string
  const [showTimetable, setShowTimetable] = useState(false); // To toggle timetable display
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    if (academicYear && semester) {
      fetchData();
    }
  }, [academicYear, semester]);

  const fetchData = async () => {
    await getTimes();
    await fetchTimetable();
  };

  const getTimes = async () => {
    const response = await axios.get('http://localhost:5000/admin/gettimes', {
      params: {
        academicYear: academicYear,
        semester: semester,
      },
    });
    setTimes(response.data.times);
  };

  const fetchTimetable = async () => {
    const response = await axios.get('http://localhost:5000/get-timetable', {
      params: {
        academicYear: academicYear,
        semester: semester,
      },
    });
    setTimetable(response.data.timetable);
    setShowTimetable(true); // Show timetable after fetching
  };

  // Helper function to create time ranges from the times array
  const createTimeRanges = () => {
    let ranges = [];
    for (let i = 0; i < times.length - 1; i++) {
      ranges.push(`${times[i]} to ${times[i + 1]}`);
    }
    return ranges;
  };

  const timeRanges = createTimeRanges(); // Array of time ranges like '8:30 AM to 9:15 AM'

  // Helper function to check if there is an entry for a given day and time
  const getSchedulesForDayAndTime = (day, range) => {
    if (timetable && timetable.weeklyTimetable[day]) {
      // Find all entries that match the time range
      const schedules = timetable.weeklyTimetable[day].filter((entry) => entry.time === range);
      return schedules.length > 0 ? schedules : null;
    }
    return null;
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">View Timetable</h1>

      {/* Academic Year and Semester Selection */}
      <div className="flex mb-6 justify-center">
        <div className="mr-4">
          <label className="block mb-2">Select Academic Year:</label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Year</option> {/* Placeholder option */}
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Select Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Semester</option> {/* Placeholder option */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>

      {/* Display timetable only if showTimetable is true */}
      {showTimetable && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#010562]">Timetable</h1>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">Time</th>
                  {daysOfWeek.map((day, index) => (
                    <th key={index} className="border border-gray-400 p-2">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeRanges.map((range, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">{range}</td>
                    {daysOfWeek.map((day, dayIndex) => {
                      const schedules = getSchedulesForDayAndTime(day, range);
                      return (
                        <td key={dayIndex} className="border border-gray-400 p-2">
                          {schedules ? (
                            schedules.map((schedule, scheduleIndex) => (
                              <div key={scheduleIndex} className="mb-2">
                                {schedule.subject && <div><strong>Subject:</strong> {schedule.subject}</div>}
                                {schedule.type && <div><strong>Type:</strong> {schedule.type}</div>}
                                {schedule.batch && <div><strong>Batch:</strong> {schedule.batch}</div>}
                                {schedule.faculty && <div><strong>Faculty:</strong> {schedule.faculty}</div>}
                                {schedule.location && <div><strong>Location:</strong> {schedule.location}</div>}
                              </div>
                            ))
                          ) : (
                            'N/A'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewTimetable;
