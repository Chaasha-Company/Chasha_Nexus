# Security Rules

Security is part of implementation, not a review afterthought. The backend is the only
trust boundary; frontend behavior is never trusted.

## R1. Authentication

- Protected route groups must sit behind their actor middleware:
  `requirePlatformAdminAuthMiddleware` / `requireBusinessEmployeeAuthMiddleware`.
- Auth middlewares verify JWT signature/expiry, enforce the `auth_token_type` claim for the
  actor family, and validate the DB session (exists, active, not expired, not revoked).
  Preserve these checks when touching auth paths.
- Token issuance follows existing providers (access/refresh secrets and expiries from env;
  refresh tokens stored bcrypt-hashed with IP/user-agent). Never log tokens or OTPs.

## R2. Authorization

- Authentication ≠ authorization. Every protected endpoint carries an explicit permission
  guard triple; permissions must exist in seeds and be assigned to roles (see `api-rules.md` §R7).
- Distinguish platform-admin vs business-employee surfaces; never share a guard across
  actor families implicitly.
- Resource ownership: business-scoped resources must verify the requesting employee's
  `auth_token_business_id` relationship to the target resource — add explicit ownership
  checks in handlers until/unless a shared mechanism exists.
- Casbin is initialized but unused by routes; do not add or remove authorization mechanisms
  without operator approval.

## R3. Input handling

- Zod strict validation on every external input (see validation-rules).
- Use parameterized TypeORM APIs (`repository`/`QueryBuilder` bindings) — never string-
  concatenated SQL.
- File uploads go through the established multer/S3 middleware with allow-list filters and
  size limits; require files explicitly where mandatory.

## R4. Secrets & configuration

- All secrets come from env (`JWT_*`, `BCRYPT_SALT`, provider keys). Never hardcode, commit,
  or echo secret values. The hardcoded development OTP check in admin login verify is a known
  risk — flag it whenever working nearby; removal requires a task.
- Do not print env dumps or connection strings into logs.

## R5. Data exposure & errors

- Responses only through shared envelopes; strip internal fields (FK ids, deleted-at,
  password/OTP/session hashes) in handler mapping — follow existing destructuring-rest patterns.
- Error responses come from the central handler; never leak stack traces or driver errors.

## R6. Abuse controls

- Rate-limit sensitive endpoints using the per-route `rateLimitMiddleware` factory (login
  steps already do); global limiter stays enabled; keep `trust proxy` setting as-is.
- Consider replay/idempotency for code-based flows (OTP, reset codes): expiry checks and
  single-use semantics like existing session/reset handling.

## R7. Platform hardening

- helmet/cors/hpp/cookie settings are deliberate: preserve flags (`httpOnly`, `secure`,
  sameSite/domain rules tied to environment) unless a task changes them explicitly.
- Dependency additions need review for supply-chain risk (operator approval).

## Security checklist per task touching endpoints/auth/data

Auth family correct · permission guard present & seeded · ownership enforced · inputs
strictly validated · no raw SQL · no secrets in code/logs · no sensitive fields leaked ·
rate limiting considered · cookies/tokens handled by existing providers · error paths leak nothing.
