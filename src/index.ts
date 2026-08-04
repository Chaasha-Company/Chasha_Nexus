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
export * from '@/shared/v1/database/migrations/1785180629830-Add_Authentication_Fields_To_Business_Employee_Sessions';
export * from '@/shared/v1/database/migrations/1785258989854-Add_Password_Field_For_Business_Employee';
export * from '@/shared/v1/database/migrations/1785599803000-Create_Businesses';
export * from '@/shared/v1/database/migrations/1785613559506-Add_Multi_Language_Remove_UUID_For_Statuess_Create_Business_Types';
export * from '@/shared/v1/database/migrations/1785618311976-Create_Early_Access_Request_With_status';
export * from '@/shared/v1/database/migrations/1785687640629-Add_Early_Access_Request_Code_Field';
export * from '@/shared/v1/database/migrations/1785700723494-Remove_Country_Data_Field';
export * from '@/shared/v1/database/migrations/1785854628043-Create_Permissions';
export * from '@/shared/v1/database/migrations/1785855578648-Create_Business_Roles';
export * from '@/shared/v1/database/migrations/1785856050761-Add_Business_Employee_Role_Id_To_Business_Employees';
export * from '@/shared/v1/database/migrations/1785879259366-Create_Business_Role_Permissions';
