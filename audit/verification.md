# Verification adjudication — 19 critical findings, 123greetings.com

Reviewed 2026-09-24. Nineteen independent investigators each verified one critical finding.
This pass reads their verdicts **together**. Everything below is cross-finding: conflicts,
inflation, prevalence, and what a developer can actually do.

**Tally:** 3 CONFIRMED · 14 PARTIALLY_CONFIRMED · 2 UNVERIFIABLE · **0 REFUTED**

**Severity after verification:** 2 critical · 6 high · 5 medium · 6 unratable.
All 19 entered rated `critical`. **17 of 19 were downgraded.**

**The one-line judgement:** the pass did its job — it did not repeat the previous pass's
failure of recording "could not check" as "refuted," and its fix assessments are better
than the findings they assess. But it has a systemic prevalence blindness, two findings
were graded inconsistently against identical evidence, and **nobody tested whether a
Google-hosted renderer could read the blocked host for them. One is reachable from the
sandbox. Thirteen "egress-blocked, cannot read the canonical" verdicts were avoidable.**

---

## 1. Verdict table

| # | Finding | Verdict | Conf. | Sev. (was `critical`) | Corrected claim, in short |
|---|---|---|---|---|---|
| 1 | `www-serves-do-card-numeric-namespace` | PARTIAL | high | high | Same-host duplication proven for **2 cards**, not 30,000. Mechanism untested. |
| 2 | `m-facet-format-pagination-combinatorics` | PARTIAL | high | high ⚠ | Facet×pagination duplicates confirmed at 4 subcats. "6,000–12,000" is arithmetic, not evidence. |
| 3 | `h-source-duplicates-full-www-including-tags` | **CONFIRMED** | high | **critical** | Broad indexed mirror, competes in non-`site:` SERPs. Plus `m-source` **and a dev host**. |
| 4 | `dev-qc-environments-indexed` | **CONFIRMED** | high | **critical** | **Five** hosts, not four. `webqc` serves `/connect/login`. Understated. |
| 5 | `sitemap-covers-under-one-percent` | PARTIAL | medium | high | Denominator (30k+) confirmed; **numerator (135) never verified**. Omitted pages are already indexed. |
| 6 | `card-primary-type-videoobject` | PARTIAL | medium | medium | Observation untested. Causal claim **refuted** — industry-wide May 13–14 volatility event. |
| 7 | `aggregaterating-do-not-reintroduce` | PARTIAL | medium | medium | Normative claim fully confirmed. Premise (does the template emit it?) never observed. |
| 8 | `out-of-range-pagination-returns-200…` | PARTIAL | high | unratable | Title bug **confirmed**; "out-of-range" cause **refuted** by a counter-example at `/p/11`. |
| 9 | `card-pages-thin-content-30-words` | PARTIAL | medium | high ⚠ | Blog source corpus confirmed. "~30 words" and the JS mechanism **never measured**. |
| 10 | `spoke-title-template` | PARTIAL | high | medium | Symptom real. "Every winner uses the dual form" **refuted** — 4 of 18, all Hallmark/AG. |
| 11 | `megapage-split-spec` | PARTIAL | medium | unratable | Content gap confirmed. **The monolith's URL is wrong** — likely the blog homepage. |
| 12 | `robots-txt-ai-directives-unverified` | PARTIAL | high | unratable | The file was never read. This is a recommendation, not a diagnosis. |
| 13 | `card-body-js-only-thirty-words` | UNVERIFIABLE | medium | unratable | General AI-crawler premise confirmed & current. Site-specific half: zero evidence. |
| 14 | `brand-confusion-123cards…` | PARTIAL | high | unratable | Entity collapse **demonstrated live**. "Largely 123cards" **refuted** — mixed billers. |
| 15 | `no-organization-schema` | UNVERIFIABLE | high | medium | Observation untested; **"prerequisite for a Knowledge Panel" refuted**. Mislabelled verdict. |
| 16 | `ad-experience-is-the-citation-blocker` | PARTIAL | high | medium | Quotes verbatim-confirmed. "The" blocker **refuted** — roundups are competitor-authored. |
| 17 | `card-url-missing-slug-vs-competitor…` | PARTIAL | high | unratable | **Inference refuted** — a descriptive slug template already exists and ranks. Merge into #1/#8. |
| 18 | `every-competitor-is-responsive` | PARTIAL | high | high | 9/9 competitors have no indexed m. host (DNS-enumerated). "Responsive" untestable. |
| 19 | `vendor-published-listicle-flywheel` | **CONFIRMED** | high | high | Mechanic demonstrated live: vendor roundups fed the synthesized answer. |

