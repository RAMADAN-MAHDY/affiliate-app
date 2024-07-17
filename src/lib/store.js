import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './authSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        prodectData :counterSlice , 
    }
  })
}