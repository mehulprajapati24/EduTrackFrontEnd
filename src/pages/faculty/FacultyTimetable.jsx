import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyTimetable = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchTimetableData();
    // console.log(timetableData);
  }, []);

  const fetchTimetableData = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const response = await axios.get("https://edutrackbackend-opga.onrender.com/faculty/getFacultyTimetable", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimetableData(response.data.timetable);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setError("Failed to load the timetable data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetableDataForDay = async (day) => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);
    setSelectedTime(""); // Clear time when a new day is selected

    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await axios.get(`https://edutrackbackend-opga.onrender.com/faculty/getFacultyTimetableBasedOnDay?day=${day}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimetableData(response.data.timetable);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching timetable for selected day:", error);
      setError("Failed to load the timetable data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetableDataForTime = async (time) => {
    if (!selectedDay) return; // Ensure a day is selected before fetching time-based data

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await axios.get(`https://edutrackbackend-opga.onrender.com/faculty/getFacultyTimetableBasedOnTime?day=${selectedDay}&time=${time}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimetableData(response.data.timetable);
      } else {
        navigate("/faculty/login");
      }
    } catch (error) {
      console.error("Error fetching timetable for selected time:", error);
      setError("No class found at the selected time.");
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (event) => {
    const day = event.target.value;
    setSelectedDay(day);
    fetchTimetableDataForDay(day);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    fetchTimetableDataForTime(time);
  };

  const getCellClass = (cellContent) => {
    if (cellContent.includes("Break")) {
      return { backgroundColor: "#CCCCCC" };
    } else if (cellContent.includes("No Teaching Load")) {
      return { backgroundColor: "#D9EAD3" };
    } else if (cellContent.includes("day") || cellContent.includes("Day")) {
      return { backgroundColor: "#00FF00" };
    } else if (cellContent.includes("to")) {
      return { backgroundColor: "#00FF00" };
    }
    return { backgroundColor: "#FFFFFF" };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 rounded p-8">
      <h1 className="text-3xl font-bold text-center text-[#000000]">
        Timetable
      </h1>

      {loading && (
        <div className="text-center mt-6 text-lg text-blue-600">
          Loading timetable...
        </div>
      )}

      {error && <div className="text-center text-red-600 mt-6">{error}</div>}

      {timetableData && (
        <>
          <div className="mt-4">
            <label htmlFor="daySelect" className="font-medium mr-2">
              Select Day:
            </label>
            <select
              id="daySelect"
              value={selectedDay}
              onChange={handleDayChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select Day
              </option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </div>

          {selectedDay && (
            <div className="mt-4">
              <label htmlFor="timeSelect" className="font-medium mr-2">
                Select Time:
              </label>
              <input
                type="time"
                id="timeSelect"
                value={selectedTime}
                onChange={handleTimeChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="mt-8 max-w-full overflow-x-auto border border-gray-300 rounded-lg shadow-md">
            <table className="min-w-full bg-white border-2 border-black shadow-md rounded-lg">
              <tbody>
                {timetableData.map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex} className="hover:bg-gray-100">
                      {row.map((cell, cellIndex) => {
                        const shouldRowspan = cell.trim().endsWith("2");
                        var isRowspanCell =
                          rowIndex > 0 &&
                          timetableData[rowIndex - 1][cellIndex]
                            .trim()
                            .endsWith("2");
                        if (isRowspanCell) {
                          isRowspanCell =
                            timetableData[rowIndex - 1][cellIndex] ===
                            timetableData[rowIndex][cellIndex];
                        }

                        const modifiedCell = cell.trim().endsWith("1")
                          ? cell.trim().slice(0, -1)
                          : cell.trim().endsWith("2")
                          ? cell.trim().slice(0, -1)
                          : cell.trim();

                        if (shouldRowspan && !isRowspanCell) {
                          return (
                            <td
                              key={cellIndex}
                              rowSpan={2}
                              className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}
                              style={{
                                verticalAlign: "middle",
                                ...(getCellClass(cell) || {}),
                              }}
                            >
                              <pre>{modifiedCell}</pre>
                            </td>
                          );
                        }

                        if (isRowspanCell) {
                          return null;
                        }

                        return (
                          <td
                            key={cellIndex}
                            className={`p-4 border border-black text-gray-700 whitespace-nowrap text-center`}
                            style={{
                              verticalAlign: "middle",
                              ...(getCellClass(cell) || {}),
                            }}
                          >
                            <pre>{modifiedCell}</pre>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FacultyTimetable;
