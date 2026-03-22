import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
    timeout: 10000,
    params: {
        appid: API_KEY,
        units: "metric",
    },
});

export default api;