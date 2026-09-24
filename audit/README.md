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
| `workbook.md` | The audit workbook. **Currently the tail only (§6.2–§9)** — the first synthesis pass returned a truncated final message and §1–§6.1 were lost. A repair pass regenerates them as `workbook-front.md`. |
| `workbook-front.md` | §1–§6.1: executive summary, scorecard, the m./www decision, findings by priority, risk register, May 14 cliff diagnosis, AEO content plan, GEO access plan. |
| `critic.md` | An independent completeness critique of `workbook.md`. Strong and worth reading in full — it caught the truncation, and flagged real gaps the audit missed (off-page authority never measured, the May 14 cliff never diagnosed, CrUX/PageSpeed APIs available but unused, email deliverability never audited, the roadmap running through Q4 peak with no change-freeze). |
| `findings.json` | All 94 unverified findings, with severity, evidence, proposed fix, effort and `needs_live_fetch`. |
| `benchmark.json` | 30 AI-visibility prompts scored: brands cited, rank, citation sources, winning page pattern. |

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
