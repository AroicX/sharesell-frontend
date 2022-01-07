import Button from '@/reusable/Button';
import { CREATE_TRANSACTION } from '@/services/checkout';
import React from 'react';

const PaymentWithPaystack = ({
  fullname,
  phone,
  amount,
  email,
  loading,
  payload,
  state,
  city,
  address,
  rate_key,
  quantity,
  dispatch,
}) => {
  const payWithPaystack = () => {
    var handler = PaystackPop.setup({
      key: 'pk_test_5d5fb23f7643ea0c027b0754c6b8e5861b71c5f4',
      email: email,
      amount: `${amount * 100}`,
      currency: 'NGN',
      ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: fullname,
            variable_name: fullname,
            value: phone,
          },
        ],
      },
      callback: function (response) {
        createTransaction(response);
      },
      onClose: function () {
        alert('window closed');
      },
    });
    handler.openIframe();
  };

  const createTransaction = (response) => {
    const customer_details = {
      fullname: fullname,
      email: email,
      phone: phone,
      destination_state: state,
      destination_city: city,
      address: address,
      rate_key: rate_key,
      amount: amount,
      quantity: quantity,
    };

    const data = {
      quote_id: payload.qoute_id,
      product_id: payload.product_id,
      reseller_id: payload.reseller_id,
      supplier_id: payload.supplier_id,
      payload: response,
      customer_details: customer_details,
    };
    const callback = (response) => {
      console.log(response);
      if (response.status === 'success') {
        dispatch(response.message);
      }
    };
    const onError = (error) => {
      console.log(error.response.data.message);
    };

    CREATE_TRANSACTION(data, callback, onError);
  };

  return (
    <div>
      <Button
        loading={loading}
        text={'Proceed to Secure Payment'}
        iconLeft={'/svg/payment.svg'}
        color={'green'}
        click={() => payWithPaystack()}
      />
    </div>
  );
};

export default PaymentWithPaystack;
