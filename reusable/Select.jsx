import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';

const Select = ({
  label,
  placeholder = '',
  options = null,
  dispatch = null,
  rest,
  initialValue,
  error,
}) => {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(initialValue || placeholder || '');
  const handleSelected = (value) => {
    dispatch(value);
    setSelected(value);
    setToggle(false);
  };

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  return (
    <div className='select'>
      <label htmlFor=''>{label}</label>
      <div
        className='select-display'
        onClick={() => setToggle(!toggle)}
        {...rest}
      >
        <span className='select-display-default -mt-1'>
          {selected ? selected : placeholder}
        </span>
        <SVG className='mr-1 -mt-1' src='/svg/caret-down-dark.svg' />
      </div>
      {error && (
        <span className='text-red-500 text-sm bg-red-200 p-4 rounded my-1'>
          {error}
        </span>
      )}
      {toggle && (
        <div className='select-options'>
          {options?.map((option, i) => (
            <button
              key={i + 1}
              className={`${
                selected == option.name ? 'bg-black text-white' : ''
              }`}
              onClick={() => handleSelected(option.name)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
