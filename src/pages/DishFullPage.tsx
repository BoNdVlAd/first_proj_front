import React, { useState } from 'react'
import { styled } from 'styled-components'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import APIWrapper from '../API/APIWrapper'
import { IDish } from '../Interfaces/IDish'
import { useNavigate } from 'react-router-dom'
import ButtonBack from '../components/ButtonBack'

const DishFullPage = () => {
    const { id } = useParams()
    const api = APIWrapper()
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState<string>('')
    const [dishes, setDishes] = React.useState<IDish>()

    const fetchDishes = async () => {
        try {
            const data = await api.get(`dishes/${id}`)
            setDishes(data.data)
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    React.useEffect(() => {
        fetchDishes()
    }, [])

    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue} />
                <Wrapper>
                    <DishCard>
                        <ButtonBack />
                        <FlexWrapper>
                            <CardImage
                                src={
                                    'https://www.pamperedchef.ca/iceberg/com/recipe/1153421-lg.jpg'
                                }
                            />
                            <CardContent>
                                <Title>{dishes?.title}</Title>
                                <Description>{dishes?.description}</Description>
                                <Price>{dishes?.price}</Price>
                                <BuyButton>buy</BuyButton>
                            </CardContent>
                        </FlexWrapper>
                    </DishCard>
                </Wrapper>
            </Container>
        </>
    )
}

export default DishFullPage

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

const DishCard = styled.div`
    width: 80%;
    background-color: #ddd;
    min-height: 400px;
    margin: 2rem auto;
    border-radius: 20px;
    position: relative;
`

const FlexWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: center;
    gap: 8rem;
`

const CardImage = styled.img`
    border-radius: 20px;
`

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
`

const Title = styled.h2`
    font-size: 1.5em;
    margin: 16px 0;
`

const Description = styled.p`
    font-size: 1em;
    color: #555;
`

const Price = styled.p`
    font-size: 1.2em;
    font-weight: bold;
    color: #000;
`

const BuyButton = styled.button`
    width: 100%;
    height: 10%;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    text-transform: uppercase;
    background-color: #ffd639;
    &:hover {
        opacity: 0.7;
    }
`
