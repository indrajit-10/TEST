---

## 6.2 The citation surface

> *Regenerated 2026-09-24 from `findings.json` after the original text was lost to
> a truncated synthesis message. Sources: `brand-confusion-123cards-contaminates-reputation`,
> `security-spam-association-corpus`, `ad-experience-is-the-citation-blocker`,
> `founding-year-conflict`, `hq-location-conflict`, `card-count-conflict`,
> `review-platform-fragmentation`, `bbb-unresponsive`, `trustpilot-keyed-to-www-only`,
> `third-parties-own-the-brand-facts`, `excluded-from-high-authority-roundups`,
> `vendor-published-listicle-flywheel`, `stale-pressroom-no-fresh-facts`,
> `no-first-party-comparison-content`, `zero-community-corpus-reddit-quora`,
> `pr-target-list`. Like the rest of section 4, none of these findings was
> adversarially verified — see §1.0. Every third-party URL and quotation below
> should be re-read before it is quoted in an outreach email.*

§6.1 covered whether AI engines can physically *reach* the site. This section
covers whether they have any reason to *name* it, and what they say when they do.

These are independent problems with independent fixes. A site can be perfectly
crawlable and still be described as a billing scam, because answers about a brand
are assembled from what third parties wrote about it, not from what the brand
published about itself. That is the situation here.

### 6.2.1 What the corpus actually says

Six findings, in descending order of how much damage each does.

#### (a) The brand is being answered as a different company

This is the most citation-suppressing item in the entire audit, and almost none
of the fix is on 123greetings.com.

The complaint corpus attached to this brand is overwhelmingly about **subscription
billing**: `123greetings.pissedconsumer.com` (1.6/5, 68 reviews) carries "$39 for a
year of service", "$2.49/month… charge for a full year in advance", "$29.88 — a
yearly premium membership", and a 7-day trial. The BBB profile carries "I canceled
my free subscription… yet my card was charged."

123Greetings has no subscription product. Its own help page states it "does not
charge for standard cards, nor do they ask for credit card information." Its own
Trustpilot replies say so explicitly: *"123cards and 123greetings have nothing to
do with each other"*, and that users *"frequently use 123Cards instead of
123Greetings.com, confusing the two services."* 123cards.com is a Denmark-based
paid service — one cited case charged $57 for what the user believed was free.

The two brands rank adjacently across the occasion set and hold separate Trustpilot
profiles that retrieval collapses. So an engine asked *"is 123greetings safe"* or
*"does 123greetings charge you"* retrieves the PissedConsumer/BBB/Sitejabber
cluster and answers **yes, it bills you** — which is false for this company.

No amount of schema, sitemap or content work touches this. It is fixed in the
third-party corpus or not at all. **P0-10.**

#### (b) A second mis-attribution: the phishing corpus

