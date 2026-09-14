import type { CheckPermissionFunctionContract } from '@/shared/v1/domain/contracts/auth-system';
import { type CheckPermissionRequestDTO, getCasbinAuthEnforcer } from '@/infrastructure/auth-system';

export const checkPermissionHelper =
  (): CheckPermissionFunctionContract =>
  async (permissionData: CheckPermissionRequestDTO): Promise<boolean> => {
    const enforcer = getCasbinAuthEnforcer();
    return await enforcer.enforce(permissionData.permissionUserId, permissionData.permissionCompanyId, permissionData.permissionResource, permissionData.permissionAction);
  };
