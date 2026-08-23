# Feature Task Template

Extends `task-template.md` (all base sections required). Add/complete the sections below
during Stage 1–2 of feature-workflow.

---

```markdown
## API contract

| Field             | Value                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------- | ------------------------------------- | ------ |
| Method & path     | `POST /api/v1/{lang}/admin/<resource>/<verb-phrase>`                                         |
| Surface           | admin                                                                                        | business                              | global |
| Auth              | requirePlatformAdminAuthMiddleware                                                           | requireBusinessEmployeeAuthMiddleware | none   |
| Permission triple | module: `<string>` · resource: `<PermissionResourceEnum>` · action: `<PermissionActionEnum>` |
| Request shape     | <DTO fields + validation constraints>                                                        |
| Response          | envelope variant (success/pagination) + status code + data shape                             |
| Errors            | <exception types + message keys per failure mode>                                            |

## Permission model decisions

- Who can access: <actors>
- Roles receiving the permission: <roles> (note if assignment is deferred to operator)
- Platform-admin vs business-employee difference: <...>

## Database impact

- Models: <new/changed, file paths>
- Migration plan: <name, additive vs destructive, down() strategy>
- Seeds: <new rows, boot order position>
- Cache keys to invalidate after writes: <...>

## Reuse list

- Existing handlers/repositories/helpers consumed: <...>
- Confirmed non-duplicated: <searched for X, found/not found>

## Implementation order

1. <domain items>
2. <schema + migration (+ src/index.ts re-export)>
3. <infrastructure repository>
4. <application handler(s) + events>
5. <presentation DTO/validation/controller/route + barrels>
6. <permission enum/seed/guard wiring>
7. <swagger spec entry>
8. <tests>

## Swagger checklist

- [ ] Path with {language_prefix}, tag group, operationId
- [ ] Request/response schemas match real envelopes; $refs resolve
- [ ] security block for protected endpoints (CookieAuth/BearerAuth)
- [ ] Status codes match implementation
```
