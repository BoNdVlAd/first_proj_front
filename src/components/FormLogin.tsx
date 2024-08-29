import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

interface LoginFormProps {
    onSubmit: (useremail: string, password: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [useremail, setUseremail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(useremail, password)
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormHeader>Login</FormHeader>
            <FormBody>
                <FormLabel>Email</FormLabel>
                <FormInput
                    type="text"
                    value={useremail}
                    onChange={(event) => setUseremail(event.target.value)}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <FormButton type="submit">Log in</FormButton>
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
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 20px;
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
