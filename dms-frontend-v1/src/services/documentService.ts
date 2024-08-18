// src/services/documentService.ts
import axios from "axios";
import { Document } from "../types/documenttypes";
import api from "./apiService";
const API_URL = "http://localhost:8080/api/v1/documents";
const FILE_API_URL = "http://localhost:8080/api/v1/files"; // Update this to your backend's file endpoint

// Interceptor with consistent token key
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');  // Ensure this matches your login storage key
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getDocuments = async (): Promise<Document[]> => {
    const response = await axios.get<Document[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,  // Same key here
      },
    });
    console.log(response.data);
    return response.data;
  };
export const getDocumentById = async (id: number): Promise<Document> => {
  const response = await axios.get<Document>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const createDocument = async (document: Document): Promise<Document> => {
  const response = await axios.post<Document>(API_URL, document, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateDocument = async (id: number, document: Document): Promise<Document> => {
  const response = await axios.put<Document>(`${API_URL}/${id}`, document, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const deleteDocument = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};



export const downloadFile = async (documentId: number, fileName: string) => {
  const response = await api.get(`${FILE_API_URL}/${documentId}/${fileName}`, {
    responseType: 'blob', // Important for handling binary data
  });

  // Create a URL for the file
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName); // Use the original file name
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getFileBlob = async (documentId: number, fileName: string): Promise<Blob> => {
    const response = await axios.get(`${FILE_API_URL}/${documentId}/${fileName}`, {
        responseType: 'blob', // This tells Axios to return the response as a Blob
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    });
    return response.data;
};