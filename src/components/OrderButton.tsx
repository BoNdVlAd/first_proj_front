import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { IGood } from '../Interfaces/IGood'
import APIWrapper from '../API/APIWrapper'

interface OrderButtonProps {
    goods: IGood[]
    totalPrice: number
}

const OrderButton: React.FC<OrderButtonProps> = ({ goods, totalPrice }) => {
    const navigate = useNavigate()
    const api = APIWrapper()

    const orderDishes = goods.map((good) => ({
        id: good.id,
        qty: good.count,
    }))

    const handleCreateOrder = async () => {
        try {
            const body = {
                payment_method: 'cash',
                status: false,
                total_price: totalPrice,
                dishes: orderDishes,
            }
            const response = await api.post('orders', body)
            if (response.status === 200) {
                const orderId = response.data.id
                navigate(`/payment/${orderId}`)
            } else {
                console.log('Creating order failed: ', response)
            }
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    return (
        <>
            <OrderButtonComponent onClick={handleCreateOrder}>
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
