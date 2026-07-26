import type { CheckPermissionRequestDTO } from '@/infrastructure/auth-system/';

export type CheckPermissionFunctionContract = (
  _permissionData: CheckPermissionRequestDTO,
) => Promise<boolean>;
