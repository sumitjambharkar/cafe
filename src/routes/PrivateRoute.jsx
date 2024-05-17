import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';

const PublicRoute = ({ children }) => {
  return <>{children}</>;
};

const UserRoute = ({ children }) => {
  const { user: item } = useSelector((state) => state.user);
  const user = decodeToken(item);
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />
  }
};

export { PublicRoute, UserRoute };
