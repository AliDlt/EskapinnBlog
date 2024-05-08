// utils/auth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      console.log("dsfds")
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUser(decodedToken);
    } else {
      setUser(null);
    }
  }, []);

  const login = (token: string) => {
    const decodedToken = jwtDecode<JwtPayload>(token);
    Cookies.set('token', token, { expires: 7 });
    setUser(decodedToken);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  const getToken = () => {
    return Cookies.get('token');
  };

  return { user, login, logout, getToken };
};
