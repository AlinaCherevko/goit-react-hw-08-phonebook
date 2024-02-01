import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import css from './Register.module.css';
import { useDispatch } from 'react-redux';
import { apiRegisterUser } from 'store/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };
    console.log(formData);
    dispatch(apiRegisterUser(formData));
  };
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.label}>Name:</label>

      <TextField
        type="text"
        name="userName"
        variant="outlined"
        size="small"
        required
      />
      <label className={css.label}>Email:</label>

      <TextField
        type="email"
        name="userEmail"
        variant="outlined"
        size="small"
        required
      />
      <label className={css.label}>Password:</label>

      <TextField
        type="password"
        name="userPassword"
        variant="outlined"
        size="small"
        required
      />
      <Button
        className={css.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Register;
