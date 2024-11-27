import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from '../../assets/user.png'; // Default image if faculty data doesn't include an image

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);

  // Fetch the faculties data from the backend
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getFaculties');
        setFaculties(response.data.faculties);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div className="w-full overflow-hidden py-8 group">
      {/* Marquee Wrapper */}
      <div className="flex justify-start items-center animate-slide whitespace-nowrap space-x-8 group-hover:animate-[slide_30s_linear_infinite_paused]">
        {/* Display faculties */}
        {faculties.length > 0 ? (
          faculties.map((faculty, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg">
                <img
                  src={faculty.profileLink || image1} // Use default image if no image provided
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-center text-sm sm:text-base md:text-lg font-semibold">{faculty.name}</h3>
            </div>
          ))
        ) : (
          <p>Loading faculties...</p>
        )}
      </div>
    </div>
  );
};

export default Faculties;
