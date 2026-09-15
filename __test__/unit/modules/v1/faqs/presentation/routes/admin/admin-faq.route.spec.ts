import type { Router } from 'express';

import { describe, expect, it, jest } from '@jest/globals';

jest.mock('@/shared/v1/database/core', () => ({
  AppDataSource: {
    getRepository: () => ({}),
    queryResultCache: undefined,
  },
}));

jest.mock('@/config/logger', () => ({
  loggerConfig: {
    trace: () => undefined,
    debug: () => undefined,
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
    fatal: () => undefined,
  },
}));

import { adminFaqRouter } from '@/modules/v1/faqs/presentation/routes/admin/admin-faq.route';

type RouteLayer = { route: { path: string; methods: Record<string, boolean>; stack: { name: string; handle: (req: unknown, res: unknown, next: unknown) => Promise<void> | void }[] } };

const routesOf = (router: Router) =>
  (router.stack.filter((layer) => layer.route !== undefined) as unknown as RouteLayer[]).map((layer) => ({
    path: layer.route.path,
    methods: Object.keys(layer.route.methods),
    handlers: layer.route.stack.map((handler) => handler.name),
  }));

describe('adminFaqRouter', () => {
  const routes = routesOf(adminFaqRouter);
  const find = (method: string, path: string) => routes.find((route) => route.methods.includes(method) && route.path === path);

  it('registers exactly the expected FAQ admin endpoints with operation suffixes', () => {
    expect(routes.map((route) => `${route.methods[0]?.toUpperCase()} ${route.path}`).sort()).toEqual(['GET /get-all', 'GET /list-option', 'POST /detail', 'POST /create', 'POST /delete', 'PATCH /patch'].sort());
  });

  it('ends every chain with its dedicated controller after guard and validation middlewares', () => {
    const expectations: [string, string, string][] = [
      ['get', '/get-all', 'getAllAdminFaqController'],
      ['get', '/list-option', 'getListOptionAdminFaqController'],
      ['post', '/detail', 'detailAdminFaqController'],
      ['post', '/create', 'createAdminFaqController'],
      ['post', '/delete', 'deleteAdminFaqController'],
      ['patch', '/patch', 'updateAdminFaqController'],
    ];

    for (const [method, path, controllerName] of expectations) {
      const route = find(method, path);
      expect(route).toBeDefined();
      expect(route!.handlers.at(-1)).toBe(controllerName);
      expect(route!.handlers.length).toBeGreaterThanOrEqual(2);
    }
  });
});
