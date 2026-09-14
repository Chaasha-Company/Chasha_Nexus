export interface FindAllBusinessRoleQuery {
  businessRoleBusinessId: string;
  businessRoleSearchQuery?: string;
  businessRoleIsActiveQuery?: boolean;
  businessRolePaginationSkip: number;
  businessRolePaginationTake: number;
}
