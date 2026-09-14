import type { GetBusinessRoleListOptionQueryResult } from '../results/get-business-role-list-option.result';

const businessRoleSearchFields = ['businessRoleKey', 'businessRoleNameFa', 'businessRoleNameEn'] as const;

export const getBusinessRoleListOptionQueryHandler = async (): GetBusinessRoleListOptionQueryResult => {
  return {
    businessRoleSearch: businessRoleSearchFields.map((field) => ({
      businessRoleSearchField: field,
      businessRoleSearchLabels: [field],
    })),

    businessRoleFilters: {
      businessRoleIsActive: [
        {
          businessRoleIsActiveValue: true,
          businessRoleIsActiveLabels: {
            fa: 'فعال',
            en: 'Active',
          },
        },
        {
          businessRoleIsActiveValue: false,
          businessRoleIsActiveLabels: {
            fa: 'غیرفعال',
            en: 'Inactive',
          },
        },
      ],
    },
  };
};
