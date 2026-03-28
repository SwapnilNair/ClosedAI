---
title: "Prompt Injection at Scale: What Production Actually Looks Like"
date: 2026-03-28
tag: "Security"
description: "Everyone talks about prompt injection in demos. Nobody talks about what it looks like when you have 3000 requests per hour and a model that's been told to be helpful at all costs."
---

Everyone talks about prompt injection in demos. Nobody talks about what it looks like when you have 3000 requests per hour and a model that's been told to be helpful at all costs.

## Assumptions, assumptions, assumptions

In a controlled research environment, prompt injection is a neat puzzle. In production, it's a noise problem disguised as a security problem. The signal is buried under legitimate edge cases, multilingual inputs, copy-pasted content, and users who just type weird things — trust me, this is a thing.

The typical detection approach — "look for instruction-like text in user inputs" — doesn't hold up because users say things like "ignore the previous formatting" or "ignore your previous output" all the time, for completely legitimate reasons. And they routinely paste system prompts from public repos and social media. Can't blame them; they're just trying to get their work done.

## Sometimes you've just gotta listen

I initially assumed prompt injection would be the single most important problem for enterprises, and spent about a week building a multi-step acyclic graph evaluator with its own grammar to describe detection steps. When it successfully caught popular attacks like DAN, I was convinced I had something.

Then I asked my CTO (a former CISO) what he thought. His first questions: how does this scale? If you're routing practically every prompt through an LLM evaluator, that's a serious cost concern. And more pointedly: are we treating symptoms instead of the cause? Is prompt injection actually a problem enterprises are willing to pay to solve?

This is where I started questioning if I should head for the Himalayas.

## What I now think we as an industry should be doing

After some reflection and talking to a couple of friend, the following is currently on my mind :

- Prompt injection is a real problem, but perfect detection isn't the goal. Nobody achieves 100% detection - the bar is catching the 99th percentile of real attacks while keeping false positives low enough that on-call engineers don't start ignoring alerts.

- Capping blast radius matters more than detection coverage. Leash the dog so it can't bite anything, rather than dog-proofing everything in your house. Restricting what an agent can actually do is a more durable defence than trying to sanitise every possible input.

- Behavioural baselines are underrated. Injections often manifest as behavioural drift — an agent suddenly doing something outside its normal pattern. Monitoring for that is tractable in a way that input-level detection often isn't.

## Final thoughts

Most of the prompt injection vulnerabilities reported in bug bounties wouldn't survive contact with a real production environment. The ones that do work are significantly more sophisticated than anything in the research literature, because attackers iterate on production systems while researchers iterate on benchmarks.

The only real way to disincentivise prompt injection is to reduce the blast radius and raise the effort cost to the point where it's no longer worth the attacker's time. 

Also a good lesson on validating the problem before jumping ahead to solving it. My product development professors would have a hearty laugh at this. Someday I can tell this to the junior batches as an example of what not to do.

---

If you have thoughts on this, I'd genuinely like to hear them.
Mail me at <u>swapnilnair747@gmail.com</u> or <u>swapnil.nair@aurva.io</u> so that I can give you my contact number