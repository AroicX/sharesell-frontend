import React, { useState } from 'react';
import AppHeader from 'components/AppHeader';
import TextArea from 'reusable/TextArea';
import Select from 'reusable/Select';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';
import {
  getStates,
  getCity,
  inputValidatorErrorState,
  inputValidatorChecker,
  ResponseHandler,
} from '@/helpers/index';
import { EDIT_ADDRESS } from '@/services/profile/index';

export default function PickUpAddressEdit({ currentState, setCurrentState }) {
  const [form, setForm] = useState({
    address: currentState.address,
    addressError: '',
    state: currentState.state,
    stateError: '',
    city: currentState.city,
    cityError: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const onChangeHandler = (data, field, fieldError) => {
    if (field === 'state') {
      setForm((prev) => {
        return { ...prev, [field]: data, [fieldError]: '', city: '' };
      });
    } else {
      setForm((prev) => {
        return { ...prev, [field]: data, [fieldError]: '' };
      });
    }
  };
  const onSaveHandler = (id) => {
    if (
      inputValidatorChecker(form.address) &&
      inputValidatorChecker(form.state) &&
      inputValidatorChecker(form.city)
    ) {
      setIsLoading(true);
      const data = {
        address: form.address,
        state: form.state,
        city: form.city,
        status: 'active',
      };

      const callback = (response) => {
        setIsLoading(false);
        ResponseHandler(response);
        Router.push('/profile');
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      EDIT_ADDRESS(data, id, callback, onError);
    } else {
      inputValidatorErrorState(
        form.address,
        setForm,
        'addressError',
        'Address is required'
      );
      inputValidatorErrorState(
        form.state,
        setForm,
        'stateError',
        'State is required'
      );
      inputValidatorErrorState(
        form.city,
        setForm,
        'cityError',
        'City is required'
      );
    }
  };
  return (
    <div className='mt-3'>
      <AppHeader noSVG click={() => setCurrentState({ currentState: 1 })} />
      <div>
        <h2 className='text-3xl font-light my-4'>Edit Pickup Address</h2>
        <div className='mt-8'>
          <TextArea
            value={form.address}
            label={'Pickup Address'}
            dispatch={(data) =>
              onChangeHandler(data, 'address', 'addressError')
            }
            error={form.addressError}
          />
          <div className='mb-8'>
            <Select
              label={'State'}
              initialValue={form.state}
              options={getStates()}
              dispatch={(data) => onChangeHandler(data, 'state', 'stateError')}
              error={form.stateError}
            />
          </div>
          <div className='mb-8'>
            <Select
              label={'City'}
              initialValue={form.city}
              options={getCity(form.state)}
              dispatch={(data) => onChangeHandler(data, 'city', 'cityError')}
              error={form.cityError}
            />
          </div>

          <Button
            style='bg-app-color'
            text={'Save Changes'}
            iconRight={'/svg/arrow-right.svg'}
            click={() => onSaveHandler(currentState.id)}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
