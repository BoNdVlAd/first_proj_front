import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Popup = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <>
            <Navbar>
                <NavLinks>
                    <DropdownButton onClick={toggleDropdown}>
                        Navigate
                    </DropdownButton>
                    {dropdownOpen && (
                        <DropdownContent>
                            <DropdownLink to={'/menu'}>Orders</DropdownLink>
                            <DropdownLink to={'/menu'}>Users</DropdownLink>
                            <DropdownLink to={'/menu'}>
                                Restaurants
                            </DropdownLink>
                        </DropdownContent>
                    )}
                </NavLinks>
            </Navbar>
        </>
    )
}

export default Popup

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

const NavLinks = styled.div`
    position: relative;
    display: inline-block;
`

const DropdownButton = styled.button`
    border: none;
    cursor: pointer;
    font-size: 20px;
    background-color: transparent;
    font-weight: 600;
`

const DropdownContent = styled.div`
    display: block;
    position: absolute;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
`

const DropdownLink = styled(Link)`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
        background-color: #ddd;
    }
`
