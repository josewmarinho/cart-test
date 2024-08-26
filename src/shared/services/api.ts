import axios from 'axios';

export const apiCartTest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});
