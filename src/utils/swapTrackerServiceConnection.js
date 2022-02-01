import axios from "axios";
require('dotenv').config()

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  
});

export const callPost = (action,body) => {
    return api.post(`/data/${action}`, body);
} 

