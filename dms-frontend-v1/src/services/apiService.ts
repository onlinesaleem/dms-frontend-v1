import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Example API calls
export const login = (credentials: { username: string; password: string }) => {
    return api.post('/auth/authenticate', credentials);
};

export const createDocument = (documentData: any) => {
    return api.post('/documents', documentData);
};

export const getDocuments = () => {
    return api.get('/documents');
};

export const getDocumentById = (id: number) => {
    return api.get(`/documents/${id}`);
};

export default api;
