import React, { useState, useEffect } from 'react';

const AdminHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Classroom 101', capacity: 30, availability: 'Available' },
    { id: 2, name: 'Lab 202', capacity: 25, availability: 'Occupied' },
    { id: 3, name: 'Classroom 103', capacity: 40, availability: 'Available' },
    { id: 4, name: 'Lab 203', capacity: 20, availability: 'Available' },
  ]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, rooms]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-blue-200">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="w-full max-w-full mx-auto px-4">
        {/* Search Field */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            className="w-full max-w-lg p-3 text-lg rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search Classroom or Lab..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`relative p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 ${
                room.availability === 'Available' ? 'border-l-8 border-green-500' : 'border-l-8 border-red-500'
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
              <p className="text-lg">Capacity: {room.capacity}</p>
              <p
                className={`text-sm mt-4 font-semibold ${
                  room.availability === 'Available' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {room.availability}
              </p>
              {/* Animation on hover */}
              <div className="absolute inset-0 z-0 transition-opacity opacity-0 hover:opacity-25 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
