import React, { useState } from 'react';
import MoreDropdown from './more-dropdown';
import SVG from 'react-inlinesvg';

export default function MoreContainer({ savedAddress, setCurrentState }) {
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
