interface RecipeItem {
    id: number;
    qty: number;
}

export interface IDish {
    id: number;
    title: string;
    description: string;
    price: number;
    recipe: RecipeItem[];
    created_at: string;
    updated_at: string;
    order_id: number;
}