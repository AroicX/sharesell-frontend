export async function GET_PRODUCTS_CATEGORIES(data, callback, onError) {
  try {
    let products = await requests.post(`/products/categories`, data);
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

export async function GET_PRODUCTS(data, callback, onError) {
  try {
    let products = await requests.post(`/products`, data);
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
