import React from 'react';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.textWrap}>
      <p className={css.description}>Welcome to</p>
      <h1 className={css.title}>Phonebook App</h1>
      <p className={css.afterTitle}>
        Please, Sign up or Log in to have access to the Phonebook App
      </p>
    </div>
  );
};

export default HomePage;
