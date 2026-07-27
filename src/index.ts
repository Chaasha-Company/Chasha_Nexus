import '@/config/env/env-loader.config';
import { bootstrap } from './bootstrap';

await bootstrap();

// TODO: export migration file for compile to js in vite
export * from '@/shared/v1/database/migrations/1785098891773-Create_Cusbin_Rule';
export * from '@/shared/v1/database/migrations/1785160550784-Create_Platform_Admins_With_Status';
export * from '@/shared/v1/database/migrations/1785161604549-Create_Business_Employees_With_Status';
export * from '@/shared/v1/database/migrations/1785162096990-Create_Business_Customers';
export * from '@/shared/v1/database/migrations/1785167640943-Add_ResetPasswordCode_Field_For_Business_Emplooye_And_Platform_Admin';
export * from '@/shared/v1/database/migrations/1785179949938-Create_Sessions_For_Business_Employees_And_Platform_Admins';
