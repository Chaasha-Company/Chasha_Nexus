<p align="center">
  <img
    src="./public/assets/images/chasha-symbol.svg"
    alt="Chasha Logo"
    width="150"
  />
</p>

<h1 align="center">Chasha Platform Architecture</h1>

<p align="center">
  Enterprise Architecture Specification
</p>

<p align="center">
  Building the Future of Smart Restaurant Operations
</p>

---

# Overview

Chasha is a modern Restaurant Operating System designed to transform traditional restaurant operations into a faster, smarter, and more efficient digital experience.

The platform helps restaurants and cafes reduce customer waiting time, optimize waiter workflows, and provide a seamless ordering experience through digital table-based ordering.

Chasha is not a traditional POS system.

It is an operational platform designed around the restaurant experience:

- Faster ordering
- Better customer experience
- Reduced operational cost
- Real-time communication
- Modern restaurant workflow

---

# Architectural Vision

The long-term vision of Chasha is to build:

> The Operating System for Modern Restaurants

Chasha aims to become the central digital infrastructure that powers restaurant operations.

The platform will evolve from a QR-based ordering system into a complete restaurant operating ecosystem.

Future capabilities include:

- Smart Restaurant Operations
- Advanced Analytics
- Inventory Intelligence
- Restaurant Management Automation
- AI-Powered Restaurant Assistant
- Integrated Business Intelligence

---

# Architectural Principles

Chasha is built on modern software engineering principles:

- Domain-Driven Design (DDD)
- Clean Architecture
- Modular Monolith
- CQRS
- Event-Driven Architecture
- SOLID Principles
- Dependency Injection
- Security by Design
- Observability First
- Evolutionary Architecture

---

# Architecture Style

Current architecture:

```text
Modular Monolith
```

Future evolution:

```text
Modular Monolith
        ↓
Distributed Modular Monolith
        ↓
Selective Microservices
```

The Modular Monolith approach provides:

- Lower operational complexity
- Faster MVP development
- Strong domain boundaries
- Easier maintenance
- Better scalability foundation
- Reduced infrastructure cost

---

# Clean Architecture

Chasha follows Clean Architecture principles.

```text
Presentation Layer
        ↓
Application Layer
        ↓
Domain Layer
        ↑
Infrastructure Layer
```

---

# Presentation Layer

Responsibilities:

- REST APIs
- Web Application APIs
- Real-time Socket Communication
- Authentication Middleware
- Request Validation
- Response Serialization
- Restaurant Web Application Communication

---

# Application Layer

Responsibilities:

- Use Cases
- Commands
- Queries
- Application Services
- Event Handlers
- Business Workflow Orchestration

Examples:

```text
CreateRestaurant
CreateMenuItem
GenerateTableQRCode
SubmitCustomerOrder
ConfirmOrder
UpdateOrderStatus
```

---

# Domain Layer

Responsibilities:

- Business Entities
- Aggregates
- Value Objects
- Domain Services
- Domain Events
- Business Rules

Core business rules exist inside this layer.

The Domain layer remains independent from frameworks and infrastructure.

---

# Infrastructure Layer

Responsibilities:

- Database Access
- Cache Management
- Real-Time Communication
- External Services
- File Storage
- Logging
- Monitoring
- Deployment Infrastructure

---

# Domain-Driven Design

Chasha organizes its system around restaurant business domains.

Each domain represents an independent bounded context.

---

# Bounded Contexts

## Identity Context

Responsibilities:

- User authentication
- Authorization
- Session management
- Access control
- Role management

Roles:

```text
Super Admin
Restaurant Manager
Waiter
Cook
Cashier
```

---

# Restaurant Context

Responsibilities:

- Restaurant registration
- Restaurant profile
- Restaurant configuration
- Restaurant settings
- Operating information

---

# Menu Context

Responsibilities:

- Product management
- Category management
- Menu organization
- Product availability

Entities:

```text
Menu
Category
Product
Modifier
```

---

# Table Context

Responsibilities:

- Restaurant tables
- Table management
- QR Code generation
- Table identification

Flow:

```text
Restaurant Table
        ↓
QR Code
        ↓
Customer Access
        ↓
Digital Menu
```

---

# Ordering Context

Responsibilities:

- Customer orders
- Order lifecycle
- Order status management
- Order history

Order lifecycle:

```text
Created
   ↓
Submitted
   ↓
Confirmed
   ↓
Preparing
   ↓
Ready
   ↓
Delivered
```

---

# Customer Context

