import React from 'react'
import APIWrapper from '../API/APIWrapper'
import FormRegister from '../components/FormRegister'
import { useNavigate } from 'react-router-dom'

const RegistrationPage: React.FC = () => {
    const api = APIWrapper()
    const navigate = useNavigate()

    const handleSubmit = async (
        username: string,
        useremail: string,
        password: string
    ) => {
        try {
            const body = {
                name: username,
                email: useremail,
                password,
            }
            const response = await api.post('users', body)
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
        <>
            <FormRegister onSubmit={handleSubmit} />
        </>
    )
}

export default RegistrationPage
