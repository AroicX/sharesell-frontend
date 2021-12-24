import Link from '@/components/link';
import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import Button from '@/reusable/Button';

export default function SignUp({ next }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className='signup'>
      <SVG className='my-auto' width='50px' src={'/svg/logo.svg'} />
      <div className='signup-content'>
        <h2 className='text-3xl font-light my-2'>Create Account</h2>
        <span className='text-app-text'>
          Start selling now! <br />
          Create a new ShareSell account.
        </span>

        <div className='flex flex-col mt-10'>
          <div
            className={`signup-selection ${
              selected == 'seller' ? 'signup-selection-active' : ''
            }`}
          >
            <div className='flex flex-row'>
              {selected == 'seller' ? (
                <SVG
                  className='my-auto'
                  width='50px'
                  src={'/svg/profile-active.svg'}
                />
              ) : (
                <SVG
                  className='my-auto'
                  width='50px'
                  src={'/svg/profile.svg'}
                />
              )}
              <div className='flex flex-col mx-2'>
                <b className='text-app-text'>Seller Account</b>
                <span className='text-app-color text-xs font-light'>
                  Start selling, become a Seller
                </span>
              </div>
            </div>
            <input
              className='my-auto'
              type='radio'
              name='account-type'
              onClick={() => setSelected('seller')}
            />
          </div>
          <div
            className={`signup-selection ${
              selected == 'supplier' ? 'signup-selection-active' : ''
            }`}
          >
            <div className='flex flex-row'>
              {selected == 'supplier' ? (
                <SVG
                  className='my-auto'
                  width='50px'
                  src={'/svg/house-active.svg'}
                />
              ) : (
                <SVG className='my-auto' width='50px' src={'/svg/house.svg'} />
              )}
              <div className='flex flex-col mx-2'>
                <b className='text-app-text'>Supplier Account</b>
                <span className='text-app-color text-xs font-light'>
                  Partner with us, become a Supplier
                </span>
              </div>
            </div>
            <input
              className='my-auto'
              type='radio'
              name='account-type'
              onClick={() => setSelected('supplier')}
            />
          </div>
        </div>
        <br />

        <Button
          styles={'p-5 block '}
          text='Proceed'
          iconRight={'/svg/arrow-right.svg'}
          click={next}
        />

        <span className='w-full p-2 flex center justify-center text-center mt-24'>
          Already have an account?
          <Link className='mx-2 underline' to='/login'>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
