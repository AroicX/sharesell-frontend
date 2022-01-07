import React, { useState } from 'react';
import MoreDropdown from './MoreDropdown';
import SVG from 'react-inlinesvg';
import { ResponseHandler } from '../helpers';
import { DELETE_ADDRESS } from '@/services/profile';
import Swal from 'sweetalert2';

export default function MoreContainer({ savedAddress, setCurrentState }) {
  const onDeleteHandler = (id) => {
    const callback = (response) => {
      ResponseHandler(response);
      setCurrentState({ currentState: 1, ...savedAddress });
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
        Swal.fire({
          title: 'Delete Address',
          text: 'Are you sure, you want to delete address?',
          icon: 'warning',
          confirmButtonColor: '#ec6056e2',
          confirmButtonText: 'Yes',
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonText: 'No',
          cancelButtonColor: '#316be9',
          closeOnConfirm: false,
          closeOnCancel: false,
          allowOutsideClick: true,
        }).then((result) => {
          if (result.dismiss !== 'cancel') {
            onDeleteHandler(savedAddress.id);
          } else {
            Swal.fire({
              title: 'Cancelled',
              text: 'Address Not Deleted :)',
              icon: 'info',
              showConfirmButton: false,
              showCancelButton: false,
              timerProgressBar: true,
              timer: 1000,
              allowOutsideClick: true,
            });
          }
        });
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
