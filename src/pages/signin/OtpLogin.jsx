import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OtpLogin = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  // Navigate to login if email is not provided
  if (!email) {
    navigate("/login");
  }

  const resendOtp = async () => {
    const response = await axios.post("https://edutrackbackend-opga.onrender.com/otp", { email });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://edutrackbackend-opga.onrender.com/forgot-password/otp', { email, otp });
      
      if (response.data.error) {
        setError(response.data.message);
      } else {
        navigate('/reset-password', {
            state : {
                email
            }
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Error verifying OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Enter OTP</h2>
        <p className="text-center text-gray-600">
          OTP sent to your email - <span className="font-medium text-indigo-600">{email}</span>
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="otp" className="sr-only">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter OTP"
              />
            </div>
          </div>
          {error && (
            <span className="text-sm text-red-600">
              {error}
            </span>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
          <span
            className='block text-center mt-4 text-gray-400 cursor-pointer'
            onClick={resendOtp}
          >
            Resend OTP
          </span>
        </form>
      </div>
    </div>
  );
};

export default OtpLogin;
