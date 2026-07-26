import axios from 'axios';
import { EnvValueConfig } from '@/config/env';

export const axiosConfig = axios.create({
  baseURL: EnvValueConfig.MELI_PAYAMAK_API_URL,
  timeout: 10000,
  responseType: 'json',
});
