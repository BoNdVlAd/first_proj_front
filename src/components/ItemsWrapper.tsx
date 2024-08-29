import React from 'react'
import { styled } from 'styled-components'

const ItemsWrapper = ({ children }: any) => {
    return (
        <>
            <Wrapper>{children}</Wrapper>
        </>
    )
}

export default ItemsWrapper

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 4rem;
    background-color: #cccccc;
    flex-direction: column;
`
