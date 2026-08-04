export type PasswordCheckerProviderContract = (password: string, hashedPassword: string) => Promise<boolean>;
