import React, {useState} from 'react';
import {styled} from "styled-components";
import Header from "../components/Header";
import { useParams } from 'react-router-dom';

const DishFullPage = () => {
    const { dish } = useParams();

    return (
        <>
            <div>{dish}!</div>
        </>
    );
};

export default DishFullPage;

