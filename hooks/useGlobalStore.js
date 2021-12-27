import { GET_PRODUCTS } from '@/services/products';
import React, { useEffect, useContext, createContext, useState } from 'react';

const GlobalStoreContext = createContext();

const GlobalStore = () => {
  // TODO
  /**
   * *call user data
   * *call userRole -
   * *call states -
   * *update with user info
   */

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
<<<<<<< HEAD
  const [currentProduct, setCurrentProduct] = useState([]);
  const [supplier, setSupplier] = useState(null);
=======
  const [userProfile, setUserProfile] = useState(null);
>>>>>>> bb39f207759a23906c2a74254337ea444ce346bc

  const getProducts = () => {
    const callback = (response) => {
      const { data } = response.payload;
      setProducts(data);
    };
    const onError = (error) => {
      console.log(error);
    };

    GET_PRODUCTS(callback, onError);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user-data'));
    if (data) {
      setToken(data.token);
      setUser(data.user);
      getProducts();
    }
  }, []);

  // useEffect(() => {
  //   console.log(currentCategory);
  // }, [currentCategory]);

  return {
    user,
    token,
    products,
    productCategories,
    setProductCategories,
    currentCategory,
    setCurrentCategory,
<<<<<<< HEAD
    currentProduct,
    setCurrentProduct,
    supplier,
    setSupplier,
=======
    userProfile,
    setUserProfile,
>>>>>>> bb39f207759a23906c2a74254337ea444ce346bc
  };
};

export const GlobalStoreProvider = ({ children, localStorage }) => {
  const data = GlobalStore(localStorage);

  return (
    <GlobalStoreContext.Provider value={data}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => {
  return useContext(GlobalStoreContext);
};
