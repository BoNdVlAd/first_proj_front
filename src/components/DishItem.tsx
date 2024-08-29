import React, { useState, MouseEvent } from 'react'
import { styled, keyframes } from 'styled-components'
import { IDish } from '../Interfaces/IDish'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import { removeItem } from '../redux/slices/cartSlice'
import { RootState } from '../redux/store'

interface DishItemProps {
    dish: IDish
}

const DishItem: React.FC<DishItemProps> = ({ dish }: any) => {
    const [isFlying, setIsFlying] = useState(false)
    const [bought, setBought] = useState<boolean>(false)

    const dispatch = useDispatch()
    const items = useSelector((state: RootState) => state.cart.items)

    const handleBuyClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setIsFlying(true)
        setTimeout(() => {
            setIsFlying(false)
        }, 1000)
        if (items.find((obj) => obj.id === dish.id)) {
            dispatch(removeItem(dish))
        } else {
            dispatch(addItem(dish))
        }
        setBought(!bought)
    }

    return (
        <StyleLink to={`/dishes/${dish.id}`}>
            <Card className={isFlying ? 'fly-up' : ''}>
                <Image
                    src={
                        'https://www.pamperedchef.ca/iceberg/com/recipe/1153421-lg.jpg'
                    }
                />
                <Content>
                    <Title>{dish.title}</Title>
                    <Description>{dish.description}</Description>
                    <Price>{dish.price}</Price>
                </Content>
                <ButtonComponent onClick={handleBuyClick}>
                    {items.find((obj) => obj.id === dish.id)
                        ? 'cancel purchase'
                        : 'buy'}
                </ButtonComponent>
            </Card>
        </StyleLink>
    )
}

export default DishItem

const breatheAnimation = keyframes`
    0% { transform: scale(1); opacity: 1}
    50% { transform: scale(.95); opacity: .5}
    100% { transform: scale(1); }
`

const Card = styled.div`
    background-color: #ddd;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    max-width: 330px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 570px;
    display: flex;
    flex-direction: column;
    position: relative;

    transition: all ease 0.8s;
    &.fly-up {
        animation-name: ${breatheAnimation};
        animation-duration: 1s;
    }
`

const Image = styled.img`
    width: 100%;
    border-radius: 8px 8px 0 0;
`

const Title = styled.h2`
    font-size: 1.5em;
    margin: 16px 0;
`

const Description = styled.p`
    font-size: 1em;
    color: #555;
    flex: 1;
    max-height: 54px;
`

const Price = styled.p`
    font-size: 1.2em;
    font-weight: bold;
    color: #000;
`

const StyleLink = styled(Link)({
    textDecoration: 'none',
    color: '#000',
})

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const ButtonComponent = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    height: 2rem;
    text-transform: uppercase;

    &:hover {
        background: #0056b3;
    }
`
