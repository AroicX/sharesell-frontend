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
  // const [onBoarding, setOnBoarding] = useState(true);
  // const [localStorage, setLocalStorage] = useState(null);
  // const [authenticated, setAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  // const [userRole, setUserRole] = useState(0);
  // const [err, setErr] = useState(null);

  return {
    token,
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
