# All Calculator 360 — UI/UX Audit

**Date:** 10 Nov 2026 · **Ordered by:** Tauheed (~10:43 IST) — every page and every
calculator must be mobile + desktop friendly, best UI/UX on every device.
**Scope:** AUDIT ONLY. No site file was edited. Fixes below are drafts for the
coordinator to apply after the new calculators are built (to avoid edit conflicts).
Calculator logic, computed figures, header/footer design, GA4 and favicon tags were
not touched and are not part of any fix here.

**Method:** Real headless browser — Google Chrome 157 via Playwright, local HTTP
server over the on-disk files in `~/workspace/allcalculator360-website/`
(not the live site). Every page rendered at **360×800, 390×844, 1280×900 and
1440×900**. For each page/viewport, measured: `documentElement.scrollWidth` vs
viewport (horizontal overflow), overflowing elements, tap targets < 44px,
text < 12px, tables wider than their parent, mobile-menu open, first FAQ open —
before AND after clicking Calculate/Convert where such a button exists.
Root causes were then pinned down by hide-walk probing (hide one subtree at a
time, re-measure the panel width). Key pages were visually inspected from
screenshots.

**Pages audited: 52** — `index.html`, `about.html`, `contact.html`, `privacy.html`,
`terms.html`, `404.html` + **46** calculator pages. Note: the task started with 41
calculators; 5 more were added by the coordinator during this audit
(`credit-card-payoff`, `inflation`, `pregnancy`, `random-number-generator`,
`rent-vs-buy`) — all 5 were included in the run.

## Verdict

| | Pages |
|---|---|
| **Real issues found** | **13 of 52** (12 with horizontal overflow on mobile + 1 with an unstyled select, no overflow) |
| **Clean** | **39 of 52** — no overflow, no clipped text, no sub-44px real tap target at any tested width |
| **Desktop (1280 / 1440)** | **0 pages overflow.** Desktop is clean everywhere. |
| **Viewport meta tag** | **Present on all 52 pages** (`width=device-width, initial-scale=1.0`). None missing. |

The site is in good shape overall: header, hero, search, cards, footer, menu, FAQ,
donuts and the Scientific keypad are all fine. The problems are concentrated in
**one shared layout mechanism** (see Root causes) that hits 12 calculator pages
on phones, plus one small select-styling bug on 2 pages.

## Issue list (worst first)

Horizontal overflow = page is wider than the phone screen, so the whole page can
be swiped sideways and content (inputs, chips, hints, table columns) is cut off
at the right edge. Measured in px beyond the viewport, before clicking Calculate
(after clicking Calculate the numbers are identical — results rendering adds no
new overflow).

| # | Page | 360px | 390px | Cause | Fix |
|---|---|---|---|---|---|
| 1 | `calculator/ecommerce-profit-calculator.html` | **250px** | **236px** | Compare table `min-width:560px` forces the grid track wide | F1 (+ already wrapped, no HTML change needed) |
| 2 | `calculator/calorie-calculator.html` | **130px** | **116px** | Activity-Level `<select>` intrinsic width (~440px, longest option "Sedentary — little or no exercise") | F1 + F3 |
| 3 | `calculator/time-calculator.html` | 0 | **96px** | Two duration rows (h/m/s × 3 number inputs) don't wrap at 361–~500px widths | F1 + F5 |
| 4 | `calculator/investment-calculator.html` | 52px | 38px | Bare year-by-year `.amort-table` in results | F1 + F2 (+ F3 residual) |
| 5 | `calculator/compound-interest-calculator.html` | 49px | 35px | Bare `.amort-table` in results | F1 + F2 (+ F3 residual) |
| 6 | `calculator/nps-calculator.html` | 31px | 17px | Bare `.amort-table` in results | F1 + F2 |
| 7 | `calculator/tip-calculator.html` | 28px | 14px | `.currency-row` label + long-option currency `<select>` | F1 + F3 |
| 8 | `calculator/retirement-calculator.html` | 27px | 13px | Bare `.amort-table` in results | F1 + F2 (+ F3 residual) |
| 9 | `calculator/mortgage-calculator.html` | 26px | 12px | Bare `.amort-table` in results | F1 + F2 (+ F3 residual) |
| 10 | `calculator/rent-vs-buy-calculator.html` | 25px | 11px | Bare `.amort-table` in results | F1 + F2 (+ F3 residual) |
| 11 | `calculator/auto-loan-calculator.html` | 21px | 7px | Bare `.amort-table` in results | F1 + F2 (+ F3 residual) |
| 12 | `calculator/ppf-calculator.html` | 15px | 17px | Bare `.amort-table` in results | F1 + F2 |
| 13 | `calculator/gpa-calculator.html` | 0 | 0 | Grade `<select class="num-input course-grade">` renders at native ~21px height (unstyled, cramped) — no overflow | F4 |

