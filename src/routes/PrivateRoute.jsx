import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const PublicRoute = ({ children }) => {
  return <>{children}</>;
};

const UserRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />
  }
};

export { PublicRoute, UserRoute };
