import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectDataAuth } from 'store/auth/authSlise.selectors';
import { Button } from '@mui/material';
import css from './Profile.module.css';
// import { Link } from 'react-router-dom';

const Profile = () => {
  const userData = useSelector(selectDataAuth);

  const email = userData.email;
  const name = userData.name;
  const avatarURL = userData.avatarURL;

  const navigate = useNavigate();

  const baseURL = 'http://localhost:8000/';
  const url = avatarURL.startsWith('http')
    ? avatarURL
    : `${baseURL}${avatarURL}`;

  console.log(url);
  const handleClick = () => {
    navigate('/profile/edit');
  };
  return (
    <>
      <div>
        <h2 className={css.title}>PROFILE</h2>
        <p className={css.text}>{name}</p>
        <p className={css.text}>{email}</p>
        <img src={url} alt={name} />
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
