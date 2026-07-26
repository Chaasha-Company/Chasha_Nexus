import path from 'path';
import { Reader, type ReaderModel } from '@maxmind/geoip2-node';
import { loggerConfig } from '@/config/logger';

let geoIpDatabase: null | ReaderModel;

export const geoIpDatabaseInitConfig = async (): Promise<void> => {
  try {
    const geoIpDatabasePath = path.join(process.cwd(), '__data__', 'geo_ip', 'GeoLite2-City.mmdb');
    geoIpDatabase = await Reader.open(geoIpDatabasePath);
    loggerConfig.info('GeoLite2 City Database loaded successfully.');
  } catch (error: unknown) {
    loggerConfig.error(`Geo Ip Init Database lost with ${error}`);
  }
};

export const getGeoIpReader = (): ReaderModel => geoIpDatabase as ReaderModel;
