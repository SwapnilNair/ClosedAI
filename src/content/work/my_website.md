---
title: "The ClosedAI website"
status: "In progress"
description: "A little piece of the internet real-estate of my own. Building this to express personal thoughts and get in touch with a now dwindling art form of writing long prose."
---

Sentinel is a middleware layer for LLM APIs that detects prompt injection attempts in real time. It uses a combination of semantic distance scoring — comparing the embedding of the original task against the model's inferred intent post-input — and canary token monitoring to catch exfiltration patterns.

The core challenge is the signal-to-noise problem: real users also type things that look like injections. Sentinel maintains per-user and per-session baselines to distinguish genuine anomalies from benign edge cases.
