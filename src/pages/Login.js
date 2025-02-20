import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOG_IN_MUTATION } from '../Mutation';
import { GET_USER_QUERY } from '../Query';

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
      setError(error.message);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    logIn();
  };

  return (
    <div className="Login">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;