import { configureStore } from '@reduxjs/toolkit'
import dishes from './slices/dishesSlice'

export const store = configureStore({
    reducer: {
        dishes,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
