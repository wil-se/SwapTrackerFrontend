import axios from "axios";
require('dotenv').config()
import {Agent} from 'https';

const api = axios.create({
  httpsAgent: new Agent({
    rejectUnauthorized: false
  }),
  baseURL: process.env.REACT_APP_SERVICE_URL,
  
});

export const callPost = (action,body) => {
    return api.post(`data/${action}`, body);
} 

export const callGet = async (action,address) => {
  return await api.get(`data/${action}?user=${address.toLowerCase()}`)
}

