# Chasha Context — Product & Domain

> Verified against the repository on 2026-08-23. Update when product scope changes.

## What Chasha is

Chasha is a Restaurant Operating System founded by Erfan Abouei under **Mehkam Holding**
(source: `package.json` description). It targets restaurants and cafes with digital menus,
QR-based ordering, real-time order management, and experiences for customers, waiters,
and restaurant teams. Package name: `chasha-platform`, version `1.0.0`.

## Actors

| Actor                   | Status                | Notes (verified)                                                                                                                               |
| ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform Administrators | Implemented           | OTP-based login (phone + password + OTP), `platform_admins` schema, sessions, roles.                                                           |
| Business Employees      | Partially implemented | Direct password login, forgot-password flow, `business_employees` schema, sessions, statuses.                                                  |
| Businesses              | Partially implemented | `businesses`, `business_types`, `business_roles`, `business_role_permissions` schemas; lookup queries exist; no business CRUD API mounted yet. |
| Business Customers      | Schema only           | `business_customers` schema exists; no module/API yet.                                                                                         |
| End customers (diners)  | Not implemented       | No code yet; aspirational per package description/OpenAPI prose.                                                                               |

## Domain concepts — implementation status

| Concept                                        | State in repository (verified 2026-08-23)                                                                                                                                                                                                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication                                 | Implemented for platform admins (OTP) and business employees (password). JWT access/refresh tokens, cookie names `Access_Token-V1` / `Refresh_Token-V1` or `Authorization: Bearer`; DB-backed sessions with revocation (`revoked_at`).                                                                               |
| Authorization / Permissions / Roles            | Implemented as DB-driven permission model: permission rows (`module`, resource enum, action enum, subject), role-permission assignments seeded for `super_admin`. Route guards: `permissionGuardPlatformAdminMiddleware`, `permissionGuardBusinessMiddleware`. Casbin is initialized at boot but not used by routes. |
| Early Access                                   | Implemented end-to-end: public request submission (+SMS event via MeliPayamak) and admin management (list/detail/update/list-options) with permissions and seeds.                                                                                                                                                    |
| FAQs                                           | Public read implemented (`GET /global/faq/get-all` by type); types seeded (`landing`, `business`).                                                                                                                                                                                                                   |
| Lockups (lookup data)                          | Business-type listing implemented (`GET /global/lockup/business-type`).                                                                                                                                                                                                                                              |
| Businesses (CRUD surface)                      | Not mounted; module has queries/repositories only.                                                                                                                                                                                                                                                                   |
| Products / Categories / Menu / Tables / Orders | **Not implemented anywhere** (no modules, schemas, migrations, or seeds). Aspirational only. Any work here is greenfield and must follow existing module patterns.                                                                                                                                                   |
| Background processing                          | In-process `EventEmitter` active (early-access SMS consumer). RabbitMQ adapter present but intentionally dormant (consumer loader commented out "until server capacity increased").                                                                                                                                  |

## Languages & localization

- All API routes are served under `/api/v1/:lang` where `lang ∈ {fa, en}`.
- Validation and response messages are bilingual, resolved through the translator
  dictionary (`t(ValidationMessages | ResponseMessages, KEY, lang)`).
- Database content columns follow a `_fa` / `_en` suffix convention (e.g. `faq_question_fa`).

## Business vocabulary to reuse

When naming things, prefer this established vocabulary (see also `rules/naming-rules.md`):
platform admin, business employee, business customer, business type, business role,
permission (subject/module/resource/action), session, early access request, faq, faq type,
lockup, status (as `<entity>_statuses` child tables).

## Out of scope unless a task says otherwise

Do not design or scaffold products/menus/orders/etc. "ahead of need". Greenfield domains
still start from an approved task file and reuse the existing module anatomy.
