# Neomorphism v2 — Changelog (All Calculator 360)

Date: 10 Nov 2026. Scope: **only `styles.css` was rewritten**. No HTML, JS,
SEO, GA, favicon or logic file was touched. The `?v=2` cache-bust on all
54 pages was already applied by another worker — nothing was needed here.
Starting point: the approved preview
(`calculator/emi-calculator-neomorphism.html`, inline `<style>` under
`body.neo`) — refined, not copied blindly; the main refinement is
readability (see contrast notes).

## 1. Shadow tokens

Light (default) — background `#e0e5ec`, dark shadow `#b8bcc4`, light
shadow `#ffffff` (preview values kept):

| Token | Value |
|---|---|
| `--sh-raised` | `9px 9px 18px #b8bcc4, -9px -9px 18px #ffffff` (panels, cards) |
| `--sh-raised-sm` | `5px 5px 10px …, -5px -5px 10px …` (buttons, chips, toggles, FAQ, keys) |
| `--sh-raised-lg` | `12px 12px 24px …, -12px -12px 24px …` (card hover lift) |
| `--sh-inset` | `inset 6px 6px 12px …, inset -6px -6px 12px …` (hero search, formula box, donut well) |
| `--sh-inset-sm` | `inset 4px 4px 8px …, inset -4px -4px 8px …` (text inputs, selects, slider track, calc icons) |
| `--sh-inset-xs` | `inset 3px 3px 6px …, inset -3px -3px 6px …` (bar tracks, pressed states) |
| `--sh-header` / `--sh-footer` | soft one-sided shadows (`0 6px 16px rgba(163,177,198,.55)` / `0 -6px 16px rgba(163,177,198,.30)`) — a full dual shadow on a sticky header/footer edge looks wrong, so these stay directional |

Dark (`html[data-theme="dark"]`, toggle mechanism unchanged — app.js +
localStorage `ac360-theme` + per-page pre-paint script):

| Token | Value |
|---|---|
| Background / surface | `#20293d` (surfaces ARE the background, as in light mode) |
| Dark shadow `--sh-dark` | `#141b29` |
| Light shadow `--sh-light` | `#2c3a55` (subtle top-left edge — the key to dark neumorphism) |
| Header / footer shadows | `0 6px 16px rgba(0,0,0,.45)` / `0 -6px 16px rgba(0,0,0,.40)` |
| Footer panel `--footer-bg` | `#1a2233` — darker than the page, but a neumorphic panel, not a black hole |

Radii: panels `24px`, cards `20px`, inputs `14px`, pills `999px`.
Font stays Inter. Layout structure, class names and all responsive
breakpoints (900 / 768 / 480 / 360px) are unchanged.

## 2. Text colours + contrast reasoning

All ratios computed against the theme background (WCAG AA needs 4.5:1
for normal text).

Light on `#e0e5ec`:

| Use | Colour | Ratio |
|---|---|---|
| Body text | `#475569` | 5.99:1 |
| Headings / values | `#1e293b` | 11.56:1 |
| Result figure | `#0f172a` | 14.10:1 |
| Muted / secondary | `#55677d` | 4.58:1 |
| Links / key figures | `#1d4ed8` | 5.29:1 |
| Green text (`.v.green`, badge) | `#047857` | 4.33:1 (bold/large text); 5.48:1 white-on-`#047857` for the badge |

Change vs preview: the preview's muted `#64748b` measured only **3.76:1**
on `#e0e5ec` — too faint for body-size secondary text — so muted was
darkened to `#55677d` (4.58:1). Same for green text: `#059669` as text is
2.98:1, so green *text* uses `#047857` while `#059669` stays for chart
segments and fills (graphical, not text).

Dark on `#20293d`:

| Use | Colour | Ratio |
|---|---|---|
| Body text | `#dbe4f0` | 11.32:1 |
| Headings / values | `#f1f5f9` | 13.88:1 |
| Muted | `#a9b8cc` | 7.20:1 |
| Links | `#60a5fa` | 5.71:1 |
| Green text | `#34d399` | 7.55:1 |
| Red text | `#f87171` | 5.25:1 |

## 3. Accent decisions

- **Primary blue `#2563eb` is KEPT** for primary buttons, the active
  tenure toggle, the scientific `=` key and the brand `360` — in both
  themes. White text on it is 5.17:1. The tempting dark-mode switch to
  `#3b82f6` was rejected: white on `#3b82f6` is only 3.68:1.
