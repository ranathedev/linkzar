import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const initialState = {
  theme: 'light',
}

export const setTheme = (theme: string) => ({
  type: 'SET_THEME',
  payload: theme,
})

const themeReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    case 'CLEAR_STATE':
      return initialState
    default:
      return state
  }
}

const store = configureStore({
  //@ts-ignore
  reducer: themeReducer,
})

export { store, Provider }
