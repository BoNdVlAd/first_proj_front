import React, { useState } from 'react'
import Header from '../components/Header'
import { styled } from 'styled-components'
import { IOrder } from '../Interfaces/IOrder'
import { IPagination } from '../Interfaces/IPagination'
import APIWrapper from '../API/APIWrapper'
import OrderItem from '../components/OrderItem'
import { IDish } from '../Interfaces/IDish'
import { useNavigate } from 'react-router-dom'
import ButtonBack from '../components/ButtonBack'

const ManagePage = () => {
    const api = APIWrapper()
    const [searchValue, setSearchValue] = useState<string>('')
    const [orders, setOrders] = useState<IOrder[]>([])
    const [allDishes, setAllDishes] = useState<IDish[]>([])
    const [sortField, setSortField] = React.useState<string>('title')
    const [sortBy, setSortBy] = React.useState<string>('asc')
    const [pagination, setPagination] = React.useState<IPagination>({
        total: 0,
        perPage: 1,
        currentPage: 1,
        lastPage: 0,
        from: 0,
        to: 0,
    })
    const navigate = useNavigate()

    const updateOrder = async (order: any, orderId: number): Promise<void> => {
        try {
            console.log('UPDATEDORDER', order)
            const body = {
                payment_method: order.payment_method,
                total_price: Number(order.total_price),
                dishes: order.dishes,
            }
            const response = await api.patch(`orders/update/${orderId}`, body)
            fetchOrders()
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const removeOrder = async (orderId: number): Promise<void> => {
        try {
            const response = await api.remove(`orders/delete/${orderId}`)
            fetchOrders()
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const fetchOrders = async () => {
        try {
            const data = await api.get(`orders`)
            setOrders(data.data.data)
            setPagination(data.data.pagination)
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const fetchDishes = async () => {
        try {
            const data = await api.get('dishes?page=1&perPage=1000')
            setAllDishes(data.data.data)
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    React.useEffect(() => {
        fetchOrders()
        fetchDishes()
    }, [searchValue])

    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue} />
                <Wrapper>
                    <OrdersList>
                        <ButtonBack />
                        <OrderTitle>Orders</OrderTitle>
                        <OrderItems>
                            {orders.map((order) => (
                                <OrderItem
                                    updateOrder={(
                                        order: any,
                                        orderId: number
                                    ) => updateOrder(order, orderId)}
                                    removeOrder={(orderId: number) =>
                                        removeOrder(orderId)
                                    }
                                    key={order.id}
                                    order={order}
                                    allDishes={allDishes}
                                />
                            ))}
                        </OrderItems>
                    </OrdersList>
                </Wrapper>
            </Container>
        </>
    )
}

export default ManagePage

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

const OrdersList = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #ddd;
    position: relative;
    border-radius: 20px;
`

const OrderTitle = styled.h1``

const OrderItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
