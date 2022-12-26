import axios from 'axios';

export const contentApi = axios.create({
  baseURL: 'https://interface-api-dev.univtec.com/api/interface', // DEV
  // baseURL: 'https://interface-api-stg.univtec.com/api/interface', // STG
  headers: {
    customerCode: 'KTEN',
    platform: 'mobile',
  },
});
