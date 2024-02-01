// import React from 'react';
// import { NavLink } from 'react-router-dom';

// import css from './Navigation.module.css';
// export const Navigation = () => {
//   return (
//     <div>
//       <NavLink className={css.headerNavigation} to="/">
//         Home
//       </NavLink>
//       <NavLink className={css.headerNavigation} to="/contacts">
//         Contacts
//       </NavLink>
//       <NavLink className={css.headerNavigation} to="/login">
//         Login
//       </NavLink>
//       <NavLink className={css.headerNavigation} to="/register">
//         Register
//       </NavLink>
//     </div>
//   );
// };
import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'store/auth/authSlise.selectors';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs aria-label="basic tabs example">
        <Tab component={NavLink} to="/" label="HomePage" />
        {isLoggedIn ? (
          <Tab component={NavLink} to="/contacts" label="Contacts" />
        ) : (
          <>
            <Tab component={NavLink} to="/login" label="Login" />
            <Tab component={NavLink} to="/register" label="Register" />
          </>
        )}
      </Tabs>
    </Box>
  );
};
