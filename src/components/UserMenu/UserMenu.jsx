import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogOutUser } from 'store/auth/authSlice';
import { selectDataAuth } from 'store/auth/authSlise.selectors';
import css from './UserMenu.module.css';
import { Button } from '@mui/material';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectDataAuth);
  const email = userData?.email ?? '';
  return (
    <div className={css.wrapper}>
      <p className={css.email}>{email}</p>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => dispatch(apiLogOutUser())}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
