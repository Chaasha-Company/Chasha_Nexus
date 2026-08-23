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
export * from '@/shared/v1/database/migrations/1785884061495-Create_Authorization_System';
export * from '@/shared/v1/database/migrations/1785955307773-Create_Chasha_Caches';
export * from '@/shared/v1/database/migrations/1785963476815-Add_RevokedAt_Field';
export * from '@/shared/v1/database/migrations/1786227371073-Remove_Unique_Password_Field';
export * from '@/shared/v1/database/migrations/1786394906093-Create_Faqs_And_Types';
export * from '@/shared/v1/database/migrations/1786470843389-Add_BusinessName_To_Early_Access_Requests';
export * from '@/shared/v1/database/migrations/1786837047594-Change_Permission_Resource_Field_Enum';
export * from '@/shared/v1/database/migrations/1786921497583-Add_Permission_Resource_Get_Detail_Early_Access_Request';
export * from '@/shared/v1/database/migrations/1786922755782-Add_Permission_Resource_Update_Early_Access_Request';
export * from '@/shared/v1/database/migrations/1787090633627-Add_Platform_Admin_Authz_Permission_Get_All_Permission';
export * from '@/shared/v1/database/migrations/1787094133874-Add_Business_Employee_Authz_Permission_Get_All_Permission';
export * from '@/shared/v1/database/migrations/1787520116688-Add_Permission_Resource_Platform_Admin_Role_List';
export * from '@/shared/v1/database/migrations/1787523144517-Add_Permission_Resource_Platform_Admin_Role_Detail';
export * from '@/shared/v1/database/migrations/1787525326063-Add_Permission_Resource_Platform_Admin_Role_Create';
export * from '@/shared/v1/database/migrations/1787527674995-Add_Permission_Resource_Platform_Admin_Role_Update';
