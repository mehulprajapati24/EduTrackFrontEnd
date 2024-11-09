import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [isUploadVisible, setUploadVisible] = useState(false);

  // Fetch profile data when the component mounts
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await axios.get('https://edu-track-back-end.vercel.app/fetchProfile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data.profile);
        setImage(response.data.profile.profileLink || 'https://via.placeholder.com/150');
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle image upload
  const handleImageUpload = async (fileList) => {
    if (fileList && fileList.allEntries.length > 0) {
      const fileInfo = fileList.allEntries[0];
      const cdnUrl = await fileInfo.cdnUrl;
  
      if (cdnUrl) {
        setImage(cdnUrl);
  
        // Make POST request to save the image URL in the database
        try {
          const token = localStorage.getItem('accessToken');
          if (token) {
            await axios.post(
              'https://edu-track-back-end.vercel.app/updateProfileImage',
              { image: cdnUrl },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
            setUploadVisible(false); // Hide uploader after successful upload
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r bg-[#E0EDFF] p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center space-y-4 mb-8 relative">
          <div className="relative">
            <img
              src={image}
              alt="Profile"
              className="w-48 h-48 rounded-full"
            />

            {/* Plus Button Positioned at Bottom Center of the Image */}
           {!isUploadVisible && (
            <button
            className="absolute bottom-4 right-8 transform translate-y-1/2 translate-x-1/4 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700"
            onClick={() => setUploadVisible(true)} // Show uploader when clicked
          >
            <FaPlus />
          </button>
           )
           } 

            {/* Uploadcare File Uploader */}
            {isUploadVisible && (
              <FileUploaderRegular
                pubkey="3354e8d21b869e585766" // Replace with your actual Uploadcare public key
                onChange={handleImageUpload}
                accept="image/*"
                className="file-uploader absolute bottom-[-45px] right-8"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Enrollment No:</span>
            <span className="text-gray-600 mt-1">{profile.enrollment}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Name:</span>
            <span className="text-gray-600 mt-1">{profile.name}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Branch:</span>
            <span className="text-gray-600 mt-1">{profile.branch}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Hosteller/Commuter:</span>
            <span className="text-gray-600 mt-1">{profile.hostellercommuter}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Semester:</span>
            <span className="text-gray-600 mt-1">{profile.semester}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Phone:</span>
            <span className="text-gray-600 mt-1">{profile.phone}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">GNU Email ID:</span>
            <span className="text-gray-600 mt-1">{profile.gnuemail}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Personal Email ID:</span>
            <span className="text-gray-600 mt-1">{profile.email}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Batch:</span>
            <span className="text-gray-600 mt-1">{profile.batch}</span>
          </div>
          <div className="flex flex-col p-4 border rounded-lg bg-gray-50">
            <span className="font-semibold text-gray-700 capitalize">Class:</span>
            <span className="text-gray-600 mt-1">{profile.class}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
