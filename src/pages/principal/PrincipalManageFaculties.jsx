import React, { useState } from 'react';
import ViewFaculties from './ViewFaculties';

const ManageFaculties = () => {
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: 'Dr. John Doe',
      personalEmail: 'john.doe@example.com',
      gnuEmail: 'john.doe@gnu.com',
      phone: '123-456-7890',
      photo: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Prof. Jane Smith',
      personalEmail: 'jane.smith@example.com',
      gnuEmail: 'jane.smith@gnu.com',
      phone: '987-654-3210',
      photo: 'https://via.placeholder.com/150',
    },
  ]);

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    personalEmail: '',
    gnuEmail: '',
    phone: '',
    photo: null,
  });

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showViewFaculties, setShowViewFaculties] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleNewFacultyChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    setNewFaculty({ ...newFaculty, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleNewFacultySubmit = (e) => {
    e.preventDefault();
    setFaculties([
      ...faculties,
      { ...newFaculty, id: faculties.length + 1 },
    ]);
    setNewFaculty({
      name: '',
      personalEmail: '',
      gnuEmail: '',
      phone: '',
      photo: null,
    });
  };

  const handleEdit = (faculty) => {
    setSelectedFaculty(faculty);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setFaculties(faculties.filter(faculty => faculty.id !== id));
  };

  const handleModalChange = (e) => {
    setSelectedFaculty({ ...selectedFaculty, [e.target.name]: e.target.value });
  };

  const handleModalPhotoUpload = (e) => {
    setSelectedFaculty({ ...selectedFaculty, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleModalSubmit = () => {
    setFaculties(faculties.map(faculty => faculty.id === selectedFaculty.id ? selectedFaculty : faculty));
    setShowModal(false);
  };

  const handleViewDetails = (faculty) => {
    setSelectedFaculty(faculty);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Faculties</h1>

      {!showViewFaculties ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Faculty</h2>
            <form onSubmit={handleNewFacultySubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="p-2 w-full rounded-lg border"
                  value={newFaculty.name}
                  onChange={handleNewFacultyChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Personal Email</label>
                <input
                  type="email"
                  name="personalEmail"
                  className="p-2 w-full rounded-lg border"
                  value={newFaculty.personalEmail}
                  onChange={handleNewFacultyChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">GNU Email</label>
                <input
                  type="email"
                  name="gnuEmail"
                  className="p-2 w-full rounded-lg border"
                  value={newFaculty.gnuEmail}
                  onChange={handleNewFacultyChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="p-2 w-full rounded-lg border"
                  value={newFaculty.phone}
                  onChange={handleNewFacultyChange}
                  required
                />
              </div>
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
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Add Faculty
                </button>
              </div>
            </form>
          </div>
          
          <button
            onClick={() => setShowViewFaculties(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            View All Faculties
          </button>
        </>
      ) : (
        <ViewFaculties
          faculties={faculties}
          setShowViewFaculties={setShowViewFaculties}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Faculty</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="p-2 w-full rounded-lg border"
                  value={selectedFaculty.name}
                  onChange={handleModalChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Personal Email</label>
                <input
                  type="email"
                  name="personalEmail"
                  className="p-2 w-full rounded-lg border"
                  value={selectedFaculty.personalEmail}
                  onChange={handleModalChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">GNU Email</label>
                <input
                  type="email"
                  name="gnuEmail"
                  className="p-2 w-full rounded-lg border"
                  value={selectedFaculty.gnuEmail}
                  onChange={handleModalChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="p-2 w-full rounded-lg border"
                  value={selectedFaculty.phone}
                  onChange={handleModalChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="p-2 w-full rounded-lg border"
                  onChange={handleModalPhotoUpload}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetails && selectedFaculty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Faculty Details</h2>
            <div className="mb-4">
              <img src={selectedFaculty.photo} alt="Faculty" className="w-24 h-24 rounded-full mb-4" />
              <p><strong>Name:</strong> {selectedFaculty.name}</p>
              <p><strong>Personal Email:</strong> {selectedFaculty.personalEmail}</p>
              <p><strong>GNU Email:</strong> {selectedFaculty.gnuEmail}</p>
              <p><strong>Phone Number:</strong> {selectedFaculty.phone}</p>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFaculties;
