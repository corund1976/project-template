import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer from 'redux/app/appSlice'
import authReducer from 'redux/auth/authSlice'
import userReducer from 'redux/user/userSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const customizedMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false })

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
})

export default store