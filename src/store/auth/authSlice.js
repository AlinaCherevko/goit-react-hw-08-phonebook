import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

// export const $authInstance = axios.create({
//   baseURL: 'https://connections-api.herokuapp.com',
// });
export const $authInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

// ----------встановлення  токену----------
const setToken = token => {
  $authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// ----------видалення  токену----------
const deleteToken = () => {
  $authInstance.defaults.headers.common.Authorization = '';
};

//---------реєстрація користувача------------
export const apiRegisterUser = createAsyncThunk(
  'auth/apiRegisterUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/users/signup', formData);
      setToken(data.token);
      // console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//---------логінізація користувача------------
export const apiLoginUser = createAsyncThunk(
  'auth/apiLoginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/users/login', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//---------збереження існуючого користувача і введених даних------------
export const apiRefreshUser = createAsyncThunk(
  'auth/apiRefreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (!token) return thunkApi.rejectWithValue("You don't have a token!");
    try {
      setToken(token);
      const { data } = await $authInstance.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//---------вихід користувача------------
export const apiLogOutUser = createAsyncThunk(
  'auth/apiLogOutUser',
  async (_, thunkApi) => {
    try {
      await $authInstance.post('/users/logout');
      deleteToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  // Ім'я слайсу
  name: 'auth',

  // Початковий стан редюсера слайсу
  initialState,

  // Об'єкт екстраредюсерів
  extraReducers: builder =>
    builder

      // --------fulfilled request-------------------

      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiLogOutUser.fulfilled, () => {
        return initialState;
      })
      // --------pending and rejected request-------------------

      .addMatcher(
        isAnyOf(
          apiRegisterUser.pending,
          apiLoginUser.pending,
          apiRefreshUser.pending,
          apiLogOutUser.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiRegisterUser.rejected,
          apiLoginUser.rejected,
          apiRefreshUser.rejected,
          apiLogOutUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

// Редюсер слайсу
export const authReducer = authSlice.reducer;
