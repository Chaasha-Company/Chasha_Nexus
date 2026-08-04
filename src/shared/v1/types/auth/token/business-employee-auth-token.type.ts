export type BusinessEmployeeAuthTokenPayload = {
  auth_token_id: string;
  auth_token_session_id: string;
  auth_token_business_id: string;
  auth_token_role_id: string;
  auth_token_type: 'business_employee';
};
