import axios from "axios";

class ApiService {
    constructor() {
        const baseURL = process.env.REACT_APP_API_URL;

        this.api = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    async fetchData(endpoint) {
        const response = await this.api.get(endpoint);
        return response.data;
    }

    async sendData(endpoint, data) {
        console.log("API CALL:", this.api.defaults.baseURL + endpoint);
        const response = await this.api.post(endpoint, data);
        return response.data;
    }
}
const api = new ApiService();
export default api;