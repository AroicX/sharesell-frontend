import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import ChangePassword from '@/components/profile/ChangePasword';

export default function ChangePasswordPage() {
  return (
    <AuthProvider>
      <ChangePassword />
    </AuthProvider>
  );
}
