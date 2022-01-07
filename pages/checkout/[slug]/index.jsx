import React from 'react';
import Checkout from '@/components/checkout';
import requests from '@/services/index';

export default function CheckoutPage({}) {
  return (
    <>
      <Checkout />
    </>
  );
}

// export const getServerSideProps = async () => {
//   const getQuoteByIdResponse = await requests.get(
//     `transaction/get-quote-id/1CXRU0FLXKJL62RDNWTZ1798`
//   );

//   const getQuoteById = getQuoteByIdResponse;

//   return {
//     props: {
//       getQuoteById,
//     },
//   };
// };
