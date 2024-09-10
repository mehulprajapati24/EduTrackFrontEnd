import React, { useEffect } from 'react';

const Timetable = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Google Drive Embed URL (replace 'view' with 'preview' for embedding)
  const googleDriveUrl = "https://drive.google.com/file/d/1i1cs59B_RXNZV41IERDbyA12PK6Y7uGH/preview";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#010562]">Timetable</h1>

      <div className="w-full max-w-4xl h-auto">
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe 
            src={googleDriveUrl} 
            title="Timetable"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
