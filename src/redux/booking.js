
// import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import Cookies from  'js-cookie';
// import { apiCategories } from '../components/utils';

// export const getCategoriesThunk = createAsyncThunk(
//   'categories', async () => {
//       const categoryData = await axios.get(apiCategories, {
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${localStorage.getItem('token')}`,
//           Authorization: `Bearer ${Cookies.get('token')}`,
//         }}).then(response => response.data);

//       return categoryData;
//   }
// )
import {  createSlice } from '@reduxjs/toolkit';

const initialState= {
  isCalendarOpened: false,
//   status: 'idle'
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers:  {
  setIsOpenedCalendar: (state, action) => {
    state.isCalendarOpened = action.payload;
  },
  }});

export { bookingSlice };
export const { setIsOpenedCalendar } = bookingSlice.actions;


