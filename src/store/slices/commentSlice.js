/**
 * Comments Redux Slice
 * Manages comment state and async operations
 */

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
// import commentService from '@/services/commentService'
import commentService from '../../services/commentService'

// Stable empty array reference
const EMPTY_ARRAY = []

const initialState = {
  comments: {},
  loading: false,
  error: null,
  currentArticleId: null,
}

// ====================================
// 🔄 ASYNC THUNKS
// ====================================

/**
 * Fetches all comments for a specific article.
 */
export const getByArticleId = createAsyncThunk(
  'comments/fetchByArticleId',
  async ({ articleId, limit }, { rejectWithValue }) => {
    try {
      const response = await commentService.fetchCommentsByArticleId(articleId, { limit })
      return { articleId, comments: response }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load comments')
    }
  }
)

/**
 * Creates a new comment on an article.
 */
export const createComment = createAsyncThunk(
  'comments/create',
  async ({ articleId, commentData }, { rejectWithValue }) => {
    try {
      const response = await commentService.create(articleId, commentData)
      return { articleId, comment: response }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create comment')
    }
  }
)

/**
 * Updates an existing comment.
 */
export const updateComment = createAsyncThunk(
  'comments/update',
  async ({ articleId, commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await commentService.update(articleId, commentId, commentData)
      return { articleId, comment: response }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update comment')
    }
  }
)

/**
 * Deletes a comment.
 */
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await commentService.delete(commentId)
      return { commentId, articleId: response.data.articleId }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete comment')
    }
  }
)

// ====================================
// 📦 SLICE
// ====================================

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },

    clearComments: state => {
      state.comments = {}
      state.currentArticleId = null
    },

    clearCommentsForArticle: (state, action) => {
      if (state.comments[action.payload]) {
        delete state.comments[action.payload]
      }
    },

    resetCommentsState: () => {
      return initialState
    },
  },

  extraReducers: builder => {
    builder
      // FETCH COMMENTS
      .addCase(getByArticleId.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getByArticleId.fulfilled, (state, action) => {
        state.loading = false
        state.comments[action.payload.articleId] = action.payload.comments
        state.currentArticleId = action.payload.articleId
        state.error = null
      })
      .addCase(getByArticleId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // CREATE COMMENT
      .addCase(createComment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false
        const { articleId, comment } = action.payload

        if (!state.comments[articleId]) {
          state.comments[articleId] = []
        }

        state.comments[articleId].push(comment)
        state.error = null
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // UPDATE COMMENT
      .addCase(updateComment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false
        const { articleId, comment } = action.payload

        if (state.comments[articleId]) {
          const index = state.comments[articleId].findIndex(
            c => c._id === comment._id || c.id === comment.id
          )
          if (index !== -1) {
            state.comments[articleId][index] = comment
          }
        }

        state.error = null
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // DELETE COMMENT
      .addCase(deleteComment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false
        const { articleId, commentId } = action.payload

        if (state.comments[articleId]) {
          state.comments[articleId] = state.comments[articleId].filter(
            c => c._id !== commentId && c.id !== commentId
          )
        }

        state.error = null
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// ====================================
// 📤 EXPORTS
// ====================================

export const { clearError, clearComments, clearCommentsForArticle, resetCommentsState } =
  commentSlice.actions

// Base selectors
const selectCommentsState = state => state.comments.comments
export const selectCommentsLoading = state => state.comments.loading
export const selectCommentsError = state => state.comments.error
export const selectCurrentArticleId = state => state.comments.currentArticleId
export const selectAllComments = selectCommentsState

// Memoized selectors
export const selectCommentsByArticleId = articleId =>
  createSelector([selectCommentsState], comments => comments[articleId] || EMPTY_ARRAY)

export const selectCommentCount = articleId =>
  createSelector([selectCommentsState], comments => comments[articleId]?.length || 0)

export default commentSlice.reducer
