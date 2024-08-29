import { createSlice } from '@reduxjs/toolkit'
import { IDish } from '../../Interfaces/IDish'

interface DishesState {
    items: IDish[]
    status: 'idle' | 'loading' | 'success' | 'error'
}

const initialState: DishesState = {
    items: [],
    status: 'loading',
}

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        setDishesItems(state, action) {
            state.items = action.payload
        },
    },
})

export const { setDishesItems } = dishesSlice.actions

export default dishesSlice.reducer
