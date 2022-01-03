import React, { useState } from 'react';
import SignUp from '@/components/authentication/signup/index';
import PhoneNumber from '@/components/authentication/signup/PhoneNumber';
import OneTimePassword from '@/components/authentication/signup/OneTimePassword';
import BusinessRegistration from '@/components/authentication/signup/BusinessRegistration';
import CreateAccount from '@/components/authentication/signup/CreateAccount';
import useGuest from '@/hooks/useGuest';

function SignUpPage() {
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState({
    userType: null,
    userId: null,
    otp: null,
    phoneNumber: '',
    businessName: '',
    bvn_number: '23566372983',
    email: '',
    password: '',
    reEnterPassword: '',
    isRegistered: false,
  });

  const next = () => {
    if (selected < 4 || selected === null) {
      setSelected((prev) => {
        return prev + 1;
      });
    }
  };

  const back = () => {
    if (selected > 0) {
      if (selected === 1) {
        setSelected(null);
      } else {
        setSelected((prev) => {
          return prev - 1;
        });
      }
    }
  };
  return (
    <div>
      {selected === null ? (
        <SignUp next={next} setUser={setUser} user={user} />
      ) : (
        ''
      )}
      {selected === 1 ? (
        <PhoneNumber next={next} back={back} user={user} setUser={setUser} />
      ) : (
        ''
      )}
      {selected === 2 ? (
        <OneTimePassword next={next} back={back} user={user} />
      ) : (
        ''
      )}
      {selected === 3 ? (
        <BusinessRegistration
          next={next}
          back={back}
          user={user}
          setUser={setUser}
        />
      ) : (
        ''
      )}
      {selected === 4 ? (
        <CreateAccount back={back} user={user} setUser={setUser} />
      ) : (
        ''
      )}
    </div>
  );
}

export default useGuest(SignUpPage);
