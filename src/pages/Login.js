import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOG_IN_MUTATION } from '../Mutation';
import { GET_USER_QUERY } from '../Query';
import leftArrowIcon from '../assets/left-arrow.svg'; // Import the left-arrow SVG icon

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [getUser] = useLazyQuery(GET_USER_QUERY, {
    onCompleted: (data) => {
      localStorage.setItem('user', JSON.stringify(data.getUser));
      navigate('/');
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const [logIn] = useMutation(LOG_IN_MUTATION, {
    variables: {
      fullname: username,
      password: password,
    },
    onCompleted: (data) => {
      const userId = data.logIn.id;
      localStorage.setItem('isConnected', 'true');
      localStorage.setItem('userId', userId);
      getUser({ variables: { id: userId } });
    },
    onError: (error) => {
      if (error.message.includes("Cannot read properties of null (reading 'id')")) {
        setError("User does not exist.");
      } else {
        setError(error.message);
      }
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    logIn();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="container mx-auto p-4 bg-gray-800 text-white rounded-2xl relative" style={{ maxWidth: '600px', margin: 'auto' }}>
        <img
          src={leftArrowIcon}
          alt="Back"
          className="w-6 h-6 cursor-pointer absolute top-2 left-2"
          onClick={() => navigate(-1)}
          style={{ filter: 'invert(100%)' }}
        />
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 py-1 rounded bg-gray-700 text-white w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 rounded bg-gray-700 text-white w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;