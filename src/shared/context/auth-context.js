import { createContext } from 'react';

const defaultValue = { isLoggedIn: false, login: () => {}, logout: () => {} };

export const AuthContext = createContext(defaultValue);
