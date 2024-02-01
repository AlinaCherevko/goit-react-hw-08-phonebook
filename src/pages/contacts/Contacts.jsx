import React from 'react';
import { ContactForm, ContactList, Filter } from 'components';
import css from './Contacts.module.css';

const Contacts = () => {
  return (
    <>
      <ContactForm />
      <h2 className={css.contactsTitle}>CONTACTS</h2>
      <Filter />
      <ContactList />
    </>
  );
};

export default Contacts;
