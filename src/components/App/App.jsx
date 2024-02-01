import React, { Suspense, lazy, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components';
import { useDispatch } from 'react-redux';
import { apiRefreshUser } from 'store/auth/authSlice';

// import css from './App.module.css';

const HomePage = lazy(() => import('pages/home/HomePage'));
const Contacts = lazy(() => import('pages/contacts/Contacts'));
const Login = lazy(() => import('pages/login/Login'));
const Register = lazy(() => import('pages/register/Register'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />;
          <Route path="/contacts" element={<Contacts />} />;
          <Route path="/login" element={<Login />} />;
          <Route path="/register" element={<Register />} />;
        </Routes>
      </Suspense>
    </Layout>
  );
};
