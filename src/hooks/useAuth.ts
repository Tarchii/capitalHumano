import { notification } from 'antd';
import { NotificationApi } from 'antd/lib/notification';
import React from 'react';
import ApplicationContext, { AppData } from '../context/ApplicationContext';
import services from '../services';

type UseAuth = () => {
  user: AppData;
  login: (username: string, password: string) => Promise<boolean | void>;
  logout: () => void;
  isAuthed: boolean;
};

//HARDCODEADA DE CREDENCIALES

const userAdmin = {
  username: 'ADMIN',
  password: 'admin',
};

const userDefault = {
  username: 'DEFAULT',
  password: 'default',
};

const useAuth: UseAuth = () => {
  const [user, setUser] = React.useContext(ApplicationContext);

  const login = (userName: string, password: string) => {
    if (userName === userAdmin.username && password === userAdmin.password) {
      setUser({ ...user, isAuthed: true, username: userName });
      return Promise.resolve(true);
    } else if (
      userName === userDefault.username &&
      password === userDefault.password
    ) {
      setUser({ ...user, isAuthed: true, username: userName });
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  };

  const logout = () => {
    setUser({} as AppData);
    sessionStorage.removeItem('session');
  };

  const isAuthed = !!user.username;

  return { login, logout, user, isAuthed };
};

export default useAuth;
