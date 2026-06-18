import { RaRecord } from "react-admin";
//USER
export interface Role extends RaRecord {
    description: "ADMIN" | "USER" | string;
}

export interface UserInfo extends RaRecord {
    avatar: string;
    birthday: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    userId?: number;
}
export interface User extends RaRecord {
    username: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    locked?: boolean;
    isLocked?: boolean;
    role: Role;
    userInfo?: UserInfo;
}
// CATEGORY
export type Category = {
    id: number;
    name: string;
    active?: boolean;
    parentCategory?: Category | null;
};
// PRODUCT
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
// BLOG
export interface BlogCategory extends RaRecord {
    name: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
}

export interface Blog extends RaRecord {
    title: string;
    thumbnail: string;
    slug: string;
    shortDesc: string;
    content: string;
    status: boolean;
    viewCount: number;
    category: BlogCategory;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
}