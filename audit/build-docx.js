const fs = require('fs')
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, TableOfContents,
} = require('docx')

const findings = JSON.parse(fs.readFileSync('findings.json', 'utf8'))
const verdicts = JSON.parse(fs.readFileSync('verdicts.json', 'utf8'))
const V = Object.fromEntries(verdicts.map((v) => [v.id, v]))

const CONTENT_W = 9360 // Letter (12240) minus 1" margins each side

const SEV = {
  critical: { label: 'CRITICAL', color: 'B03A2E', fill: 'FDEDEC' },
  high:     { label: 'HIGH',     color: 'B9770E', fill: 'FEF5E7' },
  medium:   { label: 'MEDIUM',   color: '1F618D', fill: 'EAF2F8' },
  low:      { label: 'LOW',      color: '566573', fill: 'F4F6F6' },
}
const VERDICT = {
  CONFIRMED:           { color: '1E8449', note: 'Test run; claim held.' },
  PARTIALLY_CONFIRMED: { color: 'B9770E', note: 'Observation holds; inference or magnitude does not.' },
  REFUTED:             { color: 'B03A2E', note: 'Test run; claim failed.' },
  UNVERIFIABLE:        { color: '566573', note: 'Discriminating test could not be run here.' },
}

const LENS = {
  'technical-crawl-index': 'Technical / crawl & indexation',
  'structured-data': 'Structured data',
  'onpage-templates': 'On-page templates',
  'answer-engine-optimisation': 'Answer engine optimisation (AEO)',
  'geo-crawler-access': 'GEO — crawler access',
  'geo-citation-surface': 'GEO — citation surface',
  'competitive-gap': 'Competitive gap',
}

const unesc = (s) => String(s || '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&')

// Never emit \n inside a run — split into separate paragraphs.
const lines = (s) => unesc(s).split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

const body = (text, opts = {}) =>
  lines(text).map((l) => new Paragraph({
    children: [new TextRun({ text: l, size: 20, ...opts })],
    spacing: { after: 100 },
  }))

const labelled = (label, text) => {
  if (!text || !String(text).trim()) return []
  return [
    new Paragraph({
      children: [new TextRun({ text: label, bold: true, size: 19, color: '424949', allCaps: true })],
      spacing: { before: 160, after: 60 },
    }),
    ...body(text),
  ]
}

const cell = (children, width, fill) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: fill ? { type: ShadingType.CLEAR, fill, color: 'auto' } : undefined,
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
  children,
})

const txt = (t, o = {}) => new Paragraph({ children: [new TextRun({ text: String(t), size: 18, ...o })] })

const thinBorders = {
  top:    { style: BorderStyle.SINGLE, size: 1, color: 'D5D8DC' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'D5D8DC' },
  left:   { style: BorderStyle.SINGLE, size: 1, color: 'D5D8DC' },
  right:  { style: BorderStyle.SINGLE, size: 1, color: 'D5D8DC' },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'D5D8DC' },
  insideVertical:   { style: BorderStyle.SINGLE, size: 1, color: 'D5D8DC' },
}

// ---------------------------------------------------------------- front matter

const children = []

children.push(
  new Paragraph({
    children: [new TextRun({ text: '123greetings.com', bold: true, size: 56 })],
    spacing: { before: 2400, after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'AEO / GEO / SEO findings register', size: 36, color: '424949' })],
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '94 findings across seven audit lenses. 19 critical findings independently verified.', size: 22, color: '566573' })],
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Compiled 25 September 2026', size: 22, color: '566573' })],
  }),
  new Paragraph({ children: [new PageBreak()] }),
)

children.push(
  new Paragraph({ text: 'How to read this document', heading: HeadingLevel.HEADING_1 }),
  ...body('This register contains every finding the audit produced. It is not a list of confirmed defects, and the distinction matters for how you spend engineering time.'),
)

children.push(
  new Paragraph({ text: 'Verification status', heading: HeadingLevel.HEADING_2 }),
  ...body('The 19 findings rated critical were each given to an independent investigator, who had to state the one test that would discriminate the claim, run it, and report what came back. Results: 3 confirmed, 14 partially confirmed, 2 unverifiable, 0 refuted. 17 of the 19 were downgraded from critical.'),
  ...body('The remaining 75 findings — 42 high, 31 medium, 2 low — have NOT been verified. An earlier verification pass examined 7 findings and refuted all 7, but that pass was broken: its verifiers had exhausted a shared search budget before running a query, and were instructed to default to "refuted" under uncertainty, so "I could not check this" was recorded as "this is false". Its verdicts were discarded. Unverified findings here are leads worth checking, not established facts.'),
)

