import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getAuthorization = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const ProtectedRoutes = () => {
  const isAuthorizedAccess = getAuthorization();
  return isAuthorizedAccess ? <Outlet /> : <Navigate to="/accessNotAuthorized" />;
};

export default ProtectedRoutes;
