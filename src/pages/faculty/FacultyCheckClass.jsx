import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultyCheckClass = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState([]); // Initialize rooms as an empty array
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // To manage modal view
  const [availabilityFilter, setAvailabilityFilter] = useState('All'); // To manage selected availability filter



  // Fetch room data from server
  const fetchRooms = async () => {
    try {
      const response = await axios.get('https://edutrackbackend-opga.onrender.com/admin/get-room-data'); // Adjust API endpoint as needed
      setRooms(response.data.rooms);
      setFilteredRooms(response.data.rooms); // Initially set filtered rooms to all rooms
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  

  // Filter rooms based on search query and availability filter
  useEffect(() => {
    if (rooms.length > 0) {
      const filtered = rooms.filter((room) => {
        const matchesSearchQuery = room.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAvailability =
          availabilityFilter === 'All' ||
          room.availability.toLowerCase() === availabilityFilter.toLowerCase();

        return matchesSearchQuery && matchesAvailability;
      });

      setFilteredRooms(filtered);
    }
  }, [searchQuery, availabilityFilter, rooms]); // Run this effect when search query, availability filter, or rooms change

  const handleRoomClick = (room) => {
    setSelectedRoom(room); // Set selected room to show details in the modal
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Check Class/Lab Availability</h1>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Classroom or Lab..."
          className="p-3 w-full sm:w-96 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Availability Filter Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="p-3 w-full sm:w-96 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 ${
              room.availability === 'Available'
                ? 'border-l-8 border-green-500'
                : 'border-l-8 border-red-500'
            }`}
            onClick={() => handleRoomClick(room)} // Handle room click to show details
          >
            <h2 className="text-xl font-semibold text-center mb-2">
              {room.location}
            </h2>
            <p
              className={`text-center mt-4 font-semibold ${
                room.availability === 'Available'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {room.availability}
            </p>
          </div>
        ))}
      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedRoom.location}
            </h2>
            <ul className="text-lg mb-4">
              <li>
                <strong>ACs:</strong> {selectedRoom.acs}
              </li>
              <li>
                <strong>Chairs:</strong> {selectedRoom.chairs}
              </li>
              <li>
                <strong>Benches:</strong> {selectedRoom.benches}
              </li>
              <li>
                <strong>Computers:</strong> {selectedRoom.computers}
              </li>
              <li>
                <strong>Fans:</strong> {selectedRoom.fans}
              </li>
              <li>
                <strong>Tubelights:</strong> {selectedRoom.tubelights}
              </li>
              <li>
                <strong>Projectors:</strong> {selectedRoom.projectors}
              </li>
            </ul>
            <button
              onClick={() => setSelectedRoom(null)}
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

export default FacultyCheckClass;