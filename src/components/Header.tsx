import React from 'react'
import { styled } from 'styled-components'
import Search from './Search'
import { MdExitToApp } from 'react-icons/md'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../pages/AuthProvider'
import { MdManageAccounts } from 'react-icons/md'
import Popup from './Popup'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

interface HeaderProps {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<HeaderProps> = ({ search, setSearch }: HeaderProps) => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { userRole } = useAuth()

    const items = useSelector((state: any) => state.cart.items)

    const location = useLocation()
    console.log(location)

    const manageHandler = () => {
        navigate('/manage_orders')
    }

    const logoutHandler = () => {
        logout()
        navigate('/auth/login')
    }

    return (
        <>
            <HeaderWrapper>
                <Container>
                    <ExitButton onClick={logoutHandler}>
                        <MdExitToApp />
                    </ExitButton>
                    <RestaurantTitle>Restaurant</RestaurantTitle>
                    <Search search={search} setSearch={setSearch} />
                    {userRole === 'manager' ||
                        userRole === 'chef' ||
                        (userRole === 'waiter' && (
                            <ManageButton onClick={manageHandler}>
                                <MdManageAccounts />
                            </ManageButton>
                        ))}
                    <Popup />
                    <Link to={`/cart`}>
                        <CartWrapper>
                            <Cart>
                                <FaShoppingCart />
                            </Cart>
                            <AmountGoods>{items.length}</AmountGoods>
                        </CartWrapper>
                    </Link>
                    <h2>{userRole}</h2>
                    {userRole === 'manager' && (
                        <ManageButton onClick={manageHandler}>
                            <MdManageAccounts />
                        </ManageButton>
                    )}
                </Container>
            </HeaderWrapper>
        </>
    )
}

export default Header

const HeaderWrapper = styled.div`
    width: 100%;
    height: 4rem;
    position: fixed;
    background: #224870;
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
const Container = styled.div`
    height: 100%;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Cart = styled.div`
    color: #000;
    font-size: 30px;
    &:hover {
        opacity: 0.5;
    }
`

const AmountGoods = styled.p`
    color: #fff;
    position: absolute;
    right: -8px;
    top: 0;
`

const CartWrapper = styled.div`
    position: relative;
`
