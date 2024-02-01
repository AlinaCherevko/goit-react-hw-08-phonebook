import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { apiPostContact } from 'store/contacts/contactsSlice';

import { selectDataContacts } from 'store/contacts/contactSlise.selectors';

import css from './ContactForm.module.css';
import { Button, TextField } from '@mui/material';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectDataContacts);

  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  const formSubmit = e => {
    e.preventDefault();

    const formData = {
      userName,
      userNumber,
      // id буде ств у базі даних тому ми тут більше не використовуємо id: nanoid(),
    };

    addNewName(formData);

    //контрольовано очищуємо вміст форми:
    setUserName('');
    setUserNumber('');

    //очищуємо неконтрольовану форму:
    // e.currentTarget.reset();
  };

  const addNewName = async formData => {
    const avoidRepitition = contacts.some(
      contact => contact.userName === formData.userName
    );
    if (avoidRepitition) {
      alert(`${formData.userName} is already exist!`);
      return;
    }

    dispatch(apiPostContact(formData));
  };

  //Напишимо метод що контролює поля форм і змінює стан:
  const onChangeInputForm = ({ target: { name, value } }) => {
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'userNumber':
        setUserNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <h1 className={css.title}>Add new contact</h1>
      <form className={css.form} onSubmit={formSubmit}>
        <div className={css.divWrapper}>
          <label className={css.label}>Name</label>
          <TextField
            onChange={onChangeInputForm}
            value={userName}
            type="text"
            name="userName"
            className={css.input}
            variant="outlined"
            size="small"
            required
          />
        </div>
        <div className={css.divWrapper}>
          <label className={css.label}>Number</label>
          <TextField
            onChange={onChangeInputForm}
            value={userNumber}
            type="text"
            name="userNumber"
            className={css.input}
            variant="outlined"
            size="small"
            required
          />
        </div>
        <Button
          className={css.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add contact
        </Button>
      </form>
    </>
  );
};
