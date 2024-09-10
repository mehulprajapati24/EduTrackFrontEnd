import React, { useEffect } from 'react';

const Schedule = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 md:py-40 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">Class Schedule Overview</h1>
      </div>

      {/* Card Container */}
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {/* Current Class Details Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Current Lecture/Lab Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Lecture/Lab:</span>
              <span className="text-blue-600">NB209</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Subject:</span>
              <span className="text-blue-600">Artificial Intelligence</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Faculty:</span>
              <span className="text-blue-600">Hiten Sadani</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-blue-700">Time:</span>
              <span className="text-blue-600">9:10 to 10:00</span>
            </div>
          </div>
        </div>

        {/* Next Class Details Card */}
        <div className="bg-green-50 p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Next Lecture/Lab Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Lecture/Lab:</span>
              <span className="text-green-600">NB310</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Subject:</span>
              <span className="text-green-600">Machine Learning</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Faculty:</span>
              <span className="text-green-600">Amit Sharma</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Time:</span>
              <span className="text-green-600">10:15 to 11:05</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="text-center mt-12">
        <a href="/timetable" className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300">
          View Timetable
        </a>
      </div>
    </div>
  );
};

export default Schedule;
