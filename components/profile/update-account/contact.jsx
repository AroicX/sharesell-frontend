import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import Select from '@/reusable/Select';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import {
  ResponseHandler,
  emailValidatorChecker,
  emailValidatorError,
  inputValidatorChecker,
  inputValidatorErrorState,
} from '@/helpers/index';
import { CONTACT_PERSON } from '@/services/profile/update-account/index';

export default function Contact() {
  const { user, userProfile } = useGlobalStore();
  const [gender, setGender] = useState(userProfile ? userProfile.gender : '');
  const [genderError, setGenderError] = useState('');
  const [firstName, setFirstName] = useState(
    userProfile ? userProfile.first_name : ''
  );
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(
    userProfile ? userProfile.last_name : ''
  );
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState(userProfile ? userProfile.email : '');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(
    userProfile ? userProfile.phone : ''
  );
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(firstName) &&
      inputValidatorChecker(lastName) &&
      inputValidatorChecker(gender) &&
      inputValidatorChecker(phoneNumber) &&
      emailValidatorChecker(email)
    ) {
      setIsLoading(true);
      const data = {
        user_id: user ? user.user_id : '',
        firstname: firstName,
        lastname: lastName,
        gender: gender,
        email: email,
        phone_number: phoneNumber,
      };

      const callback = (response) => {
        if (response) {
          setIsLoading(false);
          ResponseHandler(response);
          console.log(response);
          // Router.back();
        }
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      CONTACT_PERSON(data, callback, onError);
    } else {
      inputValidatorErrorState(
        firstName,
        setFirstNameError,
        'First Name is required'
      );
      inputValidatorErrorState(
        lastName,
        setLastNameError,
        'Last Name is Required'
      );
      inputValidatorErrorState(gender, setGenderError, 'Gender is Required');
      inputValidatorErrorState(
        phoneNumber,
        setPhoneNumberError,
        'Phone Number is Required'
      );
      emailValidatorError(email, setEmailError)
    }
  };
  const firstNameOnchangeHandler = (data) => {
    setFirstName(data);
    setFirstNameError('');
  };

  const lastNameOnchangeHandler = (data) => {
    setLastName(data);
    setLastNameError('');
  };

  const genderOnchangeHandler = (data) => {
    setGender(data);
    setGenderError('');
  };

  const emailOnchangeHandler = (data) => {
    setEmail(data);
    setEmailError('');
  };

  const phoneNumberOnchangeHandler = (data) => {
    setPhoneNumber(data);
    setPhoneNumberError('');
  };
  useEffect(() => {
    if (!userProfile) {
      Router.push('/profile/update-account');
    }
  }, [userProfile]);
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={() => Router.push('/profile/update-account')} />
      <div>
        <h2 className='text-3xl font-light my-2'>Contact Person</h2>
        <span className='text-app-text'>
          Kindly provide accurate contact details.
        </span>
        <div>
          <div className='mt-7'>
            <Input
              label={'First Name'}
              placeholder={'Chike'}
              value={firstName}
              dispatch={(data) => firstNameOnchangeHandler(data)}
              error={firstNameError}
            />
          </div>
          <div className='mt-7'>
            <Input
              label={'Last Name'}
              placeholder={'Pascal'}
              value={lastName}
              dispatch={(data) => lastNameOnchangeHandler(data)}
              error={lastNameError}
            />
          </div>
          <Select
            label={'Gender'}
            options={[{ name: 'Female' }, { name: 'Male' }]}
            placeholder={'Select Gender'}
            dispatch={(data) => genderOnchangeHandler(data)}
            error={genderError}
            initialValue={gender}
          />
          <div className='mt-7'>
            <Input
              label={'Email'}
              placeholder={'Enter Email'}
              type='Email'
              value={email}
              dispatch={(data) => emailOnchangeHandler(data)}
              error={emailError}
            />
          </div>
          <div className='my-7'>
            <Input
              label={'Phone Number'}
              placeholder={'Enter Phone Number'}
              value={phoneNumber}
              dispatch={(data) => phoneNumberOnchangeHandler(data)}
              error={phoneNumberError}
            />
          </div>
          <Button
            text={'Submit'}
            iconRight={'/svg/arrow-right.svg'}
            click={onSubmitHandler}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
