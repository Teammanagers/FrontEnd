import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ` + localStorage.getItem('accessToken')
  }
});
