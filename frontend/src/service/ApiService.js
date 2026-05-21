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