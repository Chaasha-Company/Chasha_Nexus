# Validation Rules

All external input is validated with Zod through the established middleware pipeline.
Unvalidated input reaching a handler is a defect.

## R1. Pipeline

- Body: `validateBodyMiddleware(SchemaFactory)`; Query: `validateQueryMiddleware(SchemaFactory)`.
  Both live in `src/shared/v1/middlewares/validation/` and take `(lang: Language) => Schema`
  factories, rejecting empty payloads (`NO_DATA_RECEIVED`) and delegating Zod failures to
  the central error handler. Never parse/validate manually inside controllers or handlers.

## R2. Schema shape

- Location: `<module>/presentation/validations/{global|admin}/<name>.validation.ts`.
- Exported PascalCase const factory returning `z.strictObject<TheDTO>({...})` — strict
  objects reject unknown keys (surfacing as field errors via the shared Zod mapper).
- Shared pagination is spread in: `...PaginationQueryValidation(lang).shape` (from
  `@/shared/v1/validations/pagination`).
- Regex constraints come from the centralized `REGEX-PATTERN.enum.ts` (e.g.
  `PHONE_NUMBER_PATTERN = '^09\\d{9}$'`); add new patterns there, not inline.

## R3. Messages

- Every constraint's message resolves through the translator:
  `t(ValidationMessages, ValidationMessage.<KEY>, lang)`. Adding a key requires both `fa`
  and `en` dictionary entries under `src/infrastructure/translator-system/i18n/config/enums/response-validation/`.
- Follow existing message phrasing per field type (REQUIRED / \_INVALID / \_TOO_SHORT /
  \_TOO_LONG / \_BAD_FORMAT families). Do not invent a parallel message catalog.

## R4. Coverage checklist per endpoint

Required fields · types & coercions · formats (phone/email/code regexes) · min/max lengths ·
enum membership (`z.enum`) · ID references (existence checked in handlers via repository +
`throwNotFoundException`, not by format alone) · pagination fields · filters/search params ·
business-rule refinements.

## R5. Established idioms to reuse

- Update-style "at least one field" enforcement:
  `.refine((data) => Object.entries(data).some(([k, v]) => k !== '<idField>' && v !== undefined), { ... })`
  with the `UPDATE_AT_LEAST_ONE_FIELD_REQUIRED` message family.
- DTO types unioned with Zod inference helpers where the codebase already does so; keep
  validation and DTO in sync — a schema field without a DTO field (or vice versa) is drift.

## R6. Consistency

- No second validation library, no decorator-based validation, no schemaless endpoints.
- If existing coverage for a shared concern exists (pagination, IDs, phone), reuse it before
  writing new schemas.
