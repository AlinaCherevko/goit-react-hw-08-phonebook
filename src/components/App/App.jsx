import React, { Suspense, lazy, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute, RestrictedRoute } from 'components';
import { useDispatch } from 'react-redux';
import { apiRefreshUser } from 'store/auth/authSlice';

// import css from './App.module.css';

const HomePage = lazy(() => import('pages/home/HomePage'));
const Contacts = lazy(() => import('pages/contacts/Contacts'));
const Login = lazy(() => import('pages/login/Login'));
const Register = lazy(() => import('pages/register/Register'));
const Profile = lazy(() => import('pages/profile/Profile'));
const EditProfile = lazy(() => import('pages/editProfile/EditProfile'));

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
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <Login />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <Register />
              </RestrictedRoute>
            }
          />
          ;
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          ;
          <Route
            path="/profile/edit"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
};
