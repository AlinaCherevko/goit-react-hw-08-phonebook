import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDataAuth } from 'store/auth/authSlise.selectors';
import { Button } from '@mui/material';
import css from './EditProfile.module.module.css';

const EditProfile = () => {
  const userData = useSelector(selectDataAuth);
  const initialEmail = userData?.email ?? '';
  const initialName = userData?.name ?? '';

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const onFormSubmit = () => {};

  const onChangeInput = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        return;
    }
  };
  return (
    <form className={css.form} onSubmit={onFormSubmit}>
      <div className={css.wrapper}>
        <label className={css.label}>Name</label>
        <input
          name="name"
          className={css.input}
          value={name}
          onChange={onChangeInput}
        ></input>
      </div>
      <div className={css.wrapper}>
        <label className={css.label}>Email</label>
        <input
          name="email"
          className={css.input}
          value={email}
          onChange={onChangeInput}
        ></input>
      </div>
      <div className={css.wrapper}>
        <label className={css.label}>Avatar</label>
        <input className={css.input}></input>
      </div>
      <Button
        className={css.button}
        type="submit"
        variant="contained"
        color="inherit"
      >
        Save
      </Button>
    </form>
  );
};

export default EditProfile;
