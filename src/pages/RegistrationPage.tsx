import React from 'react';
import Form from "../components/Form";

const RegistrationPage = () => {

    const handleSubmit = async (username: string, useremail: string, password: string) => {
        const response = await fetch('http://first_proj.test/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name : username, email : useremail, password: password }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Register successful:', data);
        } else {
            console.error('Register failed');
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}/>
        </>
    );
};

export default RegistrationPage;