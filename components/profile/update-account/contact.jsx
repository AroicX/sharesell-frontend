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
  const { userProfile } = useGlobalStore();
  const [form, setForm] = useState({
    gender: userProfile && userProfile.gender ? userProfile.gender : '',
    genderError: '',
    firstName:
      userProfile && userProfile.first_name ? userProfile.first_name : '',
    firstNameError: '',
    lastName: userProfile && userProfile.last_name ? userProfile.last_name : '',
    lastNameError: '',
    email: userProfile && userProfile.email ? userProfile.email : '',
    emailError: '',
    phoneNumber: userProfile && userProfile.phone ? userProfile.phone : '',
    phoneNumberError: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(form.firstName) &&
      inputValidatorChecker(form.lastName) &&
      inputValidatorChecker(form.gender) &&
      inputValidatorChecker(form.phoneNumber) &&
      emailValidatorChecker(form.email)
    ) {
      setIsLoading(true);
      const data = {
        user_id: userProfile ? userProfile.user_id : '',
        firstname: form.firstName,
        lastname: form.lastName,
        gender: form.gender,
        email: form.email,
        phone_number: form.phoneNumber,
      };

      const callback = (response) => {
        if (response) {
          setIsLoading(false);
          ResponseHandler(response);
          Router.push('/profile/update-account');
      
        }
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      CONTACT_PERSON(data, callback, onError);
    } else {
      inputValidatorErrorState(
        form.firstName,
        setForm,
        'firstNameError',
        'First Name is required'
      );
      inputValidatorErrorState(
        form.lastName,
        setForm,
        'lastNameError',
        'Last Name is Required'
      );
      inputValidatorErrorState(
        form.gender,
        setForm,
        'genderError',
        'Gender is Required'
      );
      inputValidatorErrorState(
        form.phoneNumber,
        setForm,
        'phoneNumberError',
        'Phone Number is Required'
      );
      emailValidatorError(form.email, setForm);
    }
  };

  const onChangeHandler = (data, field, fieldError) => {
    setForm((prev) => {
      return { ...prev, [field]: data, [fieldError]: '' };
    });
  };
  useEffect(() => {
    if (!userProfile) {
      Router.push('/profile/update-account');
    }
  }, [userProfile]);
  
  return (
    <div className='mt-4'>
      <AppHeader noSVG styles='py-5' click={() => Router.push('/profile/update-account')} />
      <div className='mt-20'>
        <h2 className='text-3xl font-light my-2'>Contact Person</h2>
        <span className='text-app-text'>
          Kindly provide accurate contact details.
        </span>
        <div>
          <div className='mt-7'>
            <Input
              label={'First Name'}
              placeholder={'Chike'}
              value={form.firstName ? form.firstName : ''}
              dispatch={(data) =>
                onChangeHandler(data, 'firstName', 'firstNameError')
              }
              error={form.firstNameError}
            />
          </div>
          <div className='mt-7'>
            <Input
              label={'Last Name'}
              placeholder={'Pascal'}
              value={form.lastName ? form.lastName : ''}
              dispatch={(data) =>
                onChangeHandler(data, 'lastName', 'lastNameError')
              }
              error={form.lastNameError}
            />
          </div>
          <Select
            label={'Gender'}
            options={[{ name: 'Female' }, { name: 'Male' }]}
            placeholder={'Select Gender'}
            dispatch={(data) => onChangeHandler(data, 'gender', 'genderError')}
            error={form.genderError}
            initialValue={form.gender}
          />
          <div className='mt-7'>
            <Input
              label={'Email'}
              placeholder={'Enter Email'}
              type='Email'
              value={form.email ? form.email : ''}
              dispatch={(data) => onChangeHandler(data, 'email', 'emailError')}
              error={form.emailError}
            />
          </div>
          <div className='my-7'>
            <Input
              label={'Phone Number'}
              placeholder={'Enter Phone Number'}
              value={form.phoneNumber ? form.phoneNumber : ''}
              dispatch={(data) =>
                onChangeHandler(data, 'phoneNumber', 'phoneNumberError')
              }
              error={form.phoneNumberError}
            />
          </div>
          <Button
          style="bg-app-color"
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
