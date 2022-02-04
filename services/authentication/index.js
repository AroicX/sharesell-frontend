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

export async function PHONE_NUMBER(data, callback, onError) {
  try {
    let phoneNumber = await requests.post(`/auth/check-phone-number`, data);
    if (phoneNumber.data) {
      callback && callback(phoneNumber.data);
    } else {
      throw phoneNumber;
    }

    return phoneNumber;
  } catch (err) {
    onError && onError(err);
  }
}

export async function ONE_TIME_PASSWORD(data, callback, onError) {
  try {
    let otp = await requests.post(`/auth/verify_one_time_password`, data);
    if (otp.data) {
      callback && callback(otp.data);
    } else {
      throw otp;
    }

    return otp;
  } catch (err) {
    onError && onError(err);
  }
}

export async function QUICK_REGISTER(data, callback, onError) {
  try {
    let register = await requests.post(`/auth/quick-register`, data);
    if (register.data) {
      callback && callback(register.data);
    } else {
      throw register;
    }
    return register;
  } catch (err) {
    onError && onError(err);
  }
}
