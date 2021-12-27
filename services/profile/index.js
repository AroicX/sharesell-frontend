import requests from '@/services/index';

export async function CHANGE_PASSWORD(data, callback, onError) {
  try {
    let password = await requests.post(`/user/change-password`, data);
    if (password.data) {
      callback && callback(password.data);
    } else {
      throw password;
    }
  } catch (err) {
    onError(err);
  }
}
