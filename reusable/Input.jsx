import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  styles,
  inputStyle = '',
  dispatch = () => {},
  value,
  rest,
  error,
  price,
}) {
  const [passwordState, setPasswordState] = useState('password');
  const passwordStateOnChangeHandler = () => {
    if (passwordState === 'password') {
      setPasswordState('text');
    } else {
      setPasswordState('password');
    }
  };
  return (
    <div className={`input ${inputStyle} `}>
      <label htmlFor=''>{label}</label>

      {price && <span className='price m-auto'>₦</span>}
      <input
        className={`${styles} ${price ? 'with-price' : ''} ${
          type === 'password' ? 'password' : ''
        }`}
        id={id}
        value={value}
        type={type === 'password' ? passwordState : type}
        placeholder={placeholder}
        onChange={(event) => dispatch(event.target.value)}
        // required
        {...rest}
      />
      {type === 'password' && (
        <SVG
          src='/svg/show-password.svg'
          // className={`mt-6 mr-3 absolute right-1 cursor-pointer`}
          onClick={() => passwordStateOnChangeHandler()}
          style={{
            marginRight: '0.75rem',
            position: 'absolute',
            right: '0.25rem',
            cursor: 'pointer',
            marginTop: '1.5rem',
          }}
        />
      )}

      {error && (
        <span className='text-red-500 text-sm bg-red-200 p-4 rounded my-1'>
          {error}
        </span>
      )}
    </div>
  );
}
