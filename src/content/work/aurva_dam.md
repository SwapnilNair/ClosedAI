---
title: "AIDA by Aurva"
slug: "aida"
status: "Shipped"
summary: "Real-time, non-intrusive database activity monitoring across more than twenty database variants and heterogeneous cloud environments."
year: "2024—2025"
role: "Core systems engineer"
domains: ["data security", "protocols", "runtime"]
evidence: ["20+ database variants", "APAC and EMEA deployments", "Cloud-agnostic monitoring"]
stack: ["Go", "eBPF", "Protocol FSMs", "Kubernetes"]
featured: true
order: 2
---

## Context

Database activity monitoring usually forces a compromise between coverage, deployment friction, and useful context. Enterprise environments make that worse: several database engines, managed services, encrypted connections, and different operational constraints can coexist in the same estate.

## What I owned

I worked across the data-security stack, including protocol parsing, runtime collection, database coverage, and the production behavior needed for enterprise deployments. A central part of the work was implementing finite-state machines for database wire protocols rather than relying on application-level instrumentation.

## System and decisions

The system observes database activity non-intrusively and decodes supported protocols into security-relevant events. Protocol state machines have to tolerate partial frames, connection reuse, authentication phases, and engine-specific behavior while keeping the hot path bounded.

Coverage is treated as a product capability rather than a checklist. Adding a database variant requires accurate parsing, stable resource attribution, useful query context, and failure behavior that does not disrupt the monitored workload.

## Outcome

AIDA supports more than twenty database variants and is used in enterprise environments across APAC and EMEA, including financial-services deployments where reliability and deployment constraints are part of the product requirement.

## What I learned

The difficult part of infrastructure software is rarely the happy-path parser. It is designing bounded behavior around malformed, fragmented, encrypted, or unfamiliar traffic while giving operators enough evidence to understand what the system could and could not observe.
