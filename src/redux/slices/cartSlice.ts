import { createSlice } from '@reduxjs/toolkit'
import { IGood } from '../../Interfaces/IGood'

interface CartState {
    items: IGood[]
    totalPrice: number
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((x, y) => {
                return x + y.count * y.price
            }, 0)
        },
        removeItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            )

            if (findItem && findItem.count >= 1) {
                findItem.count--
            }
            if (findItem && findItem.count === 0) {
                state.items = state.items.filter(
                    (obj) => obj.id != action.payload.id
                )
            }
            state.totalPrice = state.items.reduce((x, y) => {
                return x + y.count * y.price
            }, 0)
        },
    },
})

export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
