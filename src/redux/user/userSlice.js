import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    setAvatarURL: (state, action) => { state.avatarURL = action.payload },
    setAvatarId: (state, action) => { state.avatarId = action.payload },
    resetUser: () => initialState,
  },
})

export const {
  setUser,
  setAvatarURL,
  setAvatarId,
  resetUser,
} = userSlice.actions

export default userSlice.reducer