children.push(
  new Paragraph({ text: 'The prevalence problem', heading: HeadingLevel.HEADING_2 }),
  ...body('Eleven of the nineteen verified findings assert a magnitude — how many URLs, how many pages — and none measured one. The instrument available was a search API that returns roughly ten results with no counts and no rank positions. It can establish that something EXISTS. It can never establish HOW MUCH of it exists. Where a finding\'s severity depends on scale, that severity is unsupported until a crawl or Search Console supplies a number.'),
)

children.push(
  new Paragraph({ text: 'What could not be examined', heading: HeadingLevel.HEADING_2 }),
  ...body('Every 123greetings.com and 123g.us host was blocked by the network egress policy for the entire engagement. No page was fetched: no HTTP status, no response header, no raw HTML, no robots.txt, no rendered DOM. Findings marked "Needs live fetch" below derive from the search index, from one page source pasted into the session, and from a sitemap retrieved earlier. There was also no Search Console, no analytics, no crawl export, and no page source from the mobile host — which is the host Google indexes mobile-first.'),
  ...body('One workaround is available and worth taking: googleapis.com is reachable even though the site is not. With a free PageSpeed Insights API key, the API returns canonical, is-crawlable (which detects noindex and X-Robots-Tag), document-title and robots-txt for any blocked URL.'),
  new Paragraph({ children: [new PageBreak()] }),
)

// ---------------------------------------------------------------- do not ship

children.push(
  new Paragraph({ text: 'Do not ship these as written', heading: HeadingLevel.HEADING_1 }),
  ...body('Cross-reading the verification verdicts surfaced conflicts no single investigator could see. Four recommendations that appear in the findings below are unsafe in their current form.'),
)

const DONT = [
  ['"No subscription product" disambiguation copy',
   '123Greetings Pro exists at $5.99/year, confirmed from the company\'s own positioning. Publishing "has no subscription product" on the brand\'s own domain hands every complainant a documented contradiction. Correct copy: free to send, ad-supported, one optional $5.99/yr ad-free upgrade, no trial, no auto-renewing membership, no per-card charge.'],
  ['The www /do/card/ 301, shipped alone',
   '/do/card/{id} is plausibly the link embedded in delivered e-card notification emails, adjacent to the live /do/viewecard route. A 301 there may break the delivery flow at scale, so gate it on a delivery-path audit. Separately, if the mobile canonical targets the www numeric URL, shipping the 301 first canonicals the entire mobile card corpus to a redirect.'],
  ['The paste-ready robots.txt, wholesale',
   'It embeds Disallow rules for /s/ facet URLs that two investigators independently found harmful — those are working hubs carrying correct, distinct titles, and a Disallow also blocks the crawl needed to see any noindex. Pasting the file would silently overwrite exclusions nobody has read. Read, diff, merge.'],
  ['VideoObject retyping of card pages',
   'Four independent objections: an invented embedUrl, a sub-30-second duration floor, dishonesty for animated cards, and a JS-injected player the crawler never sees.'],
]

children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [3000, 6360],
  borders: thinBorders,
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell([txt('Do not ship', { bold: true, color: 'FFFFFF' })], 3000, 'B03A2E'),
        cell([txt('Why', { bold: true, color: 'FFFFFF' })], 6360, 'B03A2E'),
      ],
    }),
    ...DONT.map(([a, b]) => new TableRow({
      children: [cell([txt(a, { bold: true })], 3000), cell(body(b), 6360)],
    })),
  ],
}))

children.push(new Paragraph({ children: [new PageBreak()] }))

// ---------------------------------------------------------------- verdict table

children.push(
  new Paragraph({ text: 'Verification verdicts — the 19 critical findings', heading: HeadingLevel.HEADING_1 }),
  ...body('Full reasoning for each verdict, including the discriminating test and what was actually run, appears with the finding itself in the register.'),
)

children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [3100, 1750, 1000, 3510],
  borders: thinBorders,
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell([txt('Finding', { bold: true, color: 'FFFFFF' })], 3100, '283747'),
        cell([txt('Verdict', { bold: true, color: 'FFFFFF' })], 1750, '283747'),
        cell([txt('Conf.', { bold: true, color: 'FFFFFF' })], 1000, '283747'),
        cell([txt('Revised severity', { bold: true, color: 'FFFFFF' })], 3510, '283747'),
      ],
    }),
    ...verdicts.map((v) => {
      const f = findings.find((x) => x.id === v.id)
      const vc = VERDICT[v.verdict] || { color: '000000' }
      return new TableRow({
        children: [
          cell([txt(f ? f.title.slice(0, 110) : v.id, { size: 17 })], 3100),
          cell([txt(v.verdict.replace(/_/g, ' '), { bold: true, color: vc.color, size: 17 })], 1750),
          cell([txt(v.confidence, { size: 17 })], 1000),
          cell([txt(v.severity_assessment, { size: 17 })], 3510),
        ],
      })
    }),
  ],
}))

