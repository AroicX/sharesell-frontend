import requests from '@/services/index';

export async function GET_PRODUCTS_CATEGORIES(callback, onError) {
  try {
    let products = await requests.get(`/products/categories`);
    if (products.data) {
      callback && callback(products.data);
    } else {
      throw products;
    }

    return products;
  } catch (err) {
    onError && onError(err);
  }
}
export async function GET_PRODUCTS_IN_CATEGORIES(id, callback, onError) {
  try {
    let products = await requests.get(`/products/category/${id}`);
    if (products.data) {
      callback && callback(products.data);
    } else {
      throw products;
    }

    return products;
  } catch (err) {
    onError && onError(err);
  }
}

export async function GET_PRODUCTS(callback, onError) {
  try {
    let products = await requests.get(`/products`);
    if (products.data) {
      callback && callback(products.data);
    } else {
      throw products;
    }

    return products;
  } catch (err) {
    onError && onError(err);
  }
}

export async function CREATE_PRODUCT(data, callback, onError) {
  try {
    let products = await requests.post(`/products/add-products`, data);
    if (products.data) {
      callback && callback(products.data);
    } else {
      throw products;
    }

    return products;
  } catch (err) {
    onError && onError(err);
  }
}
