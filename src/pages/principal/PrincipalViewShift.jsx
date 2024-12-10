import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrincipalViewShift = () => {
  const [shifts, setShifts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [semester, setSemester] = useState("");

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

  const fetchShifts = async () => {
    try {
      const response = await axios.post("http://localhost:5000/admin/viewShifts", {
        academicYear: selectedAcademicYear,
        semester,
      });
      setShifts(response.data.shift);
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (selectedAcademicYear && semester) {
      fetchShifts();
    }
  }, [selectedAcademicYear, semester]);

  // Filter shifts based on search query
  const filteredShifts = shifts.filter((shift) =>
    shift.facultyId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shift.facultyId.enrollment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">View Shift</h1>

      {/* Academic Year and Semester Select Inputs */}
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

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Faculty Name or Employee ID"
          className="w-full p-2 rounded border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Shift Data Table */}
      <div className="overflow-y-auto max-h-[500px] shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Employee ID</th>
              <th className="px-4 py-2 border-b text-left">Faculty Name</th>
              <th className="px-4 py-2 border-b text-left">Date</th>
              <th className="px-4 py-2 border-b text-left">Shift Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.map((shift, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{shift.facultyId.enrollment}</td>
                <td className="px-4 py-2 border-b">{shift.facultyId.name}</td>
                <td className="px-4 py-2 border-b">{shift.date}</td>
                {shift.endTime ? (
                  <td className="px-4 py-2 border-b">{shift.startTime + " to " + shift.endTime}</td>
                ) : (
                  <td className="px-4 py-2 border-b">{shift.startTime + " to coming soon"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrincipalViewShift;
