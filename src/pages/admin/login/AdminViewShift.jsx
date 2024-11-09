import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminViewShift = () => {
  const [shifts, setShifts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/viewShifts");
        setShifts(response.data.shift);
      } catch (error) {
        console.error("Error fetching shift data:", error);
      }
    };
    fetchShifts();
  }, []);

  // Filter shifts based on search query
  const filteredShifts = shifts.filter((shift) =>
    shift.facultyId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shift.facultyId.enrollment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">View Shift</h1>

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

export default AdminViewShift;
