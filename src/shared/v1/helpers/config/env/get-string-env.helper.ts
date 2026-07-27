export const getStringEnvHelper = (key: string, alt: string): string => process.env[key]?.trim() ?? alt;
