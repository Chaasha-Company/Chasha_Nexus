export const getBooleanEnvHelper = (key: string, alt: boolean): boolean => {
  const EnvValueConfig = process.env[key]?.toLocaleLowerCase();

  if (EnvValueConfig === '1' || EnvValueConfig === 'true') return true;
  if (EnvValueConfig === '2' || EnvValueConfig === 'false') return false;
  return alt;
};
