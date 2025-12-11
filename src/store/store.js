import articleSlice from './slices/articleSlice'
import commentSlice from './slices/commentSlice'
import authSlice from './slices/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    articles: articleSlice,
    comments: commentSlice,
    auth: authSlice,
  },
})
