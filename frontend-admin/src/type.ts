export type Category = {
    id: number;
    name: string;
    active?: boolean;
    parentCategory?: number | null;
};

export type Product = {
    id: number;
    title: string;
    image?: any;
    images?: any[];
    category?: Category;
    parentCategory?: Category;
    detail?: {
        supplier?: string;
        publisher?: string;
        publishYear?: number;
        author?: string;
        brand?: string;
        origin?: string;
        color?: string;
        weight?: string;
        size?: string;
        quantityOfPage?: number;
        description?: string;
    };
};