Evidence screenshots (mobile 390px): `ecommerce-mobile-390-top.png` (Meesho chip
and hint text cut off at the right edge), `ecommerce-mobile-390-compare.png`,
`calorie-mobile-390-top.png`, `time-mobile-390-top.png` (seconds input cut off),
`investment-mobile-390-amort-table.png`, `emi-mobile-390.png` (clean reference).

### Also on `time-calculator.html` (same page as #3)

The Operation dropdown (`<select class="num-input" id="opSel">`, "Add (+) /
Subtract") renders at **107×21px** — a small native-looking box next to 44px
inputs (see `time-mobile-390-top.png`). Same `select.num-input` bug as GPA.
Fix: F4.

## Root causes (verified by probing, not guessed)

**R1 — Grid items refuse to shrink (9 pages: #1, #4–#6, #8–#12).**
`.calc-layout` is a CSS grid and `.calc-panel` grid items default to
`min-width: auto`, so the widest min-content child sets the track width. On
mobile the grid is a single `1fr` column, so one wide child stretches the
**whole page**. The wide children are: the bare year-by-year `.amort-table`
(8 pages — its unbreakable header words like "Contributions so far" +
tabular figures make its min-content ~330–390px) and the `.compare-table`
(`min-width: 560px`, ecommerce). Proof: hiding just the table brings the
panel from 594→328px (ecommerce), 396→328/336px (investment), etc. The inputs
panel on those pages is innocent — it only stretches because it shares the
grid track. The donut chart, sliders and result figures do **not** cause this.

**R2 — `<select>` intrinsic width (2 pages: #2, #7).** A `<select>` sizes to its
longest `<option>` ("Sedentary — little or no exercise", "USD ($) — US
Dollar" …). Calorie's Activity-Level select (~440px) and Tip's currency row
(label + select) force the same grid track wide. Proof: hiding the select /
row brings the panel to exactly 328px.

**R3 — `.input-row` doesn't wrap above 360px (1 page: #3).** The
`@media (max-width: 360px)` rule wraps `.input-row` and makes number inputs
full-width — so Time Calculator is clean at exactly 360px, but at 361–~500px
the two h/m/s rows (3 × 110px inputs + labels, ~420px) overflow. Proof: both
duration rows measure 420px wide at 390px; hiding one row alone doesn't fix
it because the other row still forces the width.

**R4 — `input.num-input` doesn't match `<select>` (2 pages: #13 + Time).**
The box styling rule in `styles.css` is `input.num-input { height: 44px; … }`
— an element selector, so `<select class="num-input">` gets none of it and
renders at native ~21px height. Affects Time `#opSel` and GPA `.course-grade`
(JS-generated rows).

## Exact fixes (drafts — DO NOT apply yet, coordinator applies)

All CSS is additive, in `styles.css`. No logic, figure, header/footer, GA4 or
favicon change.

### F1 — Let calculator panels shrink (fixes the track-level overflow on all 12 pages)

File: `styles.css`, add next to the `.calc-panel` rule (or in the responsive section):

```css
/* UI-UX audit F1 — grid items must be allowed to shrink below content min-width,
   otherwise one wide table/select stretches the whole page on mobile. */
.calc-panel { min-width: 0; }
```

Effect: the grid track can be 328px on a 360px phone; the ecommerce
`.compare-wrap` (already `overflow-x: auto`) then scrolls internally. **F1
alone is not enough for the 8 amort-table pages** — a bare table would spill
out of its card — so F2 is also required.

### F2 — Wrap the year-by-year tables in a scroll container (8 pages)

File: each page listed below — wrap the `<table class="amort-table …">…</table>`
in the results panel with:

```html
<div class="table-wrap">
  <table class="amort-table …">…</table>
</div>
```

File: `styles.css`, add:

```css
/* UI-UX audit F2 — year-by-year tables scroll inside their card on mobile. */
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
```

Minimal set (pages that overflow today): `investment-calculator.html`,
`compound-interest-calculator.html`, `nps-calculator.html`,
`retirement-calculator.html`, `mortgage-calculator.html`,
`rent-vs-buy-calculator.html`, `auto-loan-calculator.html`,
`ppf-calculator.html`.
Recommended: apply the same wrap to **all 24 pages carrying `.amort-table`**
(the others fit today, but their tables are one long header word away from the
same bug). The ecommerce `.compare-table` needs no change — it is already
inside `.compare-wrap`.

### F3 — Let selects shrink on mobile (Calorie, Tip + 8px residual on 6 table pages)

File: `styles.css`, add inside the existing `@media (max-width: 768px)` block
(or as a new block — scoped to mobile so desktop is untouched):

```css
/* UI-UX audit F3 — selects size to their longest option; on mobile they must
   shrink to the panel instead of forcing the page wider. */
@media (max-width: 768px) {
  .currency-row { flex-wrap: wrap; }
  .currency-row select.currency-select { flex: 1 1 120px; min-width: 0; }
  .input-group > select.currency-select { width: 100%; max-width: 100%; }
}
```

Notes: deliberately **not** a global `select.currency-select { width: 100% }` —
that class is used on 26 pages including inside flex rows on the ecommerce page
(`#countrySel`, `#categorySel`, `#weightUnit` with inline `max-width: 90px`,
`#zoneSel`, `#targetTypeSel`), where full width would break the row layout.
The selectors above hit only the two broken patterns: a bare select directly
in an `.input-group` (Calorie `#activity`) and the label+select
`.currency-row` (Tip `#currency`, plus the currency rows on Investment /
Compound / Retirement / Mortgage / Auto-Loan / Rent-vs-Buy, which leave an
8px panel stretch after the tables are fixed). Closed selects will show their
longest option truncated — normal native behaviour.

### F4 — Style `<select class="num-input">` like the number inputs (Time, GPA)

File: `styles.css`, add next to the `input.num-input` rule:

```css
/* UI-UX audit F4 — the num-input box styling only matched <input>; the two
   <select class="num-input"> elements (Time #opSel, GPA .course-grade)
   rendered at native ~21px height. */
select.num-input {
  width: 100%; height: 44px; padding: 0 12px;
  border: 1px solid var(--border); border-radius: var(--radius-input);
  background: var(--surface); color: var(--text-strong);
  font-variant-numeric: tabular-nums; outline: none; cursor: pointer;
}
select.num-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
```

The GPA grade select carries inline `style="flex:1;min-width:90px"` inside a flex
row — `flex: 1` still governs its width there; only height/border/padding change.

### F5 — Wrap input rows on all mobile widths (Time Calculator)

File: `styles.css`, add inside the existing `@media (max-width: 768px)` block:

```css
/* UI-UX audit F5 — the 360px-only wrap rule leaves a 361–~500px gap where
   3-input rows (Time h/m/s) run off-screen. Wrapping is harmless elsewhere:
   slider+input rows only wrap when they genuinely don't fit. */
@media (max-width: 768px) {
  .input-row { flex-wrap: wrap; }
}
```

(If preferred, scope it to the one page with a `<style>`-free page class — but
the global rule is the safer default; no other page regressed in testing, since
rows that fit are unaffected by `flex-wrap`.)

### F6 — Optional minors (not required for "mobile friendly")

```css
/* Brand link is 183×36px; header is 64px so a 44px target fits. */
.brand { min-height: 44px; }
.brand-logo { width: 40px; height: 40px; }

/* Regime badges ("Better for you", "Best profit") are 11px — the only
   sub-12px text on the site. */
.regime-badge { font-size: 12px; }
```

## Things checked and found FINE (no fix needed)

- **Mobile menu:** opens on all 52 pages at 390px (nav height 235px, links
  16px/46px tall). The overflow seen with the menu open on 12 pages is the
  pre-existing page overflow above, not caused by the menu.
- **FAQ accordion:** first FAQ opens on every page that has one; no overflow
  introduced; `+`/`−` toggles correctly.
- **Scientific keypad:** all 41 keys measure **52×48px at 360px** (min-height
  48px, 5 columns) — comfortably above 44px; display scrolls internally, no
  overflow. See `scientific-mobile-390.png`.
- **Donut charts:** 160px SVG + legend in a wrapping flex row; the donut never
  causes overflow on any page (the tables/selects beside it do).
- **Sliders + number inputs:** slider `flex: 1; min-width: 0` + 110px input fit
  everywhere except the Time 3-input rows (F5).
- **Header / search / hero:** header search hides on mobile by design and the
  hamburger + theme toggle (44×44px) take over; hero H1 32px, hero search
  56px tall, no clipping. Sticky header works.
- **Footer:** 4 → 2 → 1 column across breakpoints; no overflow.
- **Homepage grid:** `minmax(240px, 1fr)` → single column at 360px; cards,
  trust strip and sections all fit. See `index-mobile-390.png` /
  `index-desktop-1280.png`.
- **Income Tax regime cards:** stack to one column at ≤768px; verdict + badges
  fit at 390px. See `income-tax-mobile-390.png`.
- **Income Tax / EMI / SIP etc. results:** big result figures (34px on mobile)
  fit; breakdown rows wrap correctly.
- **Tap targets — apparent failures that are NOT real issues:**
  inline text links in breadcrumbs, footers and FAQ answers (16–17px tall) —
  WCAG 2.2 exempts inline text targets; they are not buttons and must not be
  padded to 44px. Radio/checkbox inputs (13–18px) sit inside full-text
  `<label>`s / 44px chips (ecommerce platform chips, credit-card-payoff and
  pregnancy mode radios) — the label is the tap target. The 43px-tall links
  flagged by the scanner are 2-line inline links inside FAQ paragraphs.
- **Tiny text:** only the two 11px `.regime-badge` labels (F6, optional).
- **Contact page:** no form — mailto link only; renders fine, nothing broken.
- **404 / About / Privacy / Terms:** clean at all four widths.
- **Desktop 1280 & 1440:** zero horizontal overflow on all 52 pages;
  two-column calculator layout, 4-column homepage grid and regime grid all
  render correctly.

## Clean pages (39 of 52 — no issue at any tested width)

`index.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`,
`404.html`, and calculators: age, average, bmi, bmr, body-fat,
credit-card-payoff, currency-converter, date, discount, emi, fd, fraction,
grade, gst, hours, income-tax, inflation, loan, percentage, personal-loan,
pregnancy, quadratic-formula, random-number-generator, rd, roman-numeral,
salary, sales-tax, scientific, sip, slope, standard-deviation,
unit-converter, vat.

## Screenshots

Saved under `ui-audit-shots/` (10 files — one mobile + one desktop shot where a
problem was found, plus clean homepage shots; full 208-shot raw set from the
run is scratch in `/tmp/audit-shots/`, not a deliverable):

- `index-mobile-390.png` — homepage mobile, clean
- `index-desktop-1280.png` — homepage desktop, clean
- `ecommerce-mobile-390-top.png` — worst overflow (250px): card/chips/hints cut off
- `ecommerce-mobile-390-compare.png` — compare table (the 560px culprit)
- `calorie-mobile-390-top.png` — Activity-Level select overflow
- `time-mobile-390-top.png` — seconds input cut off + unstyled 21px Operation select
- `investment-mobile-390-amort-table.png` — year-by-year table overflow
- `scientific-mobile-390.png` — keypad, clean (52×48px keys)
- `income-tax-mobile-390.png` — regime cards, clean
- `emi-mobile-390.png` — clean calculator reference

## Out of scope / not audited

- Dark mode (toggled via `ac360-theme`) was not rendered in this pass — light
  mode only. The same F1–F5 fixes are theme-independent (layout, not colour).
- Live site was not re-checked; this audit is of the on-disk code. Re-run the
  360/390px overflow check after F1–F5 land (expected result: 0px on all pages).
- The 5 calculators added mid-audit were included; any calculator added after
  this audit should get the same 360px overflow check before push, since a new
  bare `.amort-table` or long-option select reintroduces R1/R2.
