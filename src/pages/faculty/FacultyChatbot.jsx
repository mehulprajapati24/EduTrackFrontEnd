import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI("");

const FacultyChatbot = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [schedules, setSchedule] = useState([]);
  const [timetableData, setTimetableData] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [studentWithLocation, setStudentsWithLocation] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get-students-data');
      setStudents(response.data.students);
      // console.log(response.data.students);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get-faculty-data'); // Adjusted API endpoint
      setFaculties(response.data.faculties);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get-room-data'); // Adjust API endpoint as needed
      setRooms(response.data.rooms);
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  };

  const getSchedule = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await axios.get('http://localhost:5000/faculty/getSchedule', {
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


  const fetchTimetableData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await axios.get("http://localhost:5000/faculty/getFacultyTimetable", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.timetable);
        setTimetableData(response.data.timetable);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const getShiftsOfFaculty = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await axios.get("http://localhost:5000/faculty/getShiftsOfFaculty", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.shifts);
        setShifts(response.data.shifts);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  }

  const fetchStudentLocation = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get-students-location'); // Adjust API endpoint as needed
      setStudentsWithLocation(response.data.studentWithLocation);
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  };


  const getProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await axios.get("http://localhost:5000/faculty/getProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'AI Assistant', text: `Hello ${response.data.name}! How can I help you?` }
        ]);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

 

  useEffect(() => {
    fetchStudents();
    fetchFaculties();
    getSchedule();
    fetchTimetableData();
    getShiftsOfFaculty();
    fetchStudentLocation();
    fetchRooms();
    getProfile();
  }, []);


  // Format students array to JSON string
  
  // const studentsData = JSON.stringify(students, null, 2);
  // console.log(studentsData);


  const studentsData = students.map((student, index) => 
    `${index+1}. Student ${student.name} (enrollment: ${student.enrollment}) is in class ${student.class}, batch ${student.batch}, branch ${student.branch}, currently in ${student.semester}. Their email is ${student.email}, and their GNU email is ${student.gnuemail}. This student is a ${student.hostellercommuter}. Contact number: ${student.phone}, and their parent's phone number is ${student.parentsphone}.`
  ).join("\n");

  const facultyData = faculties.map((faculty, index)=> 
    `${index+1}. Faculty ${faculty.name} (employee ID: ${faculty.enrollment}) is in branch ${faculty.branch}, Contact number: ${faculty.phone} and their GNU email is ${faculty.gnuemail}`
  ).join("\n");

  const scheduleData = schedules.map((schedule, index)=>
    (schedule ? ` if ${index+1} is 1 then this is the information about current class/lab details and if ${index+1} is 2 then this is the information about next class/lab details. Type of class like it is lecture or lab or break or no teaching load: ${schedule.type} and subject is ${schedule.subject} and location is ${schedule.location} and time is ${schedule.time}` : "if ${index+1} is 1 then No current class available and if ${index+1} is 2 then No next class available")
).join("\n");

const roomData = rooms.map((room, index)=>
  `${index + 1}. Class or Lab or Room: ${room.location} is ${room.availability} and other information like there are ${room.acs} ac, ${room.chairs} chairs, ${room.benches} benches, ${room.computers} computers, ${room.fans} fans, ${room.tubelights} tubelights and ${room.projectors} projectors.`
).join("\n");

// console.log(scheduleData);

const shiftData = shifts.map((shift, index) => 
  `${index + 1}. I have a shift from ${shift.startTime}` + 
  (shift.endTime ? ` to ${shift.endTime}` : "") + 
  ` on ${shift.date}.`
).join("\n");

const studentLocationData = studentWithLocation.map((studentLocation, index)=>
  `${index + 1}. Student enrollment number: ${studentLocation.enrollment} and whose name is ${studentLocation.name} and current location is ${studentLocation.location}.`
).join("\n");


