import requests from '@/services/index';

export async function CREATE_TRANSACTION(data, callback, onError) {
  try {
    let trans = await requests.post(`/transaction/create`, data);
    if (trans.data) {
      callback && callback(trans.data);
    } else {
      throw trans;
    }
  } catch (err) {
    onError(err);
  }
}

export async function GET_QUOTE_BY_ID(quote_id, callback, onError) {
  try {
    let quote = await requests.get(`/checkout/${quote_id}`);
    if (quote.data) {
      callback && callback(quote.data);
    } else {
      throw quote;
    }
  } catch (err) {
    onError(err);
  }
}
