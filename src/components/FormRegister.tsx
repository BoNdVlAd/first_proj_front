import React, { useState } from 'react';
import { styled } from 'styled-components';
import {Link} from "react-router-dom";

const FormContainer = styled.form`
    max-width: 500px;
    margin: 40px auto;
    padding: 40px;
    border: 1px solid #000;
    border-radius: 10px;
    
`;

const FormHeader = styled.h2`
`;

const FormBody = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
`;

const FormLabel = styled.label`
`;


const FormInput = styled.input`
    height: 40px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 20px;
`;

const FormButton = styled.button`
    width: 100%;
    height: 50px;
    padding: 10px;
    background: #88D66C;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
`;

const TextLink = styled.p`
    margin-top: 20px;
    text-align: center;
    font-size: 16px;

    a {
        color: #88D66C;
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
        }
    }
`;

interface RegisterFormProps {
    onSubmit: (username: string, useremail: string, password: string, ) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username, useremail, password);
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormHeader>Register</FormHeader>
            <FormBody>
                <FormLabel>Username</FormLabel>
                <FormInput
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
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
                <FormButton type="submit">Register</FormButton>
                <Link to="/auth\login">already have an account?</Link>
            </FormBody>
        </FormContainer>
    );
};

export default RegisterForm;