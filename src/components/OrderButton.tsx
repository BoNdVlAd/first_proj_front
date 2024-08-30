import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const OrderButton = () => {
    const navigate = useNavigate()

    return (
        <>
            <OrderButtonComponent onClick={() => navigate('/payment')}>
                place an order
            </OrderButtonComponent>
        </>
    )
}

const OrderButtonComponent = styled.button`
    background-color: #007bff;
    border: none;
    border-radius: 20px;
    font-size: 25px;
    text-transform: uppercase;
    cursor: pointer;
    width: 20%;
    margin: 0 auto;
    padding: 10px 0;
    transition: all ease 0.3s;
    &:active {
        transform: translate(0px, 5px);
    }
`

export default OrderButton
