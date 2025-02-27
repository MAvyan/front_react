import React from 'react';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '../assets/left-arrow.svg'; // Import the left-arrow SVG icon

function UserForm({ fullname, setFullname, isAdmin, setIsAdmin, password, setPassword, handleSubmit, loading, error, isUpdate }) {
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-gray-800 text-white rounded-2xl relative" style={{ maxWidth: '600px', margin: 'auto' }}>
      <img
        src={leftArrowIcon}
        alt="Back"
        className="w-6 h-6 cursor-pointer absolute top-2 left-2"
        onClick={() => navigate(-1)}
        style={{ filter: 'invert(100%)' }}
      />
      <h2 className="text-2xl font-bold mb-4">{isUpdate ? 'Update User' : 'Create User'}</h2>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      <div className="mb-4">
        <label htmlFor="fullname" className="block mb-2">Fullname:</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="px-2 py-1 rounded bg-gray-700 text-white w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="isAdmin" className="block mb-2">Is Admin:</label>
        <input
          type="checkbox"
          id="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          className="mr-2"
        />
        <span>Admin</span>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-1 rounded bg-gray-700 text-white w-full"
        />
      </div>

      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
        {loading ? 'Processing...' : isUpdate ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
}

export default UserForm;