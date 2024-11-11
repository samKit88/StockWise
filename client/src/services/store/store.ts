import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './slice/rootSlice'

const persistedReducer = persistReducer(
  {
    key: 'main',
    storage,
    whitelist: ['auth'],
  },
  rootReducer
)
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type RootState = Omit<ReturnType<typeof store.getState>, '_persist'>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
