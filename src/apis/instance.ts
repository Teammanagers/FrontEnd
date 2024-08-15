import axios from 'axios';

const accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjY0NjQyODQxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyMzcyMjY1MywiZXhwIjoxNzIzNzI2MjUzfQ.-VeVMYMXyrtj_YDGwBw_iAnQL_dcABGfcoLppzttg0dk3SusYhfGxAW-Qb-741SE_GQ2WAV4U8dfUnAX1D_wKQ';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});
