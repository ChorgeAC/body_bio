import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { LoginPage } from '../pages/LoginPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect root (/) to /home */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      {/* other routes below */}
    </Routes>
  );
};

export default AppRoutes;
