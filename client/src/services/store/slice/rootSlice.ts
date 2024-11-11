import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { inventorySlice } from './inventorySlice'
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  inventoryInfo: inventorySlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

// export const selectAccessToken = (state: RootState) => state.auth
// export const selectUser = (state: RootState) => state.auth.user
