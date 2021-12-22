import requests from 'services';

export async function LOGIN_ACCOUNT(data, callback, onError) {
  try {
    let listing = await requests.post(`/auth/login`, data);
    if (listing.data) {
      callback && callback(listing.data);
    } else {
      throw listing;
    }

    return listing;
  } catch (err) {
    onError && onError(err);
  }
}
export async function CREATE_ACCOUNT(data, callback, onError) {
  try {
    let listing = await requests.post(`/listings`, data);
    if (listing.data) {
      callback && callback(listing.data);
    } else {
      throw listing;
    }

    return listing;
  } catch (err) {
    onError && onError(err);
  }
}
