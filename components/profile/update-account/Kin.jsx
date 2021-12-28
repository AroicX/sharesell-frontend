import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import { useRouter } from 'next/router';
import Select from '@/reusable/Select';
import { ResponseHandler } from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { NEXT_OF_Kin } from '@/services/profile/update-account';
import {  } from '@/helpers/index';
import { nameSplit } from '@/helpers/index';

export default function Kin() {
  const { user, userProfile } = useGlobalStore();
  const [gender, setGender] = useState(
    userProfile ? userProfile.supplier.next_of_kin_gender : ''
  );
  const [genderError, setGenderError] = useState('');
  const [relationship, setRelationship] = useState(
    userProfile ? userProfile.supplier.next_of_kin_relationship : ''
  );
  const [relationshipError, setRelationshipError] = useState('');
  const [firstName, setFirstName] = useState(
    userProfile ? nameSplit(userProfile.supplier.next_of_kin_name, 0) : ''
  );
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(
    userProfile ? nameSplit(userProfile.supplier.next_of_kin_name, 1) : ''
  );
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState(
    userProfile ? userProfile.supplier.next_of_kin_email : ''
  );
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(
    userProfile ? userProfile.supplier.next_of_kin_number : ''
  );
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const onSubmitHandler = () => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNumber === '' ||
      relationship === '' ||
      !validateEmail(email) ||
      gender === ''
    ) {
      if (firstName === '') {
        setFirstNameError('First Name is required');
      }

      if (lastName === '') {
        setLastNameError('Last Name is equired');
      }

      if (phoneNumber === '') {
        setPhoneNumberError('Phone Number is required');
      }
      if (relationship === '') {
        setRelationshipError('Relationship is required');
      }
      if (gender === '') {
        setGenderError('Gender is required');
      }
      if (email === '' || !validateEmail(email)) {
        if (email === '') {
          setEmailError('Email is required');
        } else {
          setEmailError('Please Enter a Valid Email Address');
        }
      }
    } else {
      setIsLoading(true);
      const data = {
        user_id: user ? user.user_id : '',
        firstname: firstName,
        lastname: lastName,
        gender: gender,
        email: email,
        phone_number: phoneNumber,
        relationship: relationship,
      };

      const callback = (response) => {
        if (response) {
          setIsLoading(false);
          ResponseHandler(response);
          Router.push('/profile/update-account');
        }
      };

      const onError = (err) => {
        console.log(err);
        setIsLoading(false);
      };

      NEXT_OF_Kin(data, callback, onError);
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

  const relationshipOnChangeHandler = (data) => {
    setRelationship(data);
    setRelationshipError('');
  };
  const emailOnChangeHandler = (data) => {
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
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-2'>Next of Kin</h2>
        <span className='text-app-text'>Please provide accurate details.</span>
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
            options={[{ name: 'Male' }, { name: 'Female' }]}
            placeholder={'Select Gender'}
            dispatch={(data) => genderOnchangeHandler(data)}
            error={genderError}
            initialValue={gender}
          />
          <Select
            label={'Relationship'}
            options={[
              { name: 'Son' },
              { name: 'Brother' },
              { name: 'Daughter' },
              { name: 'Sister' },
              { name: 'Husband' },
              { name: 'Wife' },
              { name: 'Father' },
              { name: 'Mother' },
            ]}
            placeholder={'Select Relationship'}
            dispatch={(data) => relationshipOnChangeHandler(data)}
            error={relationshipError}
            initialValue={relationship}
          />
          <div className='mt-7'>
            <Input
              label={'Email'}
              placeholder={'Enter Email'}
              type='Email'
              value={email}
              dispatch={(data) => emailOnChangeHandler(data)}
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
