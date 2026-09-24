# 123greetings.com — AEO / GEO / SEO audit workbook

**Prepared 2026-09-24. Sections 1 – 6.1.** Sections 6.2 – 9 follow in `workbook.md`.

---

## 1. Executive summary

### 1.0 Read this first: what these findings are

**101 findings were produced. 7 were put to a three-skeptic adversarial panel. All 7 were refuted.**

The 94 findings that remain are exactly the 94 that were never challenged. Every one carries `votes_total: 0` and `verifier_notes: "NOT ADVERSARIALLY VERIFIED — below the per-lens verification cap."` They survived by not being tested. The only sample that *was* tested failed at 100%.

**Do not read "94 findings" as "94 confirmed problems." They are 94 untested leads.** Treat the refutation rate as the prior for the rest of the document.

Two distinct causes sit behind that 100%, and conflating them would be a mistake in either direction:

1. **A methodology artifact.** The verifier agents exhausted a 200-call search budget before running their own queries, and their instructions told them to default to *refuted* under uncertainty. Several refutations say so in their own text. Those are not evidence the finding was wrong.
2. **Three genuinely correct refutations**, each of which changed how this document is written:
   - *A SERP title is not proof of a page's `<title>`.* Findings that inferred a root cause (a null card-name field) from indexed titles alone could equally be explained by a redirect, a soft-404 or a retired card. That is why **P0-4 is written as a diagnostic, not a fix.**
   - *`support.google.com/merchants/answer/7052112` governs Merchant Center feeds, not on-page `Product` markup.* A schema finding cited it as proof of a policy violation. Wrong document. The merchant-field removal survives inside **P0-6** on accuracy grounds, not policy grounds.
   - *AI crawlers do not fetch and parse Terms-of-Use pages.* A "the ToS revokes the AI crawl licence" finding required a mechanism that does not exist. The operative lever is `robots.txt` — **P0-9**.

**Nothing from the refuted set is reinstated as a standalone finding.** Three of the seven were refuted principally for *duplication* rather than falsity, and their substance is already carried elsewhere: merchant-field removal inside **P0-6**, the entity-node gap inside **P1-1** and **P3-2**, and the no-signup positioning inside **P1-9(a)**. A fourth (zero presence on head "what to write" queries) is independently corroborated by the benchmark's 0-for-7 on informational prompts, and is carried as **section 5**. No reinstatement is warranted; no substance was lost.

**One correction to a figure that circulates in this document and in the source material.** The Trustpilot profile at `trustpilot.com/review/www.123greetings.com` shows roughly **4 stars across ~99 reviews**; a stale **"1.7/5, 19 reviews"** figure also circulates in third-party citations. Tier 1 PR (§6.2.2) asks publishers to correct wrong numbers — so confirm the live figure before quoting it in an outreach email. **[NEEDS VERIFICATION]**

### 1.1 The single biggest lever

**Stop shipping two codebases.** Google mobile-first-indexes `m.123greetings.com`, but `www` is what appears in results; no competitor in the set runs a separate mobile host. Every template defect in this document exists twice, is fixed twice, and drifts between fixes. Until that is resolved, every engineering hour buys half an hour of outcome. Section 3 sets out the options and the gate.

That is the strategic answer. It is not the first thing to do. The first thing to do is **P0-0: connect measurement**, because nothing in this document can be sized, attributed or rolled back without it — including the May 14 cliff that is probably why this engagement exists (§4c).

### 1.2 The five things that matter

**1. The site is invisible to AI answer engines at the page level, because its pages are empty.** A non-JS crawler sees roughly **30 words** on a card page — one H1, one H2 sentence, a rating, tags, related titles. The card media, the comments and the Related tabs are all JS-injected. No major AI crawler executes JavaScript; Googlebot is effectively the only one that does. So 30,000 cards are functionally blank to ChatGPT, Claude, Perplexity and Copilot, and the structured data asserts a video the crawler cannot see. **P0-5.** Business translation: the inventory does not exist as far as answer engines are concerned.

**2. The index is full of things that are not the product.** Three development and QC environments (`www.dev.123g.us`, `m-src.dev.123g.us`, `webqc.dev.123g.us`) are publicly indexed with production titles. Two source mirrors (`h-source`, `m-source`) serve the full www tree. `media.123greetings.com/Placements/*` serves ad-unit iframes indexed as pages. `search.123greetings.com` is indexed. One of these mirrors appeared **as its own result alongside www in a live benchmark query**. That is a security and disclosure exposure as much as an SEO one, and it is a same-week fix. **P0-2.**

**3. Crawl budget is being spent on generated junk, not on cards.** Out-of-range pagination on m. returns **HTTP 200 with the homepage title** instead of 404, which makes the pagination space effectively infinite; combined with four format facets across ~250 subcategories the generated space is on the order of **6,000–12,000 URLs** (a floor, not a measurement). Meanwhile the sitemap declares **~135 URLs against 30,000+ cards** — under 1% — with an identical fake `lastmod` on every entry, and the mobile-first-indexed host has **no sitemap at all**. **P0-3, P1-3.**

**4. The brand's reputation corpus is largely about a different company.** 123Greetings is free and ad-supported and collects no card details. The complaint corpus attached to it — PissedConsumer at 1.6/5, an unanswered BBB complaint — is overwhelmingly *subscription billing*, which is **123cards.com**, a Copenhagen company with ~800 cards that ranks adjacently on birthday, get-well, anniversary, thank-you, sympathy and scheduling queries. 123Greetings' own Trustpilot replies say so explicitly. An engine asked "is 123greetings safe" today retrieves that cluster and answers *yes it bills you*. **P0-10.** The BBB reply alone is a one-hour job against the strongest single negative trust signal in the corpus.

**5. The answer content already exists — on the wrong host, in the wrong format.** `blog.123greetings.com` holds genuinely good human-written message guides ("500+ Birthday Messages", "100+ Get Well Soon Messages"). It is absent from the sitemap, absent from every non-brand result set measured, and **loses queries that exactly match its own slugs** to sites with a fraction of the authority. Its titles target the browse query ("500+ Birthday Messages") while every snippet winner uses the dual question form ("Birthday Messages: What To Write In A Birthday Card"). **Section 5** is a re-titling and linking exercise over assets the company already owns, not a content commission.

### 1.3 If you can only do five things

Critic item B13: roughly forty-five items are specified here, three of them "large," against a company whose engineering capacity is unknown. Ranked by impact ÷ effort:

| # | Item | Effort | Why it is on this list |
|---|---|---|---|
| 1 | **P0-0** — verify GSC on both hosts, connect Bing Webmaster Tools, pull CrUX, enable per-UA log export | trivial | Unblocks everything. Its 16-month history diagnoses the May 14 cliff retroactively (§4c) |
| 2 | **P0-8** — two-row SQL update on the subcategory display-name table | trivial | Cleans a hub title, ~500 card titles in the largest subcategory, the m. mirror, the breadcrumb and the JSON-LD `isPartOf` in one edit |
| 3 | **P0-2(a)** — `X-Robots-Tag: noindex` at the load balancer for `*.123g.us`, `media.`, `search.` | trivial | Closes a live disclosure exposure the same day |
| 4 | **P0-10(a)** — claim BBB, answer the one outstanding complaint | trivial | Converts the strongest negative trust signal in the corpus, about a complaint that is almost certainly not this company's |
| 5 | **6.1.3** — grep every template and edge rule for `noarchive` / `nocache` / `nosnippet` | trivial | Five minutes. If positive, Microsoft Copilot citation is already dead site-wide and nothing else would ever have revealed it |

None of these needs a sprint. All five can be done this week.

### 1.4 What this document does not know

Three constraints bound every recommendation, and a leadership reader should hold them alongside the findings:

- **The site was never fetched.** Sandbox egress blocked every `123greetings.com` and `123g.us` host for the entire engagement. Every observation derives from the search index, one `<head>` source pasted into an earlier session, and one sitemap fetched earlier. Items marked **[NEEDS LIVE FETCH]** are unconfirmed.
- **No GSC, no GA4, no crawl export.** Prevalence is unknown everywhere. Nine URLs with a broken title could be nine or nine thousand. Nothing here is sized by traffic or revenue, so the priority order is by evidence strength and effort — which may diverge from business impact.
- **The AI-visibility benchmark in §7 is a grounded proxy, not live engine output.** No query was made to ChatGPT, Claude, Perplexity, Gemini or Copilot. It measures the *retrievable corpus* — which is the input those engines work from — not their output. It is n=27 measured, run once, in one locale, and its 59% share-of-voice headline is **inflated by brand-name queries**; strip the three brand prompts and non-brand share is 13/24. Do not present it as an AI citation rate.

---

## 2. Scorecard

Grades are against the competitive set (jacquielawson, americangreetings, bluemountain, hallmark, greetingsisland, paperlesspost, 123cards, sendwishonline, cardsnacks, got-free-ecards), not against an abstract ideal. **Every grade rests on unverified findings** — see §1.0.

| Layer | Grade | One-line justification |
|---|:---:|---|
| **Technical (crawl & index)** | **F** | Seven hosts serve the content; three dev/QC environments are publicly indexed with production titles; out-of-range pagination returns 200 OK making the URL space unbounded; the sitemap covers under 1% of inventory with a fabricated `lastmod`; the mobile-first-indexed host has no sitemap at all |
| **On-page (templates)** | **D** | Three distinct generic-title failure modes in the index; two competing hub title templates live simultaneously; 48 characters of constant boilerplate per card title across ~500 near-identical titles in one subcategory; an 8-word filler meta description with a doubled noun and the wrong taxonomy level; ~30 crawlable words per card |
| **Schema** | **D−** | Card pages dual-type as `Product` **and** `VideoObject` with a 0.00 Offer, `shippingDetails` and a return policy on a free digital card; `reviewCount` used where `ratingCount` is correct; no `@graph`, no `@id` anywhere, so one card exists as up to three unlinked entities; `Organization` is name + url only. Credit where due: self-referencing absolute canonical, no `noindex`, breadcrumbs match between HTML and schema |
| **AEO** | **F** | **0 of 7** informational prompts won. One mega-page covers seven occasions that have no page of their own. Spoke titles use the count form ("500+ Birthday Messages") while every snippet winner uses the question form. No page-level answer-block specification exists. The one page-1 non-brand question result the domain holds (`/free-ecards-faq.html`) is the proof the format works |
| **GEO — crawler access** | **D** | `robots.txt` state is unverified on every host **[NEEDS LIVE FETCH]**; the card body is JS-only so no AI crawler can read it; five non-canonical hosts are independently retrievable and citable; four ad stacks sit ahead of ~30 words of content in the byte stream. Nothing is *known* to be blocking — which is the point: nobody has looked |
| **GEO — citation surface** | **D** | Named in 16 of 27 measured prompts, but a third of those citations are the bare homepage or no URL at all. Absent from five-item "best free ecards" lists. Every roundup that does include the brand pairs it with the same two criticisms — ad saturation and dated design — in language models reproduce verbatim. Reputation split across nine platforms from 1.6 to 4.3 |
| **Entity** | **F** | No Wikipedia article, no confirmable Wikidata item, and a two-field `Organization` node. Three founding years in circulation (1997 / 1998 / 1999), four headquarters (New York / Plainview / Mumbai / Kolkata), three card counts (20,000 / 30,000+ / 40,000+), two employee counts differing 17-fold. With no self-description, third parties define the entity — and they disagree |

**Layers not assessed at all.** Flagged so they are not mistaken for clean (critic B5, B6, B10, B15):

| Layer | Status | Why it matters here |
|---|---|---|
| Off-page authority | **Not measured** | Used as this document's explanation of last resort ("site-level authority") and never quantified. **Does not require site access** — Ahrefs/Majestic/Semrush/Moz are third-party. Folded into **P0-0(d)** |
| Core Web Vitals / page experience | **Not measured** | Obtainable today via the CrUX API and PageSpeed Insights API, both of which bypass the egress block. Folded into **P0-0(e)** |
| Email deliverability (SPF/DKIM/DMARC/BIMI) | **Not measured** | The product *is* an email. DNS checks need no site access. Folded into **P0-0(f)** |
| Geography & language targeting | **Not established** | Five language editions, ~100 world-language sitemap URLs, and an entirely US/UK PR plan. No hreflang or i18n assessment exists |
| Image & video discovery | **Not assessed** | 30,000 images and a musical-card library; no image sitemap, no video sitemap, no Lens/Images consideration, no app-store or YouTube property check |
| UGC (comments, tags, Studio profiles) | **Partially assessed** | Tags and profiles are covered (P1-4, P2-3); comment volume, spam density and indexation policy are not — and **P0-5 hard-codes comments into every card page** |
| Accessibility, privacy consent, COPPA | **Not assessed** | A 50–70 core audience with interstitial ads; users complaining about address-sharing with advertisers is a privacy question dressed as a reputation problem; kids' ecards raise COPPA. Scope separately |
| Paid & legal levers | **Not considered** | No brand-term defence during the 123cards reputation window, no trademark assessment. On a plan whose organic fixes read out in 8–12 weeks, the absence of any same-week lever is a structural omission |

---

## 3. The m. / www question

**This is the structural decision every other section depends on. Take it before committing the 31–60 day band.**

### 3.1 What is actually true

| Fact | Evidence |
|---|---|
| The two hosts **do** share taxonomy | The brief's premise that "the two hosts share NO taxonomy" is **false**. A single index probe returned `www.123greetings.com/do/card/330206`, `/do/card/101364`, `/do/card/101633`, `/do/card/101672` intermixed with `m.123greetings.com/do/card/356472` and `/do/card/111094`. The bare directory root `www.123greetings.com/do/card/` is itself indexed, carrying the homepage title |
| So every card has **at least three** indexable addresses | `www/<cat>/<subcat>/<slug>.html`, `www/do/card/<id>`, `m/do/card/<id>` — plus copies on `h-source.123g.us`, `m-source.123g.us` and `www.dev.123g.us`. Up to **six hosts** can serve one card |
| Google serves **www**, not m. | "free birthday ecards send" returned 8 of 10 slots as www URLs and **zero** m. URLs. A brand-qualified good-morning query returned 7 www, 2 stray-host, and exactly **one** m. URL. Caveat: the search tool runs a desktop user-agent, so a www skew is partly expected — but the total absence of m. from head terms, with stray hosts outranking it on a brand query, is diagnostic regardless |
| Google **indexes** m. | Mobile-first indexing means the m. content determines the ranking of the paired www URL |
| **No competitor runs a separate mobile host** | Targeted probes for `site:m.americangreetings.com` and literal `"m.greetingsisland.com"`, `"m.hallmark.com"`, `"m.bluemountain.com"`, `"m.jacquielawson.com"`, `"m.paperlesspost.com"` surfaced **nothing**. All nine competitors serve one URL set on www |
| m. is **differently broken**, not equally broken | Four m. card URLs carry the generic homepage title; `m./do/cards/birth_forher` carries a second generic string; out-of-range pagination carries a *third*. m. runs its own templating and it is failing in ways www is not |
| **m. page source has never been read.** Not by this engagement, not by any prior one | Every m. claim in this document is inferred from indexed titles and URLs. **This is the largest single unknown in the audit** and it is answerable in one afternoon — **P0-7** |

**The consequence, stated plainly:** the site is being *judged* on the m. codebase — which has the facet crawl trap, the title failures and no sitemap — while *competing* with the www codebase. Investment in www templates is being evaluated against m. signals.

### 3.2 The three options

**Option A — maintain both, fix both.**

*What it means:* every template change in section 4 ships twice, to two codebases, verified twice.
*Cost:* P1-2, P1-5, P1-6, P0-6 and P1-8 all approximately double. Drift resumes the moment the two teams diverge again — and the three distinct generic-title strings are evidence it already has.
*When it is right:* only as the interim posture while Option B is scoped. Never as a destination.

**Option B — converge to responsive on www. (Recommended target state.)**

*What it means:* one URL set on www, responsive templates, 301 every `m./do/*` path to its www equivalent.
*Blocker that must be named:* **the www card page has no `viewport` meta tag.** The hub has one; the card page does not. www is therefore *not currently mobile-capable*, and no consolidation can happen until the card template is made responsive. That is real front-end work and it is the true cost of this option.
*Upside:* collapses the duplication multiplier, halves template maintenance permanently, and matches what all nine competitors do.
*Gate:* **90 days of GSC data on both hosts** (P0-0), m. source fully mapped (P0-7), and the `/do/` collapse (P0-1) verified stable. Do not attempt it blind.

**Option C — retire m. immediately by blanket 301 to www.**

*What it means:* the fastest possible consolidation.
*Why it is unavailable today:* it requires www to be genuinely usable on a phone, and the missing viewport meta says it is not. Shipping this now would 301 the mobile-first-indexed host onto a desktop-only page. **Do not do this.** It becomes Option B once the responsive work lands.

### 3.3 Recommendation

