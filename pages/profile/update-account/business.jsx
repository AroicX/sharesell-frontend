import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import Business from '@/components/profile/update-account/Business';

export default function BusinessPage() {
  return (
    <AuthProvider>
      <Business />
    </AuthProvider>
  );
}
