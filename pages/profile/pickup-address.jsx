import React, { useState } from 'react';
import AuthProvider from '@/components/AuthProvider';
import PickUpAddress from '@/components/profile/pickup-address/index';
import PickUpAddressEdit from '@/components/profile/pickup-address/PickupEdit';
import AddPickupAddress from '@/components/profile/pickup-address/AddPickup';

export default function PickupAddressPage() {
  const [currentState, setCurrentState] = useState({ currentState: 1 });
  return (
    <AuthProvider>
      {currentState.currentState === 1 && (
        <PickUpAddress setCurrentState={setCurrentState} />
      )}
      {currentState.currentState === 2 ? (
        <PickUpAddressEdit
          currentState={currentState}
          setCurrentState={setCurrentState}
        />
      ) : (
        ''
      )}
      {currentState.currentState === 3 ? (
        <AddPickupAddress setCurrentState={setCurrentState} />
      ) : (
        ''
      )}
    </AuthProvider>
  );
}
