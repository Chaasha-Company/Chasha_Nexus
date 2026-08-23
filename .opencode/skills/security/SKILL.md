# Security

## Purpose

Responsible for threat-informed implementation on every externally reachable behavior:
injection resistance, access control, authentication hardening, secret handling, abuse
limits, and data-exposure discipline. Enforceable policy: `../../rules/security-rules.md`;
this skill adds the adversarial mindset behind it.

## When This Skill Applies

- Every task touching endpoints, auth flows, file uploads, or user-controlled data.
- Any change to error responses, logging, cookies, headers, or rate limiting.
- Reviewing features that introduce new privilege boundaries or resource ownership rules.

## Responsibilities

- Apply OWASP reasoning per change: identify trust boundaries, attacker-controlled inputs,
  and the impact of each failure mode before implementing.
- Keep injection out: parameterized TypeORM/QueryBuilder only; no string-built SQL.
- Enforce access control in depth: family auth middleware → permission guard triple →
  resource ownership checks in handlers; never rely on frontend gating.
- Validate all input with strict Zod schemas; reject unknown keys.
- Protect secrets: env-only configuration, nothing hardcoded or logged (tokens, OTPs,
  passwords, connection strings).
- Limit exposure: shared envelopes only, internal fields stripped in handler mapping,
  central error handler prevents stack/driver leakage.
- Preserve platform hardening: helmet/cors/hpp settings, cookie flags (`httpOnly`,
  `secure`, sameSite/domain), global + per-route rate limits.

## Required Knowledge

- OWASP Top 10 categories as concrete code-review checks (A01 broken access control,
  A02 cryptographic failures, A03 injection, A04 design, A05 misconfiguration, A07
  identification/auth failures, A08 integrity, A09 logging failures).
- Chasha credential handling: bcrypt password hashing, bcrypt-hashed refresh tokens at
  rest, OTP TTL sessions in node-cache, JWT signing from env secrets/expiries.
- Threat modeling lite: for each new endpoint — who can call it, with what identity, what
  is the worst abuse, what limits it?
- Known repo risks to flag when nearby: hardcoded dev OTP check in admin login verify;
  `super_admin` grant-all role-permission seed marked temporary test data.

## Repository Inspection

1. Auth/guard chain coverage for the route prefix and the specific endpoint.
2. Existing validation schemas covering every input field being introduced.
3. Uploader middleware allow-lists/size limits for any file path.
4. Response mapping for sensitive-field leakage (FK ids, deleted-at, credentials).

## Validation

- Authorization matrix answered for the endpoint (who / authenticated how / permitted by /
  owning what) and matches seeds exactly.
- No secret material in diffs, logs, or error payloads.
- Abuse-sensitive endpoints (login, codes, submissions) carry appropriate rate limiting.
- Error paths leak nothing about internals.

## Common Failure Modes

- IDOR: valid permission but missing ownership scoping to the actor's business.
- Verifying input shape while trusting its content (e.g., accepting arbitrary status ids
  without existence/state checks).
- Detailed error messages distinguishing "user not found" vs "wrong password" where the
  flow requires ambiguity.
- Debug/introspection endpoints left unguarded.

## Anti-Patterns

- Security by obscurity (hidden routes, client-side checks) as primary control.
- Rolling custom crypto/token schemes beside the existing JWT/session providers.
- Disabling validators or guards for convenience during development and shipping it.
- Logging request bodies containing credentials/tokens "for debugging".

## Engineering Expectations

Security review questions have documented answers before merge. The engineer assumes
every endpoint will be probed maliciously and can explain, per layer, what stops each abuse.

## Definition of Done

- security-rules checklist passes; no new attack surface without explicit mitigation;
  known-risk flags raised where adjacent work increases exposure.
