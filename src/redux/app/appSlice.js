import { createSlice } from '@reduxjs/toolkit'

const getOS = () => navigator.userAgent

const getLanguage = () => {
  const language = `${window?.localStorage?.getItem('app-language')}`

  if (['EN', 'RU', 'TH'].includes(language)) return language

  return 'RU'
}

const initialState = {
  os: getOS(),
  screenHeight: 600,
  language: getLanguage(),
  displayMenu: false,
  displayModal: false,
  displayLoader: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setScreenHeight: (state, action) => { state.screenHeight = action.payload },
    setLanguage: (state, action) => { state.language = action.payload },
    setDisplayMenu: (state, action) => { state.displayMenu = action.payload },
    setDisplayModal: (state, action) => { state.displayModal = action.payload },
    setDisplayLoader: (state, action) => { state.displayLoader = action.payload },
  }
})

export const {
  setScreenHeight,
  setLanguage,
  setDisplayMenu,
  setDisplayModal,
  setDisplayLoader,
} = appSlice.actions

export default appSlice.reducer