if(timetableData){
  var timetablesData = timetableData.map((row, rowIndex) => {
    if (rowIndex === 0) return ""; // Skip the header row
  
    const timeSlot = row[0];
    const dayData = row.slice(1).map((entry, dayIndex) => {
      const day = timetableData[0][dayIndex + 1];
      if (entry === "No Teaching Load" || entry === "Break") {
        return `${day} at ${timeSlot}: ${entry}`;
      }
  
      const [subject, classDetails, faculty, location, load] = entry.split("\r\n");
      return `${day} at ${timeSlot}: ${subject} and classes or batches:(${classDetails}) taught by ${faculty} in ${location} (${load === '1' ? 'Lecture' : 'Lab'})`;
    }).join("\n");
  
    return `Time Slot: ${timeSlot}\n${dayData}`;
  }).join("\n\n");
}

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Display user's message
      setMessages([...messages, { sender: 'User', text: input }]);

      const inputData = input;

      setInput('');

      const enrollmentPattern = /\b\d{11}\b/; // Matches an 11-digit enrollment number
      const namePattern = /[A-Z]+\s+[A-Z]+\s+[A-Z]+/; // Matches names in "FIRSTNAME LASTNAME LASTNAME" format
      const timePattern = /\b\d{1,2}:\d{2}\s?(AM|PM)\b/i; // Matches time in "HH:MM AM/PM" format
      const dayPattern = /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i; // Matches days of the week

      // Extract enrollment number
      const enrollmentMatch = inputData.match(enrollmentPattern);
      const enrollment = enrollmentMatch ? enrollmentMatch[0] : null;

      // Extract name
      const nameMatch = inputData.match(namePattern);
      const name = nameMatch ? nameMatch[0] : null;

      // Extract time
      const timeMatch = inputData.match(timePattern);
      const time = timeMatch ? timeMatch[0] : null;

      // Extract day
      const dayMatch = inputData.match(dayPattern);
      const day = dayMatch ? dayMatch[0] : null;

      const responseLocation = await axios.post('http://localhost:5000/admin/get-student-location-based-on-prompt',{
        enrollment,
        name,
        time,
        day
      });

      const searchedStudentLocation = responseLocation.data.location;

      // Generate the prompt
      // console.log(studentsData);
      // const prompt = `Here is some information about students in JSON format: ${studentsData}. Based on this information give me just direct answer and give me in text. not give me any json format, ${input}`;
      // const prompt = `Based on the following information, please answer concisely: Here is some information about students: ${studentsData} and Here is some information about: ${facultyData}. Based on this information give me just direct answer not any explanation, ${input}`;    

      const prompt = `
      I have data about student information, also having student location information, faculty information, weekly timetable information, my all shift information, classes or rooms which are available or occupied at current time and other details. Here’s a summary:

      If asking for location for student by their enrollment: ${enrollment} or name: ${name} at particular time: ${time} and on particular day: ${day} then location is: ${searchedStudentLocation}.
      
      Student Information:
      ${studentsData}

      Student Location Information:
      ${studentLocationData}

      Faculty Information:
      ${facultyData}

      Schedule Information or Current and Next Class Information:
      ${scheduleData}
      If no any data provided about current class then say like No current class available in schedule and If no any data provided about next class then say like No next class available in schedule.


      Timetable Information:
      ${timetablesData}

      My Shifts Information:
      ${shiftData}

      Class or Lab or Room Information:
      ${roomData}

      Based on this information, please provide a direct answer to the following question:
      "${input}"

      Respond with a clear, concise answer in text format only.
      `;

      
      // Call Google Generative AI to get the response
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      // Display chatbot response
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'AI Assistant', text }
      ]);
    }
  };

  const handleChatbotToggle = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const handleCloseChatbot = () => {
    setIsChatbotVisible(false);
  };

  return (
    <div className="relative">
      {/* Circular Button for Chatbot Toggle */}
      {!isChatbotVisible && (
        <button
          onClick={handleChatbotToggle}
          className="absolute bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-xl">💬</span>
        </button>
      )}

      {/* Chatbot Container */}
      {isChatbotVisible && (
        <div className="chatbot-container bg-white shadow-xl p-5 rounded-3xl w-full max-w-lg mx-auto h-[500px] flex flex-col">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-5">Q&A Helper</h2>

          {/* Close Button */}
          <button
            onClick={handleCloseChatbot}
            className="absolute top-3 right-3 text-blue-600 font-semibold hover:text-blue-700 focus:outline-none"
          >
            Close
          </button>

          <div className="chat-messages flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-md mb-5">
            {messages.map((message, index) => (
              <div key={index} className={`message p-3 mb-4 rounded-lg ${message.sender === 'User' ? 'bg-blue-200 text-right' : 'bg-green-200 text-left'}`}>
                <span className={`font-semibold ${message.sender === 'User' ? 'text-blue-600' : 'text-green-600'}`}>
                  {message.sender}:
                </span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="chat-input flex items-center mt-auto">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow p-3 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyChatbot;
