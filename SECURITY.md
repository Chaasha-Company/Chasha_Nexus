<p align="center">
  <img
    src="./public/assets/images/chasha-symbol.svg"
    alt="Chasha Logo"
    width="150"
  />
</p>

<h1 align="center">Security Policy</h1>

<p align="center">
  Enterprise Security Standards for Chasha Core Backend
</p>

---

# Overview

Security is a fundamental principle of the Chasha platform.

As an enterprise-grade Restaurant Operating System (Restaurant OS), Chasha is designed with a security-first mindset to protect restaurant data, customer information, business operations, and platform integrity.

This document outlines our security policies, supported versions, vulnerability reporting procedures, responsible disclosure process, and core security principles.

---

# Supported Versions

The following versions of Chasha Core Backend currently receive security updates.

| Version | Supported |
| ------- | --------- |
| 0.x     | ✅        |
| < 0.x   | ❌        |

---

# Reporting a Vulnerability

If you believe you have discovered a security vulnerability within Chasha, please report it privately.

### Security Contact

```text
security@chasha.app
```

Please include:

- Description of the vulnerability
- Affected module
- Steps to reproduce
- Expected impact
- Proof of concept (if available)
- Suggested mitigation (optional)

---

# Responsible Disclosure Policy

To protect our customers and restaurant partners, we ask researchers to:

- Avoid public disclosure before remediation.
- Allow sufficient time for investigation.
- Avoid accessing customer or restaurant data unnecessarily.
- Avoid disrupting production services.
- Follow responsible disclosure practices.

---

# Security Response Process

Every reported vulnerability follows the process below.

```text
Report Received
        │
        ▼
Acknowledgement
        │
        ▼
Internal Investigation
        │
        ▼
Risk Assessment
        │
        ▼
Remediation
        │
        ▼
Security Validation
        │
        ▼
Deployment
        │
        ▼
Public Disclosure (if required)
```

### Target Response Times

| Activity           | Target              |
| ------------------ | ------------------- |
| Acknowledgement    | 72 Hours            |
| Initial Assessment | 7 Days              |
| Mitigation         | Depends on Severity |
| Resolution         | Depends on Severity |

---

# Security Severity Classification

## Critical

Examples:

- Remote Code Execution
- Authentication Bypass
- Privilege Escalation
- Restaurant Data Exposure
- Infrastructure Compromise

---

## High

Examples:

- Authorization Bypass
- Broken Access Control
- Sensitive Information Disclosure
- Order Manipulation
- API Security Vulnerabilities

---

## Medium

Examples:

- Session Management Issues
- Rate Limiting Bypass
- Information Leakage

---

## Low

Examples:

- Security Misconfiguration
- Minor Information Disclosure
- Non-exploitable Weaknesses

---

# Security Principles

Chasha follows enterprise security principles.

- Zero Trust Architecture
- Defense in Depth
- Least Privilege Access
- Secure by Default
- Privacy by Design
- Continuous Monitoring
- Audit Logging
- Encryption Everywhere

---

# Authentication Security

Chasha implements:

- JWT Authentication
- Refresh Token Rotation
- Secure Session Validation
- Device Session Management
- Session Revocation
- Secure Password Storage

---

# Authorization Security

Access control is enforced through:

- Role-Based Access Control (RBAC)
- Permission-Based Access Control (PBAC)
- Restaurant Ownership Validation
- Administrative Policies
- Resource-Level Authorization

---

# Restaurant Security

Restaurant resources are fully isolated.

Security controls include:

- Restaurant data isolation
- Branch isolation
- Order ownership validation
- Menu access validation
- Employee authorization
- Administrative restrictions

---

# API Security

Every API endpoint follows enterprise security practices.

- HTTPS Only
- JWT Validation
- Request Validation
- Rate Limiting
- Security Headers
- Input Sanitization
- Output Validation
- CORS Protection

---

# Data Security

Customer and restaurant information is protected through:

- Encryption in Transit
- Database Access Control
- Secure Secrets Management
- Backup Protection
- Data Retention Policies
- Sensitive Data Protection

---

# Infrastructure Security

Infrastructure protections include:

- Container Isolation
- Secure Docker Images
- Vulnerability Scanning
- Dependency Scanning
- Secret Management
- Secure CI/CD Pipelines
- Network Segmentation
- Firewall Policies

---

# Observability & Auditing

Security-related events are continuously monitored through:

- Audit Logging
- Security Event Logging
- Metrics Collection
- Distributed Tracing
- Health Monitoring
- Error Monitoring

---

# Dependency Management

Project dependencies are continuously monitored using:

- Automated Dependency Scanning
- Security Advisories
- Supply Chain Monitoring
- Software Bill of Materials (SBOM)

---

# Compliance Objectives

Chasha's security architecture is aligned with industry best practices, including:

- OWASP Top 10
- OWASP API Security Top 10
- Zero Trust Architecture
- Principle of Least Privilege
- Defense in Depth

---

# Security Disclaimer

Chasha is an actively evolving platform.

Although we continuously improve the security of the platform, no software system can guarantee absolute security.

We encourage researchers and contributors to report vulnerabilities responsibly.

---

# About Mehkam

Chasha is developed and maintained by **Mehkam**, a technology company focused on building secure, scalable, and enterprise-grade software platforms.

---

<p align="center">
  <strong>Chasha — Building the Operating System for Modern Restaurants.</strong>
</p>
