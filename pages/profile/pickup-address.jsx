import React from 'react';
import AuthProvider from 'components/AuthProvider';
import PickUpAddress from 'components/profile/pickup-address';

export default function PickupAddressPage() {
  return (
    <AuthProvider>
      <PickUpAddress />
    </AuthProvider>
  );
}
