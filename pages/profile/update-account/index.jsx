import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import UpdateAccount from '@/components/profile/update-account/index';

export default function UpdateAccountPage() {
  return (
    <AuthProvider>
      <UpdateAccount />
    </AuthProvider>
  );
}
