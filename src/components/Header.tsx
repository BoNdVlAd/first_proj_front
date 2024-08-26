import React from 'react';
import {styled} from "styled-components";
import Search from "./Search";

const HeaderWrapper = styled.div`
    width: 100%;
    height: 4rem;
    position: fixed;
    background: #224870;
    display: flex;
    justify-content: end;
    align-items: center;
`

const Header = () => {


    return (
        <>
            <HeaderWrapper><Search/></HeaderWrapper>
        </>
    );
};

export default Header;