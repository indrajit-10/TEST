# 123greetings.com — AEO / GEO / SEO audit

Generated 2026-09-23 from a 33-agent workflow run (`wf_d88ae8a0-187`).

## Read this before using any finding

**The findings in this directory are leads, not confirmed problems.**

101 findings were produced across seven audit lenses. The run was configured
"lean", which sent only the single most severe finding per lens to a
three-skeptic adversarial panel — **7 findings tested out of 101.**

**All 7 were refuted.**

The 94 findings in `findings.json` are therefore exactly the 94 that were never
challenged. They carry `votes_total: 0` and
`verifier_notes: "NOT ADVERSARIALLY VERIFIED"`. They survived by not being
tested, and the only sample that was tested had a 100% failure rate. Treat that
as the prior for the rest.

Two separate causes, which should not be conflated:

1. **A methodology artifact.** The verifier agents exhausted a 200-call
   WebSearch budget before running their own queries, and their prompt told them
   to default to `refuted` when uncertain. Several refutations say so explicitly.
   Those refutations are not evidence the finding was wrong.
2. **Genuinely correct refutations.** Three examples worth knowing:
   - A SERP title is not proof of a page's `<title>`. Findings that inferred a
     root cause (e.g. "a null card-name field") from indexed titles alone could
     equally be explained by a redirect, a soft-404 or a retired card. That
     alternative was never excluded.
   - `support.google.com/merchants/answer/7052112` governs Merchant Center
     *feeds*, not on-page `Product` structured data. A schema finding cited it
     as proof of a policy violation. Wrong document.
   - A "terms of use revokes the AI crawl licence" finding required AI crawlers
     to fetch and parse a ToS page. They do not. The mechanism does not exist.

## Known limitations of this run

- **The site was never fetched.** The sandbox egress policy blocked every
  `123greetings.com` host for the entire run. Every observation is derived from
  the search index (titles, URLs, snippets), from a `<head>` source pasted into
  the session, and from a sitemap fetched in an earlier session. Anything marked
  `needs_live_fetch` is unconfirmed.
- **No Google Search Console, no GA4, no crawl export, no Bing AI Performance
  data.** Prevalence is unknown for every finding — nine affected URLs or nine
  thousand cannot be distinguished.
- **No m. page source, ever.** Every claim about the mobile templates — the host
  Google actually mobile-first indexes — is inferred from indexed titles and
  URLs only. This is the largest single unknown.
- **The benchmark is a grounded proxy, not live engine output.** Prompts were run
  as real searches and scored on what an AI answer would be built from. No
  query was made to ChatGPT, Claude, Perplexity, Gemini or Copilot.

## Files

| File | What it is |
|---|---|
| **`workbook-full.md`** | **Start here.** The stitched workbook, §1–§9. One marked gap at the §6.2 seam (see below). |
| `workbook.md` | Raw tail (§6.2–§9) from the first synthesis pass, which returned a truncated final message. Kept for provenance. |
| `workbook-front.md` | Raw front half (§1–§6.1) from the repair pass. Kept for provenance. |
| `critic.md` | An independent completeness critique of `workbook.md`. Strong and worth reading in full — it caught the truncation, and flagged real gaps the audit missed (off-page authority never measured, the May 14 cliff never diagnosed, CrUX/PageSpeed APIs available but unused, email deliverability never audited, the roadmap running through Q4 peak with no change-freeze). |
| `findings.json` | All 94 unverified findings, with severity, evidence, proposed fix, effort and `needs_live_fetch`. |
| `benchmark.json` | 30 AI-visibility prompts scored: brands cited, rank, citation sources, winning page pattern. |

## One known gap in `workbook-full.md`

The truncation destroyed the opening of §6.2, all of §6.2.1, and **Tier 1 of the
PR target list**. That gap is marked in place and was **not** reconstructed —
only one Tier 1 row was recoverable from `findings.json`. Regenerate §6.2.1 from
`pr-target-list`, `review-platform-fragmentation`,
`brand-confusion-123cards-contaminates-reputation`,
`third-parties-own-the-brand-facts` and `trustpilot-keyed-to-www-only` before
circulating the document externally.

## A correction carried into this run

An earlier reading of the indexed URL patterns concluded that `www` and `m.`
"share no taxonomy" — `www` using slugs (`/birthday/happy_birthday/birthday191.html`)
and `m.` using numeric IDs (`/do/card/120478`). **That was wrong.** A
`site:www.123greetings.com/do/card` probe returns indexed `www` numeric URLs:
`/do/card/330206`, `/do/card/101364`, `/do/card/101633`, `/do/card/101672`.

`www` serves the numeric namespace too, so a single card has at least three
indexable URLs — `www` slug, `www` numeric, `m.` numeric — plus the mirror-host
copies. That is same-host duplication, which is a materially worse problem than
the cross-host pairing originally described, and no prior-work ticket covers it.
It is finding `www-serves-do-card-numeric-namespace` (P0-1).

The same probe shows the generic-homepage-title bug is **not** m.-only:
`www/do/card/330206` carries the homepage title and `www/do/card/101633` has the
title `card`.

## Headline numbers

| Metric | Value | Caveat |
|---|---|---|
| Findings produced | 101 | |
| Findings adversarially tested | 7 | all refuted |
| Findings carried through untested | 94 | |
| Benchmark prompts where the brand is named | 16 / 30 | inflated by brand-name queries |
| Prompts citing a 123greetings-owned page | ~1 in 3 | the metric that matters |

On several prompts the brand is named with no URL retrieved at all — encoded in
parametric memory as the default no-signup ecard site, but with nothing citable
behind it. Strict-grounding engines drop exactly those mentions.

## Next inputs that would most change the findings

1. An m. card page view-source. It is the indexed template and it has never been seen.
2. `robots.txt` for both hosts — determines whether citation crawlers can reach the site at all.
3. Google Search Console verification on both hosts. Resolves prevalence for nearly every finding, and its 16-month history covers the May 14 cliff retroactively.
4. A crawl export (Screaming Frog free tier covers 500 URLs), run once with JS rendering off and once on. The diff between the two runs is itself the AI-crawler visibility answer.
