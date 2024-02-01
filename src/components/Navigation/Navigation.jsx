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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'store/auth/authSlise.selectors';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab component={Link} to="/" label="HomePage" {...a11yProps(0)} />
        {isLoggedIn ? (
          <Tab
            component={Link}
            to="/contacts"
            label="Contacts"
            {...a11yProps(1)}
          />
        ) : (
          <>
            <Tab component={Link} to="/login" label="Login" {...a11yProps(2)} />
            <Tab
              component={Link}
              to="/register"
              label="Register"
              {...a11yProps(2)}
            />
          </>
        )}
      </Tabs>
    </Box>
  );
};
