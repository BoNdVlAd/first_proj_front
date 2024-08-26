import React from 'react';
import APIWrapper from "../API/APIWrapper";
import LoginForm from "../components/FormLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const api = APIWrapper();
    const navigate = useNavigate();

    const handleSubmit = async (useremail: string, password: string) => {
        try {
            const body = {
                email: useremail,
                password
            }
            await api.post('auth/login', body);
            navigate('/menu');
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