**Target Option B. Hold Option A as the interim posture, with three hard rules, starting now:**

1. **Freeze net-new feature work on m.** Every divergence added now is migration cost later.
2. **Make the pairing airtight** — this is **P1-2**, and it is worth doing even if Option B is later rejected. Every www page needs `<link rel="alternate" media="only screen and (max-width: 640px)">` to its m. equivalent, **absolute https** (the current tag is protocol-relative), and every m. page needs a reciprocal absolute `rel=canonical` to www. The pairing must be bidirectional and complete or Google treats the pair as duplicates rather than as a pair.
3. **Every template fix in section 4 ships to both hosts in the same release train.** No ticket may say "the card template" again without naming which host.

### 3.4 Is the section 5 content plan being built on the host Google does not index?

*(Critic A5 — answered explicitly, because it would otherwise invalidate an entire workstream.)*

**Partly, and it is not yet knowable which part. Here is the honest split:**

| Where the content lands | Mobile-first exposure | Verdict |
|---|---|---|
| `blog.123greetings.com` — section 5 spokes, the seniors guide, the comparison cluster | **Probably safe.** A WordPress install on a single host has no m. counterpart, so Googlebot smartphone crawls it directly and mobile-first indexing is a non-issue *provided the theme is responsive* | **[NEEDS LIVE FETCH]** — confirm the blog theme emits a viewport meta and passes the Mobile-Friendly Test |
| **www hubs** — the P1-8 "what to write" blocks above the card grid | **At risk.** These hubs *have* m. counterparts. If the block is added to www only, the mobile-first-indexed version of that hub does not contain it, and Google may never see it | **Must ship to both hosts.** Non-negotiable |
| **New www paths** — P1-9 `/american-greetings-alternative.html`, `/jacquie-lawson-alternative.html`, the `/free-ecards-faq.html` question cluster | **Unknown and potentially fatal.** If `m.` serves a 404 — or worse, a redirect to the m. homepage — for a www path with no mobile counterpart, then the mobile-first-indexed content for that URL is a homepage. `chk_site_active.js` loading synchronously in `<head>` may be doing exactly this | **Blocking unknown** |

**Action.** Make this an explicit, named output of **P0-7**, not a line item in P1-2:

> *Request an arbitrary www path that has no m. counterpart (e.g. `www.123greetings.com/does-not-exist-test-2026.html` and a real new path once one is staged). Record: what m. returns for the same path; what `chk_site_active.js` does on a phone user-agent and on Googlebot-smartphone; what the www page returns to Googlebot-smartphone. Then request a real www page with a known m. counterpart and confirm the alternate/canonical pair resolves both ways.*

**This is a hard prerequisite on section 5 page 1 and on P1-9 — not on P1-2.** If the answer is "m. redirects unknown paths to its homepage," then either every new www page needs an m. counterpart created at the same time, or the new pages go on `blog.` only, or the responsive work (Option B) moves ahead of the content plan. That is a scoping decision worth one afternoon of fact-finding before nine pages are commissioned.

---

## 4. Findings by priority

### 4.0 How to read these tables

**Status legend — applies to every row without exception:**

- **`U`** — *Unverified.* The finding was never adversarially tested. **All 94 findings carry this.** See §1.0.
- **`LF`** — *Needs live fetch.* The finding's evidence or its fix cannot be confirmed from the search index alone. Resolve with the Gap 1 checklist (§8) before writing code.
- **`U+LF`** — both. **Treat as a hypothesis with a proposed test, not as a work order.**

Where a row is `U+LF`, the correct first action is the verification step, not the fix. Several of these have more than one plausible cause with completely different remedies — P0-4 is the clearest example, and the refutation record in §1.0 is what taught us to write it that way.

---

### 4.1 P0 — do first

| ID | What | Evidence | Why it matters | Fix | Effort | Owner | Status |
|---|---|---|---|---|---|---|---|
| **P0-0** | **Connect measurement.** Seven sub-items, (a)–(g) | No GSC, no GA4, no crawl export, no Bing AI Performance data, no log access. Prevalence is unknown for every finding in this document | **Every other item is unsized, unattributable and un-rollbackable without it.** Its 16-month history diagnoses the May 14 cliff retroactively (§4c). Its Manual Actions report answers the policy-exposure question in §4a — same day | See expansion below | trivial | SEO + Infra | U |
| **P0-1** | **Collapse the `/do/card/` namespace on www** | `www/do/card/330206`, `/101364`, `/101633`, `/101672` indexed; the bare root `www/do/card/` is indexed carrying the homepage title | Same-host duplication of 30,000 cards. Worse than the cross-host m./www pair, because same-host duplicates get no benefit from alternate/canonical pairing. Not covered by any prior-work ticket | `301 www/do/card/{id}` → the canonical www `.html` slug for that ID (the mapping exists — both routes render the same card). `404` the bare `/do/card/` and `/do/cards/` roots. Use 301, not a cross-canonical: a 301 also reclaims links pointing at numeric URLs | small | Backend | **U+LF** |
| **P0-2** | **Remove five 123g.us hosts + `media.` + `search.` from the public internet** | Indexed: `www.dev.123g.us` (`/birthday/`, `/congratulations/`, `/events/sweetest_day/`, `/photo_card.html`), `m-src.dev.123g.us`, `webqc.dev.123g.us/app/`, `h-source.123g.us` (homepage, hubs, card pages, `/tags/`), `m-source.123g.us` (serves **desktop** taxonomy despite the name), `media.123greetings.com/Placements/{Billboard,VideoCompanion,TearBack,RBIndex}`, `search.123greetings.com`. All serve production title templates with no staging markers. **`h-source` ranked as its own result alongside www in benchmark prompt #26** | Security/disclosure **and** duplication. A QC environment is where half-finished copy and unreleased campaigns live. LLM retrieval indexes largely do not consolidate duplicates via canonical the way Google does — each host is an independent retrieval target, and an engine can cite `www.dev.123g.us` in a user-facing answer | **(a)** same-day stopgap: `X-Robots-Tag: noindex, nofollow` at the load balancer for any Host matching `*.123g.us`, plus the `media.` and `search.` vhosts. **(b)** the real fix: HTTP Basic auth or IP allowlist so unauthenticated requests get 401. **(b) is gated on (b0)** — see below. Also: audit the full `*.123g.us` DNS zone (five hosts were found by *search alone*; assume more exist), and remove the www-sitemap reference from `h-source`'s site-map page | (a) trivial, (b) small | Infra | **U+LF** |
| **P0-3** | **Bound the m. URL space** | Out-of-range pagination returns **200 with the homepage title**: `m/do/cards/birth_wishes/p/12` and `/s/videos/p/14` carry `"Free Greeting cards, Wishes, Ecards, Birthday Wishes, Funny Cards & Gifs \| 123 Greetings"` — the www homepage title — while `/p/4` carries the correct hub title. Trailing-empty `/p/` indexed on three branches. `/s/latest/p/1` indexed, duplicating the unpaginated URL. Truncated slug `/do/cards/birth_` indexed, ranking with the full Birthday hub title. Four format facets confirmed (`videos`, `gif`, `latest`, `postcards`) across prefixes `birth_ gen_ wed_ anniv_ thank_ congrats_ insp_ bus_ love_ fkt_` plus twelve month-event prefixes | Categories × 5 facet states × unbounded integers. Conservative floor **6,000–12,000 URLs** for a site whose sitemap declares 135 — and that is a floor, not an estimate: the search tool returns no result counts and caps at ~10 URLs per query. AI crawlers fetch at a small fraction of Googlebot's volume and have no canonical-consolidation pass, so every request spent on `/p/1` or `/s/gif/p/` is a request not spent on a card | Four route changes in the m. pagination controller: **(1)** page > last real page → **404** (not 200, not a redirect to page 1 — a redirect still invites the crawl); **(2)** `/p/1` → 301 to the unpaginated URL, and fix the paginator so it never emits `/p/1`; **(3)** trailing-empty `/p/` → 301 stripping the segment, then guard the paginator partial that emits `/p/{n}` with a null `n`; **(4)** validate the category slug against the real list, hard-404 on no match. **Verify the identical controller on `www/do/cards/`.** `Disallow` lines come **later** (6.1.2(b)), only after the noindex has been crawled | small–medium | Backend (m.) | U |
| **P0-4** | **Diagnose the generic-title failures — do not fix them yet** | **Three** distinct fallback strings in the index. *Mode A* (www homepage title on a card page): `m/do/card/352301`, `/348659`, `/356472`, `www/do/card/330206`, and facet pages `m/do/cards/birth_quotes/s/videos`, `/love_images/s/latest`. *Mode B* (`"123Greetings.com, Free Greetings For The Planet"`): `m/do/cards/birth_forher`, and `http://www.123greetings.com/profile/all/` — indexed over **HTTP**. *Mode C* (stub): `www/do/card/101633` renders a `<title>` of the literal word **`card`**. Separately: `birthday191.html` is indexed with title "Send A **Beautiful** Birthday ecard…" and meta description "Free online Send A **Lovely** Birthday ecard ecards on Birthday" — same page, same crawl | If JSON-LD `name` renders from the same template context (it does in virtually every CMS), a meaningful share of 30,000 cards emit a `VideoObject` whose `name` is the company homepage title or the string "card" — which describes no entity and actively poisons the graph P1-1 and P1-2 are building. **But the cause is not established.** A SERP title is not proof of a page's `<title>`; a retired card that soft-404s or redirects to home produces the identical symptom, and the remedy is completely different (410/301 vs a title-builder change) | **Step 1, blocking:** fetch `www/do/card/101633`, `m/do/card/352301`, `www/profile/all/` and one Mode-A `.html` slug. Record HTTP status, final URL after redirects, raw `<title>`, `<h1>`, `og:title`, JSON-LD `name`. **Branch:** 200 + real card content + generic `<title>` → template/data defect, proceed; 200 serving homepage content or a redirect → **soft-404, fix is 410/301**, no title work; correct source `<title>` but generic SERP title → Google title rewriting driven by the ~30-word body, fix is P0-5. **Step 2:** grep the generated static tree for files whose `<title>` equals any of the three fallback strings and **count them**. Severity is currently unassignable. **Step 3, only if branch 1:** one canonical `card_name` column; H1, `<title>`, `og:title` and JSON-LD `name` all render from it, with `name` bound to the H1 value. Missing name → **404/410, not a page titled "card"**. **Step 4:** build-time assertion that no card page's JSON-LD `name` matches a fallback string and that `name` is byte-identical to the H1 — warn and fall back, do **not** fail a 30,000-page build. **(b)** Diff query across the two card-name columns; **fold the existing og:title-vs-H1 ticket into this and tell its owner the scope was too narrow, citing `birthday191.html`** | small | SEO + Backend | **U+LF** |
| **P0-5** | **Server-render the card page** | Card media loads via `Load_Video_Card()` into an empty div; comments and the Latest/Related tabs are JS-loaded. A non-JS crawler sees ~30 words. Third-party measurement of 500M+ GPTBot fetches found **zero** evidence of JS execution; ClaudeBot downloaded JS in ~23.8% of requests and never executed it. Four ad stacks sit ahead of the content: GPT (13 slots incl. interstitial, anchor, two side rails), AdSense auto ads, AdPushup, Taboola. One video card weighs **3.8 MB** | The single largest AI-access defect on the site, and **it gates P0-6**: a perfect `VideoObject` block on a page whose rendered main content is an interstitial, two rails, 30 words and an empty div is a page Google classifies as having *supplementary* rather than *main* video content — and declines to index the video. The markup then asserts a `contentUrl` the crawler cannot associate with anything visible, which is the hidden-content clause of Google's structured-data policies | Card pages are **pre-generated static HTML**, so this is a generator-template change, not a re-architecture. Emit into the initial HTML response: **(1)** a real poster `<img alt="<card name> - <subcategory> ecard">` plus `<noscript>`, and a `<video poster preload="none">` with a `<source>` at the same `contentUrl` the JSON-LD declares; **(2)** the card's printed message/verse as literal text in a `<p>` — the highest-value quotable asset on the page, currently locked inside a video file; **(3)** 80–150 words of server-rendered descriptive copy (what it depicts, occasion, sentiment, format, duration, artist linking to `/profile/<handle>`); **(4)** top 5–10 comments as HTML; **(5)** Related and Latest as real `<a href>` with card-name anchor text. JS enhances on top. **Suppress the GPT interstitial and anchor units on card templates specifically.** *Acceptance test:* `curl -sA "GPTBot" <card-url>` stripped of tags must exceed **150 words**, and the poster URL must appear in the raw response | large | Frontend + Backend | **U+LF** |
| **P0-6** | **Retype the card schema** | Card pages type as **both** `Product` and `VideoObject`. `Product` carries `Offer` price `0.00`, `shippingDetails`, a return policy and `brand` on a free digital card. `priceValidUntil` hardcoded `2026-12-31`. `reviewCount` used where `ratingCount` is correct. `isPartOf` names the "Happy Birthday" subcategory merely "Birthday". Prior work traced the **May 14 ranking cliff** to the Product/review-snippet dual-typing — **and the card template still emits it**, so that diagnosis never reached template level | Google's guidance on multiple types: focus markup on the preferred type. Keeping both forces Google to choose between a well-formed `VideoObject` and a malformed `Product` on the same node — a coin flip the site has already lost once. `VideoObject` is the only one of the two that can produce a rich result here and the only one whose required properties the page can honestly satisfy. **This is not a re-report of the shipped Birthday-hub CollectionPage work** — that work did not reach card templates, evidenced by the template still emitting Product+VideoObject | One `<script>`, one `@graph`, branched on the **stored asset type** (not the URL facet — a card is reachable from several facet URLs). Full block in §4.1.1 below. `Product`, all merchant fields and `aggregateRating` **deleted in the same commit**. **Leave the visible star widget untouched** — this is a markup change with zero UX change | medium | Backend | U |
| **P0-7** | **Read six m. page sources** | **No m. page source has ever been read**, by this engagement or any prior one. Every structured-data, template and rendering claim about m. is inferred from indexed titles and URLs | Under mobile-first indexing, the structured data Google evaluates is the structured data on **m.** If m. emits no JSON-LD, P0-6 changes nothing Google sees. If m. emits its own Product block, the exposure doubles and a www-only release leaves the violating markup live on the indexed host. **Either way a www-only release may accomplish nothing.** Highest-leverage unknown in the document; answerable in one afternoon | Pull raw HTML for six m. URLs — a video card, a static card, a category hub, a `/s/videos` facet, a `/s/videos/p/2`, and the m. homepage. Inventory every `<script type="application/ld+json">`. Run each through **Google's Rich Results Test, which fetches live and bypasses the sandbox egress block.** Answer three questions: does m. emit JSON-LD at all; does it carry `Product`/`offers`/`shippingDetails`/`aggregateRating`; do its `@id`/`url` values point at m. or www. **Plus the §3.4 question: what does m. return for a www path with no mobile counterpart, and what does `chk_site_active.js` do?** | small | SEO | **U+LF** |
| **P0-8** | **Two rows of bad data** | The hub title template is `<Sub> Cards, Free <Sub> Wishes \| 123 Greetings` and renders cleanly for every normal row ("Everyday Thinking of You Cards…", "Birthday Extended Family Cards…", "Thank You Inspirational Cards…"). **Two rows are polluted:** `/birthday/happy_birthday/` has its display name stored as **"Happy Birthday Ecards"**, and `/events/christmas/surprises/` as **"Christmas Cards Special"**. The card template reads the same field, producing "… Free Happy Birthday Ecards **eCards** \| 123 Greetings" across every card in that directory | **The brief frames "Ecards eCards" as a template bug. It is not — the noun is in the data.** Chasing it in the template wastes a sprint and cannot fix it. Correctly diagnosed it is a one-line data edit that simultaneously cleans the hub title, ~500 card titles in the largest and most commercially important subcategory, the m. mirror of both, the breadcrumb, and the JSON-LD `isPartOf` name | `UPDATE` the subcategory display-name column: `happy_birthday` → **"Happy Birthday"**; `events/christmas/surprises` → **"Christmas Surprises"**. Re-run the static generator for both subtrees. Add a **validation rule rejecting the tokens** `ecard/ecards/card/cards/wishes/greetings` on that column, since every consuming template already appends those nouns — and **audit all ~3,000 rows against it**, because two bad rows in a 10-result sample implies more | **trivial** | Content ops | U |
| **P0-9** | **Deploy `robots.txt` on www and m.** | `robots.txt` could not be fetched on any host (egress blocked, including `archive.org`, so no historical copy either). **Nobody knows what it currently says.** | Blocking the wrong user-agent token kills citations while saving nothing, and the two most-blocked tokens on the web (`Google-Extended`, `Applebot-Extended`) are not crawlers at all. Conversely one over-broad `Disallow` aimed at scrapers takes out `OAI-SearchBot` and `Claude-SearchBot` — the entire AI citation surface | Exact paste-ready block in **§6.1.2**. Ship **without** the `/s/` `Disallow` lines initially — see 6.1.2(b) for why sequencing matters | small | Infra | **U+LF** |
| **P0-10** | **Separate the brand from 123cards.com, and answer the record** | 123Greetings' own Trustpilot replies state "123cards and 123greetings have nothing to do with each other" and that users "frequently use 123Cards instead of 123Greetings.com, confusing the two." 123Cards is Denmark-based and charges (one case of $57 for what was supposed to be free). The brand's own help page states it "does not charge for standard cards, nor do they ask for credit card information." Yet the complaint corpus attributed to 123Greetings is overwhelmingly subscription billing: PissedConsumer **1.6/5, 68 reviews** ("$39 for a year", "$2.49/month… charged for a full year in advance", "7-day trial"); BBB carries "I canceled my free subscription… yet my card was charged" and records the company **"has failed to respond to 1 complaint."** BBB also lists the wrong city (Plainview vs 1674 Broadway, NY) and "in business since 1999" | An engine asked "is 123Greetings safe / does it charge you" retrieves this cluster and answers **yes it bills you**. That is factually wrong for this brand and is the most citation-suppressing claim in the corpus — it converts a free ad-supported product into a suspected subscription trap. **No on-site schema fixes this.** Benchmark #18 confirms it live: of nine results only two are brand-owned and both incidental; the answer reads "legit per Scamadviser, **BUT** users report spam email," beside an AARP greeting-card-scam article | **(a)** Claim BBB; answer the outstanding complaint with the disambiguation; correct the address and the founding year. **(b)** Publish `www/123greetings-vs-123cards.html` (on **www**, not `help.`) stating: free, ad-supported, never asks for a credit card, no subscription product, unaffiliated with 123cards.com (Denmark). Schema targeting the literal phrasings — "Does 123Greetings charge a subscription?", "Is 123cards.com the same as 123Greetings?", "Why was I charged after sending a free ecard?" Link from the footer and `/free-ecards-faq.html`. **(c)** Claim Sitejabber (2/5, 61 reviews, unanswered) and SmartCustomer (2.5/5, 61, unanswered); reply on the record across all four platforms — **replies are indexed and become the counter-evidence AI retrieves.** **(d)** Get the stale "Trustpilot 1.7/5, 19 reviews" citation corrected at source. **(e)** Move anti-phishing guidance from `help.` to a dated, indexable `www/email-security.html`; publish the definitive sender-domain list; file reclassification requests with WOT, Scamadviser, Gridinsoft; **audit the third-party ad stacks for the web-push injection users specifically complain about** — that behaviour is what keeps generating the reports; request removal from the Wikipedia spam blacklist if still live | medium | Support + Marketing + Content | U |

