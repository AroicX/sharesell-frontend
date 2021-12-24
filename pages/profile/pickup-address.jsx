import React, {useState} from 'react';
import AuthProvider from 'components/AuthProvider';
import PickUpAddress from 'components/profile/pickup-address';
import PickUpAddressEdit from 'components/profile/pickup-edit';

export default function PickupAddressPage() {
    const [currentState, setCurrentState] = useState({currentState: 1})
  return (
    <AuthProvider>
      {currentState.currentState === 1 ? <PickUpAddress setCurrentState= {setCurrentState}/> : ""}
      {currentState.currentState === 2 ? <PickUpAddressEdit currentState={currentState} setCurrentState={setCurrentState}/>: ""}
    </AuthProvider>
  );
}
