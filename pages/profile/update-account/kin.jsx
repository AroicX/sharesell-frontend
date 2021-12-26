import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import Kin from '@/components/profile/update-account/Kin';

export default function KinPage() {
  return (
    <AuthProvider>
      <Kin />
    </AuthProvider>
  );
}
