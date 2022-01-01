import React from 'react';

export default function TextArea({
  id,
  label,
  placeholder,
  styles,
  inputStyle = '',
  dispatch = () => {},
  value,
  rest,
  error,
}) {
  return (
    <div className={`input ${inputStyle}`}>
      <label htmlFor=''>{label}</label>
      <textarea
        className={`${styles}`}
        id={id}
        placeholder={placeholder}
        onChange={(event) => dispatch(event.target.value)}
        value={value}
        {...rest}
      ></textarea>
      {error && (
        <span className='text-red-500 text-sm bg-red-200 p-4 rounded my-1'>
          {error}
        </span>
      )}
    </div>
  );
}
