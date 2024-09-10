import React, { useState, useEffect } from 'react';

const FacultyLocation = () => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);

    const facultyList = [
        { id: 1, name: 'Prof. Sahil Jain', image: 'https://via.placeholder.com/150', location: 'Room 101' },
        { id: 2, name: 'Prof. Nirmal Dave', image: 'https://via.placeholder.com/150', location: 'Room 202' },
        { id: 3, name: 'Dr. Niraj Chauhan', image: 'https://via.placeholder.com/150', location: 'Lab 004' },
        { id: 4, name: 'Dr. Ajay Chauhan', image: 'https://via.placeholder.com/150', location: 'Lab 005' },
        
    ];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFaculty = facultyList.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center items-center px-4 py-24">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Faculty Location Finder</h1>

            <div className="w-full max-w-md mb-8">
                <input
                    type="text"
                    placeholder="Search Faculty"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg bg-white"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {filteredFaculty.length > 0 ? (
                    filteredFaculty.map((faculty) => (
                        <div
                            key={faculty.id}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform transition duration-300 ease-in-out hover:-translate-y-1"
                        >
                            <img
                                src={faculty.image}
                                alt={faculty.name}
                                className="w-32 h-32 rounded-full object-cover mb-4 mx-auto"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">{faculty.name}</h2>
                            <p className="text-lg text-gray-600 text-center">{faculty.location}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-500">No faculty members found.</p>
                )}
            </div>
        </div>
    );
};

export default FacultyLocation;
