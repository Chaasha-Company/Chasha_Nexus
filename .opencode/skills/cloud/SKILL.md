# Cloud

## Purpose

Responsible for cloud-service interactions that Chasha actually uses — S3-compatible
object storage via ArvanCloud — and for staying repository-aware about everything else:
no assumed AWS compute, no assumed managed databases, no invented topology.

## When This Skill Applies

- Tasks touching file uploads/downloads, the ArvanCloud storage adapter (`storage-system/arvan-cloud`),
  uploader middleware, or `ARVAN_*` configuration.
- Operator discussions about hosting, scaling, managed services, or CDN/object-storage strategy.

## Responsibilities

- Work with the confirmed integration only: `@aws-sdk/client-s3` + `multer-s3` pointed at
  ArvanCloud endpoint/bucket via env; ACL behavior driven by the middleware's
  `isPublicFile` flag.
- Keep object-storage hygiene: keys namespaced by folder purpose, allow-listed content
  types, size limits, credentials env-only, no bucket listing exposure by default.
- Distinguish provider-neutral patterns (managed DB, load balancing, horizontal scaling)
  from unconfirmed specifics: deployment platform, database hosting, and scaling strategy
  are operator-owned and must be asked about, not assumed.
- When an operator task introduces a new cloud service, evaluate lock-in, cost model,
  regional latency (Iran-market users), and failure modes before implementation.

## Required Knowledge

- Object-storage semantics: buckets/keys/ACLs/presigned concepts as realized through the
  AWS SDK client configured for a custom endpoint.
- Cloud trade-off literacy sufficient for advice: managed vs self-hosted databases,
  vertical vs horizontal scaling implications for this Node/MySQL stack (replication
  already assumes at least master + one replica host).
- Cost and data-residency awareness relevant to the business context.
- What is NOT established: any specific public-cloud vendor for compute, DNS/TLS
  management, or container orchestration. `prometheus.yml` suggests self-managed
  monitoring intent — still unconfirmed end-to-end.

## Repository Inspection

1. Storage adapter configuration and uploader middleware options before upload changes.
2. Where stored file URLs are persisted/served from in existing features.
3. Env variable usage for provider endpoints/credentials (never values).

## Validation

- Upload/download paths respect type/size restrictions and ACL intent (public vs private).
- No hardcoded endpoints, bucket names, or credentials anywhere.
- Failure of storage calls surfaces through shared error handling with translated messages,
  not raw SDK errors.

## Common Failure Modes

- Assuming AWS-specific features (presigned policies, IAM roles) exist on the S3-compatible target.
- Public/private ACL mix-ups exposing private uploads.
- Large-upload memory pressure from misconfigured limits.
- Provider outage treated as code bug because error handling was never designed.

## Anti-Patterns

- Multi-cloud abstraction layers over a single real provider.
- Hardwiring provider SDK types into domain/application layers.
- Assuming Kubernetes/serverless platforms from generic best-practice lists.
- Storing credentials in frontend-served configuration.

## Engineering Expectations

The engineer knows exactly which external services are real, treats their boundaries with
the same rigor as the database, and refuses to design around services the project has not chosen.

## Definition of Done

- Storage/cloud-affecting changes verified against the live-compatible adapter config;
  zero fabricated providers; exposure/ACL semantics explicitly checked.