Responsibilities:

- Customer interaction
- Customer information
- Ordering session
- Customer experience

---

# Kitchen Context

Responsibilities:

- Kitchen workflow
- Order preparation
- Order status updates
- Preparation queue

---

# Real-Time Communication Context

Responsibilities:

- WebSocket communication
- Live order updates
- Waiter notifications
- Kitchen notifications

Architecture:

```text
Customer
    ↓
Socket Gateway
    ↓
Order Service
    ↓
Restaurant Staff
```

---

# Administration Context

Responsibilities:

- Chasha administration
- Platform management
- Restaurant management
- System monitoring

---

# Module Structure

Every module follows the same structure:

```text
module/

├── domain/
│
├── application/
│
├── infrastructure/
│
├── presentation/
│
└── contracts/
```

---

# CQRS

Chasha uses Command Query Responsibility Segregation.

## Commands

Commands:

- Modify system state
- Execute business rules
- Trigger domain events

Examples:

```text
CreateMenuItem
CreateOrder
ConfirmOrder
UpdateOrderStatus
```

---

## Queries

Queries:

- Never modify state
- Return DTOs only
- Optimize read operations

Examples:

```text
GetRestaurantMenu
GetOrderStatus
GetTableInformation
```

---

# Event-Driven Architecture

Chasha uses domain events for internal communication.

Examples:

```text
RestaurantCreated
MenuItemCreated
QRCodeGenerated
OrderCreated
OrderConfirmed
OrderPrepared
OrderDelivered
```

Benefits:

- Loose coupling
- Better scalability
- Better observability
- Easier future expansion

---

# Ordering Flow Architecture

Customer ordering flow:

```text
Customer Scans QR Code
            ↓
Restaurant Web App
            ↓
Browse Menu
            ↓
Select Products
            ↓
Submit Order
            ↓
Order Service
            ↓
Waiter Notification
            ↓
Kitchen Preparation
            ↓
Order Delivery
```

---

# Real-Time Architecture

Chasha requires real-time communication for restaurant operations.

Flow:

```text
Customer Order
        ↓
Backend Service
        ↓
WebSocket Gateway
        ↓
Waiter Dashboard
        ↓
Kitchen Dashboard
```

---

# Security Architecture

Chasha follows security-first principles.

Security mechanisms:

- JWT Authentication
- Refresh Tokens
- Role-Based Access Control
- Permission Management
- API Validation
- Rate Limiting
- Secret Management
- Audit Logging

---

# Observability

Chasha is designed with observability-first principles.

Monitoring includes:

- Structured Logging
- Error Tracking
- Metrics Collection
- Health Checks
- Performance Monitoring
- Audit Logs

---

# Database Architecture

Primary database:

```text
PostgreSQL
```

Caching:

```text
Redis
```

Real-Time:

```text
WebSocket Gateway
```

Storage:

```text
Object Storage
```

---

# Deployment Architecture

Deployment pipeline:

```text
Developer
        ↓
Git Repository
        ↓
CI Pipeline
        ↓
Docker Build
        ↓
Container Registry
        ↓
Production Environment
```

---

# Scalability Strategy

Chasha supports future scaling through:

- Horizontal Scaling
- Background Workers
- Queue Processing
- Distributed Cache
- Event Processing
- Service Separation

---

# MVP Scope

Current MVP focuses on:

```text
QR Ordering System
+
Restaurant Management Foundation
+
Real-Time Order Communication
```

Included:

- Restaurant creation
- Menu management
- Category management
- Table management
- QR Code generation
- Customer ordering
- Waiter workflow
- Kitchen workflow
- Real-time updates

Not included in MVP:

- Online Payment
- Delivery Management
- Inventory Management
- Accounting System
- Payroll Management

---

# Long-Term Evolution

Architecture roadmap:

```text
Digital Menu
        ↓
QR Ordering Platform
        ↓
Restaurant Operating System
        ↓
Smart Restaurant Platform
        ↓
AI-Powered Restaurant Infrastructure
```

---

# Design Goals

Chasha architecture prioritizes:

- Simplicity
- Maintainability
- Scalability
- Security
- Performance
- Developer Experience
- Business Value
- Restaurant Efficiency

---

# Company

Built by:

**Mehkam Holding**

Technology company focused on building scalable digital products.

---

# Founder

**Erfan Abouei**

Founder & Creator of Chasha

---

<p align="center">
  <strong>Chasha — Building the Operating System for Modern Restaurants</strong>
</p>
