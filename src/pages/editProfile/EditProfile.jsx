import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectDataAuth } from 'store/auth/authSlise.selectors';
import { Button } from '@mui/material';
import css from './EditProfile.module.module.css';
import { updateProfile, updateProfileName } from 'store/auth/authSlice';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectDataAuth);

  const initialEmail = userData.email;
  const initialName = userData.name;

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [file, setFile] = useState(null);

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(updateProfile(file));
    // console.log(name);
    dispatch(updateProfileName(name));

    navigate('/profile');
  };

  const handleLoadFile = e => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
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
        <input
          className={css.input}
          type="file"
          onChange={handleLoadFile}
        ></input>
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
