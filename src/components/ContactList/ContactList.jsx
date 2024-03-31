import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteContact, apiGetContacts } from 'store/contacts/contactsSlice';
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from 'store/contacts/contactSlise.selectors';
import css from './ContactList.module.css';
import { Button } from '@mui/material';

export const ContactList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContact = useSelector(selectFilteredContacts);
  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  //шукаємо підрядок у рядку, далі ми передамо цей об,єкт у рендер
  // const filteredContact = contacts.filter(user =>
  //   user.userName.toLowerCase().includes(filter.trim().toLowerCase())
  // );
  return (
    <>
      {isLoading && <p className={css.warning}>Request in the progress...</p>}
      {error && <p className={css.warning}>Something gone wrong...</p>}
      <ul className={css.listWrapper}>
        {filteredContact.map(user => (
          <li key={user.id} className={css.wrapper}>
            <p className={css.description}>
              {user.name}: {user.number}
            </p>
            <Button
              className={css.button}
              onClick={() => dispatch(apiDeleteContact(user._id))}
              type="button"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
