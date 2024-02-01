import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $authInstance } from 'store/auth/authSlice';

const initialState = {
  contacts: [],
  status: 'idle',
  isLoading: false,
  error: null,
};

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await $authInstance.get('/contacts');
      // console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiPostContact = createAsyncThunk(
  'contacts/apiPostContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/contacts', formData);
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await $authInstance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт екстраредюсерів

  extraReducers: builder =>
    builder

      //Get Contact
      .addCase(apiGetContacts.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
        // state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.error = action.payload;
      })

      //Post Contact
      .addCase(apiPostContact.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiPostContact.fulfilled, (state, action) => {
        state.status = 'success';
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(apiPostContact.rejected, (state, action) => {
        state.status = 'error';
        state.isLoading = false;
        state.error = action.payload;
      })

      //Delete Contact
      .addCase(apiDeleteContact.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      }),
});

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
