import React, {useState} from 'react';
import {IOrder} from "../Interfaces/IOrder";
import {styled} from "styled-components";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Dish {
    id: number;
    qty: number;
}


interface OrderItemProps {
    order: IOrder;
    removeOrder: (orderId: number) => Promise<void>;
    updateOrder: (updatedOrder: IOrder, orderId: number) => Promise<void>;
}

const OrderItem: React.FC<OrderItemProps> = ({order, removeOrder, updateOrder}: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrder, setEditedOrder] = useState<IOrder>(order);
    const [paymentMethod, setPaymentMethod] = useState<string>(order.payment_method);
    const [totalPrice, setTotalPrice] = useState<number>(order.total_price);
    const [dishes, setDishes] = useState<Dish[]>([
        {"id": 10, "qty": 5},
        {"id": 12, "qty": 1}
    ]);

    const { id } = order;
    const handleDelete = () => {
        removeOrder(id)
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateOrder({ ...order, payment_method: paymentMethod, total_price: totalPrice, dishes }, id);
        setIsEditing(false);
    };

    const handleDishChange = (dishId: number, newQty: number) => {
        setDishes((prevDishes) =>
            prevDishes.map((dish) =>
                dish.id === dishId ? { ...dish, qty: newQty } : dish
            )
        );
    };


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
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        ) : (
                            paymentMethod
                        )}
                    </p>
                    <p>
                        total_price =
                        {isEditing ? (
                            <input
                                type="number"
                                value={totalPrice}
                                onChange={(e) => setTotalPrice(Number(e.target.value))}
                            />
                        ) : (
                            totalPrice
                        )}
                    </p>
                    <p>dishes:</p>
                    {dishes.map((dish) => (
                        <div key={dish.id}>
                            <span>Dish ID: {dish.id}</span>
                            <span>
                            Quantity:{" "}
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={dish.qty}
                                        onChange={(e) => handleDishChange(dish.id, Number(e.target.value))}
                                    />
                                ) : (
                                    dish.qty
                                )}
                        </span>
                        </div>
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
    );
};

export default OrderItem;

const Description = styled.div`
    flex: 1;
    
`

const OrderCard = styled.div`
    width: 90%;
    background-color: #FFF;
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
`;