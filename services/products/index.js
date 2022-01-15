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
export async function GET_SINGLE_PRODUCT(id, callback, onError) {
  try {
    let products = await requests.get(`/products/${id}`);
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

export async function GET_QUOTE(data, callback, onError) {
  try {
    let quote = await requests.post(`/transaction/get-quote`, data);
    if (quote.data) {
      callback && callback(quote.data);
    } else {
      throw quote;
    }

    return quote;
  } catch (err) {
    onError && onError(err);
  }
}

export async function GENERATE_PAYMENT_LINK(data, callback, onError) {
  try {
    let link = await requests.post(`/transaction/generate-payment-link`, data);
    if (link.data) {
      callback && callback(link.data);
    } else {
      throw link;
    }

    return link;
  } catch (err) {
    onError && onError(err);
  }
}

export async function SEARCH_PRODUCT(search, callback, onError) {
  try {
    let searchResult = await requests.get(`/products/search/${search}`);
    if (searchResult.data) {
      callback && callback(searchResult.data);
    } else {
      throw searchResult;
    }
    return searchResult;
  } catch (err) {
    onError && onError(err);
  }
}

export async function DELETE_PRODUCT(id, callback, onError) {
  try {
    let product = await requests.delete(`/products/delete-product/${id}`);
    if (product.data) {
      callback && callback(product.data);
    } else {
      throw product;
    }
    return product;
  } catch (err) {
    onError && onError(err);
  }
}

export async function UPDATE_PRODUCT(data, callback, onError) {
  try {
    let products = await requests.put(`/products/update-product`, data);
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

export async function GET_LIKED_PRODUCT(callback, onError) {
  try {
    let like = await requests.get(`/products/get-like`);
    if (like.data) {
      callback && callback(like.data);
    } else {
      throw like;
    }

    return like;
  } catch (err) {
    onError && onError(err);
  }
}

export async function LIKE_PRODUCT(id, callback, onError) {
  try {
    let like = await requests.post(`products/like/${id}`);
    if (like.data) {
      callback && callback(like.data);
    } else {
      throw like;
    }

    return like;
  } catch (err) {
    onError && onError(err);
  }
}
