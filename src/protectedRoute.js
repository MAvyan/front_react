import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;