import React, { useState, useEffect } from 'react';
import ViewStudents from './ViewStudents';

const ManageStudents = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    enrollment: '',
    class: '',
    batch: '',
    branch: '',
    commuterHosteller: '', // Updated field
    phone: '',
    parentPhone: '',
    personalEmail: '',
    gnuEmail: '',
    photo: null,
    semester: '',
    academicYear: ''
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewStudents, setShowViewStudents] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Example options
  const classes = ['Class 1', 'Class 2', 'Class 3'];
  const batches = ['Batch A', 'Batch B', 'Batch C'];
  const commuterHostellers = ['Commuter', 'Hosteller'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3'];
  const academicYears = ['2024-2025', '2025-2026', '2026-2027'];

  const handleNewStudentChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    setNewStudent({ ...newStudent, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleNewStudentSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({
      name: '',
      enrollment: '',
      class: '',
      batch: '',
      branch: '',
      commuterHosteller: '', // Updated field
      phone: '',
      parentPhone: '',
      personalEmail: '',
      gnuEmail: '',
      photo: null,
      semester: '',
      academicYear: ''
    });
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleModalChange = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const handleModalPhotoUpload = (e) => {
    setSelectedStudent({ ...selectedStudent, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleModalSubmit = () => {
    setStudents(students.map(student => student.id === selectedStudent.id ? selectedStudent : student));
    setShowModal(false);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Students</h1>

      {!showViewStudents ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <form onSubmit={handleNewStudentSubmit} className="space-y-4">
              {/* First row for Academic Year and Semester */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Academic Year</label>
                  <select
                    name="academicYear"
                    className="p-2 w-full rounded-lg border"
                    value={newStudent.academicYear}
                    onChange={handleNewStudentChange}
                    required
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Semester</label>
                  <select
                    name="semester"
                    className="p-2 w-full rounded-lg border"
                    value={newStudent.semester}
                    onChange={handleNewStudentChange}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Other fields */}
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(newStudent).map((key) => (
                  key !== 'photo' && key !== 'academicYear' && key !== 'semester' ? (
                    key === 'class' || key === 'batch' || key === 'commuterHosteller' ? (
                      <div key={key}>
                        <label className="block text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <select
                          name={key}
                          className="p-2 w-full rounded-lg border"
                          value={newStudent[key]}
                          onChange={handleNewStudentChange}
                          required
                        >
                          <option value="">Select {key.replace(/([A-Z])/g, ' $1')}</option>
                          {key === 'class' && classes.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                          {key === 'batch' && batches.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                          {key === 'commuterHosteller' && commuterHostellers.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div key={key}>
                        <label className="block text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                          type={key === 'personalEmail' || key === 'gnuEmail' ? 'email' : 'text'}
                          name={key}
                          className="p-2 w-full rounded-lg border"
                          value={newStudent[key]}
                          onChange={handleNewStudentChange}
                          required
                        />
                      </div>
                    )
                  ) : null
                ))}
                <div>
                  <label className="block text-sm font-medium">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="p-2 w-full rounded-lg border"
                    onChange={handlePhotoUpload}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>

          <button
            onClick={() => setShowViewStudents(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            View All Students
          </button>
        </>
      ) : (
        <ViewStudents
          students={students}
          setShowViewStudents={setShowViewStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }} className="space-y-4">
              {/* First row for Academic Year and Semester */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Academic Year</label>
                  <select
                    name="academicYear"
                    className="p-2 w-full rounded-lg border"
                    value={selectedStudent.academicYear}
                    onChange={handleModalChange}
                    required
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Semester</label>
                  <select
                    name="semester"
                    className="p-2 w-full rounded-lg border"
                    value={selectedStudent.semester}
                    onChange={handleModalChange}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Other fields */}
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(selectedStudent).map((key) => (
                  key !== 'photo' && key !== 'academicYear' && key !== 'semester' ? (
                    key === 'class' || key === 'batch' || key === 'commuterHosteller' ? (
                      <div key={key}>
                        <label className="block text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <select
                          name={key}
                          className="p-2 w-full rounded-lg border"
                          value={selectedStudent[key]}
                          onChange={handleModalChange}
                          required
                        >
                          <option value="">Select {key.replace(/([A-Z])/g, ' $1')}</option>
                          {key === 'class' && classes.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                          {key === 'batch' && batches.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                          {key === 'commuterHosteller' && commuterHostellers.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div key={key}>
                        <label className="block text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                          type={key === 'personalEmail' || key === 'gnuEmail' ? 'email' : 'text'}
                          name={key}
                          className="p-2 w-full rounded-lg border"
                          value={selectedStudent[key]}
                          onChange={handleModalChange}
                          required
                        />
                      </div>
                    )
                  ) : null
                ))}
                <div>
                  <label className="block text-sm font-medium">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="p-2 w-full rounded-lg border"
                    onChange={handleModalPhotoUpload}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetails && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <div className="space-y-4">
              {Object.keys(selectedStudent).map((key) => (
                key !== 'photo' && key !== 'academicYear' && key !== 'semester' ? (
                  <div key={key}>
                    <strong className="block text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>
                    <p className="text-sm">{selectedStudent[key]}</p>
                  </div>
                ) : null
              ))}
              {selectedStudent.photo && (
                <div>
                  <strong className="block text-sm font-medium">Photo:</strong>
                  <img src={selectedStudent.photo} alt="Student" className="mt-2 w-32 h-32 object-cover" />
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
