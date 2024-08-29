import React, { useState } from 'react'
import Header from '../components/Header'
import { styled } from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import GoodItem from '../components/GoodItem'
import { IGood } from '../Interfaces/IGood'
import ButtonBack from '../components/ButtonBack'

const CartPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const items: IGood[] = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)
    console.log('ITEMS', items)

    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue} />
                <Wrapper>
                    <GoodsList>
                        <ButtonBack />
                        <h1>totalPrice = {totalPrice}</h1>
                        {items.map((good) => (
                            <GoodItem good={good} />
                        ))}
                    </GoodsList>
                </Wrapper>
            </Container>
        </>
    )
}

export default CartPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const Wrapper = styled.div`
    padding-top: 4rem;
    background-color: #cccccc;
    flex: 1;
`

const GoodsList = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #ddd;
    position: relative;
    border-radius: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 1rem 0;
    margin-top: 1rem;
`
