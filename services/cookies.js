import Cookies from "js-cookie";

export const setCookie = (token) => {
  Cookies.set("user-token", token, { expires: 30 });
};

export const getToken = () => Cookies.get("user-token");

export const deleteCookie = () => Cookies.remove("user-token");
