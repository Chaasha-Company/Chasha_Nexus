# CHASHA-BE-TASK-022 — Establish Mehkam Source Ownership Attribution

## Metadata

- **Task ID:** CHASHA-BE-TASK-022
- **Type:** Chore (governance / branding / docs)
- **Priority:** High
- **Status:** Completed
- **Domain:** Repository Governance
- **Module:** Cross-cutting (docs + entry-point boundaries)
- **Date:** 2026/09/15
- **Dependencies:** None
- **Required Skills:** Backend Engineering

---

## Context

`existing-behavior`: Mehkam ownership is already communicated at repository boundaries — `README.md` (About Mehkam, copyright line), `LICENSE.md` (proprietary license, Mehkam ownership), `CONTRIBUTING.md` / `SECURITY.md` (Mehkam footers), `package.json` (Mehkam Holding description/keyword), and runtime `author: 'Mehkam_Company'` response envelopes. No source-file proprietary headers exist at entry points, and `LICENSE.md` copyright names an individual rather than Mehkam.

`existing-rule`: `AGENTS.md` previously had no attribution convention; this task establishes it as a permanent project rule.

---

## Objective

Establish Mehkam source ownership attribution as a **permanent project convention** (not a one-time branding change) and apply a minimal, professional, non-repetitive trace at the appropriate boundaries.

---

## Scope

### In scope

- Permanent rule in `AGENTS.md` (`Mehkam ownership attribution`).
- Repository-level ownership: `LICENSE.md` copyright line aligned to Mehkam (founder retained in Ownership paragraph).
- Source-level attribution: standard proprietary header on the three application entry-point boundary files only — `src/index.ts`, `src/bootstrap.ts`, `src/app.ts`.
- This task file itself.

### Out of scope

- Per-file branding comments or touching every source file.
- Any change to business logic, API/database behavior, architecture, dependencies, runtime behavior, public contracts, or tests.
- Generated files, lockfiles, vendor files, build output, or other machine-managed files.
- Using the old company name `Kara` for any new attribution.

---

## Technical requirements

- Header format (adapted per file type):

```text
/**
 * Copyright (c) 2026 Mehkam.
 * Proprietary and confidential.
 *
 * Part of the Chasha platform.
 * Owned and maintained by Mehkam.
 */
```

- No duplicate headers; headers only where absent.
- Conventional Commits, one commit per meaningful step.

---

## Acceptance criteria

- [ ] Permanent Mehkam attribution rule exists in `AGENTS.md`.
- [ ] Task file created under `.opencode/tasks/` with title, description, scope, acceptance criteria, and date 2026/09/15.
- [ ] `LICENSE.md` copyright attributes Mehkam.
- [ ] Entry-point headers present in `src/index.ts`, `src/bootstrap.ts`, `src/app.ts` with no duplicates.
- [ ] No business logic / runtime behavior changed.
- [ ] No generated or machine-managed files modified.
- [ ] Validation (`npm:check` types + lint, prettier check) passes.

---

## Validation

- `npm run npm:check:types`
- `npm run lint`
- `npx prettier --check` on touched files
- `git diff --stat` review; `grep` for duplicate headers and `Kara` traces

---

## Implementation notes

`existing-behavior`: verified prior Mehkam traces (README, LICENSE, CONTRIBUTING, SECURITY, package.json, `Mehkam_Company` response authors, request-id prefix) and zero `Kara` occurrences. `derived-decision`: limited new headers to the three entry-point boundary files to stay non-repetitive; aligned `LICENSE.md` copyright to Mehkam while retaining the founder in the Ownership paragraph.

---

## Final report

Task ID: CHASHA-BE-TASK-022
Status: Completed
Implementation summary: Established the permanent Mehkam attribution rule in `AGENTS.md`; aligned `LICENSE.md` copyright to Mehkam; added the standard proprietary header to `src/index.ts`, `src/bootstrap.ts`, `src/app.ts`.
Files created: `.opencode/tasks/pending/2026-09-15/CHASHA-BE-TASK-022.md`
Files modified: `AGENTS.md`, `LICENSE.md`, `src/index.ts`, `src/bootstrap.ts`, `src/app.ts`
Database changes: None. API changes: None. Permission changes: None. Swagger changes: None.
Tests: Not applicable (no behavior change; `npm test` not wired per `AGENTS.md`).
Validation results: `tsc --noEmit` passes; `eslint` on touched sources passes; `prettier --check` on touched files passes.
Remaining issues: None.

---

## Task Storage

.opencode/tasks/pending/2026-09-15/CHASHA-BE-TASK-022.md
