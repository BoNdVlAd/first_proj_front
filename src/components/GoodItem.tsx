import React from 'react'
import { styled } from 'styled-components'
import { IGood } from '../Interfaces/IGood'
import ChangeAmount from './ChangeAmount'

interface GoodItemProps {
    good: IGood
}

const GoodPage: React.FC<GoodItemProps> = ({ good }) => {
    const sumPrice = good.count * good.price

    return (
        <>
            <GoodCard>
                <GoodTitle>{good.title}</GoodTitle>
                <GoodPrice>{good.price}</GoodPrice>
                <GoodItem>
                    <ChangeAmount good={good} />
                </GoodItem>
                <SumPrice>{sumPrice}</SumPrice>
            </GoodCard>
        </>
    )
}

export default GoodPage

const GoodCard = styled.div`
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 20px;
    gap: 40px;
    display: flex;
    align-items: center;
`

const GoodTitle = styled.p`
    max-width: 20rem;
    flex: 1;
`

const GoodPrice = styled.p`
    max-width: 20rem;
    flex: 1;
`

const SumPrice = styled.p`
    max-width: 20rem;
    flex: 1;
`

const GoodItem = styled.div`
    max-width: 20rem;
    flex: 1;
`
