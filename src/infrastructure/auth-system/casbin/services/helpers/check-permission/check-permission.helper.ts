import type { CheckPermissionFunctionContract } from '@/shared/v1/domain/contracts/auth-system';
import {
  type CheckPermissionRequestDTO,
  getCasbinAuthEnforcer,
} from '@/infrastructure/auth-system';

export const checkPermissionHelper =
  (): CheckPermissionFunctionContract =>
  async (permissioData: CheckPermissionRequestDTO): Promise<boolean> => {
    const enforcer = getCasbinAuthEnforcer();
    return await enforcer.enforce(
      permissioData.permissionUserId,
      permissioData.permissionCompanyId,
      permissioData.permissionResource,
      permissioData.permissionAction,
    );
  };
