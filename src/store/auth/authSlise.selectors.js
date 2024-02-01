import { createSelector } from '@reduxjs/toolkit';

const selectAuth = state => state.auth;

export const selectDataAuth = createSelector(selectAuth, auth => auth.userData);
export const selectToken = createSelector(selectAuth, auth => auth.token);
export const selectIsLoggedIn = createSelector(
  selectAuth,
  auth => auth.isLoggedIn
);
export const selectError = createSelector(selectAuth, auth => auth.error);
export const selectIsLoading = createSelector(
  selectAuth,
  auth => auth.isLoading
);

// const initialState = {
//     token: null,
//     userData: null,
//     isLoggedIn: false,
//     error: null,
//     isLoading: false,
//   };
