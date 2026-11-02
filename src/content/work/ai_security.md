---
title: "AIOStack by Aurva"
slug: "aiostack"
status: "Building"
summary: "A runtime security and observability layer for AI agents, models, identities, endpoints, and data flows in cloud environments."
year: "2025—now"
role: "AI security lead"
domains: ["AI security", "eBPF", "cloud identity"]
evidence: ["Zero application code changes", "Runtime and cloud control-plane signals", "Self-hosted deployment model"]
stack: ["Go", "eBPF", "Kubernetes", "Cloud APIs"]
featured: true
order: 1
externalUrl: "https://github.com/aurva-io/ai-observability-stack"
---

## Context

AI workloads create a security surface that does not fit neatly inside application logs. Agents call models, assume identities, reach external endpoints, and touch sensitive data across several infrastructure layers. The challenge is to reconstruct that behavior without requiring every application team to instrument its code correctly.

## What I own

I lead AI-security development at Aurva, working across problem definition, system design, implementation, product iteration, and customer conversations. The work spans runtime discovery, identity correlation, endpoint inventory, data-flow analysis, and the explanations presented to security teams.

## System and decisions

AIOStack combines runtime observations from Linux and Kubernetes with read-only cloud metadata. eBPF supplies the view from below; cloud APIs enrich it with identities, roles, policies, and managed AI services. The product correlates those signals into a graph of applications, models, identities, endpoints, and data sources.

The important design constraint is non-intrusiveness. Applications should not require SDK changes, proxies, or sidecars just to become visible. That pushes complexity into protocol handling, attribution, correlation, and the evidence attached to every finding.

## Outcome

The result is a self-hosted observability and security layer designed to surface shadow AI, identity drift, sensitive data flows, and reachable blast radius while keeping the deployment inside the customer's environment.

## What remains hard

Attribution across short-lived workloads, encrypted traffic, and changing cloud identities is never a one-time parsing problem. The system has to remain explicit about confidence, missing evidence, and the difference between granted access and observed behavior.
