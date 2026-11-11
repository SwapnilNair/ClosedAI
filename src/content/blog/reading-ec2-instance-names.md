---
title: "Making sense of EC2 instance names"
description: "How I remember what the letters mean and work out vCPUs and memory without opening another tab."
publishedAt: 2026-11-10
topics: ["AWS", "Infrastructure"]
featured: false
draft: false
---

AWS instance names have a way of looking familiar long before they become particularly informative. You can spend quite a while looking at `m6a.2xlarge` in a console or a Terraform file, recognise it as a perfectly reasonable thing to run a service on, and still need another tab to remember how much CPU and memory you have actually asked for.

I wanted a way to read these names and immediately picture the machine, without trying to memorise the entire EC2 catalogue, which seems like a fairly unreasonable use of anybody's brain. The shortcut I find useful is that, for the ordinary C, M, and R instances, the size gives you the vCPU count and the family gives you the memory per vCPU.

**Remember that an xlarge has 4 vCPUs, and C, M, R usually give you 2, 4, 8 GiB per vCPU.** There are exceptions, because apparently we cannot have nice things without a footnote, but that gets you surprisingly far.

## The name is doing several jobs

Take `m6a.2xlarge`, which becomes much less mysterious once you split it into its parts:

| Part | What it tells you |
| --- | --- |
| `m` | General-purpose series |
| `6` | Sixth generation within that series |
| `a` | AMD processor option |
| `2xlarge` | Instance size, twice an xlarge |

The generation number belongs to the EC2 family; it is neither the number of cores nor the processor manufacturer's generation number. In the processor suffix, `a` means AMD, `i` means Intel, and `g` means AWS Graviton, which is Arm-based. Position matters: the `g` in `m7g` describes the processor, whereas a name beginning with `g` belongs to the graphics-intensive series. AWS keeps the full mapping in its [instance naming reference](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html).

For the capacity calculation on this particular instance, you can set `6a` aside for a moment and concentrate on `m` and `2xlarge`.

## The bit worth remembering

I remember the three families as **compute, mixed, and RAM**, with “mixed” simply being a convenient way to remember that M is the balanced, general-purpose option. These are memory aids, rather than a claim that AWS officially expands every letter that way.

| Family | Memory aid | Usual memory per vCPU |
| --- | --- | --- |
| C | Compute | 2 GiB |
| M | Mixed | 4 GiB |
| R | RAM | 8 GiB |

For standard variants following this pattern, the size ladder looks like this. Memory values are in GiB throughout; a GiB is 1,024 MiB.

| Size | vCPUs | C memory | M memory | R memory |
| --- | ---: | ---: | ---: | ---: |
| medium | 1 | 2 | 4 | 8 |
| large | 2 | 4 | 8 | 16 |
| xlarge | 4 | 8 | 16 | 32 |
| 2xlarge | 8 | 16 | 32 | 64 |
| 4xlarge | 16 | 32 | 64 | 128 |
| 8xlarge | 32 | 64 | 128 | 256 |

Not every family offers every size, particularly `medium`, so this is a way to understand a size that exists, rather than a promise that AWS sells every combination. The underlying specifications are in AWS's [compute](https://docs.aws.amazon.com/ec2/latest/instancetypes/co.html), [general-purpose](https://docs.aws.amazon.com/ec2/latest/instancetypes/gp.html), and [memory-optimised](https://docs.aws.amazon.com/ec2/latest/instancetypes/mo.html) tables.

For `m6a.2xlarge`, two times four gives us **8 vCPUs**, and M's four GiB per vCPU gives us **32 GiB of memory**. For `r7g.4xlarge`, four times four gives us **16 vCPUs**, and R's eight GiB per vCPU gives us **128 GiB**. Once you have done that a couple of times, the names start carrying rather more information than “one of the bigger ones”.

It also makes comparisons easier to think through. At the same `xlarge` size, a standard C instance gives you 4 vCPUs and 8 GiB, M gives you 4 and 16, and R gives you 4 and 32, so moving between those families changes the memory budget without necessarily changing the vCPU count. That is a useful starting point when a service needs more memory but you are not trying to give it more CPU.

## T instances have their own little arrangement

The place where this shortcut is most likely to trip somebody up is a small T instance, because `medium` does not mean the same vCPU count as it did in the table above. For **T3, T3a, and T4g**, memory doubles at each step while the vCPU count stays at two all the way from `nano` through `large`.

