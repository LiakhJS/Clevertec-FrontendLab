
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
  booksByCategory:[],
  filteredBooks:[],
  inputValue:'',
  isSortByDesc:false,
  isSearchOpened:false,
  status: 'idle'
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    filterCatalogByCategory: (state, action) => {
      if (action.payload === 'Все книги') {
        state.booksByCategory = state.books;
      } else {
        state.booksByCategory = state.books.filter((element) => element.categories.includes(action.payload));
      }
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setSortByDesc: (state, action) => {
      state.isSortByDesc = action.payload;
    },
    setIsSearchOpened: (state, action) => {
      state.isSearchOpened = action.payload;
    },
    
    
    
    
   
    
    
  },
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
export const {  filterCatalogByCategory, setInputValue, setSortByDesc, setIsSearchOpened } = booksSlice.actions;


