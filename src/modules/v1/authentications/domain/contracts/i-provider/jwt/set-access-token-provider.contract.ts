import type { Response } from 'express';

export type SetAccessTokenProviderContract = (res: Response, token: string, isLocal: boolean) => void;
