import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import axios from 'axios';

const FacultyRequiredPasswordChange = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageError, setImageError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState('');
  const [image, setImage] = useState('');

  const requireChange = location.state?.requireChange;

  // Redirect to login if requireChange is not true
  useEffect(() => {
    if (!requireChange) {
      navigate('/login'); // Adjust the route as needed
    }
    setKey("3354e8d21b869e585766");
  }, [requireChange, navigate]);

  const handleFileChange = (fileList) => {
    if (fileList && fileList.allEntries.length > 0) {
      const fileInfo = fileList.allEntries[0];
      setImage(fileInfo.cdnUrl);
      setImageError(''); // Clear image error if a file is uploaded
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setImageError('Profile image is required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
    } else {
      // Handle password change logic here (e.g., API call)

      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.post(
            'https://edutrackbackend-rjl9.onrender.com/faculty/require',
            {
              password,  // data being sent
              image
            },
            {
              headers: {
                Authorization: `Bearer ${token}`  // authorization header
              }
            }
          );
          navigate('/faculty');
          // Handle success, maybe redirect the user or show a success message
        } else {
          navigate("/faculty/login");  // redirect to login if no token is found
        }
      } catch (error) {
        // Set an error message for UI, capture the server response or message
        setErrorMessage(error.response?.data?.message || "Something went wrong");
      }
       
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">Change Your Password</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Please update your password to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Profile Image
            </label>
            <FileUploaderRegular
              onChange={handleFileChange}
              pubkey={key}
              accept="image/*"
              className="file-uploader"
            />
            {/* Display error if no image is uploaded */}
            {imageError && <div className="text-red-500 text-sm mt-1">{imageError}</div>}
          </div>

          {/* Password Fields */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Display password error if exists */}
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyRequiredPasswordChange;
