import React, { useState, useEffect } from 'react';
import axios from 'axios';  

const SearchStudent = () => {
  const [students, setStudents] = useState([]);  // Set students to an empty array initially
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://edutrackbackend-aq9w.onrender.com/admin/get-students-data');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStudents = students
  ? students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery) ||
        student.enrollment.includes(searchQuery)
    )
  : [];

  const handleStudentClick = async (student) => {
    try {
      const response = await axios.post('https://edutrackbackend-aq9w.onrender.com/admin/get-student-location', { className: student.class, batch: student.batch });
      setLocation(response.data.location);
      setTime(response.data.time);
      setSelectedStudent(student);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Search Students</h1>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or enrollment"
          className="p-3 w-full sm:w-96 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105"
            onClick={() => handleStudentClick(student)}
          >
            <h2 className="text-xl font-semibold text-center mb-2">{student.name}</h2>
            <p className="text-center text-gray-600">{student.enrollment}</p>
          </div>
        ))}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedStudent.name}
            </h2>
            <img
              src={selectedStudent.profileLink || "https://via.placeholder.com/150"}
              alt={selectedStudent.name}
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
            <ul className="text-lg mb-4">
              <li><strong>Enrollment:</strong> {selectedStudent.enrollment}</li>
              <li><strong>Branch:</strong> {selectedStudent.branch}</li>
              <li><strong>Hosteller/Commuter:</strong> {selectedStudent.hostellercommuter}</li>
              <li><strong>Semester:</strong> {selectedStudent.semester}</li>
              <li><strong>Phone:</strong> {selectedStudent.phone}</li>
              <li><strong>Parent's Phone:</strong> {selectedStudent.parentsphone}</li>
              <li><strong>GNU Email:</strong> {selectedStudent.gnuemail}</li>
              <li><strong>Personal Email:</strong> {selectedStudent.email}</li>
              <li><strong>Class:</strong> {selectedStudent.class}</li>
              <li><strong>Batch:</strong> {selectedStudent.batch}</li>
              <li><strong>Location:</strong> {location} ({time})</li>
            </ul>
            <button
              onClick={() => setSelectedStudent(null)}
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

export default SearchStudent;