children.push(new Paragraph({ children: [new PageBreak()] }))

// ---------------------------------------------------------------- register

children.push(
  new Paragraph({ text: 'Findings register', heading: HeadingLevel.HEADING_1 }),
  ...body('Grouped by severity as originally rated, then by audit lens. Where a finding was verified, the revised severity in the verdict block supersedes the rating in the heading.'),
)

const order = ['critical', 'high', 'medium', 'low']
const lensOrder = Object.keys(LENS)

for (const sev of order) {
  const group = findings.filter((f) => f.severity === sev)
  if (!group.length) continue
  const meta = SEV[sev]

  children.push(new Paragraph({
    text: `${meta.label} — ${group.length} finding${group.length === 1 ? '' : 's'}`,
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
  }))

  for (const lens of lensOrder) {
    const sub = group.filter((f) => f.lens === lens)
    if (!sub.length) continue
    children.push(new Paragraph({ text: LENS[lens], heading: HeadingLevel.HEADING_2 }))

    for (const f of sub) {
      const v = V[f.id]

      children.push(new Paragraph({
        children: [new TextRun({ text: f.title, bold: true, size: 24, color: meta.color })],
        spacing: { before: 300, after: 120 },
        keepNext: true,
      }))

      const props = [
        ['ID', f.id],
        ['Lens / layer', `${LENS[f.lens]}  ·  ${f.layer}`],
        ['Host', f.host === 'm' ? 'm. (mobile — the host Google indexes mobile-first)' : f.host],
        ['Effort', f.effort],
        ['Needs live fetch', f.needs_live_fetch ? 'Yes — could not be confirmed from here' : 'No — checkable from the index'],
        ['Verification', v ? `${v.verdict.replace(/_/g, ' ')} (${v.confidence} confidence) — revised severity: ${v.severity_assessment}` : 'Not verified'],
      ]

      children.push(new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [2200, 7160],
        borders: thinBorders,
        rows: props.map(([k, val]) => new TableRow({
          children: [
            cell([txt(k, { bold: true, size: 17 })], 2200, meta.fill),
            cell([txt(val, { size: 17 })], 7160),
          ],
        })),
      }))

      children.push(...labelled('Evidence', f.evidence))
      children.push(...labelled('Why it matters', f.why_it_matters))
      children.push(...labelled('Proposed fix', f.fix))

      if (v) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `Verification — ${v.verdict.replace(/_/g, ' ')}`,
            bold: true, size: 20, color: (VERDICT[v.verdict] || {}).color || '000000',
          })],
          spacing: { before: 220, after: 60 },
        }))
        children.push(...labelled('Discriminating test', v.discriminating_test))
        children.push(...labelled('What was actually run', v.test_run))
        children.push(...labelled('Evidence found', v.evidence_found))
        children.push(...labelled('Corrected claim', v.corrected_claim))
        children.push(...labelled('Fix assessment', v.fix_assessment))
        children.push(...labelled('Blocking gap', v.blocking_gap))
      } else {
        children.push(new Paragraph({
          children: [new TextRun({
            text: 'Not verified. This finding was never challenged — treat it as a lead to check, not an established defect.',
            italics: true, size: 19, color: '7B7D7D',
          })],
          spacing: { before: 180, after: 60 },
        }))
      }
    }
  }
}

// ---------------------------------------------------------------- build

const doc = new Document({
  creator: '123greetings AEO/GEO/SEO audit',
  title: '123greetings.com — findings register',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 20 } },
      heading1: { run: { font: 'Calibri', size: 32, bold: true, color: '1B2631' }, paragraph: { spacing: { before: 360, after: 180 } } },
      heading2: { run: { font: 'Calibri', size: 26, bold: true, color: '34495E' }, paragraph: { spacing: { before: 280, after: 140 } } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    children,
  }],
})

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync('123greetings-findings-register.docx', buf)
  console.log('written', buf.length, 'bytes;', findings.length, 'findings,', verdicts.length, 'verdicts')
})
