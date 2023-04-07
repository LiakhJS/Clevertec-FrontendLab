
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://strapi.cleverland.by';
const instance = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}`,
});

instance.interceptors.request.use((config) => {
  const JWTToken = Cookies.get('token');

  if (JWTToken) {
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
  }

  return config;
});

export const bookCommentThunk = createAsyncThunk(
  'book/comment', async ({ data }) => {
    console.log(data); console.log('comment');
    const commentData = await instance.post('https://strapi.cleverland.by/api/comments', data).then(response => response.data);

    return commentData;
  }
)
export const bookChangeCommentThunk = createAsyncThunk(
  'book/change/comment', async ({ data, commentID }) => {
    console.log(data); console.log('changecomment');
    const commentData = await instance.put(`https://strapi.cleverland.by/api/comments/${commentID}`, data).then(response => response.data);

    return commentData;
  }
)
export const getUserThunk = createAsyncThunk(
  'user', async () => {
    const currentUserData = await instance.get('https://strapi.cleverland.by/api/users/me').then(response => response.data);

    return currentUserData;
  }
)
export const changeUserInformationThunk = createAsyncThunk(
  'user/change', async ({ data, userID }) => {
    console.log(data);
    const changeUserInfData = await instance.put(`https://strapi.cleverland.by/api/users/${userID}`, data).then(response => response.data);

    return changeUserInfData;
  }
)

export const setPictureThunk = createAsyncThunk(
  'setPicture', async ( formData ) => {
    const pictureData = await instance.post('https://strapi.cleverland.by/api/upload', formData).then(response => response.data);
    const userId = Cookies.get('currentUser');
    const userData =  await instance.put(`/api/users/${userId}`, {'avatar': pictureData[0].id}).then(response => response.data);
    return userData;
  }
)



const initialState = {
  commentStatusLoading: 'idle',
  changeCommentStatusLoading: 'idle',
  rateModalIsOpened: false,
  isCurrentUserComment: false,
  user: null,
  userStatus: 'idle',
  pictureLoadingStatus: 'idle',
}

const bookCommentSlice = createSlice({
  name: 'bookComment',
  initialState,
  reducers: {
    setRateModalIsOpened: (state, action) => {
      state.rateModalIsOpened = action.payload;
    },
    setIsCurrentUserComment: (state, action) => {
      state.isCurrentUserComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bookCommentThunk.pending, (state) => {

      state.commentStatusLoading = 'loading';
    });
    builder.addCase(bookCommentThunk.fulfilled, (state) => {

      state.commentStatusLoading = 'resolved';
    });
    builder.addCase(bookCommentThunk.rejected, (state) => {

      state.commentStatusLoading = 'failed';
    });
    builder.addCase(bookChangeCommentThunk.pending, (state) => {

      state.changeCommentStatusLoading = 'loading';
    });
    builder.addCase(bookChangeCommentThunk.fulfilled, (state) => {

      state.changeCommentStatusLoading = 'resolved';
    });
    builder.addCase(bookChangeCommentThunk.rejected, (state) => {

      state.changeCommentStatusLoading = 'failed';
    });

    builder.addCase(getUserThunk.pending, (state) => {

      state.userStatus = 'loading';
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.userStatus = 'resolved';
      state.user = action.payload;
    });
    builder.addCase(getUserThunk.rejected, (state) => {

      state.userStatus = 'failed';
    });
    builder.addCase(setPictureThunk.pending, (state) => {

      state.pictureLoadingStatus = 'loading';
    });
    builder.addCase(setPictureThunk.rejected, (state) => {

      state.pictureLoadingStatus = 'failed';
    });
    builder.addCase(setPictureThunk.fulfilled, (state, action) => {
      state.pictureLoadingStatus = 'resolved';
      state.user = action.payload;

    });

  }

});

export { bookCommentSlice };
export const { setRateModalIsOpened, setIsCurrentUserComment } = bookCommentSlice.actions;


// export const commentTC = createAsyncThunk('book/comment', async (param: RequestCommentType, { dispatch, rejectWithValue }) => {

//     dispatch(setAppStatusAC({ status: 'loading' }))
//     try {
//         const res = await booksAPI.comment(param)
//         const bookId = param.data.book
//         dispatch(fetchBook({ bookId }))
//         dispatch(setAppStatusAC({ status: 'succeeded' }))
//         dispatch(rateAC('success'))


//         return res.data
//     } catch (err) {
//         dispatch(setAppStatusAC({ status: 'failed' }))
//         dispatch(rateAC('failed'))
//         const error = err as AxiosError

//         if (!error.response) {
//             throw err
//         }

//         return rejectWithValue(error.response.data)
//     }

// })
// export const changeCommentTC = createAsyncThunk('book/changeComment', async (param: { data: any, commentId: number }, { dispatch, rejectWithValue }) => {

//     dispatch(setAppStatusAC({ status: 'loading' }))
//     try {
//         const res = await booksAPI.changeComment(param.data, param.commentId)

//         dispatch(setAppStatusAC({ status: 'succeeded' }))
//         dispatch(changeRateAC('success'))

//         return res.data
//     } catch (err) {
//         dispatch(setAppStatusAC({ status: 'failed' }))
//         dispatch(changeRateAC('failed'))
//         const error = err as AxiosError

//         if (!error.response) {
//             throw err
//         }

//         return rejectWithValue(error.response.data)
//     }

// })