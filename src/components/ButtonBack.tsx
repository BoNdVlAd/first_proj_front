import React from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const ButtonBack = () => {
    const navigate = useNavigate()
    return (
        <ButtonBackComponent onClick={() => navigate(-1)}>
            {'<'}
        </ButtonBackComponent>
    )
}

export default ButtonBack

const ButtonBackComponent = styled.button`
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    font-size: 40px;
    border: none;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background: #cbdafa;
    }
`
