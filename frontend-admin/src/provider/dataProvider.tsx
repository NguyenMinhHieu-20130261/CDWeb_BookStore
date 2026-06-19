import type { DataProvider } from "react-admin";
import axios from "axios";
import { uploadImage,uploadImages } from "../service/ImageUploader";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const getAuthConfig = () => {
    
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = auth.token ||user.token || localStorage.getItem("token");
    console.log("TOKEN SEND:", token);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};
const resourceMap: Record<string, string> = {
    category: "category",
    blogs: "blogs",
    "blog-categories": "blog-categories",
};
const getApiPath = (resource: string) => {
    return resourceMap[resource] || resource;
};
const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const apiPath = getApiPath(resource);

        const query: any = {
            page: (params.pagination?.page || 1) - 1,
            perPage: params.pagination?.perPage || 10,
            sort: params.sort?.field || "id",
            order: params.sort?.order || "ASC",
        };

        if (params.filter && Object.keys(params.filter).length > 0) {
            query.filter = JSON.stringify(params.filter);
        }
        const res = await axios.get(`${API_URL}/${apiPath}`, {
            params: query,
        });
        const response = res.data;
        return {
            data: response.content ?? response,
            total: response.totalElements ?? response.length ?? 0,
        };
    },
    getOne: async (resource, params) => {
        const apiPath = getApiPath(resource);

        const res = await axios.get(`${API_URL}/${apiPath}/${params.id}`);
        return {
            data: res.data,
        };
    },
    create: async (resource, params) => {
        const apiPath = getApiPath(resource);
        let data = params.data;

        if (resource === "products") {
            const mainImageUrl =
                data.image?.rawFile instanceof File
                    ? await uploadImage(data.image.rawFile)
                    : data.image;
            const subImages =data.images ? await Promise.all(
                data.images.map(async (img: any) => ({
                    image: img.rawFile instanceof File
                            ? await uploadImage(img.rawFile)
                            : img.image || img.src,
                }))
            ): [];
            data = {
                title: data.title,
                oldPrice: data.oldPrice,
                currentPrice: data.currentPrice,
                active: data.active ?? true,
                category: {
                    id: data.category?.id,
                },
                image: mainImageUrl,
                images: subImages,

                detail: data.detail,
            };
        }
        console.log("DATA SEND:", data);
        const res = await axios.post(
            `${API_URL}/${apiPath}`,
            data,
            getAuthConfig()
        );        
        return {
            data: res.data,
        };
    },
    update: async (resource, params) => {
        const apiPath = getApiPath(resource);
        let data = params.data;

        if(resource === "products"){
            if(data.imageNew?.rawFile){
                data.image = await uploadImage(data.imageNew.rawFile);
            }
            if(data.imagesNew){
                data.images =
                    await uploadImages(
                        data.imagesNew
                    );
            }
            delete data.imageNew;
            delete data.imagesNew;
        }
        const res = await axios.put(
            `${API_URL}/${apiPath}/${params.id}`,
            data,
            getAuthConfig()
        );       
        return {
            data: res.data,
        };
    },
    delete: async (resource, params) => {
        const apiPath = getApiPath(resource);
        const res = await axios.delete(
            `${API_URL}/${apiPath}/${params.id}`,
            getAuthConfig()
        );
        return {
            data: res.data,
        };
    },
    getMany: async (resource, params) => {
        const apiPath = getApiPath(resource);
        const requests = params.ids.map((id) =>
            axios.get(`${API_URL}/${apiPath}/${id}`)
        );
        const responses = await Promise.all(requests);
        return {
            data: responses.map((res) => res.data),
        };
    },
    getManyReference: async (resource, params) => {
        const apiPath = getApiPath(resource);

        const res = await axios.get(`${API_URL}/${apiPath}`, {
            params: {
                [params.target]: params.id,
                page: params.pagination?.page,
                perPage: params.pagination?.perPage,
                sort: params.sort?.field,
                order: params.sort?.order,
                ...params.filter,
            },
        });
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        return {
            data,
            total: Array.isArray(res.data)
                ? res.data.length
                : res.data.total ?? data.length,
        };
    },
    updateMany: async (resource, params) => {
        const apiPath = getApiPath(resource);

        await Promise.all(
            params.ids.map((id) =>
                axios.put(`${API_URL}/${apiPath}/${id}`, params.data)
            )
        );
        return {
            data: params.ids,
        };
    },
    deleteMany: async (resource, params) => {
        const apiPath = getApiPath(resource);

        await Promise.all(
            params.ids.map((id) =>
                axios.delete(`${API_URL}/${apiPath}/${id}`)
            )
        );

        return {
            data: params.ids,
        };
    },
};

export default dataProvider;