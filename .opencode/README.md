# Chasha Backend — Engineering Operating System

This directory is the operating system for all agent-driven engineering work on the
Chasha Backend (`src/` — Express 5 + TypeScript Restaurant OS backend).

It defines who the engineering agent is, what it must know about the project, which
rules it must follow, how work flows from task to commit, and what "done" means.

## Entry points

| File                       | Role                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md) | Primary instruction contract for the Chasha engineering agent. Read first.             |
| Root `AGENTS.md`           | Repo-level facts (commands, env loading, build quirks). Both contracts apply together. |

## Directory map

| Path                                             | Purpose                                                                                                                                             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context/`                                       | Stable project knowledge: product, repository, architecture, engineering process.                                                                   |
| `rules/`                                         | Enforceable engineering rules: architecture, coding, naming, API, database, validation, security, testing, quality, commits.                        |
| `workflow/`                                      | Step-by-step workflows: development loop, task lifecycle, feature, bugfix, review, release.                                                         |
| `tasks/`                                         | Task files, organized by lifecycle state: `backlog/`, `active/`, `review/`, `completed/`, `archived/`.                                              |
| `daily/`                                         | Daily plans and logs for the 4–6 tasks per day cadence. Active plans live here; finished ones move to `archive/`.                                   |
| `templates/`                                     | Fill-in templates for tasks (generic, feature, bugfix), reviews, and daily plans.                                                                   |
| `scripts/`                                       | Reserved for future automation helpers. Nothing executable yet.                                                                                     |
| `agent/`, `command/`, `instructions/`, `plugin/` | Pre-existing opencode-native scaffolding. Empty on purpose; do not use for project documentation.                                                   |
| `skills/`                                        | Engineering Skill System: 16 composable capability definitions (`<skill>/SKILL.md`) consulted per task's `## Required Skills` (see AGENTS.md §6.1). |

## How a session starts (agent)

1. Read this `README.md`.
2. Read [`AGENTS.md`](./AGENTS.md) — the contract.
3. Read all four files in `context/`.
4. Load the rules relevant to the task (architecture, coding, naming are always relevant).
5. Load the workflow that matches the work type (`feature-workflow.md`, `bugfix-workflow.md`, ...).
6. Locate the assigned task file under `tasks/` or create one from `templates/task-template.md`.
7. Only then inspect code and implement.

## How work is assigned (operator)

- Drop a filled task file into `tasks/backlog/` (or describe the idea and ask the agent to draft the task file for approval).
- Each day assign 4–6 tasks; the agent creates a daily plan in `daily/` from `templates/daily-plan-template.md` and executes the pipeline defined in `workflow/development-workflow.md`.

## Maintenance policy

- `context/` files contain verified facts about this repository. When architecture,
  conventions, or tooling materially change, update them in the same task that made the change.
- Rules and workflows change only with operator approval, because they define agent behavior.
- Never delete history: completed tasks move to `completed/`, then to `archived/`.

## Ground truth rule

These documents describe the repository as observed on 2026-08-23. The codebase is always
the final source of truth. If documentation and code disagree, trust the code, verify,
then propose a documentation fix as part of the current task.
