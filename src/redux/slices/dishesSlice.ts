import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import APIWrapper from '../../API/APIWrapper'
import { IPagination } from '../../Interfaces/IPagination'
import { IDish } from '../../Interfaces/IDish'

const api = APIWrapper()

interface paramsInterface {
    pagination: IPagination
    searchValue: string
    sortField: string
    sortBy: string
}

interface DishesState {
    items: IDish[]
    status: 'idle' | 'loading' | 'success' | 'error'
}

export interface CounterState {
    value: number
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
