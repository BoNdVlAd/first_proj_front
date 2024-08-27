import React, {useState} from 'react';
import Header from "../components/Header";
import {styled} from "styled-components";
import { IOrder } from '../Interfaces/IOrder'
import {IPagination} from "../Interfaces/IPagination";
import APIWrapper from "../API/APIWrapper";
import OrderItem from "../components/OrderItem";

const ManagePage = () => {
    const api = APIWrapper()
    const [searchValue, setSearchValue] = useState<string>('')
    const [orders, setOrders] = useState<IOrder[]>([])
    const [sortField, setSortField] = React.useState<string>('title');
    const [sortBy, setSortBy] = React.useState<string>('asc');
    const [pagination, setPagination] = React.useState<IPagination>({
        total: 0,
        perPage: 1,
        currentPage: 1,
        lastPage: 0,
        from: 0,
        to: 0,
    })

    const updateOrder = async (order: any, orderId: number): Promise<void> => {
        try {
            console.log("UPDATEDORDER", order)
            const body = {
                payment_method: order.payment_method,
                total_price: Number(order.total_price),
                dishes: order.dishes,
            }
            console.log(body)
            const response = await api.patch(`orders/update/${orderId}`, body)
            console.log(response)
            fetchOrders()
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const removeOrder = async (orderId: number): Promise<void> => {
        try {
            const response = await api.remove(`orders/delete/${orderId}`)
            fetchOrders()
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const fetchOrders = async () => {
        try {
            const data = await api.get(`orders`)
            setOrders(data.data.data);
            setPagination(data.data.pagination)

        } catch (e) {
            console.log("Error: ", e)
        }
    }

    React.useEffect(() => {
        fetchOrders();
    }, [searchValue]);


    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue}/>
                <Wrapper>
                    <OrdersList>
                        <OrderTitle>Orders</OrderTitle>
                        <OrderItems>
                            {
                                orders.map((order) => (
                                    <OrderItem updateOrder={(order: any, orderId: number) => updateOrder(order, orderId)} removeOrder={(orderId: number) => removeOrder(orderId)} key={order.id} order={order} />
                                ))
                            }
                        </OrderItems>
                    </OrdersList>
                </Wrapper>
            </Container>
        </>
    );
};

export default ManagePage;

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
`

const OrderTitle = styled.h1`
    
`

const OrderItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`