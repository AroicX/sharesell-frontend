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

export async function RESEND_ONE_TIME_PASSWORD(data, callback, onError) {
  try {
    let otp = await requests.post(`/auth/resend_one_time_password`, data);
    if (otp.data) {
      callback && callback(otp.data);
    }
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

export async function FORGET_PASSWORD(data, callback, onError) {
  try {
    let forgetPassword = await requests.post(`/auth/forget-password`, data);
    if (forgetPassword.data) {
      callback && callback(forgetPassword.data);
    } else {
      throw forgetPassword;
    }
    return forgetPassword;
  } catch (error) {
    onError && onError(error);
  }
}

export async function RESET_PASSWORD(data, callback, onError) {
  try {
    let resetPassword = await requests.post(`/auth/reset-password`, data);
    if (resetPassword.data) {
      callback && callback(resetPassword.data);
    } else {
      throw resetPassword;
    }
    return resetPassword;
  } catch (error) {
    onError && onError(error);
  }
}
