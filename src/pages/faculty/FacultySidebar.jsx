import React from 'react';
import { Link } from 'react-router-dom';

const FacultySidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Faculty Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/faculty"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/faculty/check-class-availability"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Check Class/Lab Availability
              </Link>
            </li>
            <li>
              <Link
                to="/faculty/view-class-location"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                View Class Location
              </Link>
            </li>
            <li>
              <Link
                to="/faculty/search-faculty"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Search Faculty
              </Link>
            </li>
            <li>
              <Link
                to="/faculty/search-student"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Search Student
              </Link>
            </li>
            <li>
              <Link
                to="/faculty/timetable"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Time Table
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                onClick={() => {
                  localStorage.removeItem('accessToken');
                  window.location.href = '/faculty/login';
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default FacultySidebar;
