
import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from  'js-cookie';
import { apiCategories } from '../components/utils';

export const getCategoriesThunk = createAsyncThunk(
  'categories', async () => {
      const categoryData = await axios.get(apiCategories, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
          Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(response => response.data);

      return categoryData;
  }
)

const initialState= {
  categories: [],
  status: 'idle'
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getCategoriesThunk.pending, (state) => {
          state.status = 'loading';
      });
      builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
          state.categories = action.payload
          state.status = 'resolved';
      });
      builder.addCase(getCategoriesThunk.rejected, (state) => {
          state.categories = [];
          state.status = 'failed';
      })
  }
});

export { categoriesSlice };
// export const { setAllBooks } = booksSlice.actions;


