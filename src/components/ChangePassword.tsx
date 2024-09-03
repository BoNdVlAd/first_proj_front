import React from 'react'
import { styled } from 'styled-components'
import APIWrapper from '../API/APIWrapper'
import Message from './Message'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = React.useState<string>('')
    const [newPassword, setNewPassword] = React.useState<string>('')
    const [message, setMessage] = React.useState<string>('')

    const api = APIWrapper()

    const handleChangePassword = async () => {
        const body = {
            old_password: oldPassword,
            new_password: newPassword,
        }

        const response = await api.patch('auth/change_password', body)
        setMessage(response.data.message)
    }

    return (
        <>
            <h2>Change Password</h2>
            <ChangePasswordBlock>
                <Label>
                    Old password:
                    <Input
                        type="text"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </Label>
                <Label>
                    New password:
                    <Input
                        type="email"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Label>
                {message && <Message message={message} />}
                <ChangePasswordButton onClick={handleChangePassword}>
                    Change password
                </ChangePasswordButton>
            </ChangePasswordBlock>
        </>
    )
}

export default ChangePassword

const ChangePasswordBlock = styled.div``

const Label = styled.label`
    font-size: 16px;
    color: #555;
    margin-bottom: 0.5rem;
    display: block;
    width: 100%;
`

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 0.5rem;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #00aaff;
    }
`
const Button = styled.button`
    border-radius: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition:
        background-color 0.3s ease,
        box-shadow 0.3s ease;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    }
`

const ChangePasswordButton = styled(Button)`
    background-color: #4caf50;
    color: #fff;

    &:hover {
        background-color: #45a049;
    }
`
