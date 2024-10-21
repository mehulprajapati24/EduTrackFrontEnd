import React, { useState, useEffect } from 'react';
import axios from 'axios';  

const AdminSearchFaculty = () => {
  const [faculties, setFaculties] = useState([]);  // Set faculties to an empty array initially
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/get-faculty-data'); // Adjusted API endpoint
        setFaculties(response.data.faculties);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFaculties();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredFaculties = faculties
    ? faculties.filter(
        (faculty) =>
          faculty.name.toLowerCase().includes(searchQuery) ||
          faculty.enrollment.includes(searchQuery) // Assuming faculties have an employeeId instead of enrollment
      )
    : [];

  const handleFacultyClick = async (faculty) => {
    try {
      const nameParts = faculty.name.split(' ').filter(part => part);
    
      const shortName = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    
      const response = await axios.post('http://localhost:5000/admin/get-faculty-location', { facultyName: shortName }); // Adjusted payload
      setLocation(response.data.location);
      setTime(response.data.time);
      setSelectedFaculty(faculty);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Search Faculty</h1>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or enrollment"
          className="p-3 w-full sm:w-96 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculties.map((faculty) => (
          <div
            key={faculty.enrollment} // Assuming faculties have a unique employeeId
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105"
            onClick={() => handleFacultyClick(faculty)}
          >
            <h2 className="text-xl font-semibold text-center mb-2">{faculty.name}</h2>
            <p className="text-center text-gray-600">{faculty.enrollment}</p> {/* Adjusted to display employee ID */}
          </div>
        ))}
      </div>

      {/* Faculty Details Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedFaculty.name}
            </h2>
            <img
              src={selectedFaculty.photo}
              alt={selectedFaculty.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <ul className="text-lg mb-4">
              <li><strong>Enrollment:</strong> {selectedFaculty.enrollment}</li> {/* Adjusted to show employee ID */}
              <li><strong>Branch:</strong> {selectedFaculty.branch}</li>
              <li><strong>Phone:</strong> {selectedFaculty.phone}</li>
              <li><strong>GNU Email:</strong> {selectedFaculty.gnuemail}</li>
              <li><strong>Location:</strong> {location} ({time})</li>
            </ul>
            <button
              onClick={() => setSelectedFaculty(null)}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSearchFaculty;



// import React, { useState, useEffect } from 'react';

// const AdminSearchFaculty = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [selectedFaculty, setSelectedFaculty] = useState(null);
//   const [facultyList, setFacultyList] = useState([
//     { id: 1, name: 'Dr. John Doe', isAvailable: false, location: 'Class 101, Batch A' },
//     { id: 2, name: 'Prof. Jane Smith', isAvailable: true, location: null },
//     { id: 3, name: 'Dr. Emily Davis', isAvailable: false, location: 'Class 202, Batch B' },
//     { id: 4, name: 'Prof. Michael Johnson', isAvailable: true, location: null },
//   ]);
//   const [filteredFaculty, setFilteredFaculty] = useState(facultyList);
//   const [filterBy, setFilterBy] = useState('all');

//   const [classInput, setClassInput] = useState('');
//   const [subjectInput, setSubjectInput] = useState('');
//   const [messageInput, setMessageInput] = useState('');

//   useEffect(() => {
//     // Scroll to the top of the page when the component mounts
//     window.scrollTo(0, 0);
//   }, []);

//   // Filter faculty list based on search query and availability filter
//   useEffect(() => {
//     const filtered = facultyList.filter((faculty) => {
//       const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase());
//       if (filterBy === 'available') {
//         return matchesSearch && faculty.isAvailable;
//       }
//       if (filterBy === 'unavailable') {
//         return matchesSearch && !faculty.isAvailable;
//       }
//       return matchesSearch;
//     });
//     setFilteredFaculty(filtered);
//   }, [searchQuery, filterBy, facultyList]);

//   const handleAllocateClick = (faculty) => {
//     setSelectedFaculty(faculty);
//     setShowForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to handle form submission (e.g., send request)
//     console.log('Class:', classInput);
//     console.log('Subject:', subjectInput);
//     console.log('Message:', messageInput);
//     setShowForm(false); // Close the form after submission
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 to-blue-200">
//       <h1 className="text-3xl font-bold text-center mb-8">Search Faculty</h1>

//       {/* Search and Filter Options */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
//         <input
//           type="text"
//           className="p-3 rounded-lg shadow-lg text-lg mb-4 sm:mb-0 sm:mr-4 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Search Faculty..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <select
//           className="p-3 rounded-lg shadow-lg text-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={filterBy}
//           onChange={(e) => setFilterBy(e.target.value)}
//         >
//           <option value="all">All Faculties</option>
//           <option value="available">Available Faculties</option>
//           <option value="unavailable">Unavailable Faculties</option>
//         </select>
//       </div>

//       {/* Faculty List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredFaculty.map((faculty) => (
//           <div
//             key={faculty.id}
//             className="p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
//           >
//             <h2 className="text-2xl font-semibold mb-2">{faculty.name}</h2>
//             {faculty.isAvailable ? (
//               <p className="text-green-500 text-lg font-bold">Free</p>
//             ) : (
//               <p className="text-red-500 text-lg">In Class: {faculty.location}</p>
//             )}
//             {faculty.isAvailable && (
//               <button
//                 className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 onClick={() => handleAllocateClick(faculty)}
//               >
//                 Allocate
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Allocation Form (Modal) */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//             <h2 className="text-2xl font-semibold mb-4">Allocate {selectedFaculty.name}</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-lg font-medium mb-2">Class</label>
//                 <input
//                   type="text"
//                   className="p-3 w-full rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={classInput}
//                   onChange={(e) => setClassInput(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-lg font-medium mb-2">Subject</label>
//                 <input
//                   type="text"
//                   className="p-3 w-full rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={subjectInput}
//                   onChange={(e) => setSubjectInput(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-lg font-medium mb-2">Additional Message</label>
//                 <textarea
//                   className="p-3 w-full rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
//               >
//                 Submit Request
//               </button>
//               <button
//                 type="button"
//                 className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//                 onClick={() => setShowForm(false)}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSearchFaculty;
