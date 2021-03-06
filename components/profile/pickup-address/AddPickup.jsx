import React, { useState } from 'react';
import AppHeader from 'components/AppHeader';
import TextArea from 'reusable/TextArea';
import Select from 'reusable/Select';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';
import {
  getCity,
  getStates,
  inputValidatorChecker,
  inputValidatorErrorState,
  ResponseHandler,
} from '@/helpers/index';
import { CREATE_ADDRESS } from '@/services/profile';

export default function AddPickupAddress({ currentState, setCurrentState }) {
  const [form, setForm] = useState({
    address: '',
    addressError: '',
    state: '',
    stateError: '',
    city: '',
    cityError: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();
  const onChangeHandler = (data, field, fieldError) => {
    if (field === 'state') {
      setForm((prev) => ({
        ...prev,
        [field]: data,
        [fieldError]: '',
        city: '',
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: data, [fieldError]: '' }));
    }
  };

  const onSubmitHandler = () => {
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

        setCurrentState({ currentState: 1 });
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      CREATE_ADDRESS(data, callback, onError);
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
      <AppHeader
        noSVG
        styles='py-5'
        click={() => setCurrentState({ currentState: 1 })}
      />
      <div className='mt-14'>
        <h2 className='text-3xl font-light my-4'>Add Pickup Address</h2>
        <div className='mt-8'>
          <TextArea
            value={form.address}
            label={'Pickup Address'}
            dispatch={(data) =>
              onChangeHandler(data, 'address', 'addressError')
            }
            error={form.addressError}
            placeholder={'Enter Pickup Address'}
          />
          <div className='mb-8'>
            <Select
              label={'State'}
              initialValue={form.state}
              options={getStates()}
              dispatch={(data) => onChangeHandler(data, 'state', 'stateError')}
              error={form.stateError}
              placeholder={'Select State'}
            />
          </div>
          <div className='mb-8'>
            <Select
              label={'City'}
              initialValue={form.city}
              options={getCity(form.state)}
              dispatch={(data) => onChangeHandler(data, 'city', 'cityError')}
              error={form.cityError}
              placeholder={'Select City'}
            />
          </div>

          <Button
            style='bg-app-color'
            text={'Submit'}
            iconRight={'/svg/arrow-right.svg'}
            click={() => onSubmitHandler()}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
