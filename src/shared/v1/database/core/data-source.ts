import { EnvValueConfig } from '@/config/env';
import { replica1Database } from '@/shared/v1/database/core/1-replica';
import { masterDatabase } from '@/shared/v1/database/core/master';
import {
  BusinessCustomersModel,
  BusinessEmployeeSessionsModel,
  BusinessEmployeesModel,
  BusinessEmployeeStatusesModel,
  BusinessesModel,
  EarlyAccessRequestsModel,
  PermissionsModel,
  PlatformAdminRolePermissionsModel,
  PlatformAdminRolesModel,
  PlatformAdminSessionsModel,
  PlatformAdminsModel,
  PlatformAdminStatusesModel,
} from '@/shared/v1/database/schema';
import { BusinessRolePermissionsModel, BusinessTypesModel } from '@/shared/v1/database/schema/businesses/childrens';
import { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/childrens/business-roles/business-roles.schema';
import { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';
import { DataSource } from 'typeorm';
import { CasbinRule } from 'typeorm-adapter';

const isProduction = EnvValueConfig.NODE_ENV === 'production';
export const AppDataSource: DataSource = new DataSource({
  type: EnvValueConfig.DATABASE_DIALECT as 'mysql',

  replication: {
    master: masterDatabase(),
    slaves: [replica1Database()],
  },

  poolSize: EnvValueConfig.DB_POOL_MASTER_CONNECTION_LIMIT,

  entities: [
    CasbinRule,
    PlatformAdminsModel,
    PlatformAdminStatusesModel,
    BusinessEmployeesModel,
    BusinessEmployeeStatusesModel,
    BusinessCustomersModel,
    BusinessEmployeeSessionsModel,
    PlatformAdminSessionsModel,
    BusinessesModel,
    BusinessTypesModel,
    EarlyAccessRequestsModel,
    EarlyAccessRequestStatusesModel,
    PermissionsModel,
    BusinessRolesModel,
    BusinessRolePermissionsModel,
    PlatformAdminRolesModel,
    PlatformAdminRolePermissionsModel,
  ],
  migrations: [`${isProduction ? 'shared/v1/database/migrations/*.js' : 'src/shared/v1/database/migrations/*.ts'}`],
  synchronize: false,
  logging: EnvValueConfig.DATABASE_LOGGING,
  logger: 'file',
});
