---
title: "Making sense of GCP instance names"
description: "How I remember what the names mean and work out vCPUs and memory without opening another tab."
publishedAt: 2026-11-11
topics: ["GCP", "Infrastructure"]
featured: false
draft: false
---

After working through [AWS's instance naming convention](/blog/reading-ec2-instance-names), I wanted to do the same for Google Cloud, partly because switching between clouds seems to involve remembering several slightly different ways to describe what is ultimately still a machine with some CPU and memory. It would have been convenient if everyone had agreed on one convention, but presumably that would have made infrastructure conversations too straightforward.

GCP does at least spare us the business of translating `xlarge` into a CPU count. With a name like `n2-standard-8`, the eight really does mean eight vCPUs, which is a small kindness I appreciate. The part that still needs some attention is the memory, because `standard` and `highcpu` describe a configuration within a particular machine series, rather than a universal ratio that applies to everything Google sells.

**Read the series first, take the vCPU count from the size, and use the memory profile to finish the calculation.** That gets you through the common predefined types, with custom machines and shared-core instances getting their own rules.

## Most of the name is fairly literal

The useful way to split `n2-standard-8` is into three pieces:

| Part | What it tells you |
| --- | --- |
| `n2` | The N2 machine series |
| `standard` | Its balanced memory configuration |
| `8` | Eight vCPUs |

The `2` belongs to the series name; it does not contribute to the CPU count. Google's [machine family guide](https://docs.cloud.google.com/compute/docs/machine-resource) separates the broad family, the series within it, and the individual machine type, which is useful terminology when a conversation starts using “family” to mean three different things.

I would also resist translating AWS's letters directly. Google places C3 and C4 in its general-purpose family, despite what an AWS-trained brain might expect from the C, and the processor suffixes differ too: N2D uses AMD, while C4A uses Google's Arm-based Axion processors. The series is worth learning as a whole before trying to treat every letter as a portable code.

## Start with one memory ladder

For **E2, N2, and N2D predefined machines**, the useful ladder is **1, 4, 8 GiB per vCPU** for `highcpu`, `standard`, and `highmem`, respectively. I remember that as one for CPU-heavy work, four for the balanced option, and eight when memory matters more.

| Machine type | vCPUs | Memory (GiB) |
| --- | ---: | ---: |
| `n2-highcpu-8` | 8 | 8 |
| `n2-standard-8` | 8 | 32 |
| `n2-highmem-8` | 8 | 64 |
| `e2-standard-4` | 4 | 16 |
| `n2d-highmem-16` | 16 | 128 |

These are the predefined configurations in Google's [general-purpose specifications](https://docs.cloud.google.com/compute/docs/general-purpose-machines). I use GiB here to match the binary memory quantities shown in the [pricing tables](https://cloud.google.com/products/compute/pricing/general-purpose), even though some Compute Engine documentation labels its memory columns GB.

The word `highcpu` can initially sound as though it ought to give you more processors, but at the same size it is the memory allocation that changes. All three N2 examples ending in eight have eight vCPUs; you are choosing how much memory accompanies them, which is a rather more useful way to think about the name when sizing a service.

## Highcpu is where I would check the series again

The convenient 1/4/8 ladder is not universal. **C3 and N4 use 2/4/8 GiB per vCPU** for their ordinary `highcpu`, `standard`, and `highmem` configurations, so copying the N2 calculation across would leave you underestimating the memory on a highcpu machine.

| Machine type | vCPUs | Memory (GiB) |
| --- | ---: | ---: |
| `n2-highcpu-8` | 8 | 8 |
| `c3-highcpu-8` | 8 | 16 |
| `n4-highcpu-8` | 8 | 16 |
| `c3-standard-8` | 8 | 32 |
| `c3-highmem-8` | 8 | 64 |

The [series tables](https://docs.cloud.google.com/compute/docs/general-purpose-machines) make that difference explicit. Older N1 machines introduce another set of ratios: `n1-standard-8`, for example, has 30 GiB rather than 32, as listed in the [N1 pricing specifications](https://cloud.google.com/products/compute/pricing/general-purpose).

I would learn the ratios for the series I actually use and leave the rest to a lookup, because a mnemonic that needs six qualifications before you can use it is starting to resemble the documentation it was supposed to save you from opening.

## Custom machines put the memory in the name

Custom machine types are quite satisfying once you know what you are looking at, because a name like `n2-custom-8-24576` tells you the allocation directly: N2, eight vCPUs, and 24,576 MiB of memory, which is **24 GiB**. There is no profile multiplier to remember, just a division by 1,024.

That is useful when the predefined choices do not match the workload. Eight vCPUs with 24 GiB sits between N2's highcpu and standard options, allowing you to describe the allocation you want without pretending that every service happens to need one of three neat ratios. Google's [custom machine guide](https://docs.cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type) documents the naming format, supported series, and allowed CPU and memory increments.

The limits still matter, so you cannot make an arbitrary machine valid simply by typing two numbers after `custom`. You may also see an `-ext` suffix for extended memory on supported series, which is the point where I would check the series-specific limits instead of continuing to improvise.

I would also compare the price against simply going up to the next predefined size, because getting exactly the resources you want does not necessarily mean paying less. Google's [custom-machine pricing](https://cloud.google.com/products/compute/pricing/general-purpose) includes a 5% premium on the on-demand resource rates, so when your custom configuration is close to a predefined one, you can end up paying more for less machine. Extended memory has its own higher rates too, which makes that comparison especially worthwhile. Custom can still save money when it removes enough unused capacity; I just wouldn't assume that a more precise fit automatically produces a smaller bill.

## The small E2 machines need a separate explanation

`e2-micro`, `e2-small`, and `e2-medium` are shared-core types, where the number of vCPUs visible to the guest and the sustained CPU time available to it need to be considered separately.

| Predefined type | Visible vCPUs | Sustained vCPU equivalent | Memory (GiB) |
| --- | ---: | ---: | ---: |
| `e2-micro` | 2 | 0.25 | 1 |
| `e2-small` | 2 | 0.5 | 2 |
| `e2-medium` | 2 | 1 | 4 |

Google's [vCPU explanation](https://docs.cloud.google.com/docs/compute-area/vcpus) describes the time-sharing model, while the [E2 specifications](https://docs.cloud.google.com/compute/docs/general-purpose-machines#e2_shared-core) list the predefined memory allocations. These machines can burst, but the two visible CPUs are not a promise of two continuously busy vCPUs, so I would not size a sustained workload from what the guest reports alone.

The distinction is similar to the question we had to ask about small AWS T instances, although importing AWS's credit model would be taking the analogy further than it deserves.

## A vCPU is still not necessarily a core

N2 and N2D normally expose two hardware threads per physical core, so an eight-vCPU machine has four cores' worth of that topology. Tau T2D and T2A, on the other hand, expose one vCPU per physical core, including T2D's AMD processors. Google's [architecture table](https://docs.cloud.google.com/docs/compute-area/vcpus) is a useful reminder that “x86 means divide by two” is not a reliable rule.

That matters when comparing machines across series or providers, because two names containing the same CPU count are not promising the same amount of work per second. The count helps you understand the allocation; it does not spare you from measuring the workload.

## There are names I would simply look up

You may see suffixes such as `-lssd` for configurations with local SSDs and `-metal` for bare-metal machines. GPU types have their own conventions, so I would not carry the assumption that the final number counts vCPUs into every accelerator name. Google's [machine resource guide](https://docs.cloud.google.com/compute/docs/machine-resource) is the place to check those boundaries rather than trying to extend the everyday naming pattern indefinitely.

As with AWS, I like having the options next to each other, and [Vantage has a GCP comparison page](https://instances.vantage.sh/gcp) too. It is a convenient place to compare the configurations once the names have given you a rough idea of what you are looking for.

If you prefer to ask Compute Engine directly, the [`gcloud` command](https://docs.cloud.google.com/sdk/gcloud/reference/compute/machine-types/describe) can describe a machine type in a particular zone:

```sh
gcloud compute machine-types describe n2-standard-8 \
  --zone=us-central1-a \
  --format='table(name,guestCpus,memoryMb)'
```

The main thing I want to remember is that the size usually saves me the CPU arithmetic, while the series tells me how to interpret the memory profile. Once that becomes familiar, `n2-highmem-16` starts looking like a fairly readable description of a machine, and I can get back to worrying about why the application wants that much memory in the first place.
