import React from 'react';
import {styled} from "styled-components";

interface SortPopupProps {
    setSortField: React.Dispatch<React.SetStateAction<string>>;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    fetchDishes: any
}

const Sort: React.FC<SortPopupProps> = ({setSortField, setSortBy, fetchDishes}) => {
    const parameters = ['title', 'price'];
    const order = ['asc', 'desc'];

    const handleSortParametr = (value: string) => {
        setSortField(value)
    }

    const handleSortOrder = (value: string) => {
        setSortBy(value)
    }

    return (
        <Wrapper>
            <Title>Sort by</Title>
            <Select onChange={(e) => handleSortParametr(e.target.value as 'title' | 'price')}>
                {parameters.map((param) => (
                    <Option key={param} value={param}>
                        {param}
                    </Option>
                ))}
            </Select>
            <Select onChange={(e) => handleSortOrder(e.target.value as 'asc' | 'desc')}>
                {order.map((param) => (
                    <option key={param} value={param}>
                        {param}
                    </option>
                ))}
            </Select>
            <Button onClick={fetchDishes}>Sort</Button>
        </Wrapper>
    )
};

export default Sort;


const Wrapper = styled.div`
    background-color: #cccccc;
    display: flex;
    justify-content: center;
    gap: 10px;
    height: 4rem;
    align-items: center;
    
`

const Title = styled.h3`
`;

const Select = styled.select`
    width: 20%;
    padding: 8px;
    border-radius: 10px;
    background-color: white;
`;

const Option = styled.option`
    border: 20px solid #000;
`

const Button = styled.button`
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;
