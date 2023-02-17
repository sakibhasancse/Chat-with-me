import React from "react";
const AuthContext = React.createContext(null);

import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const getUser = (token) => {
  try {
    if (!token) token = Cookies.get('accessToken')
    const result = jwtDecode(token)
    return result?.data || null
  } catch (error) {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(getUser());

  const signIn = (tokens, callback) => {
    console.log({ tokens })
    const { accessToken, refreshToken } = tokens
    Cookies.set('accessToken', accessToken, '30d')
    Cookies.set('refreshToken', refreshToken, '30d')

    setUser(getUser(accessToken));
    callback();
  };

  const signOut = (callback) => {
    setUser(null);
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};
