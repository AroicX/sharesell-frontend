import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

const Select = ({
  label,
  placeholder,
  options = null,
  dispatch = null,
  rest,
  initialValue
}) => {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(placeholder || initialValue);
  const handleSelected = (value) => {
    dispatch(value);
    setSelected(value);
    setToggle(false);
  };
  return (
    <div className='select'>
      <label htmlFor=''>{label}</label>
      <div
        className='select-display'
        onClick={() => setToggle(!toggle)}
        {...rest}
      >
        <span className='select-display-default -mt-1'>{selected}</span>
        <SVG className='mr-1 -mt-1' src='/svg/caret-down.svg' />
      </div>
      {toggle && (
        <div className='select-options'>
          {options?.map((option, i) => (
            <button
              key={i + 1}
              className={`${selected == option ? 'bg-black text-white' : ''}`}
              onClick={() => handleSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
