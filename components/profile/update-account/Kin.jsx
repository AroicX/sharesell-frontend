import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import { useRouter } from 'next/router';
import Select from '@/reusable/Select';
import { ResponseHandler } from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { NEXT_OF_Kin } from '@/services/profile/update-account';
import {
  nameSplit,
  emailValidatorChecker,
  emailValidatorError,
  inputValidatorErrorState,
  inputValidatorChecker,
} from '@/helpers/index';

export default function Kin() {
  const { userProfile, role } = useGlobalStore();
  const [form, setForm] = useState({
    gender:
      userProfile && userProfile?.[role.toLowerCase()]?.next_of_kin_gender
        ? userProfile?.[role.toLowerCase()]?.next_of_kin_gender
        : '',
    genderError: '',
    relationship:
      userProfile && userProfile?.[role.toLowerCase()]?.next_of_kin_relationship
        ? userProfile?.[role.toLowerCase()]?.next_of_kin_relationship
        : '',
    relationshipError: '',
    firstName:
      userProfile && userProfile?.[role.toLowerCase()]?.next_of_kin_name
        ? nameSplit(userProfile?.[role.toLowerCase()]?.next_of_kin_name, 0)
        : '',
    firstNameError: '',
    lastName:
      userProfile && userProfile?.[role.toLowerCase()]?.next_of_kin_name
        ? nameSplit(userProfile?.[role.toLowerCase()]?.next_of_kin_name, 1)
        : '',
    lastNameError: '',
    email:
      userProfile && userProfile?.[role.toLowerCase()]?.next_of_kin_email
        ? userProfile?.[role.toLowerCase()]?.next_of_kin_email
        : '',
    emailError: '',
    phoneNumber:
      userProfile && userProfile?.[role.toLowerCase()]?.next_of_kin_number
        ? userProfile?.[role.toLowerCase()]?.next_of_kin_number
        : '',
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
      inputValidatorChecker(form.relationship) &&
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
        relationship: form.relationship,
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
    } else {
      inputValidatorErrorState(
        form.firstName,
        setForm,
        'firstNameError',
        'First Name is Required'
      );
      inputValidatorErrorState(
        form.lastName,
        setForm,
        'lastNameError',
        'Last Name is required'
      );
      inputValidatorErrorState(
        form.gender,
        setForm,
        'genderError',
        'Gender is required'
      );
      inputValidatorErrorState(
        form.phoneNumber,
        setForm,
        'phoneNumberError',
        'Phone Number is required'
      );
      inputValidatorErrorState(
        form.relationship,
        setForm,
        'relationshipError',
        'Relationship is required'
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
      <AppHeader noSVG styles='py-5' />
      <div className='mt-20'>
        <h2 className='text-3xl font-light my-2'>Next of Kin</h2>
        <span className='text-app-text'>Please provide accurate details.</span>
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
            options={[{ name: 'Male' }, { name: 'Female' }]}
            placeholder={'Select Gender'}
            dispatch={(data) => onChangeHandler(data, 'gender', 'genderError')}
            error={form.genderError}
            initialValue={form.gender}
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
            dispatch={(data) =>
              onChangeHandler(data, 'relationship', 'relationshipError')
            }
            error={form.relationshipError}
            initialValue={form.relationship}
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
            text={'Submit'}
            iconRight={'/svg/arrow-right.svg'}
            click={onSubmitHandler}
            loading={isLoading}
            style='bg-app-color'
          />
        </div>
      </div>
    </div>
  );
}
