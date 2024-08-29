import { configureStore } from '@reduxjs/toolkit'
import dishes from './slices/dishesSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        dishes,
        cart,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
