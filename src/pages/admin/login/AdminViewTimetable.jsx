import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectClassOrFaculty = () => {
  const [selectedTimetable, setSelectedTimetable] = useState('');
  const [options, setOptions] = useState([]);
  const [timetableData, setTimetableData] = useState(null);
  const [timeWiseTimetableData, setTimeWiseTimetableData] = useState(null);
  const [dayOptions] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState(''); // State for selected time
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [semester, setSemester] = useState("");


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

  const fetchTimetableOptions = async () => {
    try {
      const response = await axios.post('https://edutrackbackend-77k7.onrender.com/admin/get-timetables-sheetname',{
        academicYear: selectedAcademicYear,
        semester,
      });
      setOptions(response.data.sheets);
    } catch (error) {
      console.error('Error fetching timetable options:', error);
      setError('Failed to load timetable options');
    }
  };

  useEffect(() => {
    if (selectedAcademicYear && semester) {
      fetchTimetableOptions();
    }
  }, [selectedAcademicYear, semester]);


  const handleTimetableSelection = async (selectedSheetName) => {
    setSelectedTimetable(selectedSheetName);
    setSelectedDay('');
    setSelectedTime(''); // Reset time selection when timetable changes
    setTimeWiseTimetableData(null);
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.post('https://edutrackbackend-77k7.onrender.com/admin/get-timetable-basedOnSheetName', {
        sheetName: selectedSheetName,
        academicYear: selectedAcademicYear,
        semester,
      });
      setTimetableData(response.data.timetable);
    } catch (error) {
      console.error('Error fetching timetable based on sheet name:', error);
      setError('Failed to load the timetable data');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDaySelection = async (selectedDay) => {
    setSelectedDay(selectedDay);
    setSelectedTime(''); // Reset the time selection when the day changes
    setTimeWiseTimetableData(null);
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axios.post('https://edutrackbackend-77k7.onrender.com/admin/get-daywise-timetable', {
          sheetName: selectedTimetable,
          day: selectedDay,
          academicYear: selectedAcademicYear,
          semester,
      });
      setTimetableData(response.data.dayWiseTimetableData);
    } catch (error) {
      console.error('Error fetching daywise timetable:', error);
      setError('Failed to load day-wise timetable');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch timetable based on selected time
  useEffect(() => {
    if (selectedTime && selectedDay && selectedTimetable) {
      const fetchTimetableBasedOnTime = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error state

        try {
          const response = await axios.post('https://edutrackbackend-77k7.onrender.com/admin/get-timetable-based-on-time', {
              sheetName: selectedTimetable,
              day: selectedDay,
              time: selectedTime,
              academicYear: selectedAcademicYear,
              semester,
          });
          setTimeWiseTimetableData(response.data.timeWiseTimetableData);
        } catch (error) {
          console.error('Error fetching timetable based on time:', error);
          setError('No class found at the selected time.');
        } finally {
          setLoading(false); // End loading
        }
      };

      fetchTimetableBasedOnTime();
    }
  }, [selectedTime, selectedDay, selectedTimetable]);

  const getCellClass = (cellContent) => {
    if (cellContent.includes('Break')) {
      return { backgroundColor: '#CCCCCC' }; // Gray for break time
    } else if (cellContent.includes('No Teaching Load')) {
      return { backgroundColor: '#D9EAD3' }; // Light green for "No Teaching Load"
    } else if (cellContent.includes('day') || cellContent.includes('Day')) {
      return { backgroundColor: '#00FF00' }; // Green for day names
    } else if (cellContent.includes('to')) {
      return { backgroundColor: '#00FF00' }; // Green for time slots
    }
    return { backgroundColor: '#FFFFFF' }; // Default to white
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">View Timetable</h1>

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

      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Select Class or Faculty:</label>
          <select
            value={selectedTimetable}
            onChange={(e) => handleTimetableSelection(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Class or Faculty</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="text-center mt-6 text-lg text-blue-600">Loading timetable...</div>}
      {error && <div className="text-center text-red-600 mt-6">{error}</div>}

      {/* Select Day Dropdown */}
      {timetableData && (
        <>
          <div className="flex justify-center">
            <div className="mt-8 w-full md:w-1/2">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Select Day:</label>
              <select
                value={selectedDay}
                onChange={(e) => handleDaySelection(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Day</option>
                {dayOptions.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Input Field */}
          {selectedDay && (
            <div className="flex justify-center mt-6">
              <div className="w-full md:w-1/2">
                <label className="block text-lg font-semibold text-gray-700 mb-2">Select Time:</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Timetable Display */}
          {!selectedTime && selectedTimetable && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Timetable Data</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-2 border-black shadow-md rounded-lg">
        <tbody>
        {timetableData.map((row, rowIndex) => {
  return (
    <tr key={rowIndex} className="hover:bg-gray-100">
      {row.map((cell, cellIndex) => {
        // Check if the cell contains a '2' in the last position (indicating it should span two rows)
        const shouldRowspan = cell.trim().endsWith('2');
        var isRowspanCell = (rowIndex > 0 && timetableData[rowIndex - 1][cellIndex].trim().endsWith('2')); // Skip if the previous cell is a rowspan
        if(isRowspanCell){
          isRowspanCell = timetableData[rowIndex - 1][cellIndex] == timetableData[rowIndex][cellIndex];
        }

        const modifiedCell = cell.trim().endsWith('1') ? cell.trim().slice(0, -1) : 
                             cell.trim().endsWith('2') ? cell.trim().slice(0, -1) : 
                             cell.trim();

        // If it's a rowspan cell, skip rendering it and apply rowspan
        if (shouldRowspan && !isRowspanCell) {
          return (
            <td
              key={cellIndex}
              rowSpan={2} // Set rowspan to 2
              className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}
              style={{ verticalAlign: 'middle', ...(getCellClass(cell) || {}) }} // Center vertically
            >
              <pre>{modifiedCell}</pre>
            </td>
          );
        }

        // Return an empty cell if the above cell is a rowspan
        if (isRowspanCell) {
          return null;
        }

        return (
          <td
            key={cellIndex}
            className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}
            style={{ verticalAlign: 'middle', ...(getCellClass(cell) || {}) }} // Center vertically
          >
            <pre>{modifiedCell}</pre>
          </td>
        );
      })}
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  </div>
)}


        {timeWiseTimetableData && (
          <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Timetable Data</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-2 border-black shadow-md rounded-lg">
                  <tbody>

                  <tr className="hover:bg-gray-100">
                    <td style={{backgroundColor: '#00FF00', verticalAlign: 'middle'}} className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}>Time/Day</td>
                    
                    {timeWiseTimetableData.slice(1).map((row) => (
                      <>
                      <td style={{backgroundColor: '#00FF00', verticalAlign: 'middle'}} className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}>{selectedDay}</td>
                      </>
                  ))}
                  </tr>

                  <tr className="hover:bg-gray-100">
                  <td style={{backgroundColor: '#00FF00', verticalAlign: 'middle'}} className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}><pre>{timeWiseTimetableData[0]}</pre></td>

                  {timeWiseTimetableData.slice(1).map((row, index) => {
                    const modifiedCell = row.trim().endsWith('1') ? row.trim().slice(0, -1) : 
                    row.trim().endsWith('2') ? row.trim().slice(0, -1) : 
                    row.trim();

                    return ( <>
                      <td
                      className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}
                      style={{ verticalAlign: 'middle', ...(getCellClass(row) || {}) }} // Center vertically
                      >
                      <pre>{modifiedCell}</pre>
                      </td>
                    </> );
                  })}
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
        )}

        </>
      )}
    </div>
  );
};

export default SelectClassOrFaculty;













// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminViewTimetable = () => {
//   const [times, setTimes] = useState([]);
//   const [timetable, setTimetable] = useState(null);
//   const [academicYear, setAcademicYear] = useState(''); // Default as empty string
//   const [semester, setSemester] = useState(''); // Default as empty string
//   const [showTimetable, setShowTimetable] = useState(false); // To toggle timetable display
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//   useEffect(() => {
//     if (academicYear && semester) {
//       fetchData();
//     }
//   }, [academicYear, semester]);

//   const fetchData = async () => {
//     await getTimes();
//     await fetchTimetable();
//   };

//   const getTimes = async () => {
//     const response = await axios.get('https://edutrackbackend-77k7.onrender.com/admin/gettimes', {
//       params: {
//         academicYear: academicYear,
//         semester: semester,
//       },
//     });
//     setTimes(response.data.times);
//   };

//   const fetchTimetable = async () => {
//     const response = await axios.get('https://edutrackbackend-opga.onrender.com/get-timetable', {
//       params: {
//         academicYear: academicYear,
//         semester: semester,
//       },
//     });
//     setTimetable(response.data.timetable);
//     setShowTimetable(true); // Show timetable after fetching
//   };

//   // Helper function to create time ranges from the times array
//   const createTimeRanges = () => {
//     let ranges = [];
//     for (let i = 0; i < times.length - 1; i++) {
//       ranges.push(`${times[i]} to ${times[i + 1]}`);
//     }
//     return ranges;
//   };

//   const timeRanges = createTimeRanges(); // Array of time ranges like '8:30 AM to 9:15 AM'

//   // Helper function to check if there is an entry for a given day and time
//   const getSchedulesForDayAndTime = (day, range) => {
//     if (timetable && timetable.weeklyTimetable[day]) {
//       // Find all entries that match the time range
//       const schedules = timetable.weeklyTimetable[day].filter((entry) => entry.time === range);
//       return schedules.length > 0 ? schedules : null;
//     }
//     return null;
//   };

//   return (
//     <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-6">View Timetable</h1>

//       {/* Academic Year and Semester Selection */}
//       <div className="flex mb-6 justify-center">
//         <div className="mr-4">
//           <label className="block mb-2">Select Academic Year:</label>
//           <select
//             value={academicYear}
//             onChange={(e) => setAcademicYear(e.target.value)}
//             className="p-2 border border-gray-300 rounded"
//           >
//             <option value="">Select Year</option> {/* Placeholder option */}
//             <option value="2024-2025">2024-2025</option>
//             <option value="2023-2024">2023-2024</option>
//             <option value="2022-2023">2022-2023</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2">Select Semester:</label>
//           <select
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             className="p-2 border border-gray-300 rounded"
//           >
//             <option value="">Select Semester</option> {/* Placeholder option */}
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//             <option value="6">6</option>
//             <option value="7">7</option>
//             <option value="8">8</option>
//           </select>
//         </div>
//       </div>

//       {/* Display timetable only if showTimetable is true */}
//       {showTimetable && (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//           <h1 className="text-3xl font-bold mb-6 text-center text-[#010562]">Timetable</h1>
//           <div className="overflow-x-auto">
//             <table className="table-auto border-collapse border border-gray-400 w-full">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-400 p-2">Time</th>
//                   {daysOfWeek.map((day, index) => (
//                     <th key={index} className="border border-gray-400 p-2">{day}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {timeRanges.map((range, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-400 p-2">{range}</td>
//                     {daysOfWeek.map((day, dayIndex) => {
//                       const schedules = getSchedulesForDayAndTime(day, range);
//                       return (
//                         <td key={dayIndex} className="border border-gray-400 p-2">
//                           {schedules ? (
//                             schedules.map((schedule, scheduleIndex) => (
//                               <div key={scheduleIndex} className="mb-2">
//                                 {schedule.subject && <div><strong>Subject:</strong> {schedule.subject}</div>}
//                                 {schedule.type && <div><strong>Type:</strong> {schedule.type}</div>}
//                                 {schedule.batch && <div><strong>Batch:</strong> {schedule.batch}</div>}
//                                 {schedule.faculty && <div><strong>Faculty:</strong> {schedule.faculty}</div>}
//                                 {schedule.location && <div><strong>Location:</strong> {schedule.location}</div>}
//                               </div>
//                             ))
//                           ) : (
//                             'N/A'
//                           )}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminViewTimetable;
