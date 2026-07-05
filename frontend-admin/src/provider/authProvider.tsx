import { AuthProvider } from 'react-admin';

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_URL = import.meta.env.VITE_API_URL || "https://cdwebbookstore-production.up.railway.app/api";

export const authProvider: AuthProvider = {
    login: ({ username, password }) =>  {
        const request = new Request(`${API_URL}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Sai tài khoản hoặc mật khẩu')
            });
    },
    logout: async () => {
        const auth = JSON.parse(localStorage.getItem("auth") || "{}");
        const token = auth?.token || localStorage.getItem("token");
        try {
            if (token && token !== "null" && token !== "undefined") {
                await fetch(`${API_URL}/auth/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (e) {
            console.error("Logout API error:", e);
        } finally {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }

        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            // return Promise.reject({ message: false });
            return Promise.reject({ message: 'Unauthorized user!' });
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        const authData = localStorage.getItem('auth');

        if (!authData) {
            return Promise.reject({ message: 'login.required' });
        }
        const auth = JSON.parse(authData);
        const isAdmin =
            auth?.roles?.includes?.('ADMIN') ||
            auth?.role === 'ADMIN' ||
            auth?.role?.description === 'ADMIN';

        if (isAdmin) {
            return Promise.resolve();
        }

        return Promise.reject({
            message: 'Tài khoản của bạn không có quyền admin'
        });
    },
    getIdentity: () => {
        const authData = localStorage.getItem('auth');
        try {
            if (authData !== null) {
                const { id, username, image } = JSON.parse(authData);
                const fullName = username;
                const avatar = image;
                return Promise.resolve({ id, fullName, avatar });
            } else {
                return Promise.reject({ message: 'login.required' });
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    handleCallback: () => Promise.resolve(/* ... */),
    // authorization
    getPermissions: () => {
        const authData = localStorage.getItem('auth');

        if (!authData) return Promise.resolve(null);

        const auth = JSON.parse(authData);

        return Promise.resolve(
            auth?.roles || auth?.role || auth?.role?.description || null
        );
    },
};
export default authProvider;