⚠ = severity assigned to a claim whose load-bearing measurement was never taken. See §2.

---

## 2. Consistency — every conflict between verdicts

### C1. Findings 9 and 13 verify the *same claim* and disagree on severity

`card-pages-thin-content-30-words` and `card-body-js-only-thirty-words` are the same
underlying assertion: ~30 crawlable words, `Load_Video_Card` injecting into an empty div,
comments and Related/Latest client-loaded. Both investigators state plainly that the
measurement could not be run. One returned **PARTIALLY_CONFIRMED / high**, the other
**UNVERIFIABLE / unknown-without-prevalence**.

This is the sharpest inconsistency in the pass and it is not defensible in either
direction. Identical evidentiary state, opposite grades. **Finding 13's grade is the
correct one** and finding 9's `high` should be struck: the parts of #9 that *are* verified
(the blog corpus exists; card titles are near-boilerplate; two sampled cards have no
card-specific title at all) are real and valuable, but they are a different finding from
the word-count claim, and the word count is what the severity was assigned to.

### C2. Finding 6 supersedes finding 7 on the May 14 cliff, and nobody noticed

Both investigators checked the May 2026 update calendar. #7 found only the confirmed core
update (May 21 – June 2), concluded it "does not explain a May 14 breakpoint," and called
that *mildly favourable* to the schema attribution. #6 found what #7 missed: a documented,
tool-registered, cross-vertical volatility event on **May 13–14** that Google did not
confirm as an update, immediately preceding the core update.

#6's evidence directly removes the inference #7 drew from its absence. **Both findings'
May-14 attribution collapses.** Neither the Product/VideoObject dual-typing nor the
`aggregateRating` markup should be sold to the client as ranking recovery. Any fix that
ships under that banner will be judged against a recovery it cannot produce.

### C3. Finding 16 falsifies the disambiguation copy finding 14 proposes to publish

Finding 14 could not corroborate a 123Greetings paid product and left "~$5.99/yr ad-free
mobile app" flagged as uncorroborated. Finding 16 independently confirmed **123Greetings
Pro at $5.99/year** from the company's own public positioning, quoted verbatim.

Finding 14's proposed page — and this adjudication's own suggested rewrite of it — says
123Greetings *"is free and ad-supported, never asks for a credit card, and has no
subscription product."* **That sentence is false.** Publishing it on the brand's own domain
as a rebuttal to billing complaints would hand every complainant a documented
contradiction. The disambiguation copy must say: *free to send, ad-supported, with one
optional $5.99/year ad-free upgrade — and no trial, no auto-renewing annual membership, no
per-card charge.* That is both true and still cleanly separates the brand from the
trial-to-annual-billing vendors.

### C4. Findings 2, 8 and 12 prescribe mutually incompatible robots.txt policy

- **#2** prescribes `Disallow: /do/cards/*/s/`.
- **#8** shows `/s/videos/p/4`, `/s/postcards/p/1`, `/s/videos/p/2`, `/s/videos/p/11` are
  indexed **with correct, distinct, category-specific titles** — working facet hubs — and
  states that disallowing `/s/` would be *directly harmful*.
- **#12**'s paste-ready robots.txt already embeds `/do/cards/*/p/`-style Disallows,
  shipping #2's contested rule inside a file the client is told to paste wholesale.

Two independent investigators reached the anti-Disallow conclusion (#2's own fix
assessment also flags the orphaning risk and the noindex+canonical contradiction).
**Resolution: no `/s/` or `/p/` Disallow ships. `noindex,follow` on crawlable URLs is the
instrument.** And #12's file must not be pasted with those lines in it.

Note the evidence in #2 and #8 is *not* contradictory — `love_cute/s/gif/p/4` and
`love_cute/s/videos/p/8` genuinely share one title, while `insp_sympathy/s/videos/p/11`
carries its own. The title-duplication defect is **per-subcategory, not universal**, which
is itself a useful correction: something is failing per-template-instance, not per-route.

### C5. Findings 1 and 17 disagree on what `/do/card/<id>` even is, and 17 raises a hazard 1 ignores

#1 treats `/do/card/<id>` as a duplicate to be 301'd, effort "small," "a one-line route
change." #17 establishes that a descriptive canonical template (`/{occasion}/{subcat}/{slug}.html`)
already exists and ranks — then warns that `/do/card/<id>` is **plausibly the link embedded
in delivered e-card notification emails**, adjacent to the live `/do/viewecard` route.

