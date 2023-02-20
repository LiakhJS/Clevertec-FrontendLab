
import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// import { apiBooks } from '../components/utils';

export const getBooksThunk = createAsyncThunk(
  'books', async ()=> {
      const booksData = await axios.get('https://strapi.cleverland.by/api/books').then(response => response.data);

      return booksData;
  }
)

const initialState = {
  books: [],
  status: 'idle'
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getBooksThunk.pending, (state) => {
          state.status = 'loading';
      });
      builder.addCase(getBooksThunk.fulfilled, (state, action) => {
          state.books = action.payload
          state.status = 'resolved';
      });
      builder.addCase(getBooksThunk.rejected, (state) => {
          state.books = [];
          state.status = 'failed';
      })
  }
});

export { booksSlice };
export const { setAllBooks } = booksSlice.actions;


