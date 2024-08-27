import React, {useState} from 'react';
import Header from "../components/Header";
import ItemsWrapper from "../components/ItemsWrapper";
import APIWrapper from "../API/APIWrapper";
import PaginationControls from "../components/PaginationControls";
import Sort from "../components/Sort";
import DishItem from "../components/DishItem";
import {styled} from "styled-components";
import { IDish } from '../Interfaces/IDish'

interface Pagination {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
}

const MenuPage = () => {
    const api = APIWrapper()

    const [searchValue, setSearchValue] = useState<string>('')
    const [dishes, setDishes] = React.useState<IDish[]>([])
    const [sortField, setSortField] = React.useState<string>('title');
    const [sortBy, setSortBy] = React.useState<string>('asc');
    const [pagination, setPagination] = React.useState<Pagination>({
        total: 0,
        perPage: 1,
        currentPage: 1,
        lastPage: 0,
        from: 0,
        to: 0,
    })

    const fetchDishes = async () => {
        try {
            const data = await api.get(`dishes?page=${pagination.currentPage}&title=${searchValue}&sortField=${sortField}&sortBy=${sortBy}`)
            setDishes(data.data.data);
            setPagination(data.data.pagination)

        } catch (e) {
            console.log("Error: ", e)
        }
    }

    React.useEffect(() => {
        fetchDishes();
    }, [pagination.currentPage, searchValue]);

    console.log(dishes);

    return (
        <>
            <Header search={searchValue} setSearch={setSearchValue}/>
            <ItemsWrapper>
                <Sort setSortField={setSortField} setSortBy={setSortBy} fetchDishes={fetchDishes} />
                <DishesCards>
                {dishes.map((dish) => (
                    <DishItem dish={dish} />
                ))}
                </DishesCards>
            </ItemsWrapper>
            <PaginationControls
                pagination={pagination}
                onPageChange={(page: any) => setPagination({ ...pagination, currentPage: page })}
            />
        </>
    );
};

export default MenuPage;

const DishesCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    justify-content: center;
    gap: 20px;
`