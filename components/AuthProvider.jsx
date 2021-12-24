import useAuth from '@/hooks/useAuth';
import React from 'react';

const AuthProvider = ({ children }) => {
  return <>{children}</>;
};

export default useAuth(AuthProvider);
