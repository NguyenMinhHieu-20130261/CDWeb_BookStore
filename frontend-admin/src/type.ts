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
export interface Address extends RaRecord {
    id: number;
    user?: User;
    fullName: string;
    phoneNumber: string;
    detailAdrs: string;
    provinceCity: string;
    countyDistrict: string;
    wardCommune: string;
    wardCode?: string;
    districtId?: number;
    isDefault?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
// CATEGORY
export type Category = {
    id: number;
    name: string;
    active?: boolean;
    parentCategory?: Category | null;
};
//Product
export interface Product extends RaRecord {
    id: number;
    title: string;
    image?: any;
    oldPrice?: number;
    currentPrice?: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    category?: Category;
    parentCategory?: Category;
    detail?: ProductDetail;
    images: ProductImage[];
}
// PRODUCT DETAIL
export interface ProductDetail extends RaRecord {
    id: number;
    productSku?: string;
    supplier?: string;
    publisher?: string;
    publishYear?: string;
    author?: string;
    brand?: string;
    origin?: string;
    color?: string;
    weight?: string;
    size?: string;
    quantityOfPage?: number;
    description?: string;
}
export interface ProductImage extends RaRecord {
    id: number;
    product: Product;
    image: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}
//inventory
export interface Inventory extends RaRecord {
    id: number;
    batchCode: string;
    product: Product;
    importedQuantity: number;
    remainingQuantity: number;
    importPrice: number;
    salePrice: number;
    importedAt: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    supplier?: Supplier | null;
    createdBy?: User;
    updatedBy?: User;
    note?: string;
}
export interface InventoryRequest {
    supplierId?: number | null;
    inventoryRequest: InventoryItemRequest[];
}

export interface InventoryItemRequest {
    productId: number;
    quantity: number;
    importPrice: number;
    salePrice: number;
    note?: string;
}
// BLOG
export interface BlogCategory extends RaRecord {
    id: number;
    name: string;
    createdBy?: User;
    updatedBy?: User;
    createdAt?: string;
    updatedAt?: string;
}

export interface Blog extends RaRecord {
    id: number;
    title: string;
    thumbnail?: string;
    slug: string;
    shortDescription: string;
    content: string;
    status: number;
    viewCount: number;
    category?: BlogCategory;
    createdBy?: User;
    updatedBy?: User;
    createdAt?: string;
    updatedAt?: string;
}

// REVIEW
export interface Review extends RaRecord {
    id: number;
    product: Product;
    user: User;
    rating: number;
    cmtDetail: string;
    reply?: string;
    createdAt: string;
    updatedAt?: string;
}
//order
export interface Promotion extends RaRecord {
    id: number;
    code: string;
    name: string;
    discountPercent: number;
    status: boolean;
}
export interface Order extends RaRecord {
    id: number;
    orderCode: string;
    user?: User;
    shippingAddress?: Address;
    orderDate: string;
    orderTotal: number;
    totalQuantity: number;
    paymentMethod: string;
    status: OrderStatus;
    shippingCost: number;
    note?: string;
    orderDetails: OrderDetail[];
    promotion?: Promotion;
}
export interface OrderStatus extends RaRecord {
    id: number;
    slug: string;
    name: string;
}

export interface OrderDetail extends RaRecord {
    id: number;
    product: Product;
    quantity: number;
    totalMoney: number;
}
// Banner
export interface Banner extends RaRecord {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    link?: string;
    position: number;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: User;
    updatedBy?: User;
}
// notify
export interface Notification extends RaRecord {
    id: number;
    user?: User;
    type: "SYSTEM" | "ORDER" | "PROMOTION" | "PRODUCT" | "REVIEW" | "INVENTORY" | "ADMIN";
    title: string;
    message: string;
    targetUrl?: string;
    isRead: boolean;
    isBroadcast: boolean;
    createdAt?: string;
    updatedAt?: string;
}
//sup
export interface Supplier extends RaRecord {
    id: number;
    name: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    address?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