- **Links get their own token `--link`**: `#1d4ed8` in light (5.29:1;
  `#2563eb` as link text is only 4.08:1) and `#60a5fa` in dark (5.71:1;
  `#2563eb` on the dark background would be ~2.5:1). Input-label
  `<output>` values, `.show-more-btn`, `.faq-q::after` and
  `.sci-result` use `--link`, so key figures stay readable in dark mode.
- Success green `#059669` kept for fills/segments in light mode; the
  regime-winner ring and `.bar-fill` use theme success
  (`#059669` light / `#34d399` dark). The regime badge background is
  `--success-text` (`#047857` light / `#34d399` dark) so its white text
  always passes.
- Danger red `#dc2626` kept for light-mode fills/segments; dark-mode
  text/fills use `#f87171`.
- Focus is never lost in the borderless look: inputs/selects get an
  inset shadow **plus** a blue focus ring (`--focus-ring`); buttons,
  links, keys and chips get a `:focus-visible` outline.

## 4. Per-component notes

- **Header**: sticky, background = page background, no border, soft
  bottom shadow. Search input is an inset pill. Nav hover = raised
  pill shadow; active = pressed. Theme/menu toggles are raised round
  buttons, pressed on `:active`. Mobile nav is a raised sheet.
- **Hero**: no card — big inset pill search (56px), same treatment as
  the header search.
- **Calc cards**: raised `20px`, icon is an inset well, hover lifts
  2px with a stronger shadow, `:active` presses in. "Coming soon"
  keeps `opacity: 0.6` with an inset pill tag.
- **Trust strip**: raised panel; check marks use `--success-text`.
- **Footer**: v1 navy is gone. Light: `#d3d8e0` panel with a soft top
  shadow, slate text (`#475569` body, `#55677d` secondary, `#0f172a`
  headings). Dark: `#1a2233` panel with readable `#c3cede`/`#a9b8cc`
  text — deliberately not pure black.
- **Calc panels**: raised `24px`. Inputs/selects are inset wells with
  a blue ring on focus. Selects get a custom chevron (SVG data-URI,
  slate in light / `#a9b8cc` in dark) with `appearance: none`.
- **Sliders**: new neumorphic treatment — inset 12px track, raised
  26px round thumb (grab/grabbing cursor), keyboard focus ring.
  WebKit + Firefox pseudo-elements both styled.
- **Tenure toggle**: raised pill container; active button is blue
  with an inset shadow (preview behaviour kept).
- **Results**: result figure `#0f172a` / `#f8fafc`, 40px (34px mobile);
  breakdown rows separated by `--divider`; green total uses
  `--success-text`.
- **Tables**: dividers use `--divider`; `.table-wrap` /
  `.compare-wrap` keep `overflow-x: auto` (audit F2).
- **Formula box**: inset well (preview behaviour kept).
- **FAQ**: raised cards; `+`/`−` marker in primary blue; open state
  keeps the raised shadow.
- **Buttons**: `.btn-primary` blue with a blue-tinted shadow, darker
  on hover, inset-pressed on `:active`. `.show-more-btn` is a raised
  neumorphic pill, pressed on `:active`.
- **Regime cards (Income Tax)**: raised; the winner gets a 2px
  success ring (`box-shadow: raised, 0 0 0 2px var(--success)`)
  instead of the v1 `2px solid` border; badge stays 12px (audit F6).
- **Module 19 (E-commerce Profit)**: chips raised; checked chip is
  inset + `--primary-light` tint + dark-blue text (`#93c5fd` in dark).
  `.bar-track` is an inset well; `.bar-fill` success green,
  `.bar-fill.neg` theme danger. Compare table inherits
  `.amort-table`; `.rates-details summary` reuses `.faq-q`.
- **Module 27 (Scientific)**: display is an inset well; number keys
  raised, `fn`/`util` keys inset with blue function text, `=` key
  full-width blue with blue shadow. Result uses `--link`; error uses
  `--danger-text`.
- **404**: unchanged apart from theme colours.

### UI-UX audit fixes preserved (from v1)

F1 `.calc-panel min-width: 0` · F2 `.table-wrap overflow-x: auto` ·
F3 mobile select shrink (`.currency-row` wrap, `select` flex) ·
F4 `select.num-input` 44px · F5 `.input-row flex-wrap` at ≤768px ·
F6 `.brand` 44px min-height, logo 40px, `.regime-badge` 12px.
All breakpoints (900/768/480/360) and mobile-menu behaviour unchanged.

