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

export async function CREATE_ADDRESS(data, callback, onError) {
  try {
    let address = await requests.post(`/user/address/create`, data);
    if (address.data) {
      callback && callback(address.data);
    } else {
      throw address;
    }
    return address;
  } catch (err) {
    onError && onError(err);
  }
}

export async function EDIT_ADDRESS(data, id, callback, onError) {
  try {
    let address = await requests.put(`/user/address/update/${id}`, data);
    if (address.data) {
      callback && callback(address.data);
    } else {
      throw address;
    }
    return address;
  } catch (err) {
    onError && onError(err);
  }
}

export async function DELETE_ADDRESS(id, callback, onError) {
  try {
    let address = await requests.delete(`/user/address/delete/${id}`);
    if (address.data) {
      callback && callback(address.data);
    } else {
      throw address;
    }
    return address;
  } catch (err) {
    onError && onError(err);
  }
}
