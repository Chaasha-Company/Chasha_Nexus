import '@/config/env/env-loader.config';
import { bootstrap } from './bootstrap';

await bootstrap();

// TODO: export migration file for compile to js in vite
export * from '@/shared/v1/database/migrations/1785098891773-Create_Cusbin_Rule';
export * from '@/shared/v1/database/migrations/1785160550784-Create_Platform_Admins_With_Status';
