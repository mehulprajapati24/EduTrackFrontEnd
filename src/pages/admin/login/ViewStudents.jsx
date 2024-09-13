import React, { useState, useEffect } from 'react';

const ViewStudents = ({ students, setShowViewStudents, onEdit, onDelete, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter students based on the search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">View Students</h1>
      
      {/* Back button */}
      <button
        onClick={() => setShowViewStudents(false)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-4"
      >
        Back to Manage Students
      </button>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or enrollment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Students table */}
      <table className="w-full bg-white rounded-lg shadow-lg text-left">
        <thead>
          <tr>
            <th className="p-4 border-b text-gray-600">Name</th>
            <th className="p-4 border-b text-gray-600">Enrollment</th>
            <th className="p-4 border-b text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="p-4 border-b">{student.name}</td>
                <td className="p-4 border-b">{student.enrollment}</td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => onViewDetails(student)}
                    className="bg-gray-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-gray-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 border-b text-center" colSpan="3">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
