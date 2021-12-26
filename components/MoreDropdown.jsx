import React from 'react';

export default function MoreDropdown({ options, styles, isActive }) {
  return (
    <div className={`w-28 bg-white absolute z-10 rounded ${styles}`}>
      {options.map((option, index) => (
        <p
          key={index}
          className={`w-full cursor-pointer py-3 pl-6 ${
            index !== options.length - 1 ? 'border-b' : ''
          } border-lightest-color text-sm text-pry-black`}
          onClick={() => option.method()}
        >
          {option.name}
        </p>
      ))}
    </div>
  );
}
