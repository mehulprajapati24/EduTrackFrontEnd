import React, { useState } from 'react';

const ViewFaculties = ({ faculties, setShowViewFaculties, onEdit, onDelete, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter faculties based on search term
  const filteredFaculties = faculties.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => setShowViewFaculties(false)}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mb-4"
      >
        Back
      </button>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 w-full rounded-lg border border-gray-300"
        />
      </div>

      <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 text-left border-b">Name</th>
            <th className="p-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculties.length > 0 ? (
            filteredFaculties.map(faculty => (
              <tr key={faculty.id} className="border-b border-gray-300">
                <td className="p-3">{faculty.name}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDetails(faculty)}
                      className="bg-blue-500 text-white text-xs py-1 px-2 rounded-lg hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(faculty)}
                      className="bg-yellow-500 text-white text-xs py-1 px-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(faculty.id)}
                      className="bg-red-500 text-white text-xs py-1 px-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="p-3 text-center">No faculties found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFaculties;
