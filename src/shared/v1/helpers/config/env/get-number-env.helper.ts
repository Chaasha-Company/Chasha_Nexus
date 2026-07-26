export const getNumberEnvHelper = (key: string, alt: number): number => {
  const EnvValueConfig = Number(process.env[key]);

  return isNaN(EnvValueConfig) ? alt : EnvValueConfig;
};