If that is right, #1's "small" 301 breaks the product's core delivery flow at scale. #1's
fix carries no such caveat. **The two findings must be merged and the delivery-path audit
made a hard gate.** #1 separately flags a second ordering hazard — if the m. card page's
canonical targets the www *numeric* URL, shipping the www 301 first converts the entire
mobile card corpus into canonical-to-redirect chains.

### C6. Findings 3, 4 (and two untested siblings) are one problem, counted four times

#3 and #4 overlap heavily and each surfaced hosts the other missed: #3 found
`m-source.123g.us` and `m-src.dev.123g.us`; #4 found `h-source.123g.us`, which #3 was
verifying. `findings.json` holds two more —`two-more-non-canonical-hosts-indexed`
(`search.`, `media.`) and `dev-hosts-crawlable-and-citable` — both rated `high`, neither
tested.

Both investigators independently warned that the blanket `*.123g.us` lockdown could break
production, because `h-source`/`m-source` read as live origin hosts. **They converge on the
same operational rule and it should be lifted out as its own gating ticket.**

The host inventory grew with every probe run. Nobody has enumerated the zone.

### C7. Finding 5's downgrade rationale conflicts with finding 2's orphaning concern

#5 downgrades to `high` partly because "the omitted pages are already indexed, so sitemap
omission has not prevented discovery." But #2's fix assessment argues deep cards are
discoverable *mainly via facet listings*, which is why blocking them orphans inventory.
Both cannot be comfortably true. #5's evidence is a ~10-result sample that says nothing
about cards at facet depth 4–8. The honest position: shallow pages are demonstrably
discovered; deep ones are unmeasured, and a card-level sitemap is the cheap insurance
that makes the facet question moot.

### C8. Three independent objections to the same fix — VideoObject retyping

#6 (dishonest for GIF/animated cards; the 28s exemplar fails Google's 30s floor; the
`embedUrl` endpoint is invented), #7 (the sibling change is riskier than the
`aggregateRating` removal it ships with), and #13 (the player is JS-injected into an empty
div, so the markup would reference content not in the fetched DOM). `findings.json` holds a
fourth, `videoobject-main-content-risk`, saying the same thing.

**Four independent reads reject this fix. It should be struck from the roadmap, not
sequenced.** Nothing in the audit's structure propagates that rejection anywhere.

---

## 3. Verdict inflation and deflation

### Inflation — severity assigned to unmeasured magnitude

| Finding | The problem |
|---|---|
| **#9** `card-pages-thin-content` | `high` assigned to a word count that was never counted. See C1. Strike to unratable. |
| **#2** `m-facet-combinatorics` | Investigator writes "not a floor and not measured," then assigns `high`. The *pattern* is confirmed at 4 subcategories; the *severity* was imported from the 6,000–12,000 figure it just disowned. |
| **#1** `www-numeric-namespace` | `high` on 4 observed URLs against a claim of 30,000. Mitigated — route-level reachability is a fair inference — but the **indexed** count is what sets impact and is unknown. |
| **#5** `sitemap-under-one-percent` | `high` while the numerator (135) rests entirely on a prior session's fetch of a now-unreachable host. The ratio is unverifiable by construction until someone counts `<loc>`. |

### Deflation — hiding behind the egress block

Only one clear case, and it is a **labelling** failure rather than an effort failure.

**#15 `no-organization-schema` is mislabelled UNVERIFIABLE.** The investigator did real
work and *settled* two things: the third-party fact conflict is genuine (CB Insights
Mumbai vs Crunchbase/ZoomInfo/TheOrg New York), and — decisively — Google's own
documentation **refutes** the finding's load-bearing inference that Organization markup is
"the prerequisite for any Knowledge Panel" (Google's wording is *eligibility*, and "there
are no required properties"). A verdict of UNVERIFIABLE files all of that under "nothing
learned." It should read PARTIALLY_CONFIRMED with the inference refuted.

**#12 `robots-txt` failed to use evidence its siblings had already produced.** It reports
zero site-specific evidence. But six other investigators observed www, m., h-source,
m-source and the dev hosts returning results **with full title tags and snippets** —
which #3 and #4 correctly reason is the signature of a host that is *not* robots-blocked
and *not* noindexed. That inference was free and cross-applicable: robots.txt on www and
m. demonstrably does not block Googlebot from the main content paths. It says nothing
about `GPTBot`/`ClaudeBot` tokens, which is the actual claim — so the verdict survives —
but the finding should record what the index already proves rather than "zero evidence."

**#13 is honest, not evasive.** Its discriminating test (raw HTTP body vs rendered DOM) is
genuinely unreachable by any index probe, and the investigator correctly notes that a
*rendered* view would not discriminate either. Correctly graded.

### Best work in the pass, for calibration

**#8** (found a counter-example at `/p/11` that refutes the stated cause, and noticed the
finding's own corroborating URL was actually counter-evidence), **#10** (tallied all 18
SERP winners instead of reasoning from a 2-brand convenience sample, and found the fix
targets a title string that does not exist), and **#17** (asked whether the site already
had what it was accused of lacking — and it did). These three did what verification is
for: they looked for the thing that would make the finding wrong.

