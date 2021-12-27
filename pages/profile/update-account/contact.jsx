import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import Contact from '@/components/profile/update-account/Contact';

export default function ContactPage() {
  return (
    <AuthProvider>
      <Contact />
    </AuthProvider>
  );
}
