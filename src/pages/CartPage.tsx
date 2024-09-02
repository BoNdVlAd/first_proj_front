import React, { useState } from 'react'
import Header from '../components/Header'
import { styled } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import GoodItem from '../components/GoodItem'
import { IGood } from '../Interfaces/IGood'
import ButtonBack from '../components/ButtonBack'
import OrderButton from '../components/OrderButton'
import { setItems } from '../redux/slices/cartSlice'
import { getFromLocalStorage } from '../utils/Localhost'

const CartPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const items: IGood[] = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (items.length === 0 && getFromLocalStorage()) {
            dispatch(setItems(getFromLocalStorage()))
        }
    }, [])

    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue} />
                <Wrapper>
                    <GoodsList>
                        <ButtonBack />
                        <FlexColumns>
                            <p>title</p>
                            <p>price</p>
                            <p></p>
                            <p>sum</p>
                        </FlexColumns>
                        {items.map((good) => (
                            <GoodItem good={good} />
                        ))}
                        <PriceFlex>
                            <p>total price</p>
                            <p>{totalPrice}</p>
                        </PriceFlex>
                        <OrderButton goods={items} totalPrice={totalPrice} />
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

const PriceFlex = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 5rem;
    font-size: 30px;
`
const FlexColumns = styled.div`
    width: 90%;
    background-color: #9797cd;
    margin: 0 auto;
    border-radius: 20px;
    gap: 40px;
    display: flex;
    align-items: center;

    p {
        max-width: 20rem;
        flex: 1;
    }
`
