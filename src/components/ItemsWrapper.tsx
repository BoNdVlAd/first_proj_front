import React from 'react';
import {styled} from "styled-components";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 500px;
    background-color: bisque;
    flex-direction: column;

`


const ItemsWrapper = ({children}: any) => {


    return (
        <>
            <Wrapper>{children}</Wrapper>
        </>
    );
};

export default ItemsWrapper;