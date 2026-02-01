import axios from 'axios';

const API_URL = '/api/auth/';

// Global axios configuration for token injection
axios.interceptors.request.use(
    (config) => {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user && user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            }
        } catch (e) {
            console.error("Interceptor: Error reading token", e);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class AuthService {
    async login(username, password) {
        const response = await axios.post(API_URL + 'login', {
            username,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    async signup(signupData) {
        // signupData: { name, email, company, password }
        const response = await axios.post(API_URL + 'signup', signupData);
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;
            return JSON.parse(userStr);
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            // If data is corrupted, clear it
            localStorage.removeItem('user');
            return null;
        }
    }

    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    isHR() {
        const user = this.getCurrentUser();
        return user && user.role === 'HR';
    }

    async forgotPassword(email) {
        const response = await axios.post(API_URL + 'forgot-password', { email });
        return response.data;
    }

    async resetPassword(token, newPassword) {
        const response = await axios.post(API_URL + 'reset-password', { token, newPassword });
        return response.data;
    }
}

export default new AuthService();
