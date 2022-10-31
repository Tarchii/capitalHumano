import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../../pages/Login';
import Lobby from '../../pages/Lobby';
import useAuth from '../../hooks/useAuth';
import Employees from '../../pages/Employees';
import Reports from '../../pages/Reports';
import Members from '../../pages/Members';
import Areas from '../../pages/Areas';
import Sindicatos from '../../pages/Sindicatos';
import ObraSocial from '../../pages/ObraSocial';

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
      <Route path="/members" element={<Members />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/sindicatos" element={<Sindicatos />} />
      <Route path="/obraSocial" element={<ObraSocial />} />
      <Route path="/*" element={<Navigate to="/lobby" />} />
    </Routes>
  );
};

export default Layout;
