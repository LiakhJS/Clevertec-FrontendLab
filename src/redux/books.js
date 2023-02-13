

import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    allBooks: [],
  },
  reducers: {
    setAllBooks(state, action) {
      state.allBooks = action.payload;
    },
  }
})

export { booksSlice };
export const { setAllBooks } = booksSlice.actions;


