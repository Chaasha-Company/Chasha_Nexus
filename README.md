<p align="center">
  <img
    src="./public/assets/images/chasha-symbol.svg"
    alt="Chasha Logo"
    width="150"
  />
</p>

<h1 align="center">Chasha Core Backend</h1>

<p align="center">
  Enterprise-grade backend powering the next generation of restaurant operations.
</p>

<p align="center">
  Building the operating system for modern restaurants.
</p>

---

# Overview

Chasha is a modern **Restaurant Operating System (Restaurant OS)** developed by **Kara** to simplify, automate, and optimize restaurant operations.

Instead of offering only a digital menu or QR ordering solution, Chasha provides a complete operational platform that connects customers, waiters, kitchens, managers, and administrators into a single unified system.

The platform is designed around one core objective:

> Reduce operational complexity while delivering a faster and better dining experience.

---

# Product Vision

Restaurants should spend less time managing operations and more time serving customers.

Chasha introduces a new operational model where every restaurant process is connected through one intelligent platform.

Our long-term vision is to become the digital operating system powering restaurants of every size.

---

# Core Platform Capabilities

## Restaurant Management

Centralized restaurant management including:

- Restaurant onboarding
- Restaurant settings
- Multi-branch support
- Branding configuration
- Business information
- Operational configuration

---

## Menu Management

Flexible menu management supporting:

- Categories
- Products
- Pricing
- Availability
- Product images
- Product customization

---

## QR Ordering Platform

Digital ordering infrastructure including:

- Unique QR code for every table
- Instant menu access
- Mobile-friendly experience
- No application installation
- Real-time ordering

---

## Table Management

Restaurant floor management including:

- Table registration
- Table status
- Capacity management
- QR assignment
- Availability tracking

---

## Order Management

Real-time order lifecycle management:

- Customer orders
- Order validation
- Kitchen routing
- Waiter assignment
- Order tracking
- Order history

---

## Kitchen Operations

Kitchen workflow infrastructure:

- Incoming orders
- Preparation queue
- Cooking status
- Completion tracking
- Kitchen notifications

---

## Waiter Operations

Operational tools for restaurant staff:

- Active tables
- Assigned orders
- Order delivery
- Customer assistance
- Activity tracking

---

## Customer Experience

Customer-facing capabilities:

- QR ordering
- Digital menu
- Live order status
- Fast ordering experience
- Mobile-first interface

---

## Notification Platform

Communication infrastructure supporting:

- Restaurant notifications
- Kitchen alerts
- Waiter notifications
- Operational events
- System messages

---

## Analytics & Reporting

Business insights including:

- Order statistics
- Sales reports
- Restaurant performance
- Operational analytics
- Activity monitoring

---

# Restaurant Workflow

```text
Customer
      │
      ▼
Scan Table QR
      │
      ▼
Browse Digital Menu
      │
      ▼
Place Order
      │
      ▼
Waiter Confirmation
      │
      ▼
Kitchen Preparation
      │
      ▼
Order Ready
      │
      ▼
Waiter Delivery
      │
      ▼
Completed
```

---

# Architectural Principles

Chasha follows modern enterprise software engineering principles.

- Domain-Driven Design (DDD)
- Clean Architecture
- Modular Monolith
- CQRS
- Event-Driven Architecture
- SOLID Principles
- Dependency Injection
- API First Design
- Security First
- Observability First

---

# High-Level Architecture

```text
Presentation Layer
        │
        ▼
Application Layer
        │
        ▼
Domain Layer
        │
        ▼
Infrastructure Layer
```

---

# Bounded Contexts

The platform is organized into independent business domains.

- Authentication
- Authorization
- Restaurant
- Branch
- Menu
- Category
- Product
- Table
- Customer
- Order
- Order Item
- Kitchen
- Waiter
- Notification
- Analytics
- Administration

---

# Security Architecture

Security is implemented using enterprise-grade practices.

- JWT Authentication
- Refresh Tokens
- Role-Based Access Control (RBAC)
- Permission-Based Access Control (PBAC)
- Request Validation
- Rate Limiting
- Helmet
- CORS
- Secure Cookies
- Audit Logging
- Encryption in Transit

---

# Technology Stack

## Runtime

- Node.js
- TypeScript

## Architecture

- Domain-Driven Design
- Clean Architecture
- CQRS
- Event-Driven Architecture

## Infrastructure

- PostgreSQL
- Redis
- RabbitMQ

## Observability

- OpenTelemetry
- Structured Logging
- Metrics
- Tracing
- Health Checks

## Deployment

- Docker
- Docker Compose
- CI/CD
- Containerized Infrastructure

---

# Development Status

Current phase:

```text
MVP Development
```

---

# Product Roadmap

```text
Restaurant Management
            │
            ▼
QR Ordering
            │
            ▼
Kitchen Dashboard
            │
            ▼
Waiter Dashboard
            │
            ▼
Cashier System
            │
            ▼
Inventory Management
            │
            ▼
Reservation Management
            │
            ▼
Customer Loyalty
            │
            ▼
Restaurant Analytics
            │
            ▼
Restaurant Operating System
```

---

# About Kara

Chasha is proudly built by **Kara**.

Kara is a technology company focused on designing, engineering, and operating scalable software products. Every product developed by Kara follows the same engineering principles, architecture standards, and long-term product vision.

---

# Founder

**Erfan Abouei**

Founder of Kara

---

# License

Copyright © 2026 Kara.

All rights reserved.
