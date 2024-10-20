import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white fixed overflow-y-auto">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/admin"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Dashboard
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                to="/admin/manage-timetable"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Manage Timetable
                            </Link>
                        </li> */}
                        {/* <li>
                            <Link
                                to="/admin/manage-faculties"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Manage Faculties
                            </Link>
                        </li> */}
                        {/* <li>
                            <Link
                                to="/admin/manage-students"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Manage Students
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                to="/admin/search-faculty"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Search Faculty
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/search-student"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Search Student
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                to="/admin/manage-class-batch"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Manage Class/Batch
                            </Link>
                        </li> */}
                        {/* <li>
                            <Link
                                to="/admin/manage-session"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Manage Session
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                to="/admin/view-timetable"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                View Timetable
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/import-google-sheets"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Import Data from Google Sheets
                            </Link>
                        </li>
                        <li>
                            <button
                                className="w-full text-left py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                                onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    window.location.href = '/admin/login';
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
}

export default Sidebar;
