import React from 'react'
import { styled } from 'styled-components'
import { IGood } from '../Interfaces/IGood'
import ChangeAmount from './ChangeAmount'
import { FaArrowRight } from 'react-icons/fa'

interface GoodItemProps {
    good: IGood
}

const GoodPage: React.FC<GoodItemProps> = ({ good }) => {
    const sumPrice = good.count * good.price
    const [showMore, setShowMore] = React.useState<boolean>()

    const handleShowMore = () => {
        setShowMore(!showMore)
    }

    return (
        <>
            <div>
                <GoodCard>
                    <ArrowButton
                        onClick={handleShowMore}
                        className={showMore ? 'active' : ''}
                    >
                        <FaArrowRight />
                    </ArrowButton>
                    <GoodTitle>{good.title}</GoodTitle>
                    <GoodPrice>{good.price}</GoodPrice>
                    <GoodItem>
                        <ChangeAmount good={good} />
                    </GoodItem>
                    <SumPrice>{sumPrice}</SumPrice>
                </GoodCard>
                {showMore && (
                    <ShowMoreElement>
                        <Description>{good.description}</Description>
                    </ShowMoreElement>
                )}
            </div>
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
const ArrowButton = styled.button`
    font-size: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: 0.3s all ease;
    &.active {
        transform: rotate(90deg);
    }
`

const ShowMoreElement = styled.div`
    background-color: #fff;
    width: 90%;
    margin: 0 auto;
    border-radius: 20px;
`

const Description = styled.p`
    text-align: left;
    padding: 20px 10px;
`
