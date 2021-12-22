import React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'components/link';

const Button = ({
  to = false,
  text,
  styles,
  click,
  iconLeft,
  iconRight,
  loading,
  loadingText = null,
  rest,
}) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`w-full bg-app-color p-4 flex  block text-white rounded my-1 ${styles} ${
            loading && !loadingText
              ? 'center text-center align-middle justify-center items-center'
              : 'justify-between'
          }`}
          onClick={click}
          {...rest}
          disabled={loading}
        >
          {loading ? (
            <div className={`w-100 flex flex-row justify-between text-white `}>
              <SVG
                className='animate-spin'
                width='20px'
                src={'/svg/loading.svg'}
              />
              <span className='text-app-color'>{'.'}</span>
              {''}
              {loadingText && <span className='ml-3'>{loadingText}</span>}
            </div>
          ) : (
            <>
              {iconLeft ? <SVG className='mr-4' src={iconLeft} /> : null}
              <span> {text}</span>
              {iconRight ? (
                <SVG className='ml-4 relative top-0 right' src={iconRight} />
              ) : null}
            </>
          )}
        </Link>
      ) : (
        <button
          className={`w-full bg-app-color p-4 flex  block text-white rounded my-1 ${styles} ${
            loading && !loadingText
              ? 'center text-center align-middle justify-center items-center'
              : 'justify-between'
          }`}
          onClick={click}
          {...rest}
          disabled={loading}
        >
          {loading ? (
            <div className={`w-100 flex flex-row justify-between text-white `}>
              <SVG
                className='animate-spin'
                width='20px'
                src={'/svg/loading.svg'}
              />
              <span className='text-app-color'>{'.'}</span>
              {''}
              {loadingText && <span className='ml-3'>{loadingText}</span>}
            </div>
          ) : (
            <>
              {iconLeft ? <SVG className='mr-4' src={iconLeft} /> : null}
              <span> {text}</span>
              {iconRight ? (
                <SVG className='ml-4 relative top-0 right' src={iconRight} />
              ) : null}
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;