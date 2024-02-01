import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { apiPostContact } from 'store/contacts/contactsSlice';

import { selectDataContacts } from 'store/contacts/contactSlise.selectors';

import css from './ContactForm.module.css';
import { Button, TextField } from '@mui/material';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectDataContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const formSubmit = e => {
    e.preventDefault();

    const formData = {
      name,
      number,
      // id буде ств у базі даних тому ми тут більше не використовуємо id: nanoid(),
    };

    addNewName(formData);

    //контрольовано очищуємо вміст форми:
    setName('');
    setNumber('');

    //очищуємо неконтрольовану форму:
    // e.currentTarget.reset();
  };

  const addNewName = async formData => {
    const avoidRepitition = contacts.some(
      contact => contact.name === formData.name
    );
    if (avoidRepitition) {
      alert(`${formData.name} is already exist!`);
      return;
    }

    dispatch(apiPostContact(formData));
  };

  //Напишимо метод що контролює поля форм і змінює стан:
  const onChangeInputForm = ({ target: { name, value } }) => {
    switch (name) {
      case 'userName':
        setName(value);
        break;
      case 'userNumber':
        setNumber(value);
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
            value={name}
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
            value={number}
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
