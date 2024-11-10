import React, { useState, useEffect } from 'react';
import axios from 'axios';  

const SearchFaculty = () => {
  const [faculties, setFaculties] = useState([]);  // Set faculties to an empty array initially
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('https://edutrackbackend-rjl9.onrender.com/admin/get-faculty-data'); // Adjusted API endpoint
        setFaculties(response.data.faculties);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFaculties();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredFaculties = faculties
    ? faculties.filter(
        (faculty) =>
          faculty.name.toLowerCase().includes(searchQuery) ||
          faculty.enrollment.includes(searchQuery) // Assuming faculties have an employeeId instead of enrollment
      )
    : [];

  const handleFacultyClick = async (faculty) => {
    try {
      const nameParts = faculty.name.split(' ').filter(part => part);
    
      const shortName = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    
      const response = await axios.post('https://edutrackbackend-rjl9.onrender.com/admin/get-faculty-location', { facultyName: shortName }); // Adjusted payload
      setLocation(response.data.location);
      setTime(response.data.time);
      setSelectedFaculty(faculty);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Search Faculty</h1>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or employee Id"
          className="p-3 w-full sm:w-96 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculties.map((faculty) => (
          <div
            key={faculty.enrollment} // Assuming faculties have a unique employeeId
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105"
            onClick={() => handleFacultyClick(faculty)}
          >
            <h2 className="text-xl font-semibold text-center mb-2">{faculty.name}</h2>
            <p className="text-center text-gray-600">{faculty.enrollment}</p> {/* Adjusted to display employee ID */}
          </div>
        ))}
      </div>

      {/* Faculty Details Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedFaculty.name}
            </h2>
            <img
              src={selectedFaculty.profileLink || "https://via.placeholder.com/150"}
              alt={selectedFaculty.name}
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
            <ul className="text-lg mb-4">
              <li><strong>Employee ID:</strong> {selectedFaculty.enrollment}</li> {/* Adjusted to show employee ID */}
              <li><strong>Branch:</strong> {selectedFaculty.branch}</li>
              <li><strong>Phone:</strong> {selectedFaculty.phone}</li>
              <li><strong>GNU Email:</strong> {selectedFaculty.gnuemail}</li>
              <li><strong>Location:</strong> {location} ({time})</li>
            </ul>
            <button
              onClick={() => setSelectedFaculty(null)}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFaculty;