| Size | vCPUs | Memory (GiB) |
| --- | ---: | ---: |
| nano | 2 | 0.5 |
| micro | 2 | 1 |
| small | 2 | 2 |
| medium | 2 | 4 |
| large | 2 | 8 |
| xlarge | 4 | 16 |
| 2xlarge | 8 | 32 |

These counts are listed on the [T3/T3a](https://aws.amazon.com/ec2/instance-types/t3/) and [T4g](https://aws.amazon.com/ec2/instance-types/t4/) pages. Keep the scope of that table in mind: it is not a table for every historical T generation.

I think of T as “temporary turbo”, because the important distinction is its burstable CPU model. A T instance has a baseline level of CPU performance and uses credits to go above it, so seeing two vCPUs does not mean you should budget for two vCPUs running flat out indefinitely at the base price. In Standard mode, exhausting the accumulated credits brings performance back towards the baseline; Unlimited mode allows continued bursting using surplus credits, which can incur additional charges. AWS explains the accounting in its [CPU credit guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-credits-baseline-concepts.html).

That is why a `t3a.xlarge` and an `m6a.xlarge` can both say 4 vCPUs and 16 GiB while still being quite different choices for a sustained workload. The capacity numbers are only part of what you are buying.

## Please do not quietly turn vCPUs into cores

There is another small distinction that becomes rather less small when you are comparing machines: everything we have calculated so far is a **vCPU count**, and a vCPU is not always a physical core.

With simultaneous multithreading, a core exposes multiple hardware threads, each of which can appear as a vCPU. An `m6i.2xlarge`, for example, has 8 vCPUs across 4 physical cores by default, whereas an `r7g.4xlarge` has 16 vCPUs across 16 Graviton cores. You cannot safely turn this into “divide by two for x86”, either: `m7a.2xlarge` has 8 vCPUs across 8 cores. The [general-purpose](https://docs.aws.amazon.com/ec2/latest/instancetypes/gp.html) and [memory-optimised specifications](https://docs.aws.amazon.com/ec2/latest/instancetypes/mo.html) list the topology explicitly.

AWS also lets you change core counts or threads per core on supported types through [CPU options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-optimize-cpu.html), which means the name describes the default configuration rather than necessarily telling you what a particular running machine exposes. Equal vCPU counts are useful for orientation, but they are not a benchmark.

## The extra letters deserve a look

Once you start meeting longer names, it helps to recognise a few more suffixes: `d` indicates instance-store volumes, `n` indicates network and EBS optimisation, and `z` indicates high CPU frequency. The meaning of `e` depends on the family, so it is a particularly good reason to check the [naming reference](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html) rather than inventing an expansion that happens to sound plausible.

Some variants also break the memory arithmetic. A `c5n.xlarge` has 4 vCPUs but **10.5 GiB**, rather than the 8 GiB our C shortcut would predict, as the [C5n specifications](https://docs.aws.amazon.com/ec2/latest/instancetypes/co.html) show. GPU instances, high-memory machines, and bare-metal sizes deserve their own lookup too; I would rather remember a small rule with a clear boundary than keep stretching it until it becomes wrong.

## When I do open another tab

For comparing instances, I actually quite like [Vantage's instance comparison site](https://instances.vantage.sh/), which lets me put the options next to each other instead of bouncing between AWS pages and trying to remember what the previous one said. I've found their information pretty up to date, and it is especially handy for the GPU families, whose nomenclature I don't normally touch and have made absolutely no attempt to memorise.

Apparently the recommended way to look these up is through the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-instance-types.html), although I never actually use it for this. Feel free to do so :)

```sh
aws ec2 describe-instance-types \
  --region ap-south-1 \
  --instance-types m6a.2xlarge r7g.4xlarge t3a.medium \
  --query 'InstanceTypes[].{Type:InstanceType,vCPUs:VCpuInfo.DefaultVCpus,Cores:VCpuInfo.DefaultCores,ThreadsPerCore:VCpuInfo.DefaultThreadsPerCore,MemoryMiB:MemoryInfo.SizeInMiB,Architecture:ProcessorInfo.SupportedArchitectures[0]}' \
  --output table
```

The point of remembering this is to make an instance name useful when it appears in a conversation, a dashboard, or a pull request, so you can spend your attention on whether the machine suits the workload. For the common cases, “xlarge is four, C/M/R is two/four/eight” gets me there quickly enough, and leaves a little more room in my head for whatever the service running on it has decided to do today.
