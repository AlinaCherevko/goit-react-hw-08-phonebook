import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import css from './Login.module.css';
import { apiLoginUser } from 'store/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;
    const formData = {
      email,
      password,
    };
    console.log(formData);
    dispatch(apiLoginUser(formData));
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.label}>
        Email:
        <TextField
          type="email"
          name="userEmail"
          variant="outlined"
          size="small"
          required
        />
      </label>
      <label className={css.label}>
        Password:
        <TextField
          type="password"
          name="userPassword"
          variant="outlined"
          size="small"
          required
        />
      </label>
      <Button
        className={css.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
    </form>
  );
};

export default Login;
