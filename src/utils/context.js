import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  const [cartItem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("cartItem"))
  );

  return (
    <Context.Provider
      value={{ isLoggedIn, setIsLoggedIn, cartItem, setCartItem }}
    >
      {children}
    </Context.Provider>
  );
};
