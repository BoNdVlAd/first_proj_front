import React, { useEffect, useState } from 'react'
import APIWrapper from '../API/APIWrapper'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const CheckTwoFactorAuth: React.FC = () => {
    const [code, setCode] = useState<string>('')
    const api = APIWrapper()
    const navigate = useNavigate()

    const handleVerify = async () => {
        try {
            const body = {
                code: code,
            }
            const response = await api.post('verify-2fa-code', body)
            if (response.status === 200) {
                navigate('/menu')
            } else {
                console.log('Login failed: ', response)
            }
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    return (
        <FormContainer>
            <FormHeader>Two-factor authentication</FormHeader>
            <FormBody>
                <FormInput
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                />

                <FormButton
                    className={code ? 'active' : ''}
                    onClick={handleVerify}
                >
                    Sign in
                </FormButton>
            </FormBody>
        </FormContainer>
    )
}

export default CheckTwoFactorAuth

const FormContainer = styled.div`
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
