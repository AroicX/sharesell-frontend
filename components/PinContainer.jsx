import React, { useRef, useEffect } from 'react';

export default function PinContainer() {
  const firstPin = useRef();
  const secondPin = useRef();
  const thirdPin = useRef();
  const fourthPin = useRef();

  useEffect(() => {
      firstPin.current.focus();
  }, [])

  const pinOnChangeHandler = (e, nextInput) => {
    if (e.target.value.length === 1) {
      nextInput.current.focus();
    }
  };
  return (
    <div className='flex items-center my-3'>
      <input
        type={'password'}
        className='border border-app-color h-10 w-10 mx-1 rounded text-center text-2xl'
        maxLength={1}
        ref={firstPin}
        onChange={(e) => pinOnChangeHandler(e, secondPin)}
      />
      <input
        type={'password'}
        className='border border-app-color h-10 w-10 mx-1 rounded text-center text-2xl'
        maxLength={1}
        ref={secondPin}
        onChange={(e) => pinOnChangeHandler(e, thirdPin)}
      />
      <input
        type={'password'}
        className='border border-app-color h-10 w-10 mx-1 rounded text-center text-2xl'
        maxLength={1}
        ref={thirdPin}
        onChange={(e) => pinOnChangeHandler(e, fourthPin)}
      />
      <input
        type={'password'}
        className='border border-app-color h-10 w-10 mx-1 rounded text-center text-2xl'
        maxLength={1}
        ref={fourthPin}
      />
    </div>
  );
}
