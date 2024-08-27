import React from 'react';
import {styled} from "styled-components";
import Search from "./Search";
import { MdExitToApp } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../pages/AuthProvider";
import { MdManageAccounts } from "react-icons/md";

interface HeaderProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({search, setSearch}: HeaderProps) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { userRole } = useAuth();

    const manageHandler = () => {
        navigate('/manage_orders')
    }

    const logoutHandler = () => {
        logout();
        navigate('/auth/login')
    }
    console.log('HEADER_ROLE', userRole)
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
                <h2>{userRole}</h2>
                {
                    userRole === 'manager' && (
                        <ManageButton onClick={manageHandler}>
                            <MdManageAccounts />
                        </ManageButton>
                    )
                }
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
    z-index: 1000;
`

const ExitButton = styled.button`
    font-size: 3rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`

const RestaurantTitle = styled.h1`
    font-size: 40px;
    user-select: none;
`

const ManageButton = styled.div`
    text-decoration: none;
    font-size: 40px;
    color: #000;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
    `