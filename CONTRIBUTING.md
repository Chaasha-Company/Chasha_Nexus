<p align="center">
  <img
    src="./public/assets/images/chasha-symbol.svg"
    alt="Chasha Logo"
    width="150"
  />
</p>

<h1 align="center">Contributing Guidelines</h1>

<p align="center">
  Engineering Standards & Development Workflow for Chasha Backend
</p>

---

# Overview

Thank you for your interest in contributing to **Chasha**.

Chasha is a modern **Restaurant Operating System (Restaurant OS)** developed by **Kara** to simplify restaurant operations through QR ordering, real-time order management, and an intuitive management platform.

To maintain long-term scalability, maintainability, security, and code quality, every contribution must follow the engineering standards described in this document.

---

# Engineering Philosophy

Chasha is built upon the following engineering principles:

- Domain-Driven Design (DDD)
- Clean Architecture
- Modular Monolith Architecture
- SOLID Principles
- CQRS
- Event-Driven Architecture
- Security by Design
- Scalability First
- Simplicity over Complexity
- Explicit over Implicit
- Convention over Configuration

---

# Repository Workflow

The repository follows a Git Flow-inspired branching strategy.

```text
main
 └── develop
        ├── feature/*
        ├── hotfix/*
        ├── release/*
        └── chore/*
```

---

# Branch Strategy

## Main

```text
main
```

Production-ready code only.

---

## Development

```text
develop
```

Primary integration branch for ongoing development.

---

## Feature Branches

```text
feature/<domain>/<feature-name>
```

Examples:

```text
feature/menu/category-management
feature/table/qr-generator
feature/order/realtime-status
feature/customer/menu-search
feature/auth/jwt-authentication
feature/restaurant/settings
```

---

## Hotfix Branches

```text
hotfix/<issue-name>
```

Examples:

```text
hotfix/socket-disconnection
hotfix/order-status-sync
```

---

## Release Branches

```text
release/v0.1.0
release/v0.2.0
```

---

## Chore Branches

```text
chore/<task-name>
```

Examples:

```text
chore/update-dependencies
chore/eslint-config
```

---

# Commit Convention

All commits must follow the Conventional Commits specification.

## Supported Types

```text
feat:
fix:
refactor:
perf:
docs:
test:
build:
ci:
style:
chore:
revert:
```

---

## Examples

```bash
feat(menu): add category management

feat(order): implement realtime order updates

fix(socket): resolve duplicate events

refactor(authentication): simplify jwt validation

docs(readme): update installation guide

test(order): add realtime order tests
```

---

# Pull Request Process

Every Pull Request should:

- Focus on a single feature or improvement
- Include a clear description
- Pass all CI checks
- Include appropriate tests
- Update documentation if required
- Avoid unrelated changes
- Resolve merge conflicts before review

---

# Pull Request Checklist

Before requesting a review:

- [ ] Project builds successfully
- [ ] Lint passes
- [ ] Formatting passes
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console logs
- [ ] No dead code
- [ ] Security reviewed
- [ ] No breaking changes

---

# Architecture Requirements

Every contribution must respect the Chasha architecture.

## Mandatory Principles

- Domain contains business rules only.
- Application coordinates use cases.
- Infrastructure implements external dependencies.
- Presentation handles HTTP interfaces.
- Modules communicate through contracts.
- Domain never depends on framework code.

---

# Project Structure

Every module should contain:

```text
Domain
Application
Infrastructure
Presentation
Contracts
```

Example:

```text
Modules
 └── Orders
      ├── Domain
      ├── Application
      ├── Infrastructure
      ├── Presentation
      └── Contracts
```

---

# Clean Architecture

Dependency direction must always point inward.

```text
Presentation
      ↓
Application
      ↓
Domain
      ↑
Infrastructure
```

---

# CQRS Guidelines

Commands

- Change system state
- Return Result objects or identifiers
- Never return entities

Queries

- Never modify state
- Return DTOs only
- Optimize for reading

---

# Domain Events

Use Domain Events whenever important business actions occur.

Examples:

```text
RestaurantCreated

TableCreated

QRCodeGenerated

CustomerEntered

OrderPlaced

OrderAccepted

OrderPrepared

OrderServed

RestaurantUpdated
```

---

# Code Style

Chasha uses:

- TypeScript Strict Mode
- ESLint
- Prettier
- Husky
- lint-staged
- EditorConfig

General Guidelines:

- Keep files focused
- Prefer explicit types
- Prefer immutable objects
- Avoid deeply nested logic
- Write readable code
- Keep functions small
- Eliminate duplication
- Favor composition over inheritance

---

# Naming Conventions

Classes

```text
RestaurantService
OrderAggregate
CreateOrderHandler
```

Interfaces

```text
IOrderRepository
IJwtProvider
```

DTOs

```text
CreateOrderDto
UpdateRestaurantDto
```

Events

```text
OrderPlacedEvent
RestaurantCreatedEvent
```

---

# Testing Standards

Every feature should include appropriate tests.

Supported test types:

- Unit Tests
- Integration Tests
- API Tests
- Domain Tests
- End-to-End Tests

Critical business flows should always be covered.

---

# Security Requirements

Security is a core engineering responsibility.

Never:

- Commit secrets
- Commit API keys
- Disable authorization
- Disable validation
- Trust client input
- Store plaintext passwords

Always:

- Validate requests
- Sanitize inputs
- Authorize actions
- Log security events
- Follow least-privilege principles

---

# Performance Guidelines

Contributors should aim for efficient code.

Prefer:

- Pagination
- Lazy loading
- Efficient SQL queries
- Indexed database access
- Cached reads where appropriate
- Optimized realtime communication

Avoid:

- N+1 queries
- Blocking operations
- Large payloads
- Duplicate database calls

---

# Documentation

Whenever applicable, update:

- README.md
- CHANGELOG.md
- ARCHITECTURE.md
- API Documentation
- Domain Documentation

---

# Code Review Policy

Every Pull Request requires review before merging.

Review criteria include:

- Architecture compliance
- Business correctness
- Code readability
- Security
- Performance
- Test quality
- Documentation
- Naming consistency

---

# Continuous Integration

Every Pull Request automatically executes:

```text
Install Dependencies
        ↓
Type Check
        ↓
Lint
        ↓
Format Check
        ↓
Build
        ↓
Unit Tests
        ↓
Integration Tests
        ↓
Coverage Report
        ↓
Security Audit
        ↓
Dependency Scan
```

---

# Questions

For architecture discussions, implementation guidance, or engineering decisions, please contact the project maintainers before implementing major changes.

---

<p align="center">
  <strong>Chasha — Smart Restaurant Operating System</strong><br>
  A Product by <strong>Kara</strong>
</p>
