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

import { platformAdminRoleRouter } from '@/modules/v1/authorizations/presentation/routes/admin/role/role.route';

type RouteLayer = { route: { path: string; methods: Record<string, boolean>; stack: { name: string; handle: (req: unknown, res: unknown, next: unknown) => Promise<void> | void }[] } };

const routesOf = (router: Router) =>
  (router.stack.filter((layer) => layer.route !== undefined) as unknown as RouteLayer[]).map((layer) => ({
    path: layer.route.path,
    methods: Object.keys(layer.route.methods),
    handlers: layer.route.stack.map((handler) => handler.name),
  }));

describe('platformAdminRoleRouter', () => {
  const routes = routesOf(platformAdminRoleRouter);
  const find = (method: string, path: string) => routes.find((route) => route.methods.includes(method) && route.path === path);

  it('registers exactly the expected role management endpoints', () => {
    expect(routes.map((route) => `${route.methods[0]?.toUpperCase()} ${route.path}`).sort()).toEqual(
      ['POST /create', 'PATCH /update', 'GET /get-all', 'POST /delete', 'POST /detail', 'POST /assign-permission', 'POST /remove-permission', 'PUT /permissions', 'GET /get-all-permissions', 'GET /list-option'].sort(),
    );
  });

  it('ends every mutation chain with its dedicated controller after guard and validation middlewares', () => {
    const expectations: [string, string, string][] = [
      ['post', '/create', 'createPlatformAdminRoleController'],
      ['patch', '/update', 'updatePlatformAdminRoleController'],
      ['post', '/delete', 'deletePlatformAdminRoleController'],
      ['post', '/detail', 'detailPlatformAdminRoleController'],
      ['post', '/assign-permission', 'assignPlatformAdminRolePermissionController'],
      ['post', '/remove-permission', 'removePlatformAdminRolePermissionController'],
      ['put', '/permissions', 'replacePlatformAdminRolePermissionsController'],
    ];

    for (const [method, path, controllerName] of expectations) {
      const route = find(method, path);
      expect(route).toBeDefined();
      expect(route!.handlers.at(-1)).toBe(controllerName);
      expect(route!.handlers.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('ends every read chain with its dedicated controller', () => {
    const expectations: [string, string, string][] = [
      ['get', '/get-all', 'getAllPlatformAdminRoleController'],
      ['get', '/list-option', 'getListOptionPlatformAdminRoleController'],
      ['get', '/get-all-permissions', 'getPlatformAdminRolePermissionsController'],
    ];

    for (const [method, path, controllerName] of expectations) {
      const route = find(method, path);
      expect(route).toBeDefined();
      expect(route!.handlers.at(-1)).toBe(controllerName);
      expect(route!.handlers.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('mounts the permission guard before validation and controller on the replacement endpoint', () => {
    const chain = find('put', '/permissions')!.handlers;
    expect(chain.length).toBe(3);
    expect(chain[0]).not.toBe('replacePlatformAdminRolePermissionsController');
    expect(chain[1]).not.toBe('replacePlatformAdminRolePermissionsController');
    expect(chain[2]).toBe('replacePlatformAdminRolePermissionsController');
  });
});
