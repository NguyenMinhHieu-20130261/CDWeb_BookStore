import axios from "axios";

class ApiService {
    constructor() {
        const baseURL =
            // process.env.REACT_APP_API_URL
            // || "https://cdwebbookstore-production.up.railway.app/api"
            // || 
            process.env.REACT_APP_LOCAL_API
            || "http://localhost:8080/api";

        console.log(baseURL);
        this.api = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.api.interceptors.request.use((config) => {
            const token = this.getToken();
            console.log("TOKEN SEND:", token);
            // console.log("API URL:", config.baseURL + config.url);
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
    getToken() {
        const token = localStorage.getItem("token");
        if (token) return token;

        const userStr = localStorage.getItem("user");
        if (!userStr) return null;
        try {
            const user = JSON.parse(userStr);
            return user?.token || null;
        } catch (e) {
            return null;
        }
    }
    async fetchData(endpoint) {
        try {
            const response = await this.api.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    async sendData(endpoint, data) {
         try {
            console.log("API CALL:", this.api.defaults.baseURL + endpoint);
            const response = await this.api.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error sending data:', error);
            throw error;
        }
    }
     async updateData(endpoint, data) {
        try {
            const response = await this.api.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }
    async deleteData(endpoint) {
        try {
            const response = await this.api.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
}
const api = new ApiService();
export default api;