#### P0-0 expanded — "connect measurement" is seven things, not three

The §9 Week-1 table names (a)–(c). All seven run in the same week; (d)–(f) need **no site access at all** and are therefore not blocked by anything.

| | Sub-item | Owner | Why |
|---|---|---|---|
| **(a)** | **Verify Google Search Console on `www` AND `m.` separately.** Screenshot **Manual Actions** and **Security Issues** on day one | SEO | Resolves prevalence for nearly every finding. Its **16-month history covers the May 14 cliff retroactively** (§4c). The Manual Actions report answers §4a the same day, with a same-day escalation path if it is not clean |
| **(b)** | **Connect Bing Webmaster Tools**; request the **AI Performance** export | SEO | The only first-party AI-surface reporting that exists anywhere. There is **no separate Copilot crawler** — Bingbot's index is the grounding source, so this is the only Copilot telemetry available |
| **(c)** | **Enable per-user-agent access-log export** for `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Bingbot`, `Googlebot` — status codes and response times per bot | Infra | With no GSC and no GA4, **the access log is the only AI-crawler telemetry that exists** and it is entirely unexploited. It is also the input that decides whether the `/do/card/` root can safely 404 (§4b) |
| **(d)** | **Off-page authority baseline** — referring domains, DR/DA, top linked pages, lost links, toxic-link check, for `123greetings.com` **and** for jacquielawson, americangreetings, bluemountain, 123cards, top10.com. Plus: how much equity the seven-host split fragments | SEO | *Critic A1.* This document uses "site-level authority" as its explanation of last resort (§7.3 #14) and never quantifies it. **Needs no site access** — Ahrefs/Majestic/Semrush/Moz are third-party. **If referring domains are healthy, the authority-ceiling reading is wrong and the on-page work is under-prioritised. If they are not, half of section 5 — fifteen pages against The Knot, Indeed and Hallmark — is not winnable at any content quality and must be re-scoped.** Either answer changes the plan |
| **(e)** | **CrUX + PageSpeed Insights, both origins + three competitors** | SEO | *Critic B7.* **Both APIs bypass the egress block.** CrUX gives 28-day field LCP/INP/CLS per origin, historically, with no site access and no GSC. For an ad-heavy site with an interstitial and an anchor unit served to a 50–70 audience, INP and CLS are both a ranking input and the **quantitative evidence P2-8 currently lacks**. A month-over-month CrUX step also tests one May-14 hypothesis today (§4c) |
| **(f)** | **Email deliverability audit** | Infra + SEO | *Critic B4.* **The product is an email.** Users report spam email in the corpus P0-10 is trying to fix. Check SPF, DKIM selectors, DMARC policy + `rua`, BIMI, MTA-STS, sending-IP and domain blocklist status, and Gmail/Yahoo bulk-sender compliance, for **every** sending domain. Request ESP delivery / complaint-rate / spam-rate stats. **DNS checks need no site access.** If a meaningful share of cards land in spam, the core promise is broken and no amount of citation work matters — and the §7.3 #18 safety narrative is downstream of it |
| **(g)** | **Live AI-engine baseline** — the 30 benchmark prompts against ChatGPT, Claude, Perplexity and Copilot, recording named brands, cited URLs and **sentiment language** | SEO | *Critic A6.* §7 designates a metric on a *proxy* as "the primary metric," while §7.1 says the proxy cannot measure citation rates in any product. Running four engines is an afternoon, and it is the **only** surface that shows the sentiment language §6.2 is entirely built around ("dated, ads everywhere" vs "genuinely free with no account required"). Do it at baseline, not later |

##### P0-0 CrUX / PSI commands (run today — these bypass the egress block)

```bash
# Field data, both origins. Requires a free Google API key.
for ORIGIN in "https://www.123greetings.com" "https://m.123greetings.com"; do
  curl -s -X POST \
    "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$KEY" \
    -H 'Content-Type: application/json' \
    -d "{\"origin\":\"$ORIGIN\",\"formFactor\":\"PHONE\"}"
done

# Historical series — this is what tests the May 14 page-experience hypothesis
curl -s -X POST \
  "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=$KEY" \
  -H 'Content-Type: application/json' \
  -d '{"origin":"https://m.123greetings.com","formFactor":"PHONE"}'

# Lab data + the full Lighthouse trace for one card page
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed\
?url=https://www.123greetings.com/birthday/happy_birthday/birthday191.html\
&strategy=mobile&category=performance&category=seo&key=$KEY"
```

##### P0-0(f) deliverability commands

```bash
for D in 123greetings.com m.123greetings.com; do
  dig +short TXT $D                      # SPF
  dig +short TXT _dmarc.$D               # DMARC policy and rua
  dig +short TXT default._domainkey.$D   # DKIM — repeat per selector in use
  dig +short TXT default._bimi.$D        # BIMI
  dig +short TXT _mta-sts.$D             # MTA-STS
done
```

#### P0-2(b0) — the dependency audit that must precede the lockdown

*Critic A4. The §9 Week-1 table has this as one row. It is two, and the order matters.*

`media.` and `search.` are **names of production infrastructure**, and benchmark #26 shows `h-source.123g.us` serving *identical content* to www — meaning these hosts are wired into something. **Auth-walling an asset host takes the site down. Noindexing it does not.**

> **(b0), before (b):** grep every template, every CDN/edge config, every email template and the application source for `123g.us`, `h-source`, `m-source`, `media.123greetings.com` and `search.123greetings.com`. Confirm no production page, stylesheet, script, image, ad tag or outbound email references them. Only then apply auth or the IP allowlist.

`P0-2(a)` — the `noindex` header — is safe to ship immediately and independently. Ship it today.

---

#### 4.1.1 P0-6 — paste-ready JSON-LD

**Branch on the card's stored asset type, not on the URL facet.** A card is reachable from several facet URLs; the asset type is a property of the card record.

**Video card.** Example URL `/birthday/happy_birthday/birthday191.html`. `{{…}}` are template variables.

```html
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": "WebPage",
   "@id": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html#webpage",
   "url": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html",
   "name": "{{CARD_NAME}} - Free Happy Birthday eCards | 123Greetings",
   "description": "{{UNIQUE_CARD_DESCRIPTION}}",
   "inLanguage": "en-US",
   "isPartOf": { "@id": "https://www.123greetings.com/#website" },
   "breadcrumb": { "@id": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html#breadcrumb" },
   "mainEntity": { "@id": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html#card" },
   "datePublished": "{{CARD_PUBLISHED_ISO8601}}",
   "dateModified": "{{CARD_MODIFIED_ISO8601}}"
  },
  {
   "@type": "BreadcrumbList",
   "@id": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html#breadcrumb",
   "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "123Greetings", "item": "https://www.123greetings.com/" },
    { "@type": "ListItem", "position": 2, "name": "Birthday", "item": "https://www.123greetings.com/birthday/" },
    { "@type": "ListItem", "position": 3, "name": "Happy Birthday", "item": "https://www.123greetings.com/birthday/happy_birthday/" },
    { "@type": "ListItem", "position": 4, "name": "{{CARD_H1_EXACT}}" }
   ]
  },
  {
   "@type": "VideoObject",
   "@id": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html#card",
   "name": "{{CARD_H1_EXACT}}",
   "description": "{{UNIQUE_CARD_DESCRIPTION}}",
   "thumbnailUrl": [
    "https://www.123greetings.com/{{THUMB_1280x720}}",
    "https://www.123greetings.com/{{THUMB_640x360}}"
   ],
   "uploadDate": "{{CARD_PUBLISHED_ISO8601_WITH_OFFSET}}",
   "duration": "{{ISO8601_DURATION e.g. PT28S}}",
   "contentUrl": "https://www.123greetings.com/{{CARD_VIDEO_FILE}}",
   "embedUrl": "https://www.123greetings.com/embed/card/{{CARD_ID}}",
   "width": {{VIDEO_WIDTH}},
   "height": {{VIDEO_HEIGHT}},
   "inLanguage": "en-US",
   "isFamilyFriendly": true,
   "isAccessibleForFree": true,
   "genre": "Happy Birthday eCard",
   "keywords": "{{CARD_TAGS_COMMA_SEPARATED}}",
   "creator": { "@type": "Person", "name": "{{ARTIST_NAME}}", "url": "https://www.123greetings.com/profile/{{ARTIST_HANDLE}}" },
   "publisher": { "@id": "https://www.123greetings.com/#organization" },
   "isPartOf": {
    "@type": "CollectionPage",
    "@id": "https://www.123greetings.com/birthday/happy_birthday/#webpage",
    "name": "Happy Birthday eCards",
    "url": "https://www.123greetings.com/birthday/happy_birthday/"
   }
  }
 ]
}
</script>
```

**Static / GIF card.** Swap the `VideoObject` node for this; everything else is identical. Example URL `/birthday/birthday_wishes/wishes84.html`.

```json
{
 "@type": "ImageObject",
 "@id": "https://www.123greetings.com/birthday/birthday_wishes/wishes84.html#card",
 "name": "{{CARD_H1_EXACT}}",
 "description": "{{UNIQUE_CARD_DESCRIPTION}}",
 "caption": "{{CARD_H1_EXACT}}",
 "contentUrl": "https://www.123greetings.com/{{CARD_IMAGE_FULL}}",
 "thumbnailUrl": "https://www.123greetings.com/{{CARD_THUMB}}",
 "width": {{IMAGE_WIDTH}},
 "height": {{IMAGE_HEIGHT}},
 "encodingFormat": "image/gif",
 "datePublished": "{{CARD_PUBLISHED_ISO8601}}",
 "inLanguage": "en-US",
 "isFamilyFriendly": true,
 "isAccessibleForFree": true,
 "genre": "Birthday Wishes eCard",
 "keywords": "{{CARD_TAGS_COMMA_SEPARATED}}",
 "representativeOfPage": true,
 "creator": { "@type": "Person", "name": "{{ARTIST_NAME}}", "url": "https://www.123greetings.com/profile/{{ARTIST_HANDLE}}" },
 "copyrightNotice": "(c) {{CARD_YEAR}} 123Greetings.com",
 "creditText": "123Greetings.com",
 "publisher": { "@id": "https://www.123greetings.com/#organization" },
 "isPartOf": {
  "@type": "CollectionPage",
  "@id": "https://www.123greetings.com/birthday/birthday_wishes/#webpage",
  "name": "Birthday Wishes eCards",
  "url": "https://www.123greetings.com/birthday/birthday_wishes/"
 }
}
```

Also set the `WebPage` node's `primaryImageOfPage` to `{ "@id": "...#card" }` on the image branch.

**Rules for whoever ships this — these are not optional:**

- `name` must be **byte-identical to the rendered H1**, not to the `<title>`. Resolve the "Lovely"/"Beautiful" divergence by making the H1 the source of truth (P0-4).
- `uploadDate` must be a **real per-card date with a timezone offset**, never the build timestamp. The sitemap already demonstrates what Google does with uniform machine-stamped dates.
- `duration` must be the real runtime.
- Omit `creator` entirely rather than emit an empty `Person`.
- Add `license` + `acquireLicensePage` on the image branch **only if a real licensing page exists at a stable URL.** If it does not, omit both — a `license` pointing at a generic ToS page is exactly the inaccuracy the structured-data policies prohibit.
- **`isAccessibleForFree: true` is correct schema.org and harmless, but it produces no Google search feature.** Add it for semantic accuracy; do not report it internally as a SERP win.

**On `aggregateRating` — the answer is no, permanently, and the team should be told directly rather than left to re-litigate it next quarter.**

Google's review-snippet documentation supports review snippets on a closed list of types: `Book`, `Course`, `Event`, `LocalBusiness`, `Movie`, `Product`, `Recipe`, `SoftwareApplication`. **`VideoObject`, `ImageObject` and `CreativeWork` are not on it.** So once `Product` is gone, `aggregateRating` on a card page is inert markup at best and an unsupported-type signal at worst. The only way to get stars back is to keep `Product` — the precise construct the May 14 cliff was traced to.

Three further points, because they are commonly confused:

- **`reviewCount` vs `ratingCount` are not synonyms.** Either satisfies Google's syntax check, so the Rich Results Test stays green either way — **the failure is silent, not an error.** `ratingCount` is how many people gave a star rating; `reviewCount` is how many wrote a review. The card page collects star ratings, so `ratingCount` is correct. Declaring that number as `reviewCount` claims N written reviews exist — and since the comments block is JS-injected, that count is very likely not present in rendered HTML at all, which breaks the requirement that users be able to see the review count.
- **Removing `Product` forfeits star-rating eligibility outright.** That is the desired outcome given the cliff, but it must be a *stated, accepted consequence* signed off before deploy — not discovered afterward when someone notices the stars are gone.
- **If stars are wanted later**, the only compliant route is a genuinely purchasable page (a premium/ad-free tier) carrying its own `Product` node. Never a free card page. Where `aggregateRating` is retained anywhere else on the site, rename `reviewCount` → `ratingCount` and make the integer match a figure rendered **server-side**.

**Deployment sequencing — P0-5 and P0-6 ship together or not at all.** Removing `Product` while leaving a dangling `aggregateRating`, or shipping correct `VideoObject` onto a page that still renders an empty div, each produces a third broken state and makes any May-14-style regression unattributable. Canary, hold, then roll — see §4b for the rollback plan.

---

### 4.2 P1 — next

| ID | What | Evidence | Why it matters | Fix | Effort | Owner | Status |
|---|---|---|---|---|---|---|---|
| **P1-1** | **One canonical `Organization` node** | Card-page `Organization` carries **name + url only** — no logo, description, `foundingDate`, `sameAs` — although **six social profiles are linked in the page's own footer.** No English Wikipedia article (only `File:123greetings.png` and a `MediaWiki talk:Spam-whitelist/Log` entry). Firmographics conflict across every source: founded **1997** (Crunchbase, company sources) / **1998** (RecoCards, the copy AI engines quote) / **1999** (BBB). HQ **1674 Broadway NY** (Craft.co) / **Plainview NY** (BBB) / **Mumbai** (CB Insights) / "India Development Center at Kolkata" (company investor FAQ). Card count **20,000** (own help page) / **30,000+** (brief) / **40,000+ under 3,000 categories** (company sources, HowToGeek, RecoCards). Headcount **201–500** (LinkedIn) vs **30** (another profile) | With no Wikipedia article and no confirmable Wikidata item, **the site's own structured data is the primary machine-readable statement of who it is, and that statement is two fields long.** Cheapest AEO/GEO lever available. Benchmark #5 shows the consequence live: the best grounded description the brand earns anywhere says **"since 1998"** — the wrong year propagating because no authoritative record exists to correct it against | One `Organization` node **on the homepage only**; every other template references `{ "@id": "https://www.123greetings.com/#organization" }` rather than repeating properties. Full block in §4.2.1. The six `sameAs` URLs must be **copied from the footer links that already exist — do not invent handles.** **BLOCKER:** ship with `address` and `legalName` **omitted** rather than guessed; an `Organization` address is the field most likely to be surfaced verbatim by an LLM. Same for the card count — do not put a number in `description` until one is verified | small | Backend | **U+LF** |
| **P1-2** | **`@graph` + stable cross-host `@id`s + absolute pairing** | Card JSON-LD is separate standalone declarations (`Product`, `VideoObject`, `Organization`, `BreadcrumbList`) with **no cross-references and no `@id` anywhere.** The alternate tag to m. is **protocol-relative**, not absolute https | Nothing in the markup says that `m/do/card/120478`, `www/do/card/330206` and `www/birthday/happy_birthday/birthday191.html` describe the same work. Google must infer it from canonicals alone, and the alternate tag weakens even that. **Entity dilution at 30,000-card scale** — ratings, views and link equity split across three identities per card. `@id` costs nothing at render time and is the mechanism that collapses them | Three rules, applied **identically on www and m.**: **(1)** one `@context`/`@graph` per page — one script tag, never four. **(2)** Every node gets a stable `@id` fragment **on the canonical www `.html` URL**, regardless of which host rendered the page — so `m/do/card/120478` emits `"@id": "https://www.123greetings.com/birthday/happy_birthday/birthday191.html#card"` while its `WebPage` node's `url` and `mainEntityOfPage` reflect the m. URL actually served. This is the standard way to say *different address, same thing*. **(3)** Never inline `Organization`; always reference by `@id`. Fragment convention: `#webpage #card #breadcrumb #website #organization #logo`. Plus: **make the alternate absolute https** and add the reciprocal absolute canonical from m. to www | medium | Backend, **both codebases** | U |
| **P1-3** | **Real sitemaps on both hosts** | `www/sitemap.xml` holds **~135 URLs** — home, 17 hubs, ~100 world-language pages, ~12 events. No subcategories, no cards, no blog, no past events, no `/tags/`, no `/profile/`. **Identical `lastmod` on every entry, stamped at fetch time.** No sitemap index. **No m. sitemap is known to exist.** Against that, the index demonstrably holds cards in two slug styles, the whole `/tags/` space, `/profile/<user>` Studio pages, `/top/latest.html`, `/top/most_popular.html`, `/top/most_viewed.html`, and the entire m. `/do/` space | Coverage well under **1%**, and the omitted parts are the parts that earn traffic. The identical synthetic `lastmod` is **actively harmful** — Google learns the file's dates are meaningless and discounts `lastmod` site-wide, so even correct future signals get ignored. Most consequentially, **m. is the mobile-first-indexed host and has no sitemap at all**, so mobile discovery depends entirely on internal linking — which is how a facet crawl trap absorbs the budget card pages needed. §7.4 pattern (1) finds that every prompt where a real hub ranked hit a sitemapped URL | Sitemap **index** at `www/sitemap_index.xml` referencing children capped at 50k: `sitemap-cards-N.xml`, `-hubs`, `-tags` (post-P1-4, thin tags excluded), `-events`, `-profiles`, `-blog`. Create `m/sitemap_index.xml` covering `m/do/card/{id}` plus **unfaceted** subcategory hubs only — explicitly exclude every `/s/<format>` and `/p/<n>`. **`lastmod` from the record's actual modified timestamp; if that column does not exist, omit the element entirely rather than synthesising one.** Reference both from the respective `robots.txt`. **Add image and video sitemaps in the same release** (critic B6) — 30,000 images and a musical-card library currently have no image or video discovery channel at all. Remove or 301 the `h-source` site-map page | large | Backend | U |
| **P1-4** | **Normalise the `/tags/` space** | Punctuation mangled into slugs rather than normalised away: `/tags/thankyou_.html` (title "Free Thankyou! eCards…" — trailing `!` became `_`) and `/tags/what_s_app.html` ("Free What's app eCards…"), coexisting with `/tags/thank_you.html` and a "Thank-you" title variant. Also `/tags/housewarming` vs `/tags/house_warming`. Junk tags indexed: `/tags/show.html`, `/tags/stay_home.html`, `/tags/come_home.html`, `/tags/love_phrases.html`. Tag pages run a **third** title template using a different brand suffix ("Greetings from 123greetings.com" vs "\| 123 Greetings") and inherit the doubling bug ("Free Heartfelt ecards eCards…") | Tags are user-added and uncontrolled, so **every free-text variant mints a URL**, and the slug function passes punctuation through to underscores instead of stripping. `/tags/` is one of only ~135 sitemapped URLs, so these are **actively advertised to Google** while card pages are not. Benchmark confirms the cost live: `/tags/good_morning.html` splits a citation slot with its own hub (#17), and `/tags/america.html` is the brand's only own URL on "123greetings vs american greetings" (#20) — an accidental keyword collision on the word *America* | **(1)** Fix the slug function: strip punctuation entirely, collapse runs of underscores, trim leading/trailing (`thankyou!` → `thankyou`; `what's app` → `whats_app`). **(2)** Normalise on write: lowercase, collapse whitespace, map through a synonym table; group existing tags by normalised slug, keep the highest-card-count member, **301 the rest.** **(3)** Gate indexation on volume — below ~10 distinct cards gets `noindex,follow`. **Do not rely on canonical: these are distinct card sets, so `noindex` is the correct instrument.** **(4)** Strip `ecard/ecards/card/cards` tokens from tag values before the title template, and align the brand suffix. **(5)** Promote the `/tags/` pages that rank for real demand — **`/tags/senior_citizen_day.html` is the top result for a senior-ecard query and is the brand's only asset there** — to proper hubs with an H1, intro copy, curated selection and `CollectionPage`+`ItemList`, then 301 the tag URL. Fix the title-case bug ("Senior Citizen Day", not "Senior citizen day"). **(6)** Remove `/tags/` from the sitemap until (1)–(3) ship | medium | Backend + Content ops | **U+LF** |
| **P1-5** | **Title templates, card and hub** | **48 characters of constant boilerplate per card title.** Every card in `/birthday/happy_birthday/` ends in the identical `"Free Happy Birthday Ecards eCards \| 123 Greetings"`, and the unique prefixes are themselves near-duplicates: "Send A Beautiful Birthday ecard.", "A Beautiful Birthday Message!", "A Birthday Wish Full Of Sparkle.", "A Cheerful Birthday Wish…", "A Sweet Cuddly Birthday Wish..". One collides across subcategories: "Send Warm Birthday Wishes." (`happy_birthday`) vs "Send Warm Birthday Wishes!" (`birthday_wishes/wishes84.html`). **Missing delimiter:** where a card name lacks trailing punctuation the title runs on — "A Birthday Wish Floating Your Way **Free** Happy Birthday Ecards eCards" reads as "Your Way Free". **Two hub templates live simultaneously:** `<Sub> Cards, Free <Sub> Wishes \| 123 Greetings` on ten hubs, and the same plus `, Greeting Cards` on `/birthday/blessings/`, `/birthday/pets/` and four m. facets — an undocumented length-padding branch nobody owns. **No facet or page token anywhere:** one string, `"Birthday Wishes & Messages Cards, Free Birthday Wishes & Messages Wishes \| 123 Greetings"`, is indexed on at least four distinct URLs across both hosts | Google truncates around 60 characters. With 48 spent on boilerplate, the displayed portion of ~500 URLs collapses into variations of "A Birthday Wish…" — and because the pages are also near-empty of text, Google has nothing else to tell them apart. **A textbook cannibalisation pattern, and a plausible contributor to the May 14 cliff independent of the schema cause** (§4c). The identical facet titles mean the cross-host duplication is real **and title-level**: the two hosts do not share URL taxonomy but they do share title tags, which is what Google compares | **Card:** `<trim trailing .,!… from Card Name> — Free <Subcategory> eCard \| 123 Greetings`. Explicit em-dash separator; trimming trailing punctuation also cleans "Wish.." and "Fireworks!." without touching data. Saves ~18 characters (P0-8 removes "Ecards"). Then differentiate the prefix from data already held — dominant tag or format: "A Birthday Wish Floating Your Way — Animated Penguin Birthday eCard". **Hub:** collapse to one template modelled on the hand-written `/birthday/` title that already works — `Free <Sub> eCards — Send <Sub> Cards Online \| 123 Greetings` — drop the length-padding branch, and **add a per-row manual override column** so high-value hubs can be hand-written. **Listing:** inject the route's own differentiators — `<Sub> <Format> eCards — Page <n>`, omitting each token when absent. **Add a dynamic count token** driven by the live category count: "1,200+ Free Birthday eCards — Send in Seconds, No Sign-Up" — scale is the brand's structural advantage over every competitor and **no card hub states it**, while third-party roundups quote it. Render the count in visible copy too, so it is verifiable. **Queue a data pass** for curly-quote and missing-apostrophe errors in the card-name column ("'Its Your Day'" should be "It's") | medium | Backend | U |
| **P1-6** | **Card meta description + the shared category helper** | Observed template: `Free online <Card Name> ecards on <TOP-LEVEL Category>` — on `birthday191.html`: *"Free online Send A Lovely Birthday ecard **ecards** on **Birthday**"*. Three defects in one string: ~8 words against a ~155-character render width; "ecard ecards" doubling because the card name already ends in "ecard"; and **"on Birthday"** — the top-level category — where the page sits in the **Happy Birthday** subcategory | Every card page shares this shape, so the description adds **no differentiating text to 30,000 URLs** — and Google will usually rewrite it from page content, except these pages have almost no crawlable content, so there is nothing better to rewrite from. **The wrong-taxonomy-level bug is the same defect as the JSON-LD `isPartOf` naming "Happy Birthday" merely "Birthday"** — meaning one shared category-resolution helper returns the top-level parent instead of the immediate parent, and is wired into at least two templates | Compose from fields that already exist: `<Card Name> — a free <Subcategory Display Name> ecard. <card blurb sentence> Send it free, no sign-up needed.` **The blurb is already stored and already rendered as the page's H2** (`birthday191` = "A fun filled birthday card to make your loved one's day even more special"), so this is a field join, not new content. Strip any trailing `ecard/ecards` token from the card name before appending. **Then fix the shared category-resolution helper to return the immediate parent, and confirm `isPartOf` picks up the same fix.** Add a build assertion that `isPartOf.name` equals the position-3 breadcrumb name on every card page — **one check catches the whole class across all 17 category trees** | small | Backend | U |
| **P1-7** | **De-duplicate hub listings** | A hub carries **~500 card links with every card listed twice**, once under Popular and once under Latest, plus subcategory blurbs truncated with "…" | Two anchors to the same destination means the second is generally ignored — **half of ~500 links are wasted equity** and the crawlable link graph is half as wide as it looks. It also wrecks the unique-text ratio: a page that is 500 repeated anchors and truncated fragments has almost no distinguishing copy, which is why hubs are thin despite being large. Benchmark: engines extracting a hub description get repetition and fragments rather than a statement of what the hub offers | Render Latest as a **set difference** excluding cards already shown in Popular, or collapse to one ranked list with a client-side sort that does not change the rendered link set. Cap the initial server-rendered list at ~60 with real `/page/<n>` pagination so equity flows at controlled depth. **Restore the full two-sentence subcategory blurbs — they are already authored; the template is just clipping them, and they are the only unique prose on the hub** | medium | Frontend | U |
| **P1-8** | **"What to write" blocks on www, and the heading fix** | The query `"blog.123greetings.com" sympathy OR condolence OR retirement…` returned **six www card-detail URLs** (`/encouragement_and_inspiration/sympathy/friend125.html`, `friend49`, `friend42`, `friend43`, `friend59`) plus the hub and `/tags/sympathy.html` — pages that contain **no message content**. A second probe returned `/thank_you/wedding/` and `/birthday/birthday_wishes/` **ahead of any blog spoke**. Separately: card headings run **H1 → H2 → H4** with no H3, and the H2 is the blurb sentence — prose, not a section heading — so the H4s below it have no parent section | **The site's own inventory suppresses its own answer content.** When Google must choose a 123greetings result for an occasion-message query it picks a 30-word card page on the authoritative host over a message guide on the weaker one — and that page cannot win a snippet because there is no extractable answer on it. This is the mechanism behind blog spokes losing their own exact-match slugs. On the heading side: when a page has ~30 words, **the heading outline IS the document structure** Google and LLM extractors parse, and a page whose only H2 is a marketing sentence offers no parseable sections | On each www **category and subcategory hub**, add a short question-form block **above the card grid**: H2 "What to write in a sympathy card", the same 40–60 word answer paragraph used on the blog spoke, then a prominent link to the spoke. **Do not add this to individual card pages — it would duplicate across 30,000 URLs.** On **card** pages instead, add a per-card block seeded by card ID from the mapped blog post (5–8 examples, distinct subset per card so card pages do not become duplicates of each other), built from a `subcategory_id → blog_slug` table that is **editorial, not scraped**. Ship on `happy_birthday` first and measure. **Same change:** demote the blurb from H2 to `<p class="card-blurb">` (carry the weight in CSS) and promote the tab headings from H4 to H2 — "About this eCard", "What to write in a <Sub> card", "Comments", "Related eCards". **Ships to both hosts** (§3.4) | large | Content ops + Backend | **U+LF** |
| **P1-9** | **Own the conquest and comparison queries** | On "free ecards no signup required" the brand is named **first** — "over 40,000 designs and no signup required" — with **zero 123greetings URLs retrieved.** That is parametric recall, not grounding: strict-grounding engines drop it, and it produced an unverifiable "40,000" figure. On "jacquie lawson alternatives free" the brand is cited first **entirely on third-party blogs** (Thankbox, Kudoboard, CB Insights, Semrush) — **zero own URLs.** On "american greetings free alternative" the brand is **absent**, while `instantecard.com/american-greetings-alternative` ranks #1 and supplies the whole answer, **whose core argument is verbatim 123Greetings' own value proposition**: "no subscription, no signup, no membership." Every "X vs 123Greetings" page in the index is third-party or competitor-owned | **The brand wins one conquest query on borrowed roundups and loses the other because no roundup happened to cover it — proof the visibility is unowned and luck-dependent.** A far smaller brand owns the position purely by having built **one page** that names the competitor in the URL. Comparison and alternatives pages are among the most-retrieved formats for AI purchase-intent answers, and the brand has ceded the entire format | **(a) First, verify the product claims.** Confirm the no-registration policy, the two-email flow, the paid-tier price and the card count against the live product. **Do not publish an unverified price or a no-signup promise.** Then add crawlable non-JS no-signup copy to the **existing homepage** and footer — **not a new `/free-ecards/` URL**, which would cannibalise the homepage for the site's core head term. **(b)** Build `/american-greetings-alternative.html` and `/jacquie-lawson-alternative.html`, plus an honest comparison cluster ("vs Blue Mountain", "free ecard sites that need no registration"). **Be genuinely even-handed** — concede design and personalisation to the design-led competitors and win on the axes actually owned: free with no subscription, no account to send, no account to receive, library size, 100 recipients per card, 60-day scheduling, occasion breadth. **A page that declares 123Greetings the winner on every axis will not be cited.** Visible last-updated date. **Gated on §3.4** — these are new www paths with no m. counterpart | medium | Content | **U+LF** |

#### 4.2.1 P1-1 — paste-ready `Organization` (homepage only)

```html
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": "Organization",
   "@id": "https://www.123greetings.com/#organization",
   "name": "123Greetings",
   "alternateName": ["123Greetings.com", "123 Greetings"],
   "legalName": "{{REGISTERED_ENTITY_NAME — legal/finance to supply}}",
   "url": "https://www.123greetings.com/",
   "logo": {
    "@type": "ImageObject",
    "@id": "https://www.123greetings.com/#logo",
    "url": "https://www.123greetings.com/{{LOGO_PATH}}",
    "contentUrl": "https://www.123greetings.com/{{LOGO_PATH}}",
    "width": 600,
    "height": 60,
    "caption": "123Greetings"
   },
   "image": { "@id": "https://www.123greetings.com/#logo" },
   "description": "123Greetings is a free online greeting card service offering animated ecards, postcards and video greetings for birthdays, holidays and everyday occasions. Founded in 1997.",
   "slogan": "Free Greetings For The Planet",
   "foundingDate": "1997",
   "founder": [
    { "@type": "Person", "name": "Arvind Kajaria" },
    { "@type": "Person", "name": "Sharad Kajaria" }
   ],
   "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://help.123greetings.com/"
   },
   "sameAs": [
    "{{FACEBOOK_URL}}", "{{X_URL}}", "{{INSTAGRAM_URL}}",
    "{{PINTEREST_URL}}", "{{YOUTUBE_URL}}", "{{LINKEDIN_URL}}",
    "https://www.crunchbase.com/organization/123greetings",
    "https://www.trustpilot.com/review/www.123greetings.com",
    "https://play.google.com/store/apps/details?id=com.g123",
    "https://apps.apple.com/app/id718873921"
   ]
  },
  {
   "@type": "WebSite",
   "@id": "https://www.123greetings.com/#website",
   "url": "https://www.123greetings.com/",
   "name": "123Greetings",
   "alternateName": "123Greetings.com",
   "inLanguage": "en-US",
   "publisher": { "@id": "https://www.123greetings.com/#organization" }
  }
 ]
}
</script>
```

**`address` is deliberately absent.** Do not add it until the New York / Plainview / Mumbai / Kolkata conflict is resolved with the business. An `Organization` address is the field most likely to be surfaced verbatim by an LLM, and publishing an unverified HQ is precisely the inaccuracy the structured-data policies prohibit. Ship without it; add it in a follow-up. Same for `legalName`, and for any card-count figure in `description`.

**`foundingDate`: 1997 is the recommendation** — company-owned sources and Crunchbase agree, against 1998 (RecoCards, i.e. the copy AI engines are quoting back) and 1999 (BBB). If 1999 is the incorporation date and 1997 the launch date, **say so in one sentence on the About page** rather than leaving two bare numbers loose. Then propagate the chosen value to: this node, the BBB profile, the LinkedIn founded field, `info.123greetings.com` About copy, and every Tier 2 PR fact sheet.

---

### 4.3 P2 — after P0 and P1

| ID | What | Evidence | Fix | Effort | Owner | Status |
|---|---|---|---|---|---|---|
| **P2-1** | **`/events/` — `CollectionPage`, and an explicit ban on `Event`** | Indexed `/events/` pages are card listings named after observances: `/events/mothers_day/`, `/national_smores_day/`, `/halloween/`, `/easter/`, `/seasons_greetings/`, `/christmas_world_day/french/`, plus `/events/calendar/` titled **"Events Calendar For 2026 January"** and `/events/popular/` | **The folder name is inviting the mistake and it is the one with the worst downside in Google's ruleset.** Marking up non-events risks *the entire website* being disqualified from rich results — and these are not events: nothing occurs at a place and time, no attendees, no tickets, no venue. Use `CollectionPage` + `ItemList`, exactly as on category hubs, and name the observance through **`about`** rather than by typing the page as one: `"about": { "@type": "Thing", "name": "Mother's Day" }`. **Add a literal "no `Event` schema on `/events/`" line to the template README and to the CI schema linter.** `/events/calendar/`'s month-locked title means any `name` derived from that variable is wrong eleven months a year — **source the schema `name` from a static string.** This extends the shipped hub pattern; it is not a re-report of it | medium | Backend | U |
| **P2-2** | **Blog: `BlogPosting`, a real author, occasion hubs — and no `FAQPage`** | The blog holds human-written, list-format titles that read as genuine answer content, on flat `/topic-messages/` slugs with no hierarchy. Title template is inconsistent: `/mothers-day-messages-for-wife…/` carries a 12-word tagline suffix ("… - 123Greetings Blog - Free eCards, Card Message Ideas & What to Write in Any Greeting Card") while siblings are clean — **two title paths in the theme**, so the bug will recur on new posts. Hallmark's equivalent runs a topical path (`ideas.hallmark.com/articles/birthday-ideas/birthday-wishes/`) that ranks | Emit one `@graph` per post with `BlogPosting`: `headline` matching H1 under 110 chars, `description`, `image` (≥1200×675), `datePublished`/`dateModified` with offset, **`author` as a named `Person` with a URL to a real bio page — not "Admin", not the Organization**, `publisher: { "@id": ".../#organization" }` (this is what links the subdomain's authority to the brand entity), `mainEntityOfPage`, `inLanguage`, `articleSection`, `keywords`. Add a `Blog` node for the root. **Where a post links to matching cards, add an `ItemList` of those card URLs — that is the mechanism routing blog authority into the card corpus.** Fix the title source (SEO plugin only; disable the theme tagline fallback; `%post_title% \| 123Greetings`, 60-char cap). Add occasion-level hub pages (`/birthday/`, `/friendship/`, `/farewell/`) that list and interlink posts, cross-linked to the matching www card hub both ways — **do not re-slug existing posts** if that risks the in-flight Core Web Vitals work. **Do NOT add `FAQPage` or `HowTo` as a ranking play** — see P2-7 | medium | Content + WordPress | U |
| **P2-3** | **Studio artist profiles: `ProfilePage` + `Person`** | `http://www.123greetings.com/profile/all/` is indexed **over HTTP**, carrying the Mode-B generic title. Individual profiles (`Joyous_Ecards`, `greenwise`, `mannysoriano`, `corrina`, `krish`, `catlady56`, `poweredbyyoutube`) carry "Studio Profile of <Real Name> (<handle>) - 123Greetings". The class is absent from the sitemap | These are the identities behind the artwork — **the `creator` value both the corrected `VideoObject` and `ImageObject` reference.** Right now those references point at URLs carrying no `Person` markup, so the creator claim dead-ends. Emit `ProfilePage` with `mainEntity` as a `Person` (`name`, `alternateName` = handle, canonical https `url`, `image`, `description`, `sameAs`), plus an `ItemList` of that artist's cards, and make each card's `creator` resolve to `{ "@id": ".../profile/<handle>#person" }` so the reference is bidirectional. Same ticket: **301 all `http://` `/profile/` URLs to https**, give `/profile/all/` a real title and `CollectionPage`+`ItemList`, add the set to a sitemap. **Genuine first-party UGC that none of Jacquie Lawson, American Greetings or Hallmark has** | medium | Backend | **U+LF** |
| **P2-4** | **Give m. card URLs a slug** | Competitor card URLs encode occasion + name + stable ID: `americangreetings.com/ecards/birthday/birthday-how-to-ecard/card-3103352`, `bluemountain.com/ecards/birthday/birthday-celebration/card-3399647`, `hallmark.com/cards/greeting-cards/the-most-perfect-day-birthday-card-for-her-699HBD4852.html`. The mobile-first-indexed 123greetings card URL is `m/do/card/120478` — **no occasion segment, no card name, no breadcrumb signal** — and it frequently carries the generic homepage title | **On the host Google mobile-first indexes, an AI crawler gets a URL with zero tokens, a title naming a different page, and a body it cannot render.** Every signal for identifying and attributing that document is absent simultaneously, so a retrieved chunk is literally unattributable. Fix: `/do/card/<id>/<slug>` with the bare numeric form 301ing to the slugged form, keeping `<id>` as the authoritative lookup key so old URLs resolve. **Ship in the same release as the title fix — a slug on a page still titled with the homepage string fixes nothing.** Longer term mirror the AG pattern with an occasion prefix. **Gated on the §3 decision:** if Option B is taken, this work moves to www and the m. route is retired instead | large | Backend (m.) | U |
| **P2-5** | **`help.`, `studio.` and utility endpoints** | `help.` indexes every FAQ category in **three** query-string forms: nine parameterised URLs including `?CategoryID=4&Msg=&mobile=0` (an **empty** `Msg`), `?CategoryID=6&CategoryTitle=address-book&mobile=0`, and `&mobile=0` on all of them — while the same categories are also indexed as clean paths. `studio.` runs a **public MediaWiki** (`/wiki/index.php/Main_Page`, `/FAQ_Using_Studio`, `/Music`) plus `/cgi-bin/studio/home.pl` duplicating the studio root. `m/do/optout`, `m/do/connect/register`, `m/do/viewecard` are indexed. Separately `help.` holds a **large corpus of already-question-titled URLs** with IDs running to at least 154 (`/how-do-i-send-an-ecard_1.html`, `/how-do-i-unsubscribe_27.html`, `/how-do-i-change-my-password_88.html`, `/How-do-I-remove-the-secondary-email-address…_154.html` — note the mixed-case outlier) | **`mobile=0` is the notable one — it implies device state is encoded in URLs somewhere in this codebase, which is exactly the pattern that produces mobile/desktop duplicate pairs.** Fix: 301 `index.php?CategoryID=N[&anything]` → the clean path; strip `Msg` from URL generation entirely (it should be a flash value); move `mobile` to device detection or a cookie; **do not use GSC parameter handling — it is deprecated.** Lower-case the `_154` URL and 301 the mixed-case form. **The help corpus is the only content on the estate already shaped the way answer engines want** — a literal question as the title, one answer per URL — so: normalise titles to `<Question> \| 123Greetings Help` (drop the `::` construction), **add a 40–60 word direct answer as the first paragraph of every article before any UI steps**, and link the corpus from the www footer and the blog hub so it is reachable from pages with authority. `studio.`: `Disallow: /wiki/index.php?` and `/wiki/index.php/Special:`, `$wgNoFollowLinks = true`, require account approval — an open wiki on a brand subdomain is a standing spam-vandalism target and **the domain already has a Wikipedia spam-blacklist history it should not be reinforcing.** If the wiki is unmaintained, export the FAQ content to `help.` and retire it with 301s. 301 `/cgi-bin/studio/home.pl` → studio root. Utility pages get `noindex,follow` (keep *follow*), **not** `robots.txt` Disallow — they are already indexed, so the `noindex` must be crawlable to take effect | small–medium | Backend | **U+LF** |
| **P2-6** | **Facet on intent, not on delivery format** | Greetings Island indexes `/cards/birthday/for-him`, `/for-her`, `/funny`, `/kids`, `/kids/girls`, `/theme-vintage`, `/add-a-photo`. American Greetings: `/ecards/birthday/for-her`, `/for-him`, `/for-kids`, `/for-friend`, `/for-anyone`, `/funny`. Blue Mountain mirrors it. Against these, the 123greetings facet space discriminates on **delivery format** — `/s/videos`, `/s/gif`, `/s/postcards`, `/s/latest` — and the one recipient facet that exists is the unreadable `birth_forher` | **"birthday cards for him" and "funny birthday cards" are the queries; "birthday gif cards page 7" is not.** Competitors have one crawlable, linkable, titleable page per real search intent. 123greetings spends its entire crawl budget on a format × page space with no demand behind it. For answer engines the effect is worse: an LLM asked for "birthday cards for dad" has an AG page whose URL, title and H1 all say so, versus a URL that says `birth_forher`. Fix: define an intent facet set per top category (`for-him`, `for-her`, `for-mom`, `for-dad`, `for-friend`, `for-kids`, `funny`, `belated`, milestone ages) with **human-readable slugs**, each with a unique title, H1 and 150+ words of crawlable copy, linked from the category hub. **Demote the format facets to `noindex,follow` or to a JS filter that mints no URL. Keep `/s/latest` out of the index entirely — it is a sort order, not a page.** This is also the fix behind benchmark #3, where "animated" is a format qualifier the site has unique inventory for and no www page expressing it | large | Backend | U |
| **P2-7** | **`FAQPage` is deprecated — spend the schema budget on `speakable` and question H2s instead** | Confirmed across five independent sources: Google deprecated FAQ rich results on **7 May 2026**, with the Search Console FAQ report and Rich Results Test support removed in June 2026 and API support in August 2026. This removes the last narrow eligibility authoritative government and health sites retained after the August 2023 restriction. `HowTo` was deprecated on mobile then desktop on 14 September 2023. `FAQPage` remains valid schema.org and Google still parses it; leaving existing markup in place is harmless | **An AEO plan written from pre-2026 playbooks will budget engineering time for markup that can no longer produce a Google rich result.** Do not add `FAQPage` to the new spokes as a ranking play. If any page already emits it, leave it — removal is not worth a deploy. Spend the budget on: **(a)** `Article`/`BlogPosting` on every spoke with a populated publisher (P2-2); **(b)** `speakable` `SpeakableSpecification` pointing at the H1 and the CSS selector of the 40–60 word answer paragraph — **the remaining voice-answer hook**; **(c)** `BreadcrumbList` hub→spoke. **Keep question-form H2s in the HTML — those are what Bing, Perplexity and the RAG crawlers parse, and they cost nothing.** *Note the tension with P0-10(b), which specifies FAQPage on the 123cards disambiguation page: that is defensible for LLM extraction and entity clarity, but **document it as such so it is not later mistaken for a snippet play**.* | small | Backend | **U+LF** |
| **P2-8** | **The ad experience is the citation blocker** | Every roundup that includes the brand pairs it with the same two criticisms in language models reproduce verbatim. RecoCards: *"designs feel dated, ads are everywhere, and personalization is limited"*; no1reviews: *"you'll have to endure adverts littered around the site"*; and the sentence that matters most — *"the ads show to both you and the person opening the card, which can undercut the moment."* Sitejabber (2/5) and SmartCustomer (2.5/5, 61 reviews): *"more like an ad website that on the side offers eCards"*, ads *"making it nearly impossible to select and send an ecard on mobile devices."* This corroborates four concurrent ad stacks with an active interstitial `unhideWindow`. Jacquie Lawson competes for the same 50–70 audience on an explicit **"no ads"** promise and a deliberately small indexed footprint | **This is the mechanism by which a UX decision becomes a GEO outcome.** The recipient-side ad exposure in particular is the sentence that turns a listing from a recommendation into a warning, and it is now embedded across independent publishers, review platforms and therefore training and retrieval. **No schema, sitemap or content work will move AI sentiment while that sentence keeps being written.** It is also the one criticism entirely within the company's control. **Fix, in two halves — the second is not optional:** *(i)* treat the recipient-side `viewecard` experience as a separate surface from sender-side browse and strip it — remove interstitial and anchor from card-view and `/do/viewecard`, drop the two side rails on mobile, cap card-view to one in-content unit above the fold; *(ii)* **make the change publicly citable** — a dated blog post and a note in `/free-ecards-faq.html` saying recipients now see an ad-free card view — and take that citation to the §6.2.2 publishers as the reason to update their copy. **Without the second half the corpus does not change even if the product does.** Also surface the ad-free Pro tier on the card page so the objection has a visible answer instead of being resolved in a competitor's roundup. **See §4b for the revenue guardrail — this must not ship as an unmeasured cut** | large | Revenue Ops + Frontend | **U+LF** |
| **P2-9** | **`chk_site_active.js`** | Loads **synchronously in `<head>`** on the card template; described as possibly a JS mobile redirect. The alternate link to m. is protocol-relative | **If host selection is done in JS then to every AI crawler the redirect does not exist** — the crawler stays on whichever host it landed on and both hosts remain independently retrievable, reinforcing the duplication rather than resolving it. It is also render-blocking on a page whose byte budget is already spent on four ad stacks. **Read the file and establish what it does.** If it performs any host or device redirect, move that logic server-side to a 301 with `Vary: User-Agent` and delete the script from `<head>`. Make the alternate absolute: `<link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.123greetings.com/do/card/<id>">` with the reciprocal absolute canonical on m. **Verify the pairing resolves both ways with `curl -I` on both hosts.** *This is also one of the two candidate explanations for the generic-title symptom in P0-4 — read it before P0-4 branches* | small | Frontend | **U+LF** |

---

### 4.4 P3 — gated decisions, not scheduled work

| ID | What | Gate | Note |
|---|---|---|---|
| **P3-1** | **Programmatic recipient × occasion expansion** — 8 recipients (mother, father, sister, brother, coworker, boss, teacher, best friend) × 9 occasions, generated from existing card metadata | The fifteen manual spokes in section 5 validated | **This is the model `adobe.com` already runs** — `/express/discover/messages/card/new-baby`, `/express/discover/wishes/birthday/belated`, across at least four path patterns and multiple geo-folders. Adobe appeared in **8 of 9** message-query probes and is the most consistently present entity in these SERPs, yet is absent from the supplied competitor list. **Hard gate: each generated page must carry a genuinely distinct 40–60 word answer block, not a templated string swap.** That is a *policy* gate, not a quality gate — see §4a on scaled content abuse. Also: **do not replicate Adobe's own failure modes** (`/messages/condolences` and `/messages/condolence` as separate near-duplicate URLs; geo-folder duplication) |
| **P3-2** | **Wikidata item** | All four fact conflicts resolved to *sourced* values; COI disclosed | Do **not** create it from a brand-controlled undisclosed account — the domain has a `MediaWiki talk:Spam-whitelist/Log` history, and an item created by the subject about a previously blacklisted domain with unsourced founding/HQ values is a deletion nomination waiting to happen. Model **one** entity (`P31` = business, with `P856` official website) — do not dual-instance business + website. **Drop dead properties:** Alexa (service shut down May 2022, properties deprecated) and Crunchbase organisation ID (removed from Wikidata over licensing). Attach a reference to every non-trivial statement. Wikipedia itself is a **12–24 month PR outcome contingent on independent coverage, not a schedulable SEO deliverable** — do not book it as expected value |
| **P3-3** | **Image and video discovery channel** | P1-3 shipped | 30,000 images and a musical-card library with no image sitemap, no video sitemap, no `Lens`/Images assessment, and no confirmed YouTube or app-store property (both of which are also `sameAs` signals P1-1 needs). Benchmark #25 shows the musical-card category is the brand's **strongest** showing and the only prompt where a card page earns a citation — **for this product, image and video search are plausibly larger recoverable channels than any of the fifteen question pages** |
| **P3-4** | **Group-signing capability** | Product decision | RecoCards and SendWishOnline are reshaping the coworker query around it (benchmark #26) and the brand appears not to have it. A product gap, surfaced here because it is changing a SERP the brand currently ranks 3rd on |
| **P3-5** | **Responsive consolidation** | §3 Option B gate: 90 days of GSC on both hosts, m. source fully mapped, `/do/` collapse verified stable, **and the www card template made responsive (viewport meta)** | The strategic answer to everything in §3 |

---

### 4a. Policy exposure — name it, then check it on day one

*Critic A3. The word "penalty" appears nowhere else in this audit, and it should.*

Two of Google's spam policies are plausibly in scope. Neither is observed — **there is no GSC, so the Manual Actions report has never been read.** That is precisely why this belongs in Week 1 rather than in a footnote.

**1. Spammy structured markup.** The card template currently emits, on a free digital card: a `Product` node with an `Offer` at price `0.00`, `shippingDetails` and a return policy describing a shippable returnable good that does not exist; and an `aggregateRating` declaring `reviewCount` where the visible figure is a star rating, with the comments block JS-injected so the claimed review count is very likely **not present in rendered HTML at all**.

Be precise about the severity, because overstating it is how audits lose credibility: Google's standard response to type/content mismatch is **silent rich-result ineligibility**, which is very likely what already happened on May 14 — not a manual action. Manual actions target markup that *deceives users in ways that surface in results*. A sloppy `$0` Product wrapper on a genuinely free card is **inaccurate rather than deceptive**, and the markup wins nothing.

**But an `aggregateRating` whose count is not rendered on the page is the one element that crosses from inaccurate into the territory enforcement actually targets.** That is enough to reframe P0-6 from housekeeping to **risk remediation** — which changes who signs off and how fast.

**2. Scaled content abuse / doorway pattern.** The estate presents a recognisable profile: 6,000–12,000 generated facet URLs (floor estimate), ~30,000 thin card pages with ~30 crawlable words each, a `/tags/` space minting a URL per free-text variant and generating pages that rank for the wrong intent, and five unsecured mirror hosts serving duplicate content. No individual element is abusive. The aggregate is the shape the policy describes.

This matters most for **P3-1**: the "genuinely distinct 40–60 word answer block" gate on programmatic expansion is written in this document as a quality gate. **State it as a policy gate.** Generating 72 recipient × occasion pages by string substitution, on an estate that already carries this profile, is the exact pattern.

**Action — the first output of P0-0(a), same day:**

> Screenshot the **Manual Actions** and **Security Issues** reports for both `www` and `m.` the hour GSC verification completes. Escalate immediately if either is non-empty. If both are clean, record that fact with a date — it converts P0-6 from "we might be exposed" into "we are not exposed and we are removing the exposure before we are," which is a materially easier conversation with engineering leadership.

---

### 4b. Risk register

*Critic B14. Risks were previously scattered in prose. Every high-blast-radius change in this document is here.*

| # | Risk | Likelihood | Blast radius | Early-warning signal | Rollback |
|---|---|:---:|---|---|---|
| **R1** | **404-ing 6,000–12,000 facet/pagination URLs (P0-3) removes URLs that currently earn impressions** | Low–medium | Medium. These are re-sorted views of the same inventory, so demand should reflow to hubs — but "should" is doing work here, and there is no impression data to check it against | GSC Pages report: "Not found (404)" count rises as expected, **but** total impressions for the m. property fall more than the facet share. Watch weekly | Facet 404s are a routing rule. Revert the rule; the URLs resume serving 200 and re-index within days. **Low-cost rollback — this is the least risky of the four** |
| **R2** | **404-ing the bare `/do/card/` and `/do/cards/` roots (P0-1) breaks inbound links** | **Medium** | **Potentially high and currently unknowable.** 29 years of sent ecards, forwarded emails and social shares may point at `/do/card/{id}` URLs. The **301 on `/do/card/{id}` is safe and correct**; it is the **root 404** that is asserted with no inbound-volume check | **This is the one item that must not ship on schedule.** Gate it on the P0-0(c) log export: count requests to `/do/card/` and `/do/cards/` with no ID segment over 30 days, and count referrers | **Gate, do not roll back.** If the roots carry meaningful traffic, 301 them to the relevant hub instead of 404-ing. **Ship the `{id}` 301 in week 2 as planned; hold the root 404 until the logs land.** The §9 Week-2 table has them as one row — split it |
| **R3** | **Stripping interstitial and anchor ads (P2-8) costs a material share of revenue** | **High that it costs something; unknown how much** | **Potentially the largest business risk in the document.** The recipient-side pageview is the highest-volume surface on an ad-monetised free product — plausibly the company's main revenue line. §8 gap 3 concedes the trade cannot be evaluated without GA4, and the roadmap schedules it anyway, sized "medium," with no revenue estimate | Daily RPM and total ad revenue on the `viewecard` and card-view surfaces, split from sender-side browse, from the day the experiment starts | **Do not ship this as a cut. Convert it into a measured experiment**: (1) a named decision-maker in Revenue Ops signs off; (2) an explicit revenue guardrail agreed **before** launch ("we will accept up to X% on this surface"); (3) a 50/50 split test on the card-view surface only, not a site-wide change; (4) **graduated alternatives on the table before the full strip** — below-fold only, sender-side only, frequency-capped, first-view-exempt. **Every downstream item that assumes this ships must be marked**: §6.2 Tier 3 PR is explicitly gated on the "ad-fix news hook," so if R3 comes back "this costs 40% of revenue," Tier 3 has no hook and should be re-planned, not quietly attempted anyway |
| **R4** | **The P0-5 + P0-6 schema release moves rankings in the wrong direction** | Medium | **High — this is the release most likely to move rankings in either direction**, across 30,000 pages | Canary cohort's impressions, average position and Video-indexing status in GSC, weekly, against the matched holdout | **Canary with a matched holdout.** 200 treated + 200 held, matched on category, current impressions and depth. **Pre-register the metric and the stop threshold before launch.** Hold 4 weeks, then roll to 100%, then hold 8–12 weeks before judging recovery. Rollback is a template revert plus a static regeneration of the canary IDs — keep the pre-change generated HTML for those 400 URLs so the revert is a file restore, not a rebuild. **Note the confound honestly:** P0-5 and P0-6 must ship together (a correct `VideoObject` on an empty div is worthless, and a dangling `aggregateRating` is a third broken state), so a negative result will not be attributable between them. **Accept a joint readout, and say so in the ticket** |
| **R5** | **De-duplicating hub listings and capping at ~60 (P1-7) removes indexed URLs from the link graph** | Medium | Medium. Cards currently discovered only via a hub's second (Latest) listing could lose their only internal link if pagination is not shipped in the same release | GSC Pages: "Discovered – currently not indexed" rises for card URLs | **Ship the `/page/<n>` pagination in the same commit as the cap. Never ship the cap alone.** Revert is a template change |
| **R6** | **Auth-walling `media.` / `search.` / `123g.us` takes production down (P0-2b)** | Medium if (b0) is skipped; near-zero if not | **High — site outage** | Any 401/403 in the production error rate immediately after the change | **Gate on the P0-2(b0) dependency audit.** `P0-2(a)` — the `noindex` header — carries none of this risk and should ship today regardless |
| **R7** | **The Reddit/Quora programme reads as astroturfing** | Low if the disclosure rule holds | Medium — brand damage on the exact platforms the plan is trying to win | Any moderator removal, any accusation in-thread | **The disclosure requirement is the control.** One clearly-identified brand account, affiliation disclosed in every post, answering the actual question. If a subreddit's rules forbid brand participation, do not post there. Stop the programme on the first removal and review |
| **R8** | **Replacing the sitemap (P1-3) during peak season disrupts crawl of seasonal hubs** | Low–medium | Medium, and **badly timed** — see §4d | Crawl-stats "Discovery" purpose requests, and indexation of the Christmas hubs specifically | Retain the old `sitemap.xml` at its URL as a child of the new index for one cycle rather than deleting it. **Better: ship the sitemap index before the freeze window opens, not during it** |

---

### 4c. The May 14 cliff

*Critic A2. This is almost certainly why the engagement exists, and it has never been diagnosed. Prior work "traced" it to the Product/review-snippet dual-typing — but that template is still live, so either the trace was right and the fix never shipped, or the trace was wrong. Both are live possibilities and they are distinguishable.*

**First, establish the year.** This matters more than it sounds. GSC retains **16 months** of Performance data. From 2026-09-24 that window reaches back to approximately **2025-05-24**.

- If the cliff is **14 May 2026**: comfortably inside the window. Connecting GSC gives a complete before/after on day one.
- If the cliff is **14 May 2025**: it is **already ~10 days outside the window and receding by one day per day.** The daily detail is gone and only the shape after ~24 May 2025 is recoverable.

**[NEEDS VERIFICATION] — confirm the year in the 30-minute business call (Gap 10), and if there is any chance it is 2025, treat P0-0(a) as same-day-urgent rather than same-week.** Either way, this is the strongest single argument for doing P0-0 first, and the document has not previously said so.

#### Candidate causes, the evidence each would leave, and what resolves it

| # | Candidate | Evidence it would leave | How to test | Resolved by GSC's 16-month history? |
|---|---|---|---|---|
| **1** | **Review-snippet loss from `Product`/`VideoObject` dual-typing** (the prior-work hypothesis) | **CTR** collapses on the date while **impressions and average position hold or barely move** — this is the signature of losing a rich result rather than losing a ranking. Rich Results report shows `Review snippet` valid items dropping to zero around the date | GSC Search Appearance filter → "Review snippet". Split clicks/impressions/CTR/position before and after. Compare against the unfiltered curve | **Yes — decisively, and this is the discriminator.** If impressions held and only CTR fell, it is a snippet loss and P0-6 is the fix. If impressions fell too, it is a ranking loss and the prior-work trace is **wrong** — which would materially re-prioritise this whole document |
| **2** | **A Google core or spam update in the window** | Site-wide, proportional across all templates, all hosts; step-change on a date that matches a documented rollout; no corresponding deploy in the change log | Cross-reference the exact date against the Google ranking-update history. **Do this before anything else — it costs five minutes and it is free** | Yes — the shape (site-wide vs template-specific) is visible in Pages + Queries |
| **3** | **A manual action** | Step change, not gradual; concentrated on the page types carrying the offending markup; **an entry in the Manual Actions report** | **P0-0(a), day one.** §4a | **Yes — definitively, and instantly.** The report either has an entry or it does not |
| **4** | **Site-quality / helpful-content style classifier on thin pages** | **Gradual decay over weeks, not a cliff.** Worst on `/tags/` and facet URLs; hubs and the homepage more resilient | Segment GSC Pages by URL pattern (`/tags/`, `/do/cards/*/s/*`, card `.html`, hubs) and plot each separately | Yes — the per-segment shape is the answer. **If it is gradual, it is not "a cliff" and the framing itself is wrong** |
| **5** | **Mobile-first re-evaluation of `m.`** | **Mobile impressions fall while desktop holds** — the cleanest possible signature, and the one nobody has looked for. Googlebot-smartphone crawl-stats change around the date | GSC Performance → Device dimension, split by date. Plus Crawl Stats → by Googlebot type | **Yes, and this one is unique to GSC** — no other source has the device split. Given §3, this is a genuinely live hypothesis |
| **6** | **A deploy or infrastructure regression** — a template change, a canonical change, a `robots.txt` change, a CDN rule, `chk_site_active.js` | Coverage counts shift on the date: "Excluded by noindex", "Duplicate, Google chose a different canonical", "Crawled – currently not indexed". Crawl stats show a response-time or status-code step | **Ask for the deploy log for the week of 14 May.** This is a one-email request and nobody has made it. Cross-reference against GSC Crawl Stats and the Pages report | Partly — Coverage and Crawl Stats are retained. **The deploy log is the other half and it lives with the client, not with Google** |
| **7** | **An ad-stack change** — the interstitial `unhideWindow`, AdPushup or Taboola added — triggering page-experience/intrusive-interstitial effects | **A step change in origin-level INP and CLS in the same month.** Mobile-weighted | **CrUX historical API — P0-0(e). This one is testable TODAY, with no site access and no GSC.** Pull `queryHistoryRecord` for both origins and look for a month-over-month step at the cliff date | Partly. **CrUX resolves the page-experience half now**; GSC confirms whether rankings moved with it. Pair them |
| **8** | **Loss of a referral or Discover source** | Clicks fall with **no change in organic impressions** — because the loss was never organic | GSC Discover report (if the property ever had one); compare against GA4 channel data once connected | Yes for Discover. Referral needs GA4 |
| **9** | **SERP-layout change** — AI Overviews expansion on the category's head terms | **Impressions flat or rising, clicks falling, average position unchanged.** The most commonly misdiagnosed pattern of the nine | GSC: plot impressions and clicks on the same axis across the date. Diverging lines are the tell | **Yes — and this is the cheapest thing to rule out.** Do it in the first hour |
| **10** | **Crawl budget crossing a threshold** as index bloat accumulated | Gradual, not a cliff. Crawl stats show request volume flat while the discovered URL count climbs | Crawl Stats → total requests and by response; Pages → "Discovered – currently not indexed" | Yes, but the gradual shape rules it out as a *cliff* cause almost immediately |

#### The one-hour protocol, the day GSC verifies

Run in this order. Each step either eliminates candidates or names one.

1. **Manual Actions + Security Issues**, both properties. Screenshot. *(Kills or confirms #3 outright.)*
2. **Performance, 16 months, clicks + impressions + CTR + position on one chart.** Note which lines moved on the date and which did not. *(Separates #1 and #9 — snippet or layout loss — from #2, #4 and #5, which are ranking losses.)*
3. **Search Appearance → Review snippet.** *(Directly tests the prior-work hypothesis, #1. This is the single highest-value chart in the whole exercise.)*
4. **Device split.** *(Tests #5, the m./www hypothesis — unique to GSC, and nobody has looked.)*
5. **Pages, segmented by URL pattern.** Cliff or decay; site-wide or template-specific. *(Separates #2 from #4.)*
6. **Crawl Stats, by Googlebot type and by response.** *(Tests #6.)*
7. **In parallel, needing no GSC at all:** the Google update calendar for the date (#2), the CrUX historical series for both origins (#7), and the deploy log request (#6).

**State the result in one sentence, in writing, before any further schema work ships.** If the answer is "impressions held and CTR collapsed on the date, and Review snippet valid items went to zero," then P0-6 is confirmed as the remedy and its priority is correct. **If impressions fell alongside clicks, the prior-work trace is wrong, P0-6 is still worth doing on accuracy grounds but is not the recovery lever, and the top of this document needs re-ordering.** That is a real possibility and the plan should be able to absorb it.

---

### 4d. Q4 peak season — the roadmap has a scheduling error

*Critic B11.*

From a **2026-09-24** start, the three roadmap bands land as:

| Band | Calendar | What it collides with |
|---|---|---|
| Days 0–30 | **24 Sep – 24 Oct** | Clear. **This is the only window in the plan for seasonal work** |
| Days 31–60 | **25 Oct – 23 Nov** | Christmas query volume is already climbing. **P1-3 replaces the sitemap here** |
| Days 61–90 | **24 Nov – 23 Dec** | **Peak.** The roadmap puts the **P0-6 rollout to 100%** — the release it itself calls the most likely to move rankings in either direction — straight through it |

**The entire 90-day plan executes through the category's peak season with no change-freeze window and no seasonal deliverable.** That is a scheduling error, not merely an omission.

**Three corrections:**

**1. Declare a change freeze: 10 November – 5 January.** Frozen items: the **P0-6 rollout to 100%** (R4), the **P0-3 facet 404s** (R1), the **P1-3 sitemap replacement** (R8), and the **P2-8 ad change** (R3 — peak is the worst possible time to run a revenue experiment on the highest-volume surface of the year). Everything else — content, PR, schema on non-card templates, `help.`/`studio.` cleanup — continues.

**2. Pull the seasonal work forward into days 0–30.** Seasonal content must be live **8–10 weeks ahead of the query peak**, which means Christmas assets need to ship in **early-to-mid October**, inside band one. Specifically: re-run the unmeasured `free christmas ecards to send` benchmark prompt **first** (§7.5 already flags it as the highest-value of the three); confirm which `/events/` Christmas hubs exist and whether they are sitemapped; apply the P2-1 `CollectionPage` treatment and the P1-5 count token to the Christmas hubs ahead of the rest; and get those URLs into a sitemap even if the full P1-3 index is not ready.

**3. Write a seasonal-URL lifecycle policy — none exists.** It must answer: evergreen vs year-versioned URLs (`/events/christmas/` vs `/events/christmas-2026/`); what a seasonal hub serves in February; whether last year's URLs 404, 301 or persist; and when the year's content must be live relative to the peak. `/events/calendar/` is already titled **"Events Calendar For 2026 January"** — a month-locked title on an evergreen URL — which is direct evidence that no such policy exists today.

**Then shift the deferred work.** The P0-6 rollout moves to early January, which pushes the recovery readout to roughly March. That is the honest schedule. It is also the right one: **rolling a schema change across 30,000 pages during the highest-revenue four weeks of the year, on a site with no GSC history and no rollback rehearsal, is not a risk worth taking to save six weeks.**

---

## 5. AEO content plan

### 5.1 The four things that have to change together

All fifteen pages below depend on these, and shipping the pages without them produces fifteen more pages that do not rank.

**(1) Title format.** Current blog titles use the count form: "500+ Birthday Messages — Heartfelt, Funny & Unique Wishes", "100+ Thank You Messages", "50+ Funny Belated Birthday Wishes". Every snippet winner uses the **dual question form**: American Greetings — "Birthday Wishes: What To Write In A Birthday Card | American Greetings", "Thank You Messages: What To Write In A Thank You Card"; Hallmark — "Birthday Wishes: What to Write in a Birthday Card". **The question string is what the answer engine matches against**, and "<N>+ <Occasion> Messages" carries no token overlap with "what to write in a birthday card". Both Hallmark and American Greetings converged on the colon-joined form independently because it captures both demand shapes with one URL.

> **Template:** `<Occasion> Messages: What to Write in a <Occasion> Card | 123Greetings`
> **Keep the count in the H1**, where it still earns the click without consuming the title's matching tokens: `What to Write in a Birthday Card (500+ Messages)`.
> Fix the mega-page separator too: `What to Write in a Card: Messages for Every Occasion | 123Greetings` — pipe convention, brand token, no trailing period.

**This is the cheapest change in the plan. It is a title tag and an H1.**

**(2) Answer-block template.** Every winning page leads with a compressed prescriptive statement *before* any examples — sympathy: *"Name the loss, show you care, and offer one real form of support"*; thank-you: *"Start with a greeting, express your gratitude clearly, mention the specific gift, event, or gesture, add a personal note, and close with a warm sign-off"*; get-well: *"Tell the person you are thinking of them, say one specific thing you miss or admire about them, and wish them an easy recovery in your own words."* Each is 20–40 words, imperative, and answers the question before listing examples. 123greetings' pages are described in the index purely as collections.

> **A page that opens with 500 example messages gives the extractor nothing to lift.** It can only produce a list snippet, which loses to a paragraph snippet for a "what do you write" query and is unusable as a voice answer.

**The specification, applied to all fifteen:**

1. **H1** = the question in statement form ("What to Write in a Sympathy Card").
2. **Immediately under H1, before any image, ad slot or TOC:** one `<p>` of **40–60 words** answering the question in imperative voice, repeating the H1's key nouns in its first eight words. **Hard-cap at 60 words in the CMS.** Example: *"In a sympathy card, name the loss directly, say one specific true thing about the person who died, and offer one concrete form of help rather than 'let me know if you need anything'. Three or four sentences is enough — close with 'With deepest sympathy' and your name."*
3. Then a **3–5 item ordered list** titled "How to write it", one short standalone clause per step. These win list snippets and PAA slots.
4. Then **H2s in literal question form**, one per PAA target, each followed by its own 40–60 word answer paragraph **before** its examples. Question H2s, not noun phrases — *"What should you not write in a sympathy card?"*, not *"Things to Avoid"*.
5. Message examples as `<ul>`, each item a complete sendable sentence, grouped under the question H2 it answers.
6. **The first answer paragraph stays above the fold and above the first ad slot.** The mobile ad stack must not push it below the viewport.

**(3) Internal linking — ships in the same release as the pages, not after.** Two control probes prove the split alone is insufficient: `blog.123greetings.com/birthday-messages-for-grandma/` is **absent from all 9 results** for "birthday messages for grandma" (winners: simplynoted, myglobalflowers, meminto, americangreetings, recocards, forestnation), and `/funny-belated-birthday-messages/` is **absent from all 9** for "funny belated birthday wishes" (winners include capitalizemytitle, messagesblooms, capcut, two Pinterest boards). **Both pages have near-exact slug and title match to the query and lose to sites with markedly less authority.** That is a crawl-equity problem, not a format problem — the spokes are effectively orphaned on a subdomain with no inbound path from the www hubs that do have authority.

> **(a)** From each www category hub (`/birthday/`, `/encouragement_and_inspiration/sympathy/`, `/wedding/`, `/congratulations/`, `/anniversary/`, `/business/`) add a contextual link to the matching spoke — **in the hub's intro copy, not the footer.**
> **(b)** From every www **subcategory** hub, link to its spoke.
> **(c)** Hub→spoke and spoke→spoke on the blog.
> **(d)** Add all spokes to a **proper blog sitemap with real per-page `lastmod`.** The www sitemap's uniform fetch-time stamp is already discounted — **do not repeat that pattern on the blog.**
>
> Re-run both control probes **4–6 weeks post-launch.** Persistent failure on both is the trigger for the subdomain-vs-subfolder decision (§6.2.5).

**(4) Split the mega-page.** `/what-to-write-in-a-card/` is a monolith covering **at least seven occasions that have no dedicated page of their own.** A probe for `"blog.123greetings.com" sympathy OR condolence OR retirement OR wedding OR graduation messages` returned it as the **only** blog URL, with wedding, graduation, retirement and sympathy copy all on that one page. No `/sympathy-messages/`, `/wedding-messages/`, `/graduation-messages/` or `/retirement-messages/` URL exists in the index. Meanwhile the **birthday cluster is already split to a fine grain** — grandma, grandpa, uncle, 13th, 90th, across-the-miles, funny-belated. **The team already knows how to build spokes; the non-birthday occasions were simply never split out.**

> **One URL cannot hold seven featured snippets.** Google selects a snippet from a page whose whole topical focus matches the query; a section inside a multi-occasion page loses to a dedicated page every time — which is exactly what the seven head-query probes show.
>
> **Keep `/what-to-write-in-a-card/` as the hub** — it holds the cluster's link equity and is the only blog URL besides the homepage that surfaces on brand queries. Cut each occasion section to a **40–60 word summary plus a "Read the full guide" link**, and move the full content to spokes. Where a spoke consolidates an existing post (`/birthday-messages/`, `/thank-you-messages/`), **301 — do not run both.**

### 5.2 The first fifteen pages, in build order

Ordering weights: demonstrated weakness of the incumbent set; whether inventory and message copy already exist to repurpose; and whether a page exists to *retitle* rather than write from scratch. **Owner data is from index probes run 2026-09-23** — re-verify before pitching, SERPs move.

**Hard prerequisite on page #1: the §3.4 m.-counterpart question must be answered first (P0-7).** If new www paths have no mobile counterpart, pages 1–15 go on `blog.` only until that is resolved.

| # | URL | Target query | Current owners | The beat-case | Links to (www) |
|:---:|---|---|---|---|---|
| **1** | `/how-to-sign-a-card-for-a-coworker/` | how to sign a card for a coworker | Pinterest ideas board, basicinstructions.net, lookbusy.substack.com, handwrytten.com, kudoboard.com | **Weakest incumbent set observed in any probe** — two of nine results are a Pinterest topic page and a Substack post. Win with a **decision table** (relationship × occasion → sign-off) plus the 40–60 word answer | `/business/` |
| **2** | `/is-it-ok-to-send-an-ecard/` | is it rude to send an ecard | simplesympathy.com, sendwishonline.com, quora.com, bondlyfe.com, holidappy.com, shareecard.com | **The only first-party authority play in the set** — 29 years, tens of thousands of cards, actual send data, against hobby sites and two forums. **Defensive too:** the ecard-vs-paper objection is currently resolved *against* the product by third parties. **Answer the sympathy objection honestly rather than defensively — even-handedness is what gets cited.** See §6.2.4 | `/free-ecards-faq.html` |
| **3** | `/funny-things-to-write-in-a-birthday-card/` | funny things to write in a birthday card | pressprintparty.com, funkypigeon.com, kudoboard.com, americangreetings.com/…/birthday-messages-funny | Top result is a personal blog; the field includes a UK charity ecard site and a Shopify store blog. **Lowest authority bar of all seven informational prompts — no expertise requirement, pure structured list.** 123greetings has the largest funny-card inventory in the category to illustrate each line | `/birthday/birthday_fun/` |
| **4** | `/what-to-write-in-a-retirement-card/` | what to write in a retirement card | **indeed.com** (position 1), hallmarkbusiness.com, mrsfields.com, oakharvestfg.com (a financial adviser) | **The incumbent is a job board and the rest are off-category. No incumbent ecard brand holds it** — even Hallmark's winner is its B2B property. Split by recipient (coworker / boss / teacher / parent). **Best strategic fit: retirement is a life event squarely inside the 50–70 demographic** | `/business/` |
| **5** | `/what-to-write-in-a-sympathy-card/` | what to write in a sympathy card | mrsfields.com, socialwork.web.baylor.edu, legacy.com, ideas.hallmark.com, 1800flowers.com | **Highest-value gap: no 123greetings page exists at all** and the www sympathy inventory is deep. **Also the highest E-E-A-T bar in the set** — a university school of social work, a funeral director, an obituaries site. Requires genuine expertise signalling, not a listicle. Attempt only after #1–4 validate the template | `/encouragement_and_inspiration/sympathy/` |
| **6** | `/condolence-messages-for-loss-of-mother/` | what do you write in a sympathy card for loss of a mother | funeral.com, myend.com, rfhr.com, ohcanvas.com | **All funeral-industry sites.** A card brand writing about card wording is the more natural source | `/encouragement_and_inspiration/sympathy/` |
| **7** | `/what-to-write-in-a-get-well-card/` | what to write in a get well card | harryanddavid.com, moonpig.com **(UK)**, ideas.hallmark.com, parade.com, greetpool.com | **Two of the top five are UK-geo — a US-targeted page has room.** And this is the **strongest pairing opportunity in the plan**: the brand already ranks **3rd** on the transactional twin ("free get well soon ecards") with a real hub. Half the pair is proven | `/general/cheer_up/`, `/general/getwell/` |
| **8** | `/what-to-write-in-a-new-baby-card/` | what to write in a new baby card | moonpig.com/ie, cardfactory.co.uk, motherandbaby.com, funkypigeon.com | **Four of the top six are UK/IE. The US SERP is thinly served** | `/congratulations/` **[verify subcategory]** |
| **9** | `/what-to-write-in-a-graduation-card/` | what to write in a graduation card | ideas.hallmark.com, bunches.co.uk, cheryls.com, snapfish.com | Beat on recipient and level splits — high school vs college vs grad school | `/congratulations/` **[verify subcategory]** |
| **10** | `/what-to-write-in-an-anniversary-card/` | what to write in an anniversary card | recocards.com ("74 Lines"), adobe.com | **Small incumbents.** Fold in the existing `/anniversary-messages-for-dad/` | `/anniversary/` |
| **11** | `/what-to-write-in-a-wedding-card/` | what to write in a wedding card | **theknot.com**, canvasdiscount.com, hitchstudio.com, zola.com | **Hardest of the occasion set** — TheKnot is a category authority and **even Hallmark does not rank here.** The topical authority required is wedding-domain, which a general ecard site cannot assemble. **Attempt only after the template is proven; deprioritise if capacity is tight** | `/wedding/`, `/thank_you/wedding/` |
| **12** | `/what-to-write-in-a-thank-you-card/` | what to write in a thank you card | altenew.com, ideas.hallmark.com, coulsonmacleod.com, americangreetings.com | **Retitle and restructure the existing `/thank-you-messages/` rather than building new — the cheapest possible test of the title template on a page that already exists.** Consider running this as #1 if you want the earliest possible read on whether the title change alone moves anything | `/thank_you/` |
| **13** | `/what-to-write-in-a-birthday-card/` | what to write in a birthday card | today.com, papyrusonline.com, ideas.hallmark.com, americangreetings.com | **Highest volume, strongest incumbents.** Consolidate `/birthday-messages/` into it and 301 | `/birthday/` |
| **14** | `/what-to-write-in-a-congratulations-card/` | what to write in a congratulations card | americangreetings.com/…/congratulations-messages, gelato.com | **Thin SERP.** Sub-split engagement / new job / new home as separate H2 question blocks | `/congratulations/` |
| **15** | `/what-to-write-in-a-card-for-someone-you-dont-know-well/` | PAA-shaped long tail | **No dedicated owner found in any probe** — answers are scattered across sections of other pages | **Pure PAA capture, near-zero competition** | `/general/` |

**Question sets per page** (the H2s; each gets its own 40–60 word answer before its examples):

- **#5 sympathy:** what do you write in a sympathy card? / what should you **not** write? / what to write for the loss of a mother / father / spouse / pet? / how do you close a sympathy card?
- **#4 retirement:** what do you write in a retirement card? / for a coworker? / for a boss? / funny retirement messages / what to avoid (ageing, finances)
- **#11 wedding:** short wedding wishes / funny wedding messages / what to write if you are not attending / how to sign as a couple
- **#9 graduation:** high school vs college / short congratulations / funny graduation messages
- **#7 get well:** after surgery / for a serious illness / what not to say / short get well messages
- **#8 new baby:** for twins / for a second baby / funny new baby messages / for a coworker
- **#10 anniversary:** for parents / for a 1st / 25th / 50th / short anniversary wishes
- **#2 etiquette:** is it rude to send an ecard? / when is an ecard better than a paper card? / is it OK to send a sympathy ecard? / are ecards appropriate for work? / how do you make an ecard feel personal?

**Each spoke links back to the hub, to the relevant www ecard category, and to two sibling spokes.**

### 5.3 The intent→section map, and three gaps in it

Every one of the fifteen has a matching www category with live card inventory, which makes this **a linking-and-titling exercise over existing assets rather than net-new site structure** — and keeps it clear of the information-architecture restructure already in flight.

Confirmed www sections: `/birthday/` (happy_birthday, birthday_wishes, birthday_fun, belated_birthday, specials), `/encouragement_and_inspiration/` (sympathy, quotes), `/thank_you/` (wedding, inspirational, everyday), `/wedding/`, `/anniversary/`, `/congratulations/`, `/general/` (sorry, cheer_up, good_morning, thinking_of_you), `/friendship/`, `/love/`, `/business/`, `/stay_in_touch/`, `/cute_cards/`, `/events/` (popular, calendar, christmas, mothers_day, womens_day).

**[NEEDS VERIFICATION] — retirement, graduation and new baby appear to lack dedicated subcategory hubs.** Confirm from the crawl export (§8 gap 4) before linking; **fall back to the parent hub** rather than linking to a URL that does not exist.

### 5.4 Two prerequisites the plan must not skip

**The `help.` corpus is already the right shape and is being ignored.** A `site:` probe returned nine question-titled URLs with IDs running to at least **154**, implying a corpus in the low hundreds — and these are the *only* pages on the estate already shaped the way answer engines want: a literal question as the title, one answer per URL. They are also the pages that answer the branded support questions users actually voice-ask. **Before building any spoke, audit for duplicate question coverage between `help.` and the new pages** — pick one host per question and canonicalise. See P2-5.

**`/free-ecards-faq.html` is the proof the domain can win answer queries.** The query "how to send a free ecard by email" returned it at **position 7 of 9**, alongside punchbowl, canva, digitalunite, recocards, americangreetings and sendwishonline — **the only non-brand question query in ~16 probes on which any 123greetings host ranked**, and its title is itself a question ("Are Free eCards Really Free?"). **It falsifies the assumption that the domain cannot rank for informational queries: the one www page built around a question ranks; the blog pages built around counts do not.** So build a small question cluster **on www**, using the same answer-block template, linked from that page: "How do you send a free ecard?", "Do you need an account to send an ecard?", "Can you schedule an ecard in advance?", "How do you know if someone opened your ecard?", "Are ecards safe to open?" **Keep these on www, not the blog — the evidence says www is where the ranking ability is.** (P1-9 / §6.2.)

---

## 6. GEO

### 6.1 Crawler access

Four things determine whether an answer engine can reach, read and quote this site. **Three of the four are currently unverified, which is the finding.**

#### 6.1.1 Rendering — the binding constraint

**An AI crawler extracts roughly 30 words from a card page.** Card media loads via `Load_Video_Card()` into an empty div; comments and the Latest/Related tabs are JS-loaded. A non-JS crawler sees one H1, one H2 sentence, a rating, tags and related titles.

Third-party measurement, which is worth quoting to anyone who doubts this: an analysis of **500M+ GPTBot fetches found zero evidence of JavaScript execution**; ClaudeBot downloaded JS in ~23.8% of requests and **never executed it**. As of mid-2026, no major AI crawler executes JS, waits for rendering, or retries. **Googlebot is effectively the only crawler with full JS rendering — so a card page can rank on Google and be functionally empty to every answer engine.**

Why this is the binding constraint rather than one issue among several:

- **Retrieval systems chunk and embed text.** A ~30-word chunk has almost no lexical or semantic surface. It loses every similarity comparison against a competitor card page carrying 300 words, and it gives the model nothing quotable — so even when retrieved, it is not cited.
- **It makes the JSON-LD unverifiable.** The block asserts a video via `contentUrl`/`embedUrl` while the HTML contains no `<video>`, `<img>` or `<link>` referencing that media. Unverifiable structured data is discounted.
- **The byte order compounds it.** Four ad loaders, a 13-slot GPT configuration and Taboola's payload come *before* the H1. Extractors that truncate, or that score main-content blocks by density, pick the wrong block or nothing. An `unhideWindow` interstitial is a content-gating pattern a naive extractor can select **as the page's main content** — so the model ends up holding ad copy as the card's description.
- **No retry means absence, not staleness.** With no second attempt, a slow origin means the document is simply missing from the index — and that is invisible without server logs.

**This is P0-5, and it gates P0-6.** Fixing the JSON-LD without fixing the render is a fix that cannot pay out.

**Two measurements to take, both trivial:**

```bash
# 1. Extractable word count under an AI-crawler UA. Target: > 150.
curl -sA "GPTBot" <card-url> \
  | python3 -c "import sys,re;t=re.sub(r'<[^>]+>',' ',sys.stdin.read());print(len(t.split()))"

# 2. Raw HTML weight and TTFB — all an AI crawler takes, no subresources.
#    Targets: under 100 KB, under 800 ms.
curl -so /dev/null -w '%{size_download} %{time_total}\n' \
  -A 'Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)' <card-url>
```

**Do not serve a different page to bot user-agents. That is cloaking.** The fix is to server-render for everyone.

#### 6.1.2 `robots.txt` — paste-ready

**State of play:** `robots.txt` could not be fetched on any host (egress blocked; `archive.org` blocked too, so no historical copy). **Nobody currently knows what it says.** **[NEEDS LIVE FETCH]**

**The distinction that decides everything.** Crawler roles, from primary sources:

| Operator | Citation / search crawler — **blocking this kills citations** | User-triggered fetcher — **never restrict** | Training-only token — **blocking costs no citation** |
|---|---|---|---|
| **OpenAI** | `OAI-SearchBot` — ChatGPT Search index, therefore citations | `ChatGPT-User` | `GPTBot` |
| **Anthropic** | `Claude-SearchBot` — Anthropic's help article states blocking it reduces "visibility and accuracy in user search results" | `Claude-User` | `ClaudeBot` |
| **Perplexity** | `PerplexityBot` | `Perplexity-User` | — |
| **Google** | `Googlebot` — feeds Search **and** AI Overviews / AI Mode / Gemini grounding | — | `Google-Extended` |
| **Microsoft** | `Bingbot` — **there is no separate Copilot crawler; Bingbot's index is the grounding source** | — | — |
| **Apple** | `Applebot` — per Apple's 2026-06-08 documentation rewrite, now powers Siri and Apple Intelligence answers | — | `Applebot-Extended` |

**`Google-Extended` and `Applebot-Extended` are not crawlers.** They have no HTTP user-agent and fetch nothing. They are policy tokens applied to content `Googlebot` and `Applebot` already fetched. **Blocking them reduces no server load and does not affect Search inclusion, ranking or AI Overviews eligibility** — yet they are two of the most-blocked tokens on the web.

**The parser trap that bites most sites: `robots.txt` groups do not merge.** The moment a named `User-agent: GPTBot` group is added, that bot stops reading the `*` group entirely — so **every `Disallow` you still want must be repeated inside the named group.** The block below does that deliberately, which is why it looks repetitive.

**Paste at `https://www.123greetings.com/robots.txt`. Mirror to `m.123greetings.com` with that host's own `Sitemap:` lines.**

```
# robots.txt - www.123greetings.com - reviewed 2026-09-24
# Policy: allow every AI SEARCH/CITATION crawler and every USER-TRIGGERED
# fetcher. Allow training crawlers - free ecards are a distribution business
# with no licensing revenue to protect, and training presence is what makes a
# model name the brand without retrieval. Deny only crawl-budget sinks.
# NOTE: robots.txt groups do NOT merge. Each named group below must repeat
# every Disallow you want applied to that bot.

# --- 1. AI SEARCH / CITATION CRAWLERS - ALLOW ---
# Disallowing any UA in this block removes 123Greetings from that engine's
# answer citations. These are not training bots.
User-agent: OAI-SearchBot        # OpenAI - ChatGPT Search index -> citations
User-agent: Claude-SearchBot     # Anthropic - Claude web-search index
User-agent: PerplexityBot        # Perplexity - answer index
Allow: /
Disallow: /do/cards/*/p/
Disallow: /do/cards/*/s/*/p/
Disallow: /do/connect/
Disallow: /do/optout
Disallow: /do/viewecard
Disallow: /cgi-bin/

# --- 2. USER-TRIGGERED FETCHERS - ALLOW, NO EXCLUSIONS ---
# A human pasted a URL or asked about this page. Never restrict these.
# Caveat: Perplexity's stated position is that Perplexity-User is "an agent,
# not a bot" and need not honour robots.txt, so this line is advisory.
User-agent: ChatGPT-User
User-agent: Claude-User
User-agent: Perplexity-User
Allow: /

# --- 3. CLASSIC CRAWLERS THAT FEED AI SURFACES - ALLOW ---
# Googlebot feeds Search AND AI Overviews / AI Mode / Gemini grounding.
# Bingbot feeds Bing AND Copilot - there is NO separate Copilot crawler.
# Applebot feeds Spotlight/Siri AND, per Apple's 2026-06-08 doc rewrite,
# Siri + Apple Intelligence answers.
User-agent: Googlebot
User-agent: Bingbot
User-agent: Applebot
Allow: /
Disallow: /do/cards/*/p/
Disallow: /do/cards/*/s/*/p/
Disallow: /do/connect/
Disallow: /do/optout
Disallow: /do/viewecard
Disallow: /cgi-bin/

# --- 4. TRAINING-ONLY TOKENS - ALLOW (deliberate) ---
# None of these produce a citation. Allowing them is purely a content-rights
# choice; flip any single line to "Disallow: /" to exit that corpus WITHOUT
# losing one citation.
# Google-Extended and Applebot-Extended are NOT crawlers: no HTTP user-agent,
# they fetch nothing. They are policy tokens applied to content Googlebot and
# Applebot already fetched. Blocking them reduces no load and does NOT affect
# Search inclusion, ranking, or AI Overviews eligibility.
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
User-agent: Amazonbot
Allow: /

# --- 5. DENY - server cost, zero citation upside ---
# Bytespider has a documented record of ignoring robots.txt. Advisory only;
# enforce at the WAF/CDN.
User-agent: Bytespider
Disallow: /

# --- 6. DEFAULT ---
User-agent: *
Allow: /
Disallow: /do/cards/*/p/
Disallow: /do/cards/*/s/*/p/
Disallow: /do/connect/
Disallow: /do/optout
Disallow: /do/viewecard
Disallow: /cgi-bin/

Sitemap: https://www.123greetings.com/sitemap_index.xml
Sitemap: https://m.123greetings.com/sitemap_index.xml
```

**Three rules for whoever ships this:**

1. **Do not add a global `Crawl-delay`.** Googlebot ignores it; **Bingbot honours it — and throttling Bingbot throttles Copilot grounding.**
2. **Verify before WAF-blocking anything.** User-agent strings are trivially spoofed. Anthropic publishes `claude.com/crawling/bots.json`; OpenAI publishes per-bot IP JSON. Match on verified IP, not on the UA string.
3. **`robots.txt` cannot stop Bytespider, Meta's crawlers or Perplexity's undeclared fleet.** Those need a CDN/WAF rule, not a `Disallow` line.

**6.1.2(b) — sequencing on the `/s/` facet Disallow.** The `Disallow: /do/cards/*/s/` line that would kill the format-facet space is **deliberately absent above**. Add it only **after** the `noindex,follow` from P0-3 has been crawled and processed. **Blocking first freezes the current index state** — Google cannot re-crawl a blocked URL to discover it is now `noindex`, so the bloat stays in the index indefinitely. Noindex first, verify processing in GSC, then Disallow. This is the single most commonly botched sequence in facet cleanup.

**Verify after deploy** with Google's robots.txt tester and Bing Webmaster Tools.

#### 6.1.3 The `noarchive` grep — five minutes, large downside if positive

**Bing Webmaster Tools documentation is explicit:** `NOARCHIVE` prevents content being used in **Copilot responses and grounding results**, and prevents its use for training Microsoft's generative foundation models. `NOCACHE` limits Copilot to URL, title and snippet only, reducing citation depth. Where both are present, Bing treats the page as `NOCACHE`. **There is no separate Copilot crawler, so `robots.txt` offers no lever here — the meta tag is the only control, and it is invisible unless someone looks.**

Separately, per Apple's 2026-06-08 Applebot documentation rewrite, **`nosnippet` blocks use of the page as context in Siri and Apple Intelligence answers.**

**Why this is more than hygiene here.** The card template is confirmed free of `noindex`. The presence or absence of `noarchive`/`nocache`/`nosnippet`/`max-snippet` **was never checked.** And the site's own Terms of Use asserts permission for indices *"but not caches or archives of such materials"* — **which is precisely the intent a developer would implement as `NOARCHIVE`.** If anyone ever did, **Microsoft Copilot citation is already dead across the entire site, and nothing in `robots.txt` or GSC would reveal it.**

**Action:**

```bash
grep -rniE 'noarchive|nocache|nosnippet|max-snippet|max-image-preview|X-Robots-Tag' \
  <template-roots> <cdn-edge-config>
```

Run it across **all seven hosts** including `help.` and `blog.`, and across CDN/edge rulesets as well as templates. **Remove `noarchive` and `nocache`.** Then set an explicit permissive policy in the card and hub templates:

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

**`max-snippet:-1` matters directly for AEO** — it removes the length cap on the text an engine may quote, and on a page with ~30 words of extractable text you cannot afford a cap on top of that.

This is in the "five things" list (§1.3). It takes five minutes and nothing else would ever surface the answer.

#### 6.1.4 Latent presence — Common Crawl, and `llms.txt` last

**Common Crawl. [NEEDS LIVE FETCH]** `index.commoncrawl.org` returned a proxy 403 from this sandbox and `archive.org` is not allowlisted, so neither the CC index nor a historical `robots.txt` could be read. CCBot checks `robots.txt` first and honours `<meta name=robots value=nofollow>`.

**Why it matters more here than for most brands.** Common Crawl and Wikipedia are the two channels that put a brand into a model's *weights* — that let a model name you unprompted, with no retrieval at all. **Wikipedia is confirmed absent**, and the spam-blacklist log entry suggests active historical resistance to citing the domain. The benchmark shows the brand *does* have latent presence — on "free ecards no signup required" it was named **first** with **zero URLs retrieved**, which is parametric recall, not grounding — but that is one observation. **If Common Crawl is thin or absent, every mention depends on live retrieval, which the JS-only card body then defeats.** Measure it; do not assume it.

```bash
# From a machine with open egress. Five minutes.
curl -s 'https://index.commoncrawl.org/collinfo.json' | head

# For each of the latest two or three crawl IDs:
curl -s 'https://index.commoncrawl.org/CC-MAIN-<id>-index?url=123greetings.com%2F*&output=json&limit=1000' | wc -l
curl -s 'https://index.commoncrawl.org/CC-MAIN-<id>-index?url=m.123greetings.com%2F*&output=json&limit=1000' | wc -l
# Repeat for the 123g.us hosts.
```

Record counts per host per crawl. **If www is present but m. is absent, the mobile-first-indexed host is missing from the training corpus entirely — and that is a finding on its own.** Then: keep `User-agent: CCBot / Allow: /`, and **do not add page-level `nofollow`.**

---

**`llms.txt` — ship it last, as a hedge, and do not report it as an AI-visibility improvement.**

Being straight about this matters, because `llms.txt` is currently being sold as *the* AI-visibility fix and it is not one. Google's Gary Illyes stated in July 2025 that Google does not support it and is not planning to; John Mueller compared it to the keywords meta tag. **No major provider has publicly committed to using it as a signal in a production answer surface.** An analysis of 515,382,577 LLM bot traffic events found that, filtered to the user-agents that actually drive citations, the share of requests touching `/llms.txt` is **statistically negligible**. The common counter-argument is circular: Anthropic, OpenAI and Perplexity host `llms.txt` on their own developer-docs sites, which is documentation tooling and says nothing about whether their crawlers read yours.

**The real cost is opportunity cost.** Hours spent on `llms.txt` are hours not spent server-rendering the card message text — the change that actually determines whether an engine can cite a card page.

**And there is one real risk if you do ship it:** `llms.txt` is a machine-readable assertion of fact, and the site's firmographics currently conflict (card count 20,000 vs 30,000+ vs 40,000+; HQ New York vs Plainview vs Mumbai vs Kolkata). **Publishing an unreconciled number hands engines a wrong answer with your own authority behind it.** Reconcile first (Gap 10), then publish.

**Note also the unresolved contradiction in the draft below:** it says "no paid tier and no subscription" while other sources reference a `$5.99/yr` ad-free Pro tier. **These cannot both be true. Settle it before publishing — this is exactly the kind of self-contradiction that is worse than saying nothing.**

Publish at `https://www.123greetings.com/llms.txt` as `text/plain`. **Do not reference it from `robots.txt` as a `Sitemap:` — it is not one.**

```
# 123Greetings

> Free online greeting cards (ecards), founded 1997. [N] cards across
> [M] categories, sendable by email with no account and no payment.
> Formats: animated, video, GIF and static postcard. Includes a
> scheduled-send reminder service and a community of contributing
> artists (123Greetings Studio, launched 2009).

Canonical hosts: https://www.123greetings.com (desktop) and
https://m.123greetings.com (mobile). Card pages exist on both hosts
under the same numeric card ID at /do/card/<id>; the desktop site also
serves descriptive card URLs under /<category>/<subcategory>/.
[RESOLVE BEFORE PUBLISHING: state the paid-tier position accurately.]
Not affiliated with 123cards.com or 123cartes.com.

## Cards by occasion
- [Birthday](https://www.123greetings.com/birthday/)
- [Anniversary](https://www.123greetings.com/anniversary/)
- [Wedding](https://www.123greetings.com/wedding/)
- [Love](https://www.123greetings.com/love/)
- [Friendship](https://www.123greetings.com/friendship/)
- [Congratulations](https://www.123greetings.com/congratulations/)
- [Thank You](https://www.123greetings.com/thank_you/)
- [Encouragement and Inspiration](https://www.123greetings.com/encouragement_and_inspiration/)
- [Stay in Touch](https://www.123greetings.com/stay_in_touch/)
- [Business](https://www.123greetings.com/business/)

## Events and holidays
- [All events](https://www.123greetings.com/events/)
- [Events calendar](https://www.123greetings.com/events/calendar/)

## Writing help
- [Message and wishes guides](https://blog.123greetings.com/)

## Company
- [About and press](https://info.123greetings.com/)
- [Help and FAQ](https://help.123greetings.com/)
- [Are free ecards really free?](https://www.123greetings.com/free-ecards-faq.html)
- [Terms of use](https://www.123greetings.com/terms_of_use.html)
```

**A note on the Terms of Use, since it comes up alongside this.** A finding arguing that the ToS clause — permission for indices "but not caches or archives" — revokes the AI crawl licence **was put to the adversarial panel and refuted, correctly.** The mechanism does not exist: no production AI crawler fetches and parses a ToS page to decide whether to crawl. The clause is also near-universal mid-2000s boilerplate, not a deliberate policy. **The operative lever is `robots.txt` (6.1.2), full stop.** Two things do survive from that analysis and are worth carrying: the ToS and `robots.txt` should not contradict each other, so if counsel wants them reconciled the minimal safe edit is to strike the four words "but not caches or archives" and stop — **do not add an affirmative blanket grant to "crawl, index, cache and store," which would purport to sublicense artist and music rights the company does not own.** And the "but not caches or archives" phrasing is exactly the intent that would have been implemented as `NOARCHIVE`, which is why 6.1.3 is on the Week 1 list.

---

*Section 6.2 — the citation surface, PR target tiers, the seniors category and the subdomain question — continues in `workbook.md`.*
