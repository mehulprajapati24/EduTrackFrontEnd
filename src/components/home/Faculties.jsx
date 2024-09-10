import React from 'react';
import image1 from '../../assets/user.png';

const faculties = [
  { name: 'Dr. A. B. Patel', image: image1 },
  { name: 'Prof. C. D. Shah', image: image1 },
  { name: 'Dr. E. F. Mehta', image: image1 },
  { name: 'Prof. G. H. Desai', image: image1 },
  { name: 'Dr. A. B. Patel', image: image1 },
  { name: 'Prof. C. D. Shah', image: image1 },
  { name: 'Dr. E. F. Mehta', image: image1 },
  { name: 'Prof. G. H. Desai', image: image1 },
  // Add more faculty details here
];

const Faculties = () => {
  return (
    <div className="w-full overflow-hidden py-8 group">
      {/* Marquee Wrapper */}
      <div className="flex justify-start items-center animate-slide whitespace-nowrap space-x-8 group-hover:animate-[slide_15s_linear_infinite_paused]">
        {/* Duplicated faculty list for smooth sliding */}
        {faculties.map((faculty, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-center text-sm sm:text-base md:text-lg font-semibold">{faculty.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculties;
