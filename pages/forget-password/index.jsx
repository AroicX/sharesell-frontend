import React, { useState } from 'react';
import useGuest from '@/hooks/useGuest';
import PhoneNumber from '@/components/forget-password/PhoneNumber';
import ResetPassword from '@/components/forget-password/ResetPassword';

function ForgetPassword() {
  const [currentTab, setCurrentTab] = useState(1);
  const [user, setUser] = useState({
    phoneNumber: '',
  });

  const next = () => {
    setCurrentTab(2);
  };

  const back = () => {
    setCurrentTab(1);
  };
  return (
    <div>
      {currentTab === 1 && (
        <PhoneNumber user={user} setUser={setUser} next={next} />
      )}
      {currentTab === 2 && <ResetPassword back={back} />}
    </div>
  );
}

export default useGuest(ForgetPassword);
