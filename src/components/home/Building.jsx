import React from 'react';
import newBuildingImage from '../../assets/form-bg.jpeg';
import mainBuildingImage from '../../assets/mainbuilding.jpeg';

const Building = () => {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">Our Buildings</h2>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* New Building */}
        <div className="flex-1">
          <div className="relative w-full h-60"> {/* Fixed height */}
            <img
              src={newBuildingImage}
              alt="New Building"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <h3 className="text-xl mt-4 text-center font-semibold">New Building</h3>
        </div>
        {/* Main Building */}
        <div className="flex-1">
          <div className="relative w-full h-60"> {/* Fixed height */}
            <img
              src={mainBuildingImage}
              alt="Main Building"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <h3 className="text-xl mt-4 text-center font-semibold">Main Building</h3>
        </div>
      </div>
    </div>
  );
};

export default Building;
