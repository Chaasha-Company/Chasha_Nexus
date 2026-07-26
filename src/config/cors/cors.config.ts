import type { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: ['https://chaasha.ir', 'https://www.chaasha.ir', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};
