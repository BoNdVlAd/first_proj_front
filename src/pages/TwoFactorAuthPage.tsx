import React from 'react'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'
import CheckTwoFactorAuth from '../components/CheckTwoFactorAuth'

const TwoFactorAuthPage = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    if (user && !user.google2fa_secret) {
        navigate('/menu')
    }

    return (
        <>
            <CheckTwoFactorAuth />
        </>
    )
}

export default TwoFactorAuthPage
