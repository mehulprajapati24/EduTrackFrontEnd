import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add Axios

const FacultyLogin = () => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://edutrackbackend-42jx.onrender.com/faculty/login', {
                enrollmentNumber,
                password
            });

            if (response.data.error) {
                setError(response.data.message);
            }
            else{
                if(response.data.requirePasswordChange){
                    localStorage.setItem('accessToken', response.data.accessToken);
                    navigate('/faculty/require', { state: { requireChange: true } });
                }else{
                    localStorage.setItem('accessToken', response.data.accessToken);
                    navigate('/faculty');
                }
            }
        } catch (error) {
            // Handle error response
            setError('Invalid employee ID or password.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="space-y-6" method='post' onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="enrollmentNumber" className="sr-only">
                                Enrollment Number
                            </label>
                            <input
                                id="enrollmentNumber"
                                name="enrollmentNumber"
                                type="text"
                                autoComplete="enrollment-number"
                                required
                                value={enrollmentNumber}
                                onChange={(e) => setEnrollmentNumber(e.target.value)}
                                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Employee ID"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                to="/faculty/forgot-password"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FacultyLogin;
