import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user?: string | null
  accessToken?: string | null
  refreshToken?: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },

    logout: (state) => {
      state.user = null
      state.accessToken = undefined
      state.refreshToken = undefined
    },
  },
})

export const { setUser, setAccessToken, setRefreshToken, logout } =
  authSlice.actions

export default authSlice.reducer
