// AddAdmin.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPrincipal = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await axios.post("https://edutrackbackend-itns.onrender.com/admin/addPrincipal", { email });
      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 2000 });
        setEmail('');
        setError(null);
      } else {
        setError(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setError("Email ID already exists or there was an error.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-200 to-blue-400 rounded">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Principal</h1>
      <form onSubmit={handleAddAdmin} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter principal email"
            required
          />
        </div>


        {error && <p className="text-center text-red-600 mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Principal
        </button>

        <button
          type="button"
          onClick={() => { setEmail(''); setError(null); }}
          className="w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded mt-4 hover:bg-gray-400"
        >
          Clear Fields
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddPrincipal;
