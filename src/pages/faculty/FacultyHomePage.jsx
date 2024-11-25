import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FacultyHomePage = () => {
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftTime, setShiftTime] = useState("");
  const [isStartRecorded, setIsStartRecorded] = useState(false);
  const [isEndRecorded, setIsEndRecorded] = useState(false);

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await axios.get("https://edutrackbackend-77k7.onrender.com/faculty/getProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const getSchedule = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await axios.get('https://edutrackbackend-77k7.onrender.com/faculty/getSchedule', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchedule(response.data.schedule);
      } else {
        navigate('/faculty/login');
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  const handleStartTime = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token && startTime) {
        await axios.post('https://edutrackbackend-77k7.onrender.com/faculty/startShift', {
          startTime,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        toast.success("Shift start time recorded successfully", {
          autoClose: 1400
        });
        setIsStartRecorded(true);
      }
    } catch (error) {
      console.error("Error recording start time:", error);
    }
  };

  const handleEndTime = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token && endTime) {
        const response = await axios.post('https://edutrackbackend-77k7.onrender.com/faculty/endShift', {
          endTime,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShiftTime(response.data.shiftTime);
        setIsEndRecorded(true);
        toast.success("Shift end time recorded successfully", {
          autoClose: 1400
        });
      }
    } catch (error) {
      console.error("Error recording end time:", error);
    }
  };

  const getFields = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if(token){
        const response = await axios.get("https://edutrackbackend-77k7.onrender.com/faculty/get-fields", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if(response.data.startDisplay && !response.data.endDisplay){
          setIsStartRecorded(false);
        }
        else if(!response.data.startDisplay && response.data.endDisplay){
          setIsStartRecorded(true);
        }
        else if(!response.data.startDisplay && !response.data.endDisplay){
          setIsStartRecorded(true);
          setIsEndRecorded(true);
          setShiftTime(response.data.shiftTime);
        }

      }else {
        navigate('/faculty/login');
      }
    } catch (error) {
      console.error("Something wrong:", error);
    }
  }

  useEffect(() => {
    getProfile();
    getSchedule();
    getFields();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-200 to-blue-400 rounded min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hello, {name}</h1>
      </div>

      <div className="space-y-8">
        {/* Current Class/Lab Details */}
        <div className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Class/Lab</h2>
          <div className="text-lg">
            {schedule[0] ? (
              <>
                <p className="mb-2"><strong>Type:</strong> {schedule[0].type}</p>
                <p className="mb-2"><strong>Subject:</strong> {schedule[0].subject}</p>
                <p className="mb-2"><strong>Location:</strong> {schedule[0].location}</p>
                <p className="mb-2"><strong>Time:</strong> {schedule[0].time}</p>
              </>
            ) : (
              <p>No Current Class Available</p>
            )}
          </div>
        </div>

        {/* Next Class/Lab Details */}
        <div className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Next Class/Lab</h2>
          <div className="text-lg">
            {schedule[1] ? (
              <>
                <p className="mb-2"><strong>Type:</strong> {schedule[1].type}</p>
                <p className="mb-2"><strong>Subject:</strong> {schedule[1].subject}</p>
                <p className="mb-2"><strong>Location:</strong> {schedule[1].location}</p>
                <p className="mb-2"><strong>Time:</strong> {schedule[1].time}</p>
              </>
            ) : (
              <p>No Next Class Available</p>
            )}
          </div>
        </div>

        {/* Start and End Time Fields */}
        <div className="bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shift Timing</h2>
          <div className="text-lg">
            {!isStartRecorded && (
              <div className="mb-4">
              <label>Start Time:</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="ml-2 p-1 border" />
              <button onClick={handleStartTime} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Record Start</button>
            </div>
            )}

            {isStartRecorded && !isEndRecorded && (
              <div className="mb-4">
                <label>End Time:</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="ml-2 p-1 border" />
                <button onClick={handleEndTime} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Record End</button>
              </div>
            )}
            {isEndRecorded && <p>Shift Time: {shiftTime}</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FacultyHomePage;
