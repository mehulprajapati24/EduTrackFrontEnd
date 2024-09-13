import React, { useState, useRef } from 'react';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon

const Profile = () => {
  const [photo, setPhoto] = useState('https://via.placeholder.com/150');
  const [photoChanged, setPhotoChanged] = useState(false);
  const fileInputRef = useRef(null); // Use ref to reference the file input

  const userInfo = {
    name: 'John Doe',
    enrollment: '21012021049',
    semester: '6',
    branch: 'Computer Engineering',
    class: 'CE-C',
    batch: 'CE-C3',
    email: 'john.doe@uvpce.ac.in',
    gnuEmail: 'john.doe@gnu.ac.in',
    phone: '9865321245',
    parentsPhone: '9965321256',
    status: 'Hosteller',
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setPhoto(file);
      setPhotoChanged(true); // Show save button when a photo is changed
    }
  };

  const handleSave = () => {
    // Save logic here
    setPhotoChanged(false); // Hide save button after saving
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input when plus button is clicked
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r bg-[##E0EDFF] p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center space-y-4 mb-8 relative">
          <div className="relative">
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef} // Reference to this hidden input
              onChange={handlePhotoChange}
              style={{ display: 'none' }} // Hide the input
            />

            {/* Plus Button Positioned at Bottom Center of the Image */}
            <button
              className="absolute bottom-3 right-5 transform translate-y-1/2 translate-x-1/4 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700"
              onClick={handleClick} // Open file input when plus button is clicked
            >
              <FaPlus />
            </button>
          </div>

          {photoChanged && (
            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(userInfo).map(([key, value]) => (
            <div key={key} className="flex flex-col p-4 border rounded-lg bg-gray-50">
              <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="text-gray-600 mt-1">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
