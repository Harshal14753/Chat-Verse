import axios from "axios";

export const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", baseURL);

export const httpClient = axios.create({
    baseURL: baseURL
});