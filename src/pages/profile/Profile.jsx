import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectDataAuth } from 'store/auth/authSlise.selectors';
import { Button } from '@mui/material';
import css from './Profile.module.css';
// import { Link } from 'react-router-dom';

const Profile = () => {
  const userData = useSelector(selectDataAuth);
  const email = userData?.email ?? '';
  const name = userData?.name ?? '';
  const avatarURL = userData?.avatarURL ?? '';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile/edit');
  };
  return (
    <>
      <div>
        <h2 className={css.title}>PROFILE</h2>
        <p className={css.text}>{name}</p>
        <p className={css.text}>{email}</p>
        <img src={avatarURL} alt={name} />
      </div>
      <Button
        // to="edit"
        onClick={handleClick}
        className={css.button}
        type="button"
        variant="contained"
        color="inherit"
      >
        Edit Profile
      </Button>
    </>
  );
};

export default Profile;
