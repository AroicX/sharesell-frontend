import React from 'react';

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
  return (
    <div className={`input ${inputStyle}`}>
      <label htmlFor=''>{label}</label>

      {price && <span className='price m-auto'>₦</span>}
      <input
        className={`${styles} ${price ? 'with-price' : ''}`}
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(event) => dispatch(event.target.value)}
        required
        {...rest}
      />

      {error && (
        <span className='text-red-500 text-sm bg-red-200 p-4 rounded my-1'>
          {error}
        </span>
      )}
    </div>
  );
}
