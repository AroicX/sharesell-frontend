import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import History from '@/components/profile/history';

export default function HistoryPage() {
  return (
    <AuthProvider>
      <History />
    </AuthProvider>
  );
}
