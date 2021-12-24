import React, { useState } from 'react';
import SignUp from '@/components/authentication/signup';
import PhoneNumber from '@/components/authentication/signup/phoneNumber';
import OneTimePassword from '@/components/authentication/signup/oneTimePassword';
import BusinessRegistration from '@/components/authentication/signup/businessRegistration';
import CreateAccount from '@/components/authentication/signup/createAccount';

export default function SignUpPage() {
  const [selected, setSelected] = useState(null);

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
      {selected === null ? <SignUp next={next} /> : ''}
      {selected === 1 ? <PhoneNumber next={next} back={back} /> : ''}
      {selected === 2 ? <OneTimePassword next={next} back={back} /> : ''}
      {selected === 3 ? <BusinessRegistration next={next} back={back} /> : ''}
      {selected === 4 ? <CreateAccount back={back} /> : ''}
    </div>
  );
}
