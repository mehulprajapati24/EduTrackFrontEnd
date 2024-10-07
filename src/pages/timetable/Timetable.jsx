import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Timetable = () => {
  const [times, setTimes] = useState([]);
  const [timetable, setTimetable] = useState(null);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    window.scrollTo(0, 0);
    getTimes();
    fetchTimetable();
  }, []);

  const getTimes = async () => {
    // Fetching times
    const response = await axios.get('http://localhost:5000/admin/gettimes', {
      params: {
        academicYear: '2024-2025',
        semester: '7',
      },
    });
    setTimes(response.data.times);
    console.log(times);
  };

  const fetchTimetable = async () => {
    const response = await axios.get('http://localhost:5000/get-timetable');
    console.log(response.data.timetable);
    setTimetable(response.data.timetable);
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
  const getScheduleForDayAndTime = (day, range) => {
    if (timetable && timetable.weeklyTimetable[day]) {
      const schedule = timetable.weeklyTimetable[day].find((entry) => entry.time === range);
      return schedule;
    }
    return null;
  };

  return (
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
                  const schedule = getScheduleForDayAndTime(day, range);
                  return (
                    <td key={dayIndex} className="border border-gray-400 p-2">
                      {schedule ? (
                        <div>
                          {schedule.subject && <div><strong>Subject:</strong> {schedule.subject}</div>}
                          {schedule.type && <div><strong>Type:</strong> {schedule.type}</div>}
                          {schedule.faculty && <div><strong>Faculty:</strong> {schedule.faculty}</div>}
                          {schedule.location && <div><strong>Location:</strong> {schedule.location}</div>}
                        </div>
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
  );
};

export default Timetable;