The same pattern repeats with security. Indexed sources include
`malwaretips.com` ("get-rich-quick spam spoofs 123greetings.com address"),
`gridinsoft.com/online-virus-scanner/url/123greetings-com` ("Warning Signals and
User Feedback"), `mywot.com`, `scamadviser.com` and `scam-detector.com`. Indexed
descriptions reference *"email campaigns that claim to be an ecard from
123Greetings.com which contain an attachment that will infect your computer"* and
*"scammers have created websites that mimic the appearance of the legitimate
123greetings.com."*

**The brand is the victim of the impersonation, but the corpus reads as though it
is the source.** Its own rebuttal exists — and is buried on `help.123greetings.com`,
a subdomain no roundup cites.

Two compounding details: the domain appears in MediaWiki `talk:Spam-whitelist/Log`,
meaning it was blacklisted on Wikipedia at some point (which would block citation
of the domain in any future article), and users specifically complain that
*"recipients of cards have also had their email impacted by third party marketing
web-push notifications"* — behaviour originating in the ad stacks, which is what
keeps regenerating the reports.

Safety hedging suppresses recommendation far harder than a weak feature comparison
does. **[NEEDS VERIFICATION]** on whether the Wikipedia blacklist entry is still live.

#### (c) Two criticisms that repeat almost verbatim

Every roundup that *does* include the brand pairs it with the same two complaints,
in language models reproduce nearly word for word:

| Source | Phrasing |
|---|---|
| `recocards.com/blog/ecards/best-ecard-websites/` | "designs feel dated, ads are everywhere, and personalization is limited to adding your own text" |
| `greeting-cards-usa.no1reviews.com/123greetings.html` | "the downside is that you'll have to endure adverts littered around the site" |
| 2026 comparison copy | "the free tier is ad-supported, and **the ads show to both you and the person opening the card**, which can undercut the moment" |
| `sitejabber.com` (2/5) / `smartcustomer.com` (2.5/5) | "an ad website that on the side offers eCards"; ads "making it nearly impossible to select and send an ecard on mobile devices" |

This is the mechanism by which a UX decision becomes a GEO outcome. The
recipient-side sentence — *the ads show to both you and the person opening the
card* — is the one that turns a listing from a recommendation into a warning, and
it corroborates the four concurrent ad stacks found in the source review.

**No schema, sitemap or content work will move AI sentiment while publishers keep
writing that sentence.** It is also the only criticism here entirely within the
company's control. **P2-8**, and note the dependency: §6.2.2 Tier 3 outreach has no
news hook until it ships.

#### (d) The brand's own facts do not agree with each other

| Fact | Values in circulation | Where |
|---|---|---|
| **Founding year** | **1997** / 1998 / 1999 | Crunchbase + company sources / `recocards.com` ("since 1998") / BBB ("in business since 1999") |
| **HQ** | 1674 Broadway Suite 403, NY 10019 / Plainview NY / Mumbai / Kolkata dev centre | `craft.co` / BBB profile URL / `cbinsights.com` / `info.123greetings.com/investors/faq.html` |
| **Card count** | 20,000 / 30,000+ / **40,000+** | `help.123greetings.com` / internal brief / company sources, Crunchbase, `howtogeek.com`, `recocards.com` |
| **Employees** | 30 / 201–500 | one aggregator / LinkedIn |

Conflicting basics are a confidence suppressor: when retrieved sources disagree,
models hedge or drop the entity rather than assert a contested number. Three
specific costs here:

- **Longevity is the brand's strongest differentiator** against every competitor in
  the category, and it cannot currently state it consistently.
- **Library size is the one comparison it wins outright** — 40,000+ against Jacquie
  Lawson's "more than 1000 free ecards" per top10.com. When the number is
  inconsistent, models pick the smallest retrieved figure or drop the quantitative
  claim entirely.
- **US-vs-India HQ ambiguity interacts with the trust problem in (a).** An engine
  asked whether this is a legitimate US company retrieves three different addresses
  and hedges. A 17× spread in employee count tells any entity-reconciliation system
  the profiles are unreliable, which downweights all of them.

The root cause is structural and sits in **P1-1**: the card template — the highest-
volume template on the site — ships an Organization node containing only `name` and
`url`. No `logo`, `description`, `foundingDate` or `sameAs`, despite six social
profiles being linked on the same page. **When a brand emits no machine-readable
self-description, retrieval falls back to whoever did** — here, three competitors
who disagree. American Greetings and Hallmark both have full Wikipedia articles and
therefore stable, reconciled entities. 123Greetings has neither a Wikipedia article
nor a Wikidata item.

#### (e) Reputation is split nine ways, from 1.6 to 4.3

| Platform | Score | Reviews | Claimed? |
|---|---|---|---|
| `smart.reviews` | 4.3 | — | no |
| **`trustpilot.com/review/www.123greetings.com`** | **~4** | **99** | **yes — company actively replying** |
| `smartcustomer.com` | 2.5 | 61 | no |
| `sitejabber.com` | 2 | 61 | no |
| `123greetings.pissedconsumer.com` | 1.6 | 68 (172 across profile) | no |

Plus `mywot.com`, `scamadviser.com` and `scam-detector.com` ("based on third party
sources, the site is listed as spam", against another analysis calling it secure).

A 1.6-to-4.3 spread across sources of comparable retrievability means an engine's
summary of brand sentiment **depends entirely on which two or three pages it
happens to retrieve.** That is why answers about this brand swing between
"well-established free ecard pioneer" and "be careful, billing complaints."

Two aggravating details. A stale **"Trustpilot: 1.7/5, 19 reviews"** figure is still
circulating in third-party citations alongside the live ~4/99 profile. And the
Trustpilot profile is keyed to the `www` hostname, not the bare domain — leaving
`m.123greetings.com`, the host Google mobile-first indexes and the surface
generating most of the ad criticism, with no review entity bound to it. The five
extra hosts serving brand content (`h-source`, `m-source`, and three indexed dev/QC
hosts) fragment that binding further, which makes **P0-2 an entity fix as well as a
crawl-budget one.**

Of 551 support calls logged on PissedConsumer, *"payments and charges account for
27% of issues, activation/cancellation 22%"* — i.e. roughly half the complaint
volume is about a product this company does not sell. See (a).

#### (f) The brand has no first-party voice in its own category

Four findings converge here, and together they explain why competitors write the
sentences:

**Competitors publish the roundups.** `sendwishonline.com` runs "Top 30 Sites for
Free and Paid Ecards in 2026", "10 Top Group Greeting Card Websites 2026" and "18
Best Farewell Card Sites". `recocards.com` runs a whole directory — `/best-ecard-websites/`,
`/best-group-greeting-card-websites-2026/`, `/best-christmas-card-websites/`,
`/best-farewell-card-websites/`, `/free-vs-paid-group-card-sites/` and more. Plus
Kudoboard and Greetigram. A `site:` probe of `blog.123greetings.com` for "best
ecard", "how to send" and "guide" returns **only occasion-message listicles — zero
comparison, category-definition or "best of" content.** The mechanic is not
link-building; it is that the competitor publishes the comparison page, so the
competitor's framing becomes the retrieved passage.

**It is excluded outright from several high-authority lists.**
`kudoboard.com/blog/top-5-free-ecard-options-for-all-occasions/` names Kudoboard,
Open Me, Dayspring, Ojolie and Punchbowl — *the largest free ecard library on the
web is not in a five-item list about free ecards.*
`greenvelope.com/resources/best-digital-greeting-card-sites` compares eight sites
without it. Absence from a five-item list is a **stronger** negative signal than a
mediocre placement: it tells the model the brand is not in the consideration set.
And on `top10.com/ecard-sites` — which ranks #1 for "best free ecard sites 2026" —
Jacquie Lawson gets the hero treatment while 123Greetings gets "classic charm" and
nothing else. **The amount of descriptive detail a source gives a brand is what the
model has to work with when generating its own sentence about it.**

**Every comparison page about the brand is written by someone else.** `cbinsights.com`
comparisons, `similarweb.com` competitor pages, `thankbox.com`'s Jacquie Lawson
alternatives post, a LinkedIn Pulse piece by sendwishonline. No first-party
comparison page surfaced for any competitor pairing. Comparison and alternatives
pages are among the most-retrieved formats for purchase-intent answers, and the
brand has ceded the format entirely. Honest, even-handed first-party comparison
content **does** get cited.

**There is no community corpus at all.** Three separate probes for Reddit and Quora
ecard recommendations returned no live threads — only two long-dormant legacy
forum threads (`forums.tomsguide.com`, `forums.anandtech.com`) and vendor-owned
marketing pages. Reddit is disproportionately weighted in AI answer grounding.
The category-wide vacuum is unusual, and it is itself the opportunity: whoever
establishes presence owns a source class no competitor holds. Right now the vacuum
is filled by competitor listicles, which is why sendwishonline surfaces as the top
answer to "what does Reddit recommend." See §6.2.4 for the approach, **including
its anti-astroturfing constraints.**

**And the only first-party entity source is dormant.** The newest indexed press
release is `info.123greetings.com/company/pressroom/release_170108.html` — *"Intel
Capital Leads Series A Investment In 123Greetings.com"*, January 2008. Nothing
since. An entity with no citable fact newer than 2008 reads to a retrieval system
as inactive, and no publisher will treat an 18-year-old funding round as a reason
to update a 2026 listicle. Corporate content also sits on `info.`, which carries
none of www's link equity and which no roundup will cite.

#### What this adds up to

The site's own pages are not the problem this section describes, and fixing them
will not solve it. **Three of the six items above — (a), (b) and (e) — are the
brand being described as something it is not**, and all three are repaired in
third-party properties. Item (c) requires a product change before outreach has
anything to say. Items (d) and (f) are the brand declining to state its own facts,
which is the cheapest of the six to fix and the one that makes every other fix
stick.

Sequence accordingly: **P1-1** (emit the facts) → §6.2.2 Tier 1 (claim and correct
the properties you control) → **P2-8** (fix the ad experience) → Tier 2–3 (take the
corrected facts and the news hook to publishers) → Tier 4 (§6.2.3, §6.2.4).

### 6.2.2 The PR target list

Four tiers, in ascending order of difficulty and descending order of certainty.
Tier 1 needs no publisher relations at all.

**Tier 1 — claim and correct the properties you own or can claim. No outreach required; all doable this week.**

| Target | Ask |
|---|---|
| **BBB** — `bbb.org/us/ny/plainview/profile/greeting-card-store/123-greetings-0121-89290` | **The highest-value hour in this document.** Claim the profile and answer the one outstanding complaint — the profile currently displays *"has failed to respond to 1 complaint,"* an explicit machine-readable negative that engines quote directly, and the complaint itself is a 123cards-style billing complaint almost certainly not this company's. Correct the address (filed under Plainview NY against a canonical 1674 Broadway, NY 10019) and the "in business since 1999" field. Set a standing response process — response rate is itself a displayed field |
| **Trustpilot** — `trustpilot.com/review/www.123greetings.com` | Already claimed and replied-to; make it the flagship. Ask Trustpilot to **re-key the profile to the bare domain** `123greetings.com` rather than the `www` hostname, and list both `www` and `m` as associated domains. Drive post-send review requests here so volume and recency outpace the complaint sites |
| **Sitejabber** (2/5, 61 reviews) and **SmartCustomer** (2.5/5, 61 reviews) | Both unclaimed, both unanswered. **Unanswered negative reviews read as uncontested fact.** Claim both; reply to every billing allegation with the 123cards disambiguation |
| **PissedConsumer** (1.6/5, 68 reviews) | **Do not attempt suppression — respond.** Replies are indexed and become the counter-evidence retrieved alongside the complaint. Roughly half the logged call volume (27% payments, 22% activation/cancellation) concerns a product the company does not sell |
| **Stale Trustpilot figure in circulation** | A stale **"1.7/5, 19 reviews"** is cited against the live **~4/5 from 99 reviews**. Get it corrected at source. **[NEEDS VERIFICATION]** — confirm the live figure before quoting it in any outreach |
| **Security vendors** — WOT, Scamadviser, Gridinsoft, Scam-Detector | File reclassification requests. Supply the definitive list of sending domains and addresses so vendors and recipients can verify, and pair with moving the anti-phishing page from `help.` onto `www` (§6.2.1(b)) |
| **Wikipedia spam blacklist** | Check whether the `talk:Spam-whitelist/Log` entry is still live and request removal if so. While it stands it blocks citation of the domain in any future article. **[NEEDS VERIFICATION]** |
| **Firmographic profiles** — Crunchbase, LinkedIn, CB Insights, craft.co, theorg.com | Claim each and push the single canonical fact set agreed in **P1-1**. CB Insights lists Mumbai against the company's own New York; LinkedIn's 201–500 sits against another profile's 30. These are the sources entity-reconciliation reads |
| **Wikidata** | No Q-item exists. Creating one is not a Wikipedia article and does not need notability review; it is a machine-readable anchor the `sameAs` array in **P1-1** can point at. Cheapest available entity fix |

**Note on propagation.** Correcting a fact in a live page changes retrieval-grounded
answers within weeks. It does **not** touch parametric memory — which is where the
"since 1998" error and the uncited "40,000 designs" claim in the §7 benchmark
actually live. Those decay only as the corrected corpus is re-trained on. Plan Tier 1
for retrieval effects; do not expect it to fix what a model already believes.

