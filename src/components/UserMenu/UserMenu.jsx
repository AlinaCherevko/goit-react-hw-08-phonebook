import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogOutUser } from 'store/auth/authSlice';
import { selectDataAuth } from 'store/auth/authSlise.selectors';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectDataAuth);
  const email = userData?.email ?? '';
  return (
    <div>
      <p>{email}</p>
      <button type="button" onClick={() => dispatch(apiLogOutUser())}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
