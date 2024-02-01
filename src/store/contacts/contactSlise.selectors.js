import { createSelector } from '@reduxjs/toolkit';

const selectContacts = state => state.contacts;
const selectFilter = state => state.filter;

export const selectDataContacts = createSelector(
  selectContacts,
  contacts => contacts.contacts
);

export const selectStatus = createSelector(
  selectContacts,
  contacts => contacts.status
);
export const selectError = createSelector(
  selectContacts,
  contacts => contacts.error
);
export const selectIsLoading = createSelector(
  selectContacts,
  contacts => contacts.isLoading
);
export const selectDataFilter = createSelector(
  selectFilter,
  filter => filter.filter
);

export const selectFilteredContacts = createSelector(
  [selectDataContacts, selectDataFilter],
  (contacts, filter) => {
    return contacts.filter(user =>
      user.userName.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);
