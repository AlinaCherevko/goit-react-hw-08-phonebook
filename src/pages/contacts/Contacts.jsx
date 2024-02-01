import React from 'react';
import { ContactForm, ContactList, Filter } from 'components';
import css from './Contacts.module.css';

const Contacts = () => {
  return (
    <>
      <ContactForm />
      <p className={css.contactsTitle}>CONTACTS</p>
      <Filter />
      <ContactList />
    </>
  );
};

export default Contacts;
