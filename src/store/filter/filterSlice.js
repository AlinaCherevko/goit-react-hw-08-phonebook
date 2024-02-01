import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};
const filterSlice = createSlice({
  // Ім'я слайсу
  name: 'filter',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    filterContact(state, action) {
      state.filter = action.payload;
    },
  },
});

// Генератори екшенів
export const { filterContact } = filterSlice.actions;
// Редюсер слайсу
export const filterReducer = filterSlice.reducer;
