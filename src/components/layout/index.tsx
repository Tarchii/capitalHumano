import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../../pages/Login';
import Lobby from '../../pages/Lobby';
import useAuth from '../../hooks/useAuth';

const Layout: React.FC = () => {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed && location.pathname !== '/login') {
    return <Navigate to="login" />;
  } else if (isAuthed && location.pathname === '/login') {
    return <Navigate to="lobby" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/*" element={<Navigate to="/lobby" />} />
    </Routes>
  );
};

export default Layout;
