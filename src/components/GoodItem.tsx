import React from 'react'
import { styled } from 'styled-components'
import { IGood } from '../Interfaces/IGood'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../redux/slices/cartSlice'

interface GoodItemProps {
    good: IGood
}

const GoodPage: React.FC<GoodItemProps> = ({ good }) => {
    const dispatch = useDispatch()

    const handleAddAmount = () => {
        dispatch(addItem(good))
    }

    const handleRemoveAmount = () => {
        dispatch(removeItem(good))
    }

    return (
        <>
            <GoodCard>
                <GoodTitle>{good.title}</GoodTitle>
                <GoodPrice>{good.price}</GoodPrice>
                <AmountButton onClick={handleRemoveAmount}>-</AmountButton>
                <GoodCount>{good.count}</GoodCount>
                <AmountButton onClick={handleAddAmount}>+</AmountButton>
            </GoodCard>
        </>
    )
}

export default GoodPage

const GoodCard = styled.div`
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    border-radius: 20px;
    gap: 40px;
`

const GoodTitle = styled.p``

const GoodPrice = styled.p``

const GoodCount = styled.p``

const AmountButton = styled.button``
