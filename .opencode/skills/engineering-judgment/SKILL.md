# Engineering Judgment

## Purpose

Responsible for decision quality: choosing among viable options by weighing simplicity,
consistency, cost, risk, and long-term maintainability — and for preventing technically
impressive but unnecessary solutions. This skill supervises all other skills.

## When This Skill Applies

- Every task, during analysis and review; mandatory when trade-off statements are required
  (architecture deviations, new dependencies, schema changes, performance work).
- Any moment two acceptable implementations diverge in business behavior or maintenance cost.

## Responsibilities

- Evaluate options against explicit criteria before committing to one:
  simplicity vs abstraction · performance vs maintainability · consistency vs complexity ·
  technical debt incurred/retired · operational cost · security risk · reliability risk ·
  business impact · architectural consequences.
- Prefer the boring, consistent, in-pattern solution; novelty requires justification that
  survives the question "what breaks if we don't do this?".
- Separate fact from inference using the claim labels (`existing-behavior`,
  `derived-decision`, `proposed-improvement`, `assumption`) so decisions remain auditable.
- Escalate instead of guessing when criteria conflict and behavior is affected (ambiguity
  protocol in `../../AGENTS.md`).
- Retire debt deliberately: opportunistically fixing unrelated issues is forbidden;
  propose them as backlog items with effort/impact estimates.

## Required Knowledge

- Trade-off articulation: stating what is gained, sacrificed, and reversible for each option.
- Cost-of-change reasoning: which decisions are cheap to reverse later versus locked-in
  (schema, public API shape, permission model).
- Debt taxonomy: deliberate vs inadvertent; interest rate metaphors applied concretely
  (e.g., every untyped escape taxes future refactors).
- Operational empathy: who maintains this at 02:00 with no context beyond the codebase.
- YAGNI discipline calibrated by evidence: build for today's verified requirements,
  structure so tomorrow's are addable.

## Repository Inspection

Judgment inputs come from evidence:

1. What the closest existing pattern does — default to it unless it demonstrably fails.
2. Real constraints: hooks/gates, migration history, permission seeds, envelope contracts.
3. Prior recorded decisions in `.opencode/context/` and past task reports to avoid relitigating.

## Validation

- Task file contains a decision note whenever an implementation choice was non-obvious:
  options considered, choice made, why, and what would change the answer.
- No unjustified new dependencies, abstractions, infrastructure, or scope growth.
- Review answers include the "production-ready?" judgment with reasons, not vibes.

## Common Failure Modes

- Solving the problem in front of you with machinery for the problem that might exist later.
- Optimizing the metric that was easiest to measure instead of the one that matters.
- Consistency theater: following a convention into obvious harm without flagging it.
- Analysis paralysis on reversible decisions; flippancy on irreversible ones.

## Anti-Patterns

- Resume-driven engineering: queues, microservices, event sourcing where a function suffices.
- Gold-plating: extra layers of validation/config for hypothetical operators.
- False economy: skipping validation/auth work to ship faster, borrowing security debt.
- Silent divergence: doing something different from the plan because it was more interesting.

## Engineering Expectations

The engineer's output is decisions plus their honest accounting. A reviewer should be able
to reconstruct _why_ from the task file alone, months later, without asking anyone.

## Definition of Done

- Every non-trivial choice documented with criteria and trade-offs; no undocumented
  deviation from rules/patterns; operator escalations made at the right moments rather
  than after implementation.
