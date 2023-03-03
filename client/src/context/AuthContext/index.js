import React from "react";
export const AuthContext = React.createContext(null);

import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const getUser = (token) => {
  try {
    if (!token) token = Cookies.get('accessToken')
    const result = jwtDecode(token)
    return result || null
  } catch (error) {
    return null
  }
}

export const setUserToken = (tokens = {}) => {
  Cookies.set('accessToken', tokens.accessToken, '30d')
  Cookies.set('refreshToken', tokens.refreshToken, '30d')
}

export const removeUserToken = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(getUser());

  const signIn = (tokens = {}, callback) => {
    setUserToken(tokens)
    setUser(getUser(tokens.accessToken));
    callback();
  };

  const signOut = (callback) => {
    setUser(null);
    removeUserToken()
    callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};
