<p align="center">
  <img
    src="./public/assets/images/chasha-symbol.svg"
    alt="Chasha Logo"
    width="150"
  />
</p>

<h1 align="center">Changelog</h1>

<p align="center">
  All notable changes to Chasha Platform will be documented in this file.
</p>

---

# Overview

This project follows a structured changelog approach inspired by:

- Keep a Changelog
- Semantic Versioning (SemVer)

Version format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.2.0
```

Version meaning:

```text
MAJOR
Breaking changes or major platform evolution

MINOR
New features and backward-compatible improvements

PATCH
Bug fixes and small improvements
```

---

# [0.1.0] - 2026-07-XX

## Repository

### Added

- Initial Chasha repository structure
- Enterprise repository standards
- Git repository configuration
- Development environment configuration
- Project documentation structure
- Docker environment foundation

---

# Documentation

### Added

- README.md
- ARCHITECTURE.md
- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- LICENSE.md
- CHANGELOG.md

---

# Architecture

### Added

- Domain-Driven Design foundation
- Clean Architecture structure
- Modular Monolith architecture
- CQRS pattern foundation
- Event-Driven Architecture foundation
- Dependency Injection structure
- Repository pattern
- Application service layer

---

# Product Foundation

### Added

Initial Chasha Restaurant Operating System foundation.

Core product concepts:

- Restaurant management platform
- Digital menu system
- QR Code ordering experience
- Real-time restaurant communication
- Customer ordering workflow

---

# Domain Discovery

### Added

Core business domains:

- Identity Domain
- Restaurant Domain
- Menu Domain
- Table Domain
- Customer Domain
- Ordering Domain
- Kitchen Domain
- Real-Time Communication Domain
- Administration Domain

---

# Identity & Access Management

### Added

Authentication foundation:

- User authentication architecture
- Role-Based Access Control foundation
- Permission management strategy
- User session management
- Restaurant staff roles definition

Supported roles:

```text
Super Admin
Restaurant Manager
Waiter
Cook
Cashier
Customer
```

---

# Restaurant Management

### Added

Restaurant lifecycle foundation:

- Restaurant registration concept
- Restaurant profile management
- Restaurant configuration
- Restaurant settings structure

---

# Menu Management

### Added

Menu system foundation:

- Product management architecture
- Category management architecture
- Menu organization structure
- Product availability management

---

# Table Management

### Added

Table management foundation:

- Restaurant table definition
- Table identification system
- QR Code generation strategy
- Customer table access flow

---

# Ordering System

### Added

Restaurant ordering workflow:

```text
Customer
   ↓
QR Code Scan
   ↓
Digital Menu
   ↓
Order Creation
   ↓
Waiter Notification
   ↓
Kitchen Preparation
   ↓
Order Delivery
```

Implemented concepts:

- Order lifecycle design
- Order status management
- Order communication workflow

---

# Real-Time Communication

### Added

Real-time architecture foundation:

- WebSocket communication strategy
- Live order updates
- Waiter notifications
- Kitchen notifications

---

# Security

### Added

Security foundation:

- Authentication architecture
- Authorization strategy
- Role-Based Access Control (RBAC)
- Input validation strategy
- Security best practices
- Secret management strategy

---

# Infrastructure

### Added

Infrastructure foundation:

- PostgreSQL database strategy
- Redis caching strategy
- WebSocket infrastructure
- Docker configuration
- CI/CD preparation
- Environment configuration

---

# Development Standards

### Added

Engineering standards:

- TypeScript strict configuration
- ESLint configuration
- Prettier configuration
- Conventional Commits
- Git workflow
- Code review standards

---

# Current Status

```text
Current Phase:

Architecture & Foundation Design
```

---

# Upcoming Releases

## [0.2.0]

Planned:

- Core backend implementation
- Authentication module
- Restaurant management module
- Menu management module
- Database implementation
- API foundation

---

## [0.3.0]

Planned:

- Table management
- QR Code generation
- Customer ordering flow
- Real-time order communication

---

## [0.4.0]

Planned:

- Restaurant dashboard
- Waiter dashboard
- Kitchen dashboard
- MVP stabilization

---

## [1.0.0]

Target:

```text
Chasha MVP Release
```

Expected capabilities:

- Complete QR ordering workflow
- Restaurant management
- Real-time operations
- Production-ready deployment

---

<p align="center">
  <strong>Chasha — Building the Operating System for Modern Restaurants</strong>
</p>
