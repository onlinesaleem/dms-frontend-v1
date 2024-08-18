// src/components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('token'); // or any authentication logic you have

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
