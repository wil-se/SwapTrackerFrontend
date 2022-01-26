import axios from "axios";

const api = axios.create({
  // baseURL: "http://54.38.188.69:8080",
  baseURL: "https://api.swaptracker.io",
});

export const callPost = (action,body) => {
    return api.post(`/data/${action}`, body);
} 

