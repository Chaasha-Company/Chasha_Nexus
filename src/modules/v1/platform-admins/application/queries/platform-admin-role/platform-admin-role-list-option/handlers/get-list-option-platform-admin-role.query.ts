import type { GetListPlatformAdminRoleQueryResult } from '../results/get-list-option-platform-admin-role.result';

import { PlatformAdminRoleListDefinition } from '@/modules/v1/platform-admins/list/platform-admin-role';

export const getListOptionPlatformAdminRoleQueryHandler = async (): GetListPlatformAdminRoleQueryResult => {
  return {
    platformAdminRoleSearch: PlatformAdminRoleListDefinition.searchFields.map((field) => ({
      platformAdminRoleSearchField: field,
      platformAdminRoleSearchLabels: [field],
    })),

    platformAdminRoleFilters: {
      platformAdminRoleIsActive: [
        {
          platformAdminRoleIsActiveValue: true,
          platformAdminRoleIsActiveLabels: {
            fa: 'فعال',
            en: 'Active',
          },
        },
        {
          platformAdminRoleIsActiveValue: false,
          platformAdminRoleIsActiveLabels: {
            fa: 'غیرفعال',
            en: 'Inactive',
          },
        },
      ],
    },
  };
};
