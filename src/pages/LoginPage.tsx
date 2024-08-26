import React from 'react';
import APIWrapper from "../API/APIWrapper";
import LoginForm from "../components/FormLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const api = APIWrapper();
    const navigate = useNavigate();

    const handleSubmit = async (useremail: string, password: string) => {
        // const body = {
        //     email: useremail,
        //     password
        // }
        // const response = await api.post('http://first_proj.test/api/auth/login', body);
        // console.log(response);
        //
        // navigate('/menu');
    }

    return (
        <>
            <LoginForm onSubmit={handleSubmit}/>
        </>
    );
};

export default LoginPage;