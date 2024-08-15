import axios from 'axios';

const accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjY0NjQyODQxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyMzcyODA2NCwiZXhwIjoxNzI0OTM3NjY0fQ.M_2IpaY3F1yLOcWRBlSbaXEn905uCasaXsk5D97A-6itzbrVRrrC9i24Reyfmc1gzbPXbwJwWKRMkv-elxSJJg';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});
