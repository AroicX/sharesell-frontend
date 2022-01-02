import React from 'react';
import AuthProvider from '@/components/AuthProvider';
import Orders from '@/components/orders';
import Navigation from '@/components/navigation';
import Layout from '@/components/layout';

export default function OrdersPage() {
  return (
    <AuthProvider>
      <Layout>
        <Orders />
      </Layout>
    </AuthProvider>
  );
}
