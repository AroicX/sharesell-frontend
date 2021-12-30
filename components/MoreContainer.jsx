import React, { useState } from 'react';
import MoreDropdown from './MoreDropdown';
import SVG from 'react-inlinesvg';
import { ResponseHandler } from '../helpers';
import { useRouter } from 'next/router';
import { DELETE_ADDRESS } from '@/services/profile';

export default function MoreContainer({ savedAddress, setCurrentState }) {
  const Router = useRouter();
  const onDeleteHandler = (id) => {
    const callback = (response) => {
      ResponseHandler(response);
      Router.push('/profile');
    };
    const onError = (err) => {
      console.log(err);
    };
    DELETE_ADDRESS(id, callback, onError);
  };
  const Options = [
    {
      name: 'Edit',
      method: () => {
        setIsActive(false);
        setCurrentState({ currentState: 2, ...savedAddress });
      },
    },
    {
      name: 'Delete',
      method: () => {
        setIsActive(false);
        onDeleteHandler(savedAddress.id);
      },
    },
  ];
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className='cursor-pointer mr-2 relative'
      onClick={() => setIsActive(!isActive)}
    >
      <SVG src='/svg/more-stand.svg' />
      {isActive && (
        <MoreDropdown options={Options} styles={`more-container mt-1`} />
      )}
    </div>
  );
}
