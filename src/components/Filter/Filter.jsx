import React from 'react';
import { useDispatch } from 'react-redux';
import { filterContact } from 'store/filter/filterSlice';
import css from './Filter.module.css';
import { TextField } from '@mui/material';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.divWrapper}>
      <label className={css.label}>Find contact by name</label>
      <TextField
        type="text"
        onChange={e => dispatch(filterContact(e.currentTarget.value))}
        className={css.input}
        variant="outlined"
        size="small"
        placeholder="Find name.."
      />
    </div>
  );
};
