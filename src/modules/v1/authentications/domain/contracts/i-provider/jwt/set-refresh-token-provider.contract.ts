import type { Response } from 'express';

export type SetRefreshTokenProviderContract = (res: Response, token: string, isLocal: boolean) => void;
