import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const StudentChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [schedules, setSchedule] = useState([]);
  const [timetableData, setTimetableData] = useState(null);

  const fetchPersonalDetails = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await axios.get("http://localhost:5000/fetchProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPersonalDetails(response.data.profile);
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'AI Assistant', text:`Hello ${response.data.profile.name}! How can I help you?` }
        ]);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error('Error fetching personal data:', error);
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

  const getSchedule = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await axios.get('http://localhost:5000/getSchedule', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchedule(response.data.schedule);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };


  const fetchTimetableData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await axios.get("http://localhost:5000/getStudentTimetable", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimetableData(response.data.timetable);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };


 

  useEffect(() => {
    fetchPersonalDetails();
    fetchFaculties();
    getSchedule();
    fetchTimetableData();
  }, []);


  // Format students array to JSON string
  
  // const studentsData = JSON.stringify(students, null, 2);
  // console.log(studentsData);


  const facultyData = faculties.map((faculty, index)=> 
    `${index+1}. Faculty ${faculty.name}, Contact number: ${faculty.phone} and their GNU email is ${faculty.gnuemail}`
  ).join("\n");

  const scheduleData = schedules.map((schedule, index)=>
    (schedule ? ` if ${index+1} is 1 then this is the information about current class/lab details and if ${index+1} is 2 then this is the information about next class/lab details. Type of class like it is lecture or lab or break or no teaching load: ${schedule.type} and subject is ${schedule.subject} and taken by faculty: ${schedule.faculty} and location is ${schedule.location} and time is ${schedule.time}` : "if ${index+1} is 1 then No current class available and if ${index+1} is 2 then No next class available")
).join("\n");

// console.log(scheduleData);



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
      setInput('');

      // Generate the prompt
      // console.log(studentsData);
      // const prompt = `Here is some information about students in JSON format: ${studentsData}. Based on this information give me just direct answer and give me in text. not give me any json format, ${input}`;
      // const prompt = `Based on the following information, please answer concisely: Here is some information about students: ${studentsData} and Here is some information about: ${facultyData}. Based on this information give me just direct answer not any explanation, ${input}`;    

      const prompt = `
      I have data about my own information, faculty information, weekly timetable information and other details. Here’s a summary:

      My own personal Information:
      My name is ${personalDetails.name} (enrollment: ${personalDetails.enrollment}) is in class ${personalDetails.class}, batch ${personalDetails.batch}, branch ${personalDetails.branch}, currently in ${personalDetails.semester}. Their email is ${personalDetails.email}, and their GNU email is ${personalDetails.gnuemail}. This student is a ${personalDetails.hostellercommuter}. Contact number: ${personalDetails.phone}, and their parent's phone number is ${personalDetails.parentsphone}.\n

      Faculty Information:
      ${facultyData}

      Schedule Information or Current and Next Class Information:
      ${scheduleData}
      If no any data provided about current class then say like No current class available in schedule and If no any data provided about next class then say like No next class available in schedule.


      Timetable Information:
      query also asked for particular time and not giving range then use data for this and give appropriate answer.
      ${timetablesData}


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

export default StudentChatbot;