### New in v2: `.input-error` / `.validation-msg`

v1 had no rule for these classes (11 pages) — error paragraphs rendered
in plain body colour. They now render in `--danger-text`, semibold.
This is a new rule, not a restyle of an existing one.

## 5. Donut chart restyle

- **Container**: `.donut-wrap` is now an inset neumorphic well
  (`border-radius: 24px`, `box-shadow: var(--sh-inset)`, `padding: 20px`)
  inside the raised results panel, with a soft `drop-shadow` on the
  SVG — the chart sits in a crafted container instead of floating on
  the panel.
- **Centre text**: `.donut-pct` 22px/800, `.donut-sub` 12px/600, in
  theme colours (CSS beats the inline `font-size` presentation
  attributes). No numbers were changed — styling only.
- **Track**: `.donut-track` stroke `#c6cdd8` light / `#33415e` dark.
- **Segment overrides — `!important` is REQUIRED.** Inline
  `stroke="..."` presentation attributes beat a plain stylesheet rule
  (verified empirically: a plain rule left the amber segment
  `#f59e0b` unchanged; with `!important` it recolours). All 10 rules
  (5 colours × 2 themes) carry `!important`. JS only touches
  `stroke-dasharray`/`stroke-dashoffset`, never colour, so the
  overrides are safe from JS.
- **Inventory** (22 live pages, 52 segments; source:
  `donut-stroke-inventory.md`): `#2563eb` ×22 pages, `#059669` ×21,
  `#f59e0b` ×6 (compound-interest, mortgage, nps, rent-vs-buy,
  retirement, salary), `#dc2626` ×2 (mortgage, rent-vs-buy),
  `#7c3aed` ×1 (rent-vs-buy).
- **Legend dots** are `<span class="legend-dot"
  style="background:#...">` inline backgrounds — also `!important`,
  and kept in lock-step with the segment colours so the legend never
  lies.

| Inline value | Light segment + dot | Dark segment + dot |
|---|---|---|
| `#2563eb` blue | `#2563eb` (unchanged) | `#60a5fa` |
| `#059669` green | `#059669` (unchanged) | `#34d399` |
| `#f59e0b` amber | `#d97706` (darkened — `#f59e0b` washes out on `#e0e5ec`) | `#fbbf24` |
| `#dc2626` red | `#dc2626` (unchanged) | `#f87171` |
| `#7c3aed` purple | `#7c3aed` (unchanged) | `#a78bfa` |

## 6. Inline-style overrides (CSS-only; no HTML edited)

Source: `inline-style-inventory.md` — 67 flagged inline styles. Handled:

| Case | Fix |
|---|---|
| 52 legend dots | `!important` background overrides per colour per theme (§5) |
| 9 bordered boxes — 7 hours day-boxes + GPA `.course-row` + Grade `.assign-row` (JS `cssText`) | One selector `.input-group[style*="border:"]` → borderless inset wells. Note: the selector matches on `"border:"` with **no** space — the JS `cssText` form is serialised by the browser *with* spaces (`border: 1px solid …`), so the tighter `[style*="border:1px solid"]` missed the GPA/Grade rows on first verification and was widened. |
| 3 red error texts — `#errorMsg` (age), `#avgError` (average), `#fracError` (fraction), inline `color:#dc2626` | `color: var(--danger-text) !important` (`#b91c1c` light / `#f87171` dark) |
| 2 textareas — `#numbersInput` (average; `var(--border)` with **no** fallback + `var(--surface)`) and `#dataInput` (std-dev; `var(--border, #e5e7eb)`) | Inset neumorphic fields (`background: var(--bg)`, no border, inset shadow, theme text) with `!important`; focus ring on `:focus`. Without this, dark mode would show a native white textarea box. |
| BMI scale label row — plain div, inline `color:#64748b` (3.76:1 light, ~2.9:1 dark) | `div[style*="color:#64748b"] { color: var(--muted) !important; }` |
| Random-number result chips — JS injects `<span>` chips with an inline 1px border into `#resultList` | `#resultList span` → raised neumorphic chips, borderless |
| `.input-error` / `.validation-msg` (no inline colour) | Plain theme rule (§4) |

