import React, { useState } from 'react';

const SearchStudent = () => {
  const [students, setStudents] = useState([
    {
      enrollment: '123456',
      name: 'John Doe',
      location: 'Classroom A',
      personalEmail: 'john.doe@example.com',
      gnuEmail: 'john.doe@gnu.com',
      phone: '123-456-7890',
      parentsPhone: '987-654-3210',
      type: 'Commuter',
      photo: 'https://via.placeholder.com/150',
      semester: '5th',
      branch: 'Computer Engineering',
      class: 'A',
      batch: 'A-2',
    },
    {
      enrollment: '654321',
      name: 'Jane Smith',
      location: 'Lab 3',
      personalEmail: 'jane.smith@example.com',
      gnuEmail: 'jane.smith@gnu.com',
      phone: '987-654-3210',
      parentsPhone: '123-456-7890',
      type: 'Hosteller',
      photo: 'https://via.placeholder.com/150',
      semester: '6th',
      branch: 'Information Technology',
      class: 'B',
      batch: 'B-3',
    },
    // Add more students here
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery) ||
      student.enrollment.includes(searchQuery)
  );

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-blue-200">
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
        {filteredStudents.map((student) => (
          <div
            key={student.enrollment}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105"
            onClick={() => handleStudentClick(student)}
          >
            <h2 className="text-xl font-semibold text-center mb-2">{student.name}</h2>
            <p className="text-center text-gray-600">{student.enrollment}</p>
            <p className="text-center text-gray-600">{student.location}</p>
          </div>
        ))}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedStudent.name}
            </h2>
            <img
              src={selectedStudent.photo}
              alt={selectedStudent.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <ul className="text-lg mb-4">
              <li><strong>Enrollment:</strong> {selectedStudent.enrollment}</li>
              <li><strong>Personal Email:</strong> {selectedStudent.personalEmail}</li>
              <li><strong>GNU Email:</strong> {selectedStudent.gnuEmail}</li>
              <li><strong>Phone:</strong> {selectedStudent.phone}</li>
              <li><strong>Parents' Phone:</strong> {selectedStudent.parentsPhone}</li>
              <li><strong>Type:</strong> {selectedStudent.type}</li>
              <li><strong>Semester:</strong> {selectedStudent.semester}</li>
              <li><strong>Branch:</strong> {selectedStudent.branch}</li>
              <li><strong>Class:</strong> {selectedStudent.class}</li>
              <li><strong>Batch:</strong> {selectedStudent.batch}</li>
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
