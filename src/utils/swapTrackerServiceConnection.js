import axios from "axios";
import https from "https";

const api = axios.create({
  baseURL: "https://54.38.188.69:3333",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export const callPost = (action,body) => {
    return api.post(`/data/${action}`, body);
} 

