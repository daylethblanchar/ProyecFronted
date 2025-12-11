// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '@/services/authService'

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = authService.getToken()
      const storedUser = authService.getCurrentUser()
      if (token && storedUser) {
        return storedUser
      }
      return null
    } catch (error) {
      authService.logout()
      return rejectWithValue('Error initializing authentication')
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ correo, password }, { rejectWithValue }) => {
    try {
      console.log('🚀 Intentando login con:', { correo, password: '***' })
      const response = await authService.login({ correo, password })
      console.log('✅ Login exitoso:', response)
      return response.usuario
    } catch (error) {
      console.error('❌ Error en login:', error)
      return rejectWithValue(error.message || 'Error al iniciar sesión')
    }
  }
)

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData)
    return response.usuario
  } catch (error) {
    return rejectWithValue(error.message || 'Error al registrar usuario')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      authService.logout()
      state.user = null
      state.error = null
      state.isAuthenticated = false
    },
    updateUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user_data', JSON.stringify(action.payload))
    },
  },
  extraReducers: builder => {
    builder
      // Initialize
      .addCase(initializeAuth.pending, state => {
        state.loading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = !!action.payload && !!authService.getToken()
      })
      .addCase(initializeAuth.rejected, state => {
        state.loading = false
        state.isAuthenticated = false
      })
      // Login
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Register
      .addCase(register.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

// Selectors
export const selectUser = state => state.auth.user
export const selectLoading = state => state.auth.loading
export const selectError = state => state.auth.error
export const selectIsAuthenticated = state => state.auth.isAuthenticated
export const selectHasRole = role => state => state.auth.user?.rol === role

export const { logout, updateUser } = authSlice.actions
export default authSlice.reducer
