
import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiBooks } from '../components/utils';

export const getBookThunk = createAsyncThunk(
  'book', async (bookId) => {
      const bookData = await axios.get(`${apiBooks}/${bookId}`).then(response => response.data);

      return bookData;
  }
)

const initialState= {
  book: null,
  status: 'idle'
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getBookThunk.pending, (state) => {
          state.status = 'loading';
      });
      builder.addCase(getBookThunk.fulfilled, (state, action) => {
          state.book = action.payload;
          state.status = 'resolved';
      });
      builder.addCase(getBookThunk.rejected, (state) => {
          state.book = null;
          state.status = 'failed';
      })
  }
});

export { bookSlice };
// export const { setAllBooks } = bookSlice.actions;


