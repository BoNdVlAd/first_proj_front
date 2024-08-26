import React from 'react';
import APIWrapper from "../API/APIWrapper";
import LoginForm from "../components/FormLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

const LoginPage = () => {
    const api = APIWrapper();
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleSubmit = async (useremail: string, password: string) => {
        try {
            const body = {
                email: useremail,
                password
            }
            const response = await api.post('auth/login', body);
            if (response.status === 200) {
                login(response.data.access_token);
                navigate('/menu');
            } else {
                console.log("Login failed: ", response);
            }
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    return (
        <>
            <LoginForm onSubmit={handleSubmit}/>
        </>
    );
};

export default LoginPage;