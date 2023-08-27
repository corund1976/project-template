import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  signupSuccess: false,
  signupMessage: '',
  isAuthenticated: false,
  isAuthorized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignupSuccess: (state, action) => { state.signupSuccess = action.payload },
    setSignupMessage: (state, action) => { state.signupMessage = action.payload },
    setIsAuthenticated: (state, action) => { state.isAuthenticated = action.payload },
    setIsAuthorized: (state, action) => { state.isAuthorized = action.payload },
    resetAuth: () => initialState,
  },
})

export const {
  setSignupSuccess,
  setSignupMessage,
  setIsAuthenticated,
  setIsAuthorized,
  resetAuth,
} = authSlice.actions

export default authSlice.reducer