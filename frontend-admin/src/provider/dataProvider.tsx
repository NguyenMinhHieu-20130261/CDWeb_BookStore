import type { DataProvider } from "react-admin";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

const resourceMap: Record<string, string> = {
    categories: "category",
    blogs: "blogs",
    "blog-categories": "blog-categories",
};

const getApiPath = (resource: string) => {
    return resourceMap[resource] || resource;
};

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const apiPath = getApiPath(resource);

        const res = await axios.get(`${API_URL}/${apiPath}`, {
            params: {
                page: params.pagination?.page,
                perPage: params.pagination?.perPage,
                sort: params.sort?.field,
                order: params.sort?.order,
                ...params.filter,
            },
        });
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        const total = Array.isArray(res.data)
            ? res.data.length
            : res.data.total ?? data.length;
        return {
            data,
            total,
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

        const res = await axios.post(`${API_URL}/${apiPath}`, params.data);
        return {
            data: res.data,
        };
    },
    update: async (resource, params) => {
        const apiPath = getApiPath(resource);

        const res = await axios.put(`${API_URL}/${apiPath}/${params.id}`, params.data);

        return {
            data: res.data,
        };
    },
    delete: async (resource, params) => {
        const apiPath = getApiPath(resource);
        const res = await axios.delete(`${API_URL}/${apiPath}/${params.id}`);
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