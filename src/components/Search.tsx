import React from 'react';
import {styled} from "styled-components";

const Search = () => {


    return (
        <>
        <SearchInput/>
        </>
    );
};

export default Search;

const SearchInput = styled.input`
    width: 150px;
    height: 30px;
    border-radius: 20px;
    margin-right: 300px;
    border: none;
    outline: none;
    padding: 0 10px;
    font-size: 14px;
`