**Deliberately NOT overridden** (their colours are semantic and read
correctly on both themes; overriding would destroy their meaning):

- **BMI scale bar** — inline gradient
  (`#2563eb → #059669 → #d97706 → #dc2626`) plus the white
  `#scaleMarker` circle with `#0f172a` border. Left exactly as-is.
- **Body-fat JS segment bar** — category colours from JS
  (`#38bdf8` Essential, `#059669` Athletes, `#84cc16` Fitness,
  `#f59e0b` Average, `#ef4444` Obese) plus the same white marker.
  Its label row already uses `color:var(--muted, #64748b)`, which
  resolves to the theme muted in v2 — no fix needed.
- All remaining inline styles are layout/visibility only
  (`display`, `width`, `margin`, `font-size`, `flex`, …) and were left
  alone.

**Dropped token note:** v2 removes `--border` (v1). Inline styles that
reference it mostly carry the `#e5e7eb` fallback and are handled above;
the one without a fallback (average `#numbersInput`) is covered by the
textarea override. No other live HTML references a removed token
(checked: `var(--text-strong)`, `var(--surface)`, `var(--muted)` all
still exist in v2).

## 7. Verification (headless Chromium via Playwright, local server)

- **Round 1 — 24 renders**: home, EMI, SIP, E-commerce Profit,
  Scientific, Income Tax × 390px / 1280px × light / dark.
  Zero page errors, zero page-level horizontal overflow in all 24.
  (Elements inside `.compare-wrap` scroll horizontally by design;
  the first scan flagged those, the second scan correctly excludes
  designed scroll containers.) Donut computed colours verified for
  blue/green on EMI/SIP/Income Tax; EMI result computed live
  (`$900 / month`), SIP `$2,323,391 total`.
- **Round 2 — 56 renders**: salary, mortgage, rent-vs-buy, hours,
  BMI, average, std-dev, RNG, GPA, Grade, age, fraction, body-fat,
  EMI × 390px / 1280px × light / dark. Zero bad cases. Computed
  styles confirmed: all 5 donut colours + legend dots match §5 in
  both themes (rent-vs-buy is the only page with all five); hours
  day-boxes borderless + inset; both textareas theme-coloured with
  inset shadow; all 3 error texts `#b91c1c` / `#f87171`; BMI label
  row `#55677d` / `#a9b8cc`; RNG chips raised after clicking
  Generate; body-fat renders without errors.
- **Round 3 — focused re-check** after widening the bordered-box
  selector: GPA/Grade/hours rows at 390px light + dark — all 9 boxes
  now `border: none`, inset shadow, theme background.
- **Screenshots** (10, in `ui-redesign-shots/`, `*-check-*.png`):
  home 390 light + 1280 dark · EMI 390 light + 1280 dark · SIP 1280
  light · E-commerce 390 dark · salary 1280 dark · rent-vs-buy 1280
  light · hours 390 light · BMI 390 dark. Visually inspected:
  text readable everywhere, charts sit well in their wells, buttons
  and inputs usable, no overflow.
- **Issues found and fixed during verification**: (1) plain donut
  overrides did not recolour changed segments → added `!important`
  (§5); (2) `[style*="border:1px solid"]` missed JS-serialised
  `cssText` on GPA/Grade rows → widened to `[style*="border:"]` (§6).

## 8. What could NOT be verified / open items

- **Live-browser / phone check**: renders are headless Chromium only.
  Tauheed's phone check is still the final confirmation, especially
  the donut well and slider thumbs on a real mobile screen.
- **All 46 calculator pages** were not individually rendered — the
  14 pages above cover every component class in the contract plus
  every flagged inline style; pages sharing the same classes
  (e.g. the other donut pages) are covered by the computed-style
  checks on their shared selectors.
- **Firefox / Safari**: only Chromium was available in this
  environment. The slider uses both `::-webkit-slider-*` and
  `::-moz-range-*` rules, but Firefox rendering was not run.
- **Google Fonts**: Inter loaded from Google Fonts at render time;
  if it fails, the system-font fallback applies (unchanged from v1).
- **BMI / body-fat scale bars**: intentionally left with their
  original inline colours (§6) — if Tauheed wants them in the
  neumorphic palette, that needs a design call, not a CSS override,
  because the colours encode health categories.
- Nothing was pushed. Only `styles.css`, this changelog and the
  `ui-redesign-shots/` screenshots were created/changed by this task.
