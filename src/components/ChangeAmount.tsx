import React, { MouseEvent } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../redux/slices/cartSlice'
import { styled } from 'styled-components'
import { IGood } from '../Interfaces/IGood'
import { removeFromLocalStorage, setToLocalStorage } from '../utils/Localhost'

interface GoodItemProps {
    good: IGood | undefined
}

const ChangeAmount: React.FC<GoodItemProps> = ({ good }) => {
    const dispatch = useDispatch()

    const handleAddAmount = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(addItem(good))
        setToLocalStorage({ dish: good })
    }

    const handleRemoveAmount = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(removeItem(good))
        removeFromLocalStorage({ dish: good })
    }

    return (
        <>
            <Flex>
                <AmountButton onClick={handleRemoveAmount}>
                    <FaMinus />
                </AmountButton>
                <GoodCount>{good?.count}</GoodCount>
                <AmountButton onClick={handleAddAmount}>
                    <FaPlus />
                </AmountButton>
            </Flex>
        </>
    )
}

export default ChangeAmount

const GoodCount = styled.p`
    font-size: 18px;
`

const AmountButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
`
const Flex = styled.div`
    height: 2rem;
    display: flex;
    width: 40%;
    margin: 0 auto;
    align-items: center;
    gap: 1.5rem;
`
