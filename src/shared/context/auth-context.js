import { createContext } from 'react';

const defaultValue = {
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {}
};

export const AuthContext = createContext(defaultValue);
