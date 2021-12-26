import requests from '@/services/index';

export async function BUSINESS_DETAILS(data, callback, onError) {
  try {
    let business = await requests.post(
      `/update-profile/business-details`,
      data
    );
    if (business.data) {
      callback && callback(business.data);
    } else {
      throw business;
    }
    return business;
  } catch (err) {
    onError && onError(err);
  }
}

export async function CONTACT_PERSON(data, callback, onError) {
  try {
    let person = await requests.post(`/update-profile/contact-person`, data);
    if (person.data) {
      callback && callback(person.data);
    } else {
      throw person;
    }
    return person;
  } catch (err) {
    onError && onError(err);
  }
}

export async function UPDATE_BVN(data, callback, onError) {
  try {
    let bvn = await requests.post(`update-profile/update-bvn`, data);
    if (bvn.data) {
      callback && callback(bvn.data);
    } else {
      throw bvn;
    }
    return bvn;
  } catch (err) {
    onError && onError(err);
  }
}
