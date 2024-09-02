import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useAuth } from '../pages/AuthProvider'

interface LoginFormProps {
    onSubmit: (useremail: string, password: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [useremail, setUseremail] = useState('')
    const [password, setPassword] = useState('')
    const [emailIsValid, setEmailIsValid] = React.useState<boolean | null>(null)
    const [passwordIsValid, setPasswordIsValid] = React.useState<
        boolean | null
    >(null)
    const [showPassword, setShowPassword] = useState(false)

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(/^\w{3,}@\w{2,}\.\w{2,}$/)
    }

    const validatePassword = (password: string) => {
        return String(password).match(/^(?=.*[A-Z]).{8,}$/)
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(useremail, password)
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormHeader>Login</FormHeader>
            <FormBody>
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
                {emailIsValid === false && (
                    <div className="password-rules">
                        password must be at least 8 characters long and have at
                        least one capital letter.
                    </div>
                )}
                <FormLabel>Password</FormLabel>
                <div
                    style={{
                        position: 'relative',
                        width: '95%',
                    }}
                >
                    <FormInput
                        style={{
                            position: 'relative',
                            width: '100%',
                        }}
                        type={showPassword ? 'text' : 'password'}
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
                    {password.length !== 0 && (
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: '1rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '5px',
                                fontSize: '20px',
                            }}
                        >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    )}
                </div>

                {passwordIsValid === false && (
                    <div className="password-rules">
                        password must be at least 8 characters long and have at
                        least one capital letter.
                    </div>
                )}
                <FormButton
                    className={passwordIsValid && emailIsValid ? 'active' : ''}
                    type="submit"
                >
                    Log in
                </FormButton>
                <Link to="/auth\registration">dont have an account?</Link>
            </FormBody>
        </FormContainer>
    )
}

export default LoginForm

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
    background: #7e8e7a;
    border: none;
    border-radius: 5px;
    color: #fff;
    pointer-events: none;

    &.active {
        background: #88d66c;
        pointer-events: all;
        cursor: pointer;
    }
`
