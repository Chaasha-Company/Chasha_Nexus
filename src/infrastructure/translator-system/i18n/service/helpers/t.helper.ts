import type { Language } from '@/infrastructure/translator-system/i18n/other';

export const t = <T extends Record<string, Record<Language, string>>>(dictionary: T, key: keyof T, lang: Language): string => dictionary[key][lang];
