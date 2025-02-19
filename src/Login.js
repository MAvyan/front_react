import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from './Data.json';
import {gql, useMutation} from '@apollo/client';

const LOG_IN_MUTATION = gql`
  mutation LogInMutation($fullname: String!, $password: String!) {
    logIn(fullname: $fullname, password: $password) {
      id
    }
  }`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const [logIn] = useMutation(LOG_IN_MUTATION, {
    variables: {
      fullname: username,
      password: password,
    },
    onCompleted: () => {
      localStorage.setItem('isConnected', 'true');
      navigate('/');
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