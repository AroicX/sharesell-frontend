import React, { useState } from 'react';
import AppHeader from 'components/AppHeader';
import TextArea from 'reusable/TextArea';
import Select from 'reusable/Select';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';

export default function PickUpAddressEdit({ currentState, setCurrentState }) {
  const [address, setAddress] = useState(currentState.address);
  const [state, setState] = useState(currentState.state);
  const [city, setCity] = useState(currentState.city);
  const addressChangeHandler = (value) => {
    setAddress(value);
  };
  const Router = useRouter();
  return (
    <div className='mt-3'>
      <AppHeader noSVG click={() => setCurrentState({ currentState: 1 })} />
      <div>
        <h2 className='text-3xl font-light my-4'>Edit Pickup Address</h2>
        <div className='mt-8'>
          <TextArea
            value={address}
            label={'Pickup Address'}
            dispatch={addressChangeHandler}
          />
          <div className='mb-8'>
            <Select
              label={'State'}
              initialValue={state}
              options={[state, 'Abuja', 'Kano', 'Jos']}
              dispatch={(data) => setState(data)}
            />
          </div>
          <div className='mb-8'>
            <Select
              label={'City'}
              initialValue={city}
              options={[city, 'Zaria', 'Giwa', 'Ikara']}
              dispatch={(data) => setCity(data)}
            />
          </div>

          <Button
            text={'Save Changes'}
            iconRight={'/svg/arrow-right.svg'}
            click={() => Router.push('/profile')}
          />
        </div>
      </div>
    </div>
  );
}