---

## 4. The prevalence problem — which findings cannot carry a severity at all

WebSearch here is a US-only, ~10-result API with **no result counts and no rank
positions**. It establishes existence. It cannot establish proportion, ever. Any finding
whose severity is a function of a count is therefore unratable until Search Console or a
crawl export exists.

**Unratable — the claim is a magnitude and the magnitude is unmeasured (11 of 19):**

1. `www-serves-do-card-numeric-namespace` — 4 observed, "every card / 30,000" claimed.
2. `m-facet-format-pagination-combinatorics` — ~6 observed, "6,000–12,000" claimed.
3. `sitemap-covers-under-one-percent` — the entire ratio; the numerator was never counted.
4. `out-of-range-pagination…` — investigator states this outright; the cause is also refuted.
5. `card-pages-thin-content-30-words` — the 30 and the 30,000 are both unmeasured.
6. `card-body-js-only-thirty-words` — same claim, same gap.
7. `card-url-missing-slug…` — "the entire 30,000-card corpus is anonymous," unsupported **in both directions**.
8. `brand-confusion…` — "largely" is a proportion; zero complaints were read.
9. `megapage-split-spec` — no query volume, no current positions.
10. `robots-txt-ai-directives-unverified` — no observation at all, let alone a count.
11. `ad-experience-is-the-citation-blocker` — ad complaints vs billing complaints is a ratio nobody measured.

**Ratable — severity does not depend on a count (5 of 19):**

- `h-source-duplicates-full-www` and `dev-qc-environments-indexed`. **One** indexed mirror
  homepage carrying the production title, or **one** indexed QC `/connect/login`, is
  already critical. Breadth was established; completeness is irrelevant to the grade.
- `every-competitor-is-responsive` — **the only finding in the pass with an enumerated
  denominator.** All nine competitors were DNS-resolved and the two that resolved were
  index-probed. This is what a sized finding looks like.
- `vendor-published-listicle-flywheel` — the mechanic was demonstrated live on the head
  query; the count of affected queries changes the size of the prize, not whether the
  problem is real.
- `spoke-title-template` and `aggregaterating-do-not-reintroduce` sit in between: the
  normative half is fully settled, the impact half is not.

**Consequence for the deliverable:** the workbook's headline numbers — "30,000 cards,"
"6,000–12,000 facet URLs," "under 1% sitemap coverage" — are all extrapolations from
assumed parameters. They should carry that label or be removed. A client who checks one of
them and finds it was arithmetic will discount the rest.

---

## 5. What survives — actionable today, no further access required

Ordered by value ÷ risk. Everything here is either verified in this pass or is a pure
repo/DNS action needing no egress.

### T1. Grep the codebase for mirror-host dependencies — **do this first**

```
grep -rn '123g\.us\|h-source\|m-source\|m-src\|webqc\|media\.123greetings\|search\.123greetings' \
  <app> <templates> <CDN config> <email templates> <cron>
```

Zero egress. This gates T2 and T3, and both #3 and #4 independently warn that skipping it
can take the production site down. `findings.json` and `critic.md` (A4) flag the same
thing. It is the cheapest high-consequence action in the whole audit.

### T2. Lock down `*.dev.123g.us` — confirmed, unambiguous, non-production

`www.dev.123g.us`, `m-src.dev.123g.us`, `webqc.dev.123g.us` are all confirmed indexed with
production titles; `webqc` exposes `/connect/login`. **Sequence matters:** serve
`X-Robots-Tag: noindex`, **leave the hosts crawlable** until the URLs drop out, *then*
lock down. A robots.txt Disallow or basic auth applied first blocks the crawl that is
required for Google to see the noindex, and the URLs linger indefinitely. Do **not**
extend the rule to `*-source.123g.us` until T1 returns.

### T3. Host-header-keyed 301 from the source mirrors to www — gated on T1

