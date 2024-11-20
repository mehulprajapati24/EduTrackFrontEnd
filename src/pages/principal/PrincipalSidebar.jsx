import React from 'react';
import { Link } from 'react-router-dom';

const PrincipalSidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white fixed overflow-y-auto">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-8">Principal Panel</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/principal"
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
                                to="/principal/search-faculty"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Search Faculty
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/principal/search-student"
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
                                to="/principal/view-timetable"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                View Timetable
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/principal/view-class-location"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                View Class Location
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/principal/view-shift"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                View Shift
                            </Link>
                        </li>
                        {/* <li>
                            <Link
                                to="/principal/add-academic-year"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Add Academic Year And Sem
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/principal/select-academic-year"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Select Academic Year And Sem
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/principal/import-google-sheets"
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                            >
                                Import Data from Google Sheets
                            </Link>
                        </li> */}
                        <li>
                            <button
                                className="w-full text-left py-2.5 px-4 rounded-lg hover:bg-gray-700 transition"
                                onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    window.location.href = '/principal/login';
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

export default PrincipalSidebar;
