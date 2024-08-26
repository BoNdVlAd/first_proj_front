import React from 'react';
import {styled} from "styled-components";
import Search from "./Search";
import { MdExitToApp } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../pages/AuthProvider";

interface HeaderProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({search, setSearch}: HeaderProps) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/auth/login')
    }

    return (
        <>
            <HeaderWrapper>
                <ExitButton onClick={logoutHandler}>
                    <MdExitToApp/>
                </ExitButton>
                <RestaurantTitle >
                    Restaurant
                </RestaurantTitle>
                <Search search={search} setSearch={setSearch}/>
            </HeaderWrapper>
        </>
    );
};

export default Header;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 4rem;
    position: fixed;
    background: #224870;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const ExitButton = styled.button`
    font-size: 3rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
`

const RestaurantTitle = styled.h1`
    font-size: 40px;
`