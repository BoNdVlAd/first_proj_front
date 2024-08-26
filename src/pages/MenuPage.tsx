import React from 'react';
import Header from "../components/Header";
import ItemsWrapper from "../components/ItemsWrapper";
import APIWrapper from "../API/APIWrapper";
import PaginationControls from "../components/PaginationControls";

interface RecipeItem {
    id: number;
    qty: number;
}

interface Dish {
    id: number;
    title: string;
    description: string;
    price: number;
    recipe: RecipeItem[];
    created_at: string;
    updated_at: string;
    order_id: number;
}

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

    const [dishes, setDishes] = React.useState<Dish[]>([])
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
            const data = await api.get(`dishes?page=${pagination.currentPage}`)
            setDishes(data.data.data);
            setPagination(data.data.pagination)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    React.useEffect(() => {
        fetchDishes();

    }, [pagination.currentPage]);
    return (
        <>
            <Header/>
            <ItemsWrapper>
                {dishes.map((dish) => (
                    <p key={dish.title}>{dish.title}</p>
                ))}
            </ItemsWrapper>
            <PaginationControls
                pagination={pagination}
                onPageChange={(page: any) => setPagination({ ...pagination, currentPage: page })}
            />
        </>
    );
};

export default MenuPage;