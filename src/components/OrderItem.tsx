import React, { useState } from 'react'
import { IOrder } from '../Interfaces/IOrder'
import { styled } from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { FaSave } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { IDish } from '../Interfaces/IDish'

interface Dish {
    id: number
    title: string
    description: string
    price: number
    recipe: string | null
}

interface DishCount {
    id: number
    qty: number
}

interface OrderItemProps {
    order: IOrder
    allDishes: IDish[]
    removeOrder: (orderId: number) => Promise<void>
    updateOrder: (updatedOrder: IOrder, orderId: number) => Promise<void>
}

const OrderItem: React.FC<OrderItemProps> = ({
    order,
    removeOrder,
    updateOrder,
    allDishes,
}: any) => {
    const [isEditing, setIsEditing] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<string>(
        order.payment_method
    )
    const [totalPrice, setTotalPrice] = useState<number>(order.total_price)
    const [dishes, setDishes] = useState<DishCount[]>([])

    const { id } = order

    const handleDelete = () => {
        removeOrder(id)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        updateOrder(
            {
                ...order,
                payment_method: paymentMethod,
                total_price: totalPrice,
                dishes,
            },
            id
        )
        setIsEditing(false)
    }
    const handleDishChange = (dishId: number, newQty: number) => {
        setDishes((prevDishes) =>
            prevDishes.map((dish) =>
                dish.id === dishId ? { ...dish, qty: newQty } : dish
            )
        )
    }
    const handleDishIdChange = (dishId: number, newId: number) => {
        if (dishes.some((dish) => dish.id === newId)) {
            alert('This Dish is already in menu. Please choose a different ID.')
            return
        }

        setDishes((prevDishes) =>
            prevDishes.map((dish) =>
                dish.id === dishId ? { ...dish, id: newId } : dish
            )
        )
    }

    const getDishCounts = (dishes: Dish[]): DishCount[] => {
        const dishMap: { [key: number]: number } = {}

        dishes.forEach((dish) => {
            if (dishMap[dish.id]) {
                dishMap[dish.id]++
            } else {
                dishMap[dish.id] = 1
            }
        })

        return Object.entries(dishMap).map(([id, count]) => ({
            id: Number(id),
            qty: count,
        }))
    }

    React.useEffect(() => {
        if (dishes.length > 0) {
            let res: number = 0
            dishes.map((dish) => {
                res +=
                    allDishes.find((obj: { id: number }) => obj.id === dish.id)
                        .price * dish.qty
            })
            console.log(dishes)
            setTotalPrice(res)
        }
    }, [dishes])

    React.useEffect(() => {
        setDishes(getDishCounts(order.dishes))
    }, [order.dishes])

    return (
        <>
            <OrderCard>
                <Description>
                    <p>id = {order.id}</p>
                    <p>
                        payment_method =
                        {isEditing ? (
                            <input
                                type="text"
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                        ) : (
                            paymentMethod
                        )}
                    </p>
                    <p>total_price = {totalPrice}</p>
                    <p>dishes:</p>
                    {dishes.map((dish, i) => (
                        <Flex key={i}>
                            <span>Dish ID: {i}</span>
                            <span>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={dish.id}
                                        onChange={(e) =>
                                            handleDishIdChange(
                                                dish.id,
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                ) : (
                                    dish.id
                                )}
                            </span>
                            <span>Dish Quantity: </span>
                            <span>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={dish.qty}
                                        onChange={(e) =>
                                            handleDishChange(
                                                dish.id,
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                ) : (
                                    dish.qty
                                )}
                            </span>
                        </Flex>
                    ))}
                </Description>
                {isEditing ? (
                    <SaveButton onClick={handleSave}>
                        <FaSave />
                    </SaveButton>
                ) : (
                    <EditButton onClick={handleEdit}>
                        <FaEdit />
                    </EditButton>
                )}
                <DeleteButton onClick={handleDelete}>
                    <MdDelete />
                </DeleteButton>
            </OrderCard>
        </>
    )
}

export default OrderItem

const Description = styled.div`
    flex: 1;
`

const OrderCard = styled.div`
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    border-radius: 20px;
    overflow: hidden;
`

const EditButton = styled.button`
    width: 10rem;
    border: none;
    font-size: 30px;
    cursor: pointer;
    &:hover {
        background-color: green;
    }
`

const DeleteButton = styled.button`
    width: 10rem;
    border: none;
    font-size: 30px;
    cursor: pointer;
    &:hover {
        background-color: red;
    }
`

const SaveButton = styled.button`
    width: 10rem;
    border: none;
    font-size: 30px;
    cursor: pointer;
    &:hover {
        background-color: blue;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`
