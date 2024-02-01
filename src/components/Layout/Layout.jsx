import React from 'react';
import { Navigation } from 'components';
import { selectIsLoggedIn } from 'store/auth/authSlise.selectors';
import { useSelector } from 'react-redux';
import { UserMenu } from 'components';

import css from './Layout.module.css';

export const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.container}>
      <header className={css.header}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>
      <main>{children}</main>
    </div>
  );
};
