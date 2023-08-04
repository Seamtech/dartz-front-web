import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
//import SignupPage from './Content/SignupPage';
//import LoginPage from './Content/LoginPage';
//import NotFoundPage from './Content/NotFoundPage';

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Add more routes for other pages */}
    </Routes>
  );
};

export default Content;