`h-source`, `m-source`, `m-src.dev`. Path parity is confirmed (`/tags/` and the full
category tree exist on both). The rule must key on the **incoming Host header**, never on
path, or a CDN origin pull from the same box becomes a redirect loop. Severity is real:
`h-source/tags/fun.html` was returned **alongside www in a query with no `site:`
operator** — the mirror competes in ordinary results.

### T4. Kill the homepage-title fallback in the m. and www templates — best value in the pass

Confirmed independently by five investigators (#1, #8, #9, #17, #18) across at least eight
URLs: `m./do/cards/birth_wishes/p/12`, `.../s/videos/p/14`, `m./do/viewecard`,
`m./do/card/352301`, `m./do/card/101651`, `www/do/card/330206`, `www/do/card/101633`
(title: the bare string `card`), plus two `/birthday/happy_birthday/` slug pages indexed
under the generic homepage title.

Give every route a unique title; never fall back to the homepage string. Add
self-referencing canonicals to paginated pages. **Zero deindexation risk, no content work,
and it is the one defect this pass proved rather than inferred.** Note it is *not*
pagination-depth-triggered — #8 refuted that — so fix the fallback, do not gate on page
number.

### T5. Delete `aggregateRating`; do not re-home it onto VideoObject/ImageObject

Fully confirmed against Google's documented closed type list. Markup-only, no UX change.
Two caveats to state up front: if cards currently earn star rich results, this is a
**deliberate, irreversible CTR cost**, not free cleanup; and it should ship **alone**, not
bundled with the VideoObject retyping (see T-NOT-1).

### T6. Enrich the Organization node — minus the address

Add `logo`, `description`, `alternateName`, and `sameAs`. All the `sameAs` targets were
verified real and correctly attributed: `crunchbase.com/organization/123greetings`,
Play `com.g123`, App Store `id718873921`. **Omit `address`, `foundingDate` and `founder`**
— three separate `high` findings (`hq-location-conflict`, `founding-year-conflict`,
`third-parties-own-the-brand-facts`) say those facts are in dispute, and hard-coding a
guess turns an unresolved conflict into a first-party machine-readable assertion that is
harder to retract than silence. Emit **one** canonical node referenced by `@id`, not N
duplicated blocks.

### T7. Build the four missing blog spokes — sympathy, wedding, graduation, retirement

Verified gap: four probes aimed squarely at these occasions returned **zero** blog posts,
while the birthday cluster demonstrably has nine. Pure additive build, no redirect, no
cannibalisation. **Use the existing `<occasion>-messages` slug convention**, not the
proposed `what-to-write-in-a-<occasion>-card` pattern — the blog already has a working
convention and a second one fragments it.

### T8. Add "What to Write in a \<Occasion\> Card" to spoke titles — **and keep the count**

The literal phrase is the real shared feature of the winner set (8/9 thank-you winners,
5/9 birthday winners). The *colon-joined dual form* and the *count removal* are not —
#1 for the birthday query carries a count in its title. Ship the hybrid, stage it to a
subset so attribution survives, and **leave the mega-page alone** (see B7 — the fix
targets a title string that is not in the index).

### T9. Publish an identity/affiliation page — with corrected copy

The entity collapse was demonstrated live: a query naming only 123Greetings returned
123Cards complaint pages, and the synthesized answer asserted charges that are not
123Greetings'. Publish first-party statements only — never assertions about a named
competitor's billing conduct, whose factual basis #14 showed is partly misattributed.
**And the copy must acknowledge Pro at $5.99/yr** (see C3). Title it as an identity page,
not a billing FAQ, or it will surface "charged"/"subscription" language on brand queries.

### T10. Publish comparison/roundup content — `ItemList` only, skip `FAQPage`

The flywheel is confirmed and the mechanic was demonstrated: vendor-owned roundups
populated the retrieval set for the head query and a competitor's self-ranking became the
answer's lede. Include honest criteria and real 123Greetings drawbacks, or the pages get
discounted as self-serving. **`FAQPage` is dead weight** — Google removed FAQ rich results
entirely on 7 May 2026.

### Do NOT ship — rejected by this pass

| | Why |
|---|---|
| **VideoObject retyping (#6)** | Four independent objections (C8). Invented `embedUrl`, sub-30s duration floor, dishonest for animated cards, JS-injected player. |
| **`Disallow: /do/cards/*/s/` (#2, #12)** | Two independent objections (C4). Those are working facet hubs with correct titles; Disallow also blocks the crawl needed to see any noindex. |
| **The wholesale robots.txt paste (#12)** | Overwrites a file nobody has read, silently deleting any existing exclusions, and mirrors an allow-all posture onto m. whose current policy is unknown. Read, diff, merge — never replace. |
| **301 `/birthday-messages/` → a new slug (#11)** | Forfeits an established, indexed, freshly-updated head page with a working child cluster, to gain a keyword string in a URL. |
| **Removing the count from spoke titles (#10)** | Trades a ranking they have for one they may not get. |
| **Any fix sold as "May 14 recovery" (#6, #7)** | The attribution collapsed (C2). |
| **`www/do/card/` 301 shipped alone (#1)** | Must ship with, or after, the m. canonical repoint — otherwise the whole mobile card corpus canonicals to a redirect. And gate on the email-delivery-path audit (C5). |

---

## 6. Consolidated blocked checks — ordered by findings unblocked

Work straight down. Counts are how many of the 19 each item settles or materially advances.

### B1. Google Search Console, verified on `www`, `m.` and `blog.` — **unblocks ~12**

Nothing else comes close. It resolves prevalence for #1, #2, #4, #5, #8, #9, #13, #17
simultaneously; its 16-month history covers the May 14 cliff retroactively for #6 and #7;
the Manual Actions panel settles the policy-exposure question the whole audit never asks;
and its robots.txt report partially settles #12. **The single most valuable action
available.** Screenshot Manual Actions and Security Issues first.

### B2. One card-page fetch, five greps — **unblocks ~8**

```
URL=https://www.123greetings.com/birthday/happy_birthday/birthday191.html
curl -sA "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$URL" > card.html
grep -A60 'application/ld+json' card.html          # → #6 #7 #13 #15  (Product? VideoObject? aggregateRating? Organization props?)
grep -iE 'rel="(canonical|alternate)"' card.html   # → #1 #5 #18
grep -coE 'Load_Video_Card|<video|poster=' card.html  # → #9 #13
sed -e 's/<script[^>]*>.*<\/script>//g' -e 's/<[^>]*>/ /g' card.html | tr -s " \n" " " | wc -w  # → #9 #13
grep -i '<title>' card.html                        # → #8 #17
```

Use **raw source, not the rendered DOM** — that distinction is the entire discriminating
test for #9 and #13, and a headless-browser view answers neither.

### B3. Three robots.txt fetches — **unblocks ~6**

```
for h in www.123greetings.com m.123greetings.com 123g.us; do curl -sS "https://$h/robots.txt"; done
```

Converts #12 from an unverified recommendation into either a confirmed critical defect or
a no-op. Grep for `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `Claude-SearchBot`,
`PerplexityBot`, `Google-Extended`, `Applebot-Extended`. While you have the pages, also
grep the templates for `noarchive|nocache|nosnippet` — that is the untested `high` finding
`bing-noarchive-nocache-audit`, and it silently kills Copilot and Apple citation.

### B4. The `/do/card/` canonical chain — **unblocks ~3, and gates a dangerous fix**

```
curl -sSIL https://www.123greetings.com/do/card/101364
curl -sSL  https://www.123greetings.com/do/card/101364 | grep -iE 'rel="canonical"|name="robots"'
curl -sSL  https://m.123greetings.com/do/card/101364   | grep -iE 'rel="(canonical|alternate)"'
```

The third line is the important one: **does the mobile canonical target the www numeric
URL or the www slug?** If numeric, #1's 301 must not ship first. Settles #1 and #17.

### B5. The mirror hosts' response state — **unblocks ~2, sizes two criticals**

```
for h in h-source.123g.us m-source.123g.us m-src.dev.123g.us www.dev.123g.us webqc.dev.123g.us; do
  curl -sSI "https://$h/"; curl -sS "https://$h/robots.txt"; done
curl -sS https://h-source.123g.us/tags/love.html | grep -i 'rel="canonical"'
```

The last line matters more than it looks: if the mirror already self-canonicalises to www,
the duplication is partly self-limiting and T3's urgency drops. If it self-canonicalises to
itself, it is worse than #3 says. **Then run a DNS/zone enumeration** — two investigators
each found a host the findings missed, which is direct evidence that search-based
enumeration is incomplete.

### B6. Sitemap count and the pagination boundary — **unblocks ~3**

```
curl -s https://www.123greetings.com/sitemap.xml | grep -c '<loc>'                       # → #5, settles the ratio
curl -s https://www.123greetings.com/sitemap.xml | grep -o '<lastmod>[^<]*' | sort -u | wc -l   # → 1 confirms synthetic lastmod
curl -sI https://m.123greetings.com/sitemap.xml                                          # → checked absence, not assumed
for n in 1 5 10 11 12 13 20 500 99999; do
  curl -s -o /dev/null -w "$n %{http_code} %{size_download}\n" \
    "https://m.123greetings.com/do/cards/birth_wishes/p/$n"; done                         # → #8, #2
```

The `n=99999` line is the whole crawl-trap premise: 200 with a rendered shell proves the
unbounded space, 404 kills it.

### B7. The two blog URL questions — **unblocks ~2**

```
curl -sSI https://blog.123greetings.com/what-to-write-in-a-card/
curl -sS   https://blog.123greetings.com/what-to-write-in-a-card/ | grep -iE '<title>|<h[12]'
curl -sS   https://blog.123greetings.com/ | grep -i '<title>'
```

#11's split spec is aimed at a URL that appears in **no index probe**, and the multi-occasion
content the index actually returns sits on the blog **homepage**. #10's mega-page rewrite
targets a title string the index does not show. Both fixes are pointed at the wrong page
until these three lines run.

### B8. A facet page's head, and one crawl export — **unblocks ~2, sizes several**

```
curl -sSL -A Googlebot https://m.123greetings.com/do/cards/love_cute/s/videos/p/8 \
  | grep -iE 'rel="canonical"|name="robots"'
curl -sI  https://m.123greetings.com/do/cards/love_cute/s/videos/p/8   # X-Robots-Tag
```

Then **Screaming Frog (free tier, 500 URLs), run twice on `/birthday/` — once with JS
rendering on, once off.** The word-count diff between the two runs is simultaneously the
answer to #9, #13, and the entire AI-crawler-visibility question. Nothing else produces
that number.

### B9. Not egress-blocked at all, and nobody ran it — **off-page authority**

Ahrefs / Semrush / Majestic / Moz referring-domain profile for www, m., blog, help, info,
studio. `critic.md` A1 flags this and notes explicitly that the sandbox excuse does not
apply — these are third-party tools. The audit uses "site-level authority" as its
explanation of last resort and never measures it. If referring domains are healthy, the
authority ceiling argument is wrong and the on-page work is under-prioritised. If they are
not, a large part of the content plan is unwinnable at any quality.

### B10. Lower priority, one finding each

- **#14:** export the complaint corpora (PissedConsumer, ComplaintsBoard, Trustpilot, BBB)
  and classify each billing complaint on **the merchant descriptor the complainant reports
  on their bank statement**. That field names the actual biller and needs no inference —
  it is the only thing that can settle "largely."
- **#16:** `curl -sL https://www.123greetings.com/ | grep -coE "googletag\.defineSlot|adsbygoogle|adpushup|taboola|unhideWindow"` and the same on a live `/do/viewecard/` URL. The **difference** between sender and recipient templates is the entire premise of the proposed fix and was never measured.
- **#18:** mobile-UA `curl -sI` against competitor www hosts, checking for `Vary: User-Agent`. Settles "responsive" vs "dynamic serving" — the word in the finding's title.
- **#19:** `curl -sL https://sendwishonline.com/en/articles/best-sites-for-ecards | grep -i -A5 "123greetings"` for the ordinal position inside each roundup.

---

## 7. What the pass missed

### M1. Nobody tried a Google-hosted renderer — and one is reachable from this sandbox

Thirteen investigators wrote some version of *"the canonical cannot be read, the host is
egress-blocked."* None tested whether a **third party could fetch the page for them**.

I tested it. `googleapis.com` **is reachable through the proxy**: the PageSpeed Insights
v5 API returned a real API response (HTTP 429, keyless-quota exhausted) — not an egress
rejection. With a free API key, PSI fetches the target URL **from Google's infrastructure**,
making the sandbox's block on `123greetings.com` irrelevant, and returns Lighthouse SEO
audits including:

- **`canonical`** — the page's `rel=canonical` target → #1, #2, #5, #8, #17, #18
- **`is-crawlable`** — detects `noindex` meta **and** `X-Robots-Tag` → #2, #3, #4
- **`document-title`**, **`meta-description`** → #8, #17
- **`robots-txt`** — fetches and validates it → #12
- **`crawlable-anchors`**, **`network-requests`** → #13 (is there a real video file?)

```
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<URL>&category=seo&key=<FREE_KEY>" \
  | python3 -c "import json,sys; a=json.load(sys.stdin)['lighthouseResult']['audits']; \
[print(k, a[k].get('score'), str(a[k].get('displayValue') or a[k].get('description'))[:120]) \
 for k in ('canonical','is-crawlable','document-title','meta-description','robots-txt','crawlable-anchors')]"
```

**One caveat that keeps it honest:** PSI runs Chrome and executes JavaScript, so it
**cannot** settle #9 or #13 — the raw-HTML-vs-rendered-DOM distinction is precisely what it
erases. For every other blocked check above, it is a working substitute available today.

This is the pass's biggest methodological failure. "The host is blocked" was accepted as
terminal by nineteen investigators without one of them asking whether the *fetching* had to
happen locally.

### M2. A `high` finding that belongs in the critical set and was never tested

`two-more-non-canonical-hosts-indexed` — `search.123greetings.com` and
`media.123greetings.com` indexed with the homepage title. It sits at `high` and was not
verified. Yet **two investigators in this pass independently surfaced hosts that the
critical duplicate-host findings did not name**, and the count keeps rising: the findings
named 4, #4 found 5, #3 found a 6th and a 7th. A defect class whose inventory grows on
every probe is not bounded, and the two findings rated critical cover only part of it.
Merge all four host findings into one ticket and enumerate the zone (B5).

Two more `high` findings belong in the P0 curl batch purely because the **same command**
settles them: `bing-noarchive-nocache-audit` (rides along with B3; silently kills Copilot
and Apple answers) and `m-host-schema-parity-unknown` (rides along with B2 run against an
m. URL — and the README names the m. card page view-source as the single largest unknown
in the entire audit, which no investigator in this pass attempted to obtain).

### M3. Systematic biases across the 19

1. **Prevalence blindness is structural, not incidental.** 11 of 19 findings assert a
   magnitude; 0 of 19 measured one. Most investigators *said so* — and then assigned a
   severity anyway. Severity was treated as a property of the defect class rather than of
   the evidence, which is exactly how an audit inherits the numbers it set out to test.

2. **Nobody cross-read.** Every fact established by one investigator was unavailable to the
   other eighteen. The generic homepage title was independently rediscovered five times.
   The May 2026 update calendar was researched twice with opposite conclusions (C2). The
   $5.99 Pro tier was "uncorroborated" in #14 and verbatim-confirmed in #16 (C3). The
   index-signature inference that #3 and #4 used to settle their verdicts was exactly what
   #12 needed and never applied. **This is the failure mode the adjudication step exists to
   catch, and it caught a lot.**

3. **Fix assessment was consistently better than verdict assessment.** Nearly every
   investigator found a real collateral-damage hazard the finding had missed —
   noindex+canonical conflicts, Disallow-before-noindex sequencing, Host-header keying,
   orphaned deep pages, redirect loops into origin boxes, scaled-content exposure, CTR loss
   from removing stars. Collectively they reject major parts of the remediation plan. **No
   mechanism in this audit propagates that back into the roadmap**, so the workbook still
   recommends things that four separate verifiers rejected.

4. **The severity scale was applied inconsistently to identical evidence** (C1), and
   `unknown-without-prevalence` — the most honest grade available — was used by six
   investigators and ignored by four others in the same epistemic position.

5. **The May 14 cliff, the reason the engagement probably exists, is still undiagnosed.**
   `critic.md` A2 flagged this. Two investigators touched it, disagreed, and neither
   treated it as the question. It is the one thing B1 resolves retroactively on day one,
   and the audit nowhere says so.

6. **Manual-action and scaled-content policy exposure is named by three investigators
   (#6, #9, #13) and by `critic.md` A3 — and appears in no finding.** An estate with
   fabricated `aggregateRating`, ~30,000 thin pages, thousands of facet URLs, junk `/tags/`
   pages and five unsecured mirrors has a recognisable doorway/scaled-content profile. The
   recommendation to add "80–150 words of server-rendered descriptive copy per card" across
   30,000 URLs (#13) makes that exposure **worse**, and is proposed as a fix. Screenshot
   the Manual Actions panel before shipping any of it.

7. **Off-page authority is still unmeasured and was never blocked** (B9, `critic.md` A1).

### M4. One thing the pass got right that deserves saying

**Zero findings were refuted by default.** The previous pass recorded "could not check" as
"refuted" and destroyed its own output. This pass separated them cleanly: 2 UNVERIFIABLE,
14 PARTIALLY_CONFIRMED with the verified and unverified halves explicitly split, and
several investigators went out of their way to say *"the prior pass's failure was recording
exactly this as refuted, and I am not repeating that."* That instruction worked. The
resulting document is usable in a way the previous one was not.

---

*Adjudicated across all 19 verdicts simultaneously. Conflicts in §2 and the
cross-finding corrections in §7 were not visible to any individual investigator.*
