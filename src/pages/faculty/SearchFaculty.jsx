import React, { useState, useEffect } from 'react';

const SearchFaculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyList, setFacultyList] = useState([
    { id: 1, name: 'Dr. John Doe', isAvailable: false, location: 'Class 101, Batch A' },
    { id: 2, name: 'Prof. Jane Smith', isAvailable: true, location: null },
    { id: 3, name: 'Dr. Emily Davis', isAvailable: false, location: 'Class 202, Batch B' },
    { id: 4, name: 'Prof. Michael Johnson', isAvailable: true, location: null },
  ]);
  const [filteredFaculty, setFilteredFaculty] = useState(facultyList);
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  // Filter faculty list based on search query and availability filter
  useEffect(() => {
    const filtered = facultyList.filter((faculty) => {
      const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (filterBy === 'available') {
        return matchesSearch && faculty.isAvailable;
      }
      if (filterBy === 'unavailable') {
        return matchesSearch && !faculty.isAvailable;
      }
      return matchesSearch;
    });
    setFilteredFaculty(filtered);
  }, [searchQuery, filterBy, facultyList]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-blue-200">
      <h1 className="text-3xl font-bold text-center mb-8">Search Faculty</h1>

      {/* Search and Filter Options */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <input
          type="text"
          className="p-3 rounded-lg shadow-lg text-lg mb-4 sm:mb-0 sm:mr-4 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Faculty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="p-3 rounded-lg shadow-lg text-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">All Faculties</option>
          <option value="available">Available Faculties</option>
          <option value="unavailable">Unavailable Faculties</option>
        </select>
      </div>

      {/* Faculty List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty) => (
          <div
            key={faculty.id}
            className="p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2">{faculty.name}</h2>
            {faculty.isAvailable ? (
              <p className="text-green-500 text-lg font-bold">Free</p>
            ) : (
              <p className="text-red-500 text-lg">In Class: {faculty.location}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFaculty;
