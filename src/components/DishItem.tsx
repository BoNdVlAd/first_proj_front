import React, {useState} from 'react';
import {styled} from "styled-components";

interface RecipeItem {
    id: number;
    qty: number;
}

interface Dish {
    id: number;
    title: string;
    description: string;
    price: number;
    recipe: RecipeItem[];
    created_at: string;
    updated_at: string;
    order_id: number;
}

interface DishItemProps {
    dish: Dish;
}

const DishItem: React.FC<DishItemProps> = ({dish}: any) => {


    return (
        <Card>
            <Image src={'https://www.pamperedchef.ca/iceberg/com/recipe/1153421-lg.jpg'} />
            <Title>{dish.title}</Title>
            <Description>{dish.description}</Description>
            <Price>{dish.price}</Price>
        </Card>
    )
};

export default DishItem;

const Card = styled.div`
    background-color: #ddd;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    max-width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
    width: 100%;
    border-radius: 8px 8px 0 0;
`;

const Title = styled.h2`
    font-size: 1.5em;
    margin: 16px 0;
`;

const Description = styled.p`
    font-size: 1em;
    color: #555;
`;

const Price = styled.p`
    font-size: 1.2em;
    font-weight: bold;
    color: #000;
`;