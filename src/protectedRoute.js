import React from 'react';
import { Navigate } from 'react-router-dom';
import users from './Data.json';

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userId = localStorage.getItem('userId');
  const currentUser = isAuthenticated && userId ? users.find(user => user.id === parseInt(userId)) : null;

  if (!isAuthenticated || !userId || !currentUser || (requiredRole && currentUser.role !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;