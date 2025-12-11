import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import articleService from '@/services/articleService'

const CACHE_DURATION = 5 * 60 * 1000

const initialState = {
  articles: [],
  currentArticle: null,
  filteredArticles: [],
  loading: false,
  error: null,
  currentCategory: null,
  filters: {
    searchQuery: '',
    isActive: null,
    sortBy: 'name',
    hasProducts: null,
    parentCategory: null,
  },
  lastFetched: null,
}

// Helper to merge articles without duplicates
const mergeArticles = (existing, newArticles) => {
  const articlesMap = new Map(existing.map(a => [a._id || a.id, a]))
  newArticles.forEach(article => {
    articlesMap.set(article._id || article.id, article)
  })
  return Array.from(articlesMap.values())
}

// Async thunks
export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    const { lastFetched } = getState().articles
    const now = Date.now()

    if (lastFetched && now - lastFetched < CACHE_DURATION) {
      return { cached: true }
    }

    try {
      const response = await articleService.getAll()
      return { cached: false, data: response, timestamp: now }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load articles')
    }
  }
)

export const fetchArticlesByUserId = createAsyncThunk(
  'articles/fetchByUserId',
  async (_, { rejectWithValue }) => {
    try {
      return await articleService.getByUserId()
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load articles')
    }
  }
)

export const fetchArticleById = createAsyncThunk(
  'articles/fetchById',
  async (id, { rejectWithValue, getState }) => {
    const existing = getState().articles.articles.find(a => (a._id || a.id) === id)
    if (existing) return { cached: true, data: existing }

    try {
      const response = await articleService.getById(id)
      return { cached: false, data: response }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load article')
    }
  }
)

export const fetchArticlesByCategory = createAsyncThunk(
  'articles/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await articleService.getByCategory(category)
      return { articles: response, category }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to filter articles')
    }
  }
)

export const createArticle = createAsyncThunk(
  'articles/create',
  async (articleData, { rejectWithValue }) => {
    try {
      return await articleService.create(articleData)
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create article')
    }
  }
)

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ id, articleData }, { rejectWithValue }) => {
    try {
      return await articleService.update(id, articleData)
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update article')
    }
  }
)

export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (id, { rejectWithValue }) => {
    try {
      await articleService.delete(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete article')
    }
  }
)

export const searchArticles = createAsyncThunk(
  'articles/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await articleService.search(query)
      return { articles: response, query }
    } catch (error) {
      return rejectWithValue(error.message || 'Search failed')
    }
  }
)

// Slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const allowedFilters = Object.keys(initialState.filters)
      const validatedPayload = Object.fromEntries(
        Object.entries(action.payload).filter(([key]) => allowedFilters.includes(key))
      )
      state.filters = { ...state.filters, ...validatedPayload }
    },

    clearFilters: state => {
      state.filters = { ...initialState.filters }
      state.filteredArticles = []
      state.currentCategory = null
    },

    clearError: state => {
      state.error = null
    },

    clearCurrentArticle: state => {
      state.currentArticle = null
    },

    setSearchQuery: (state, action) => {
      if (typeof action.payload === 'string') {
        state.filters.searchQuery = action.payload
      }
    },

    invalidateCache: state => {
      state.lastFetched = null
    },

    resetArticlesState: () => initialState,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAllArticles.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.loading = false
        if (!action.payload.cached) {
          state.articles = action.payload.data
          state.lastFetched = action.payload.timestamp
        }
        state.error = null
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticlesByUserId.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticlesByUserId.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload
        state.lastFetched = Date.now()
        state.error = null
      })
      .addCase(fetchArticlesByUserId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticleById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false
        state.currentArticle = action.payload.data
        if (!action.payload.cached) {
          state.articles = mergeArticles(state.articles, [action.payload.data])
        }
        state.error = null
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticlesByCategory.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.filteredArticles = action.payload.articles
        state.currentCategory = action.payload.category
        state.error = null
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(createArticle.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles = mergeArticles(state.articles, [action.payload])
        state.error = null
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateArticle.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles = mergeArticles(state.articles, [action.payload])
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = action.payload
        }
        state.error = null
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteArticle.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles = state.articles.filter(a => (a._id || a.id) !== action.payload)
        if ((state.currentArticle?._id || state.currentArticle?.id) === action.payload) {
          state.currentArticle = null
        }
        state.error = null
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(searchArticles.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.filteredArticles = action.payload.articles
        state.filters.searchQuery = action.payload.query
        state.error = null
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setFilters,
  clearFilters,
  clearError,
  clearCurrentArticle,
  setSearchQuery,
  invalidateCache,
  resetArticlesState,
} = articlesSlice.actions

// Selectors
export const selectAllArticles = state => state.articles.articles
export const selectCurrentArticle = state => state.articles.currentArticle
export const selectFilteredArticles = state => state.articles.filteredArticles
export const selectArticlesLoading = state => state.articles.loading
export const selectArticlesError = state => state.articles.error
export const selectCurrentCategory = state => state.articles.currentCategory
export const selectFilters = state => state.articles.filters
export const selectSearchQuery = state => state.articles.filters.searchQuery

export default articlesSlice.reducer
