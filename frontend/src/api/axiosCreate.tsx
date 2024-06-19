import axios from "axios"

export const API_KEY = import.meta.env.VITE_API_KEY;

const rawgAxios = axios.create({
    baseURL: 'https://api.rawg.io/api'
})

const mainAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export {
    rawgAxios,
    mainAxios
}