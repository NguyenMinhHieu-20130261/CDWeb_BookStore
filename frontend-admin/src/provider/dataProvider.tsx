import { DataProvider, HttpError } from "react-admin";
import axios from "axios";
import { uploadImage,uploadImages } from "../service/ImageUploader";

// Intercept axios errors to show friendly messages in React Admin
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || "Đã xảy ra lỗi";
        const status = error.response?.status || 500;
        return Promise.reject(new HttpError(message, status, error.response?.data));
    }
);

const API_URL = 
        // import.meta.env.VITE_API_URL ||
        // "https://cdwebbookstore-production.up.railway.app/api"||
        import.meta.env.LOCAL_API ||
        "http://localhost:8080/api";

const getAuthConfig = () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = auth.token || user.token || localStorage.getItem("token");
    console.log("TOKEN SEND:", token);
    
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    
    if (token && token !== "null" && token !== "undefined" && token.trim() !== "") {
        headers.Authorization = `Bearer ${token}`;
    }
    
    return { headers };
};
const resourceMap: Record<string, string> = {
    category: "category",
    blogs: "blogs",
    "blog-cate": "blog-cate",
    address: "address",
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
            ...getAuthConfig(),
        });
        const response = res.data;
        return {
            data: Array.isArray(response)
                ? response
                : response.content ?? response.data ?? [],
            total: Array.isArray(response)
                ? response.length
                : response.totalElements ?? response.total ?? 0,
        };
    },
    getOne: async (resource, params) => {
        const apiPath = getApiPath(resource);

        const url =
            resource === "address"
                ? `${API_URL}/${apiPath}/detail/${params.id}`
                : `${API_URL}/${apiPath}/${params.id}`;

        const res = await axios.get(url, getAuthConfig());

        return {
            data: res.data.data ?? res.data,
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
        if(resource === "category") {
            data = {
                name: data.name,
                active: data.active ?? true,
                parentCategory:
                    data.parentCategory?.id
                        ? {id: data.parentCategory.id}
                        : null
            };
        }
        if (resource === "blogs") {
            const thumbnailUrl =
                data.thumbnail?.rawFile instanceof File
                    ? await uploadImage(data.thumbnail.rawFile)
                    : data.thumbnail;
            data = {
                ...data,
                thumbnail: thumbnailUrl,
            };
        }
        if (resource === "users") {
            const avatarUrl =
                data.avatar?.rawFile instanceof File
                    ? await uploadImage(data.avatar.rawFile)
                    : data.avatar;
            data = {
                username: data.username,
                email: data.email,
                password: data.password,
                isLocked: data.locked === 2,
                role: {
                    id: data.role || 2,
                },
                userInformation: {
                    fullName: data.fullName,
                    phoneNumber: data.phone,
                    avatar: avatarUrl,
                },
            };
        }
        console.log("DATA SEND:", data);
        const res = await axios.post(
            `${API_URL}/${apiPath}`,
            data,
            getAuthConfig()
        );        
        return {
            data: res.data.data ?? res.data,
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
        if (resource === "category") {
            data = {
                name: data.name,
                active: data.active,
                parentCategory: data.parentCategory?.id
                    ? { id: data.parentCategory.id }
                    : null,
            };
        }
        if (resource === "blogs") {
            const thumbnailUrl =
                data.thumbnail?.rawFile instanceof File
                    ? await uploadImage(data.thumbnail.rawFile)
                    : (typeof data.thumbnail === "string" ? data.thumbnail : data.thumbnail?.src);
            data = {
                ...data,
                thumbnail: thumbnailUrl,
            };
        }
        if (resource === "users") {
            const avatarUrl =
                data.userInformation?.avatar?.rawFile instanceof File
                    ? await uploadImage(data.userInformation.avatar.rawFile)
                    : (typeof data.userInformation?.avatar === "string" ? data.userInformation.avatar : data.userInformation?.avatar?.src);
            data = {
                roleId: data.roleId || data.role?.id,
                isLocked: data.isLocked,
                userInformation: {
                    id: data.userInformation?.id,
                    fullName: data.userInformation?.fullName,
                    phoneNumber: data.userInformation?.phoneNumber,
                    avatar: avatarUrl,
                },
            };
        }
        const res = await axios.put(
            `${API_URL}/${apiPath}/${params.id}`,
            data,
            getAuthConfig()
        );       
        return {
            data: res.data.data ?? res.data,
        };
    },
    delete: async (resource, params) => {
        const apiPath = getApiPath(resource);
        const res = await axios.delete(
            `${API_URL}/${apiPath}/${params.id}`,
            getAuthConfig()
        );
        return {
            data: res.data.data ?? res.data,
        };
    },
    getMany: async (resource, params) => {
        const apiPath = getApiPath(resource);
        const requests = params.ids.map((id) =>
            axios.get(`${API_URL}/${apiPath}/${id}`, getAuthConfig())
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
            ...getAuthConfig(),
        });
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? res.data;
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
                axios.put(
                    `${API_URL}/${apiPath}/${id}`,
                    params.data,
                    getAuthConfig()
                )
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
                axios.delete(
                    `${API_URL}/${apiPath}/${id}`,
                    getAuthConfig()
                )
            )
        );
        return {
            data: params.ids,
        };
    },
};

export default dataProvider;
