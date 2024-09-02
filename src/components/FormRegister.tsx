import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

interface RegisterFormProps {
    onSubmit: (username: string, useremail: string, password: string) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('')
    const [useremail, setUseremail] = useState('')
    const [password, setPassword] = useState('')
    const [userNameIsValid, setUserNameIsValid] = React.useState<
        boolean | null
    >(null)
    const [emailIsValid, setEmailIsValid] = React.useState<boolean | null>(null)
    const [passwordIsValid, setPasswordIsValid] = React.useState<
        boolean | null
    >(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(username, useremail, password)
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(/^\w{3,}@\w{2,}\.\w{2,}$/)
    }

    const validatePassword = (password: string) => {
        return String(password).match(/^(?=.*[A-Z]).{8,}$/)
    }

    const validateUserName = (userName: string) => {
        return String(userName).match(/^\w{8,}$/)
    }

    const handleInputUserName = (value: string) => {
        setUsername(value)
        if (validateUserName(value)) {
            setUserNameIsValid(true)
        } else if (value.length === 0) {
            setUserNameIsValid(null)
        } else {
            setUserNameIsValid(false)
        }
    }

    const handleInputEmail = (value: string) => {
        setUseremail(value)
        if (validateEmail(value)) {
            setEmailIsValid(true)
        } else if (value.length === 0) {
            setEmailIsValid(null)
        } else {
            setEmailIsValid(false)
        }
    }

    const handleInputPassword = (value: string) => {
        setPassword(value)
        if (validatePassword(value)) {
            setPasswordIsValid(true)
        } else if (value.length === 0) {
            setPasswordIsValid(null)
        } else {
            setPasswordIsValid(false)
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormHeader>Register</FormHeader>
            <FormBody>
                <FormLabel>User name</FormLabel>
                <FormInput
                    type="text"
                    value={username}
                    onChange={(event) =>
                        handleInputUserName(event.target.value)
                    }
                    placeholder="User name *"
                    className={
                        userNameIsValid === null
                            ? ''
                            : userNameIsValid
                              ? 'valid'
                              : 'invalid'
                    }
                />
                {userNameIsValid === false && (
                    <div className="password-rules">
                        user name must be at least 8 characters long
                    </div>
                )}
                <FormLabel>Email</FormLabel>
                <FormInput
                    type="email"
                    value={useremail}
                    onChange={(event) => handleInputEmail(event.target.value)}
                    placeholder="Email Address *"
                    className={
                        emailIsValid === null
                            ? ''
                            : emailIsValid
                              ? 'valid'
                              : 'invalid'
                    }
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    type="string"
                    value={password}
                    onChange={(event) =>
                        handleInputPassword(event.target.value)
                    }
                    placeholder="Password *"
                    className={
                        passwordIsValid === null
                            ? ''
                            : passwordIsValid
                              ? 'valid'
                              : 'invalid'
                    }
                />
                {passwordIsValid === false && (
                    <div className="password-rules">
                        password must be at least 8 characters long and have at
                        least one capital letter.
                    </div>
                )}
                <FormButton type="submit">Register</FormButton>
                <Link to="/auth\login">already have an account?</Link>
            </FormBody>
        </FormContainer>
    )
}

export default RegisterForm

const FormContainer = styled.form`
    max-width: 500px;
    margin: 40px auto;
    padding: 40px;
    border: 1px solid #000;
    border-radius: 10px;
`

const FormHeader = styled.h2``

const FormBody = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
`

const FormLabel = styled.label``

const FormInput = styled.input`
    height: 40px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 20px;
    outline: 0;
    &.valid {
    }

    &.invalid {
        border: 2px solid red;
    }
`

const FormButton = styled.button`
    width: 100%;
    height: 50px;
    padding: 10px;
    background: #88d66c;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
`

const TextLink = styled.p`
    margin-top: 20px;
    text-align: center;
    font-size: 16px;

    a {
        color: #88d66c;
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
        }
    }
`
