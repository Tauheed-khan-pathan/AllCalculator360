# All Calculator 360 — Build Log

## Module 0 (Foundation) + Module 1 (EMI Calculator) — 8 Nov 2026

**Status: BUILT + VERIFIED locally. PUSHED 8 Nov ~02:58 IST (commit 6d5ee424, 11 files) after the first approval was declined by mistake and re-sent. Site LIVE verified ~03:01 IST (homepage + EMI page HTTP 200, correct titles).**

## Repo
- Owner/repo: Tauheed-khan-pathan/AllCalculator360 (public, empty before this build, default branch `main`)
- Live URL (once pushed + Pages builds): https://tauheed-khan-pathan.github.io/AllCalculator360/
- Custom domain allcalculator360.com: NOT bought yet — not this build's job.

## Files built (11, total ~90 KB — well under the 5 MB push limit)
- `index.html` — homepage: hero, live search, Popular strip, Finance/Health/Math/Everyday sections (14 cards; only EMI live, rest "Coming soon"), trust strip
- `styles.css` — full design system (Inter, #2563eb primary, #0f172a navy, dark mode via CSS variables, mobile-first)
- `app.js` — dark-mode toggle (localStorage `ac360-theme`), mobile menu, homepage live search/filter
- `calculator/emi-calculator.html` — EMI Calculator (see below)
- `404.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html` — static pages, real content
- `robots.txt`, `sitemap.xml` — sitemap lists home + EMI + 4 static pages

## Module 1 — EMI Calculator details
- URL pattern: `calculator/<slug>.html`
- Inputs: currency (USD/INR/EUR/GBP, default USD), loan amount slider+number (1,000–10,000,000), rate (1–30%), tenure years/months toggle
- Results (instant, no submit button): monthly EMI, total interest, total payment, SVG donut (principal vs interest), yearly amortisation table (first 5 rows, "Show all years" toggle)
- Formula section + worked example + 5 FAQs (with JSON-LD FAQPage) + related calculators

## Math verification (page's actual shipped JS, run under a DOM stub)
- P=1,000,000 @ 9% / 20y → EMI **8,997.26** (spec: ≈ 8,997 ✓)
- P=500,000 @ 10% / 5y → EMI **10,623.52** (spec: ≈ 10,624 ✓)
- P=10,000 @ 12% / 1y → EMI **888.49** (spec: ≈ 888 ✓)
- Default (100,000 @ 9% / 20y) → EMI $900/month (899.73)
- Amortisation: Year 1 principal 18,727 / interest 89,240 / balance 981,273; Year 20 balance 0.00; principal sums to exactly 1,000,000
- Worked example corrected: total payment 2,159,342, total interest 1,159,342 (the brief's rounded 2,159,352 was off by 10)

## Other verification done
- `node --check app.js` ✓, EMI inline script `node --check` ✓
- Header/footer byte-identical across all 7 HTML pages (modulo relative paths) ✓
- Link audit: zero missing targets ✓
- No lorem ipsum / placeholder text ✓
- Donut chart is theme-aware (dark mode) ✓; header has a `color-mix` fallback ✓
- Contact email used: tauheedkhanforprofession@gmail.com (owner's published professional email)

## Module 1 — done (pushed, live)
1. ~~Push to GitHub~~ — DONE 8 Nov ~02:58 IST, commit 6d5ee424.
2. ~~Live-verify~~ — DONE ~03:01 IST: homepage + EMI page HTTP 200, correct titles.
3. Next module (when ordered): SIP Calculator — see Module 2 below.

## Module 2 (SIP Calculator) — 8 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

## Files (4 changed, total ~60 KB — well under the 5 MB push limit)
- `calculator/sip-calculator.html` (NEW, 21,834 bytes) — SIP Calculator: currency (USD/INR/EUR/GBP, default USD), monthly investment slider+number (500–1,000,000, default 10,000), expected return rate (1–30%, default 12%), time period years (1–40, default 10); instant results (total value, invested, returns), SVG donut (invested vs returns, theme-aware), yearly breakdown table (first 5 rows + "Show all years"), formula + worked example + 5 FAQs (JSON-LD FAQPage) + related calculators (EMI live, FD coming soon)
- `calculator/emi-calculator.html` (modified) — related SIP card now a live link to sip-calculator.html; footer Popular SIP link now sip-calculator.html. Nothing else changed.
- `index.html` (modified) — SIP card LIVE in Popular strip + Finance section (link calculator/sip-calculator.html); footer Popular SIP link updated. All other cards unchanged.
- `sitemap.xml` (modified) — SIP URL added after EMI. Now 7 URLs.
- Header/footer byte-identical between EMI and SIP pages (diff-confirmed). No lorem ipsum/placeholder text. `node --check` on SIP inline script OK. Sitemap parses as well-formed XML.

## Math verification (page's actual shipped JS, run under a DOM stub — verified by coordinator, not just the worker)
- P=10,000 @ 12% / 10y → FV **$2,323,391** (invested $1,200,000; returns $1,123,391; Year 1: invested $120,000, returns $8,093, value $128,093) ✓
- P=5,000 @ 10% / 15y → FV **$2,089,621** (invested $900,000; returns $1,189,621) ✓ — NOTE: the task brief's expected 2,082,307 was arithmetically wrong (matches neither annuity-due 2,089,621 nor ordinary annuity 2,072,352); independently re-derived with node and confirmed the shipped figure is correct per the specified formula FV = P × (((1+i)^n − 1) ÷ i) × (1+i).
- P=1,000 @ 12% / 1y → FV **$12,809** (invested $12,000; returns $809) ✓
- Yearly table: final-year value = FV (Year 10: $2,323,391); invested column ends at P×12×years; toggle shows first 5 rows, hides when ≤5 rows.
- Worked-example figures on the page (2,323,391 / 1,123,391) match the verified computation.

## Pending (Module 2)
1. **Push to GitHub** (4 files, paths file at /tmp/ac360-push2-paths.txt) — needs the user to approve the push card. If declined, STOP and report; do not retry.
2. After push: live-verify SIP page (HTTP 200, title, math spot-check on defaults), homepage SIP links, dark mode + mobile layout; wait + re-check on any fresh 404 (Pages deployment lag).
3. Next module (when ordered): FD Calculator.

## Module 2 — DONE (pushed + live verified, 8 Nov 2026 ~03:10 IST)
- **Push: APPROVED and LANDED, commit f30e267bd5262f3a4d8f96cba4ab0bfa5242d163** (4 files, 60,314 bytes). Remote head before push was 6d5ee424 (Module 1) — no divergence.
- **Live verification (cache-busting URLs, after ~45s wait):** SIP page HTTP 200, title "SIP Calculator — Calculate SIP Returns | All Calculator 360" ✓, worked-example figure 2,323,391 present on the live page ✓; homepage HTTP 200 with 3 live SIP links (Popular, Finance, footer) ✓; EMI page HTTP 200 ✓; sitemap contains the SIP URL ✓. Math spot-check: defaults on the live page are 10,000/month @ 12% / 10y, which the shipped JS computes to FV $2,323,391 (verified locally under a DOM stub). Dark mode + mobile layout: SIP page reuses the identical Module 1 design system/classes (no CSS changes in this module); not visually screenshot-tested.
- **Test-case-2 note:** brief's expected 2,082,307 was wrong; shipped figure 2,089,621 verified correct (see Math verification above).

## Module 3 (FD Calculator) — 8 Nov 2026

**Status: Link updates done locally. FD page built by another worker; math verification and push pending (see below).**

## Files (5 listed; 4 modified by this worker, 1 new by another worker)
- `calculator/fd-calculator.html` (NEW) — FD Calculator page (built by another worker — not created or edited here).
- `index.html` (modified) — FD card LIVE in Popular strip and Finance section (link calculator/fd-calculator.html); footer Popular FD link updated to calculator/fd-calculator.html. Nothing else changed.
- `sitemap.xml` (modified) — FD URL added after SIP. Now 8 URLs.
- `calculator/emi-calculator.html` (modified) — Related Calculators FD card now a live link to fd-calculator.html; footer Popular FD link now fd-calculator.html. Nothing else changed.
- `calculator/sip-calculator.html` (modified) — Related Calculators FD card now a live link to fd-calculator.html; footer Popular FD link now fd-calculator.html. Nothing else changed.

Math verification (page's actual shipped JS, run under a DOM stub — verified by coordinator, not just the worker)
- P=100,000 @ 7% / 5y quarterly → FV **$141,478** (interest $41,478) ✓ (spec 141,478, diff 0)
- P=500,000 @ 6.5% / 3y quarterly → FV **$606,704** (interest $106,704) ✓ — spec said ≈606,705; true value is 606,703.79, so 606,704 is correct (diff −1, within ±2 tolerance); shipped the correct math, not fudged to the brief.
- P=10,000 @ 8% / 1y quarterly → FV **$10,824** (interest $824) ✓ (spec 10,824, diff 0)
- Extra checks: monthly compounding 100,000 @ 7% / 5y → $141,763 ✓; yearly compounding → $140,255 ✓ (100,000 × 1.07^5 = 140,255.17, matches FAQ example).
- Yearly table: final-year value = FV; interest column sums to total interest (display rounding only).
- Worked-example figures on the page (141,478 / 41,478) match the verified computation.
- Other verification: `node --check` on FD inline script PASS; header/footer byte-identical across EMI/SIP/FD pages (diff-confirmed); sitemap well-formed XML, 8 URLs incl. FD; link audit zero missing targets (only a data: URI favicon, not a file); no lorem ipsum/placeholder text (only search-input placeholder attributes).

Push status: DONE (pushed + live verified, 8 Nov 2026)
- **Push: APPROVED and LANDED, commit a6f16229d47fe1c2140afe04b30e5a6b0229a004** (5 files, 83,690 bytes). Remote head before push was f30e267b (Module 2) — no divergence.
- **Live verification (cache-busting URLs, after ~60s wait):** FD page HTTP 200, title "FD Calculator — Calculate Fixed Deposit Maturity Value | All Calculator 360" ✓, worked-example figure 141,478 present on the live page ✓; homepage HTTP 200 with 3 live FD links (Popular, Finance, footer) ✓; EMI + SIP pages HTTP 200 ✓; sitemap contains the FD URL ✓. Math spot-check: defaults on the live page are 100,000 @ 7% / 5y quarterly, which the shipped JS computes to FV $141,478 (verified locally under a DOM stub). Dark mode + mobile layout: FD page reuses the identical Module 1 design system/classes (no CSS changes in this module); not visually screenshot-tested.
- **Test-case-2 note:** brief's expected 606,705 was off by 1; shipped figure 606,704 verified correct (true value 606,703.79).

## Module 4 (Income Tax Calculator, India FY 2025-26) — 8 Nov 2026

**Status: built + verified locally; push pending.**

## Files (7 listed; 1 new, 6 modified)
- `calculator/income-tax-calculator.html` (NEW, 32,372 bytes) — Income Tax Calculator page (India, FY 2025-26, New vs Old Regime). Currency fixed INR — no currency selector. Inputs: Gross Annual Income (0–1 crore, default 15,00,000), Age Group select (<60 / 60–80 / >80), 80C (0–1,50,000), 80D (0–1,00,000), HRA (0–5,00,000) — deductions Old Regime only. Results: verdict line + "Better for you" badge, two side-by-side regime cards (Taxable Income, Tax before cess, Cess 4%, Total Tax Payable, Effective Tax Rate, Take-Home), slab-wise breakdown table for the winning regime, theme-aware donut (Tax vs Take-Home). Formula section with both slab tables + worked example (₹15,00,000 → New ₹97,500 vs Old ₹2,57,400). 5 FAQs, page text == JSON-LD FAQPage (verified programmatically).
- `styles.css` (modified) — minimal addition only: `.verdict`, `.regime-grid`, `.regime-card`, `.regime-badge` + mobile stacking (9 lines); no existing styles changed.
- `index.html` (modified) — Tax card LIVE in Popular strip + Finance section (link calculator/income-tax-calculator.html); footer Popular Tax link added. Nothing else changed.
- `sitemap.xml` (modified) — Tax URL added after FD. Now 9 URLs.
- `calculator/emi-calculator.html` (modified) — Related Calculators Tax card now a live link to income-tax-calculator.html; footer Popular Tax link added. Nothing else changed.
- `calculator/sip-calculator.html` (modified) — same as EMI.
- `calculator/fd-calculator.html` (modified) — same as EMI.

Math verification (page's actual shipped JS, run under a DOM stub — verified by coordinator, not just the worker)
- (1) Gross ₹15,00,000 → New TOTAL ₹97,500 (taxable 14,25,000; tax 93,750; cess 3,750). Old TOTAL ₹2,57,400 (taxable 14,50,000; tax 2,47,500; cess 9,900). Verdict: New saves ₹1,59,900. ✓
- (2) Gross ₹10,00,000 → New TOTAL ₹0 (rebate). Old TOTAL ₹1,06,600 (taxable 9,50,000; tax 1,02,500; cess 4,100). Verdict: New saves ₹1,06,600. ✓
- (3) Gross ₹25,00,000 → New TOTAL ₹3,19,800 (taxable 24,25,000; tax 3,07,500; cess 12,300). Old TOTAL ₹5,69,400 (taxable 24,50,000; tax 5,47,500; cess 21,900). Verdict: New saves ₹2,49,600. ✓
- (4) Marginal relief: Gross ₹12,85,000 → New taxable 12,10,000; uncapped tax 61,500, capped at 10,000; cess 400; TOTAL ₹10,400. ✓
- (5) Gross ₹5,50,000 → Old TOTAL ₹0 (taxable 5,00,000, rebate). New TOTAL ₹0 (taxable 4,75,000, rebate). ✓
- (6) Gross ₹12,00,000, 80C ₹1,50,000, 80D ₹25,000, HRA ₹1,00,000 → Old TOTAL ₹91,000 (taxable 8,75,000; tax 87,500; cess 3,500). New TOTAL ₹0 (taxable 11,25,000, rebate). ✓
- Age variants (independent check): 60–80 @ ₹10,00,000 → Old TOTAL ₹1,04,000 (tax 1,00,000) ✓; >80 @ ₹10,00,000 → Old TOTAL ₹93,600 (tax 90,000) ✓; >80 @ ₹15,00,000 → Old TOTAL ₹2,44,400 (tax 2,35,000) ✓. Zero income → both ₹0 ✓.
- Slab rows sum to tax-before-cess (case 1 new: 93,750; case 6 old: 87,500). Effective rate + take-home verified (case 1 new: 6.50%, ₹14,02,500).
- **Test-case-3 note:** brief's expected New tax 3,06,250 was arithmetically wrong (25,000 above ₹24L at 30% = 7,500, not 6,250); shipped figure 3,07,500 / total 3,19,800 verified correct per the specified slabs.
- Other verification: `node --check` on Tax inline script PASS; header/footer byte-identical to FD page (diff-confirmed); sitemap well-formed XML, 9 URLs incl. Tax; link audit zero missing targets; no lorem ipsum/placeholder text (only search-input placeholder attributes).

Push status: DONE (pushed + live verified, 8 Nov 2026)
- **Push: APPROVED and LANDED, commit 94eb79a01f4d02f6d426c120be545bcbe6a3e7b0** (7 files, 135,940 bytes). Remote head before push was a6f16229 (Module 3) — no divergence.
- **Live verification (cache-busting URLs, after ~60s wait):** Tax page HTTP 200, title "Income Tax Calculator India — New vs Old Regime FY 2025-26 | All Calculator 360" ✓, worked-example figure 97,500 present on the live page ✓; homepage HTTP 200 with 3 live Tax links (Popular, Finance, footer) ✓; EMI + SIP + FD pages HTTP 200 ✓; sitemap contains the Tax URL ✓. Math spot-check: defaults on the live page are ₹15,00,000 gross, which the shipped JS computes to New ₹97,500 / Old ₹2,57,400 (verified locally under a DOM stub). Dark mode + mobile layout: Tax page reuses the identical Module 1 design system/classes (only a 9-line additive CSS block); not visually screenshot-tested.
- **Test-case-3 note:** brief's expected New tax 3,06,250 was arithmetically wrong; shipped figure 3,07,500 / total 3,19,800 verified correct per the specified slabs.

## Modules 5–8 (GST, Age, BMI, Percentage Calculators) — 8 Nov 2026 (overnight)

**Status: BUILT + VERIFIED locally. STAGED ONLY — NOT PUSHED. Ready for ONE morning push (Tauheed approves/pushes in the morning). No push command was run by any worker or the coordinator; remote HEAD verified still 94eb79a0 (Module 4).**

## Module 5 — GST Calculator (India)
- `calculator/gst-calculator.html` (NEW, 23,739 bytes incl. footer link update) — Add GST / Remove GST toggle; Amount slider+number (₹100–₹10,00,000, default ₹10,000); rate select 0% / 5% / 18% (default) / 40% / Custom (reveals custom-rate input); GST 2.0 hint (12%/28% merged Sept 2025); currency FIXED INR (₹, en-IN formatter copied from Tax page — no currency selector); instant results (Total/Base big figure, Base, GST, CGST, SGST); theme-aware SVG donut (base vs GST); formula + worked example + 5 FAQs (JSON-LD FAQPage) + related (Tax, EMI, FD).
- Math verification (page's actual shipped JS, run under a DOM stub — verified by coordinator with an independent harness, 11 checks, ALL PASS): Add ₹10,000 @ 18% → GST ₹1,800, CGST ₹900, SGST ₹900, Total ₹11,800 ✓; Remove ₹11,800 @ 18% → Base ₹10,000, GST ₹1,800 ✓; Add ₹50,000 @ 5% → GST ₹2,500, Total ₹52,500 ✓; Add ₹1,000 @ 40% → GST ₹400, Total ₹1,400 ✓; Add ₹10,000 @ custom 12% → GST ₹1,200 ✓.

## Module 6 — Age Calculator
- `calculator/age-calculator.html` (NEW, 18,841 bytes) — DOB date input (default 2000-01-01) + "Age at" date (default today via JS); instant results: age in years/months/days, total months, total weeks, total days lived, day of week born, next birthday + days remaining; DOB-after-"Age at" validation message (static text, shown via display:block); borrowing-method explanation + worked example + 5 FAQs (JSON-LD FAQPage) + related (BMI, Percentage, EMI).
- Math verification (shipped JS under DOM stub — coordinator harness, 11 checks, ALL PASS): DOB 2000-01-01 as of 2026-11-08 → 26y 10m 7d, Saturday, 9,808 days, 322 months, next birthday 2027-01-01 (54 days) ✓; DOB 1990-06-15 → 36y 4m 24d, Friday ✓; DOB 2020-02-29 → 6y 8m 10d, next birthday 1 March 2027 ✓; DOB = today → 0y 0m 0d ✓; DOB 2030-01-01 → validation shown, no negative age ✓.

## Module 7 — BMI Calculator
- `calculator/bmi-calculator.html` (NEW, 21,334 bytes) — Height cm slider+number (120–220, default 175) + cm / ft+in toggle (ft/in inputs convert to cm); Weight kg slider+number (30–200, default 70); instant results: BIG BMI (1 decimal), category (Underweight <18.5 / Normal 18.5–24.9 / Overweight 25–29.9 / Obese ≥30) colour-coded, colour scale bar (inline styles only — styles.css NOT touched, md5 unchanged), healthy weight range for height; formula + worked example + 5 FAQs (JSON-LD FAQPage, incl. "not medical advice") + related (Age, Percentage, SIP).
- Math verification (shipped JS under DOM stub — coordinator harness, 9 checks, ALL PASS): 70 kg / 175 cm → BMI 22.9 (22.86), Normal, range 56.7–76.3 kg ✓; 90 kg / 170 cm → 31.1 (31.14), Obese, range 53.5–72.0 ✓; 50 kg / 170 cm → 17.3 (17.30), Underweight ✓; 5 ft 9 in / 70 kg → 22.8 (22.79), Normal ✓; 80 kg / 175 cm → 26.1 (26.12), Overweight ✓. NOTE: brief's boundary values 24.90/24.93 were arithmetically wrong — true values are 24.91 (76.3 kg) and 24.95 (76.4 kg); page math is correct, not fudged to the brief.

## Module 8 — Percentage Calculator
- `calculator/percentage-calculator.html` (NEW, 24,067 bytes) — THREE stacked mini-tools, each EMI-style inputs + big instant result: (a) "What is X% of Y?" (defaults 20% / 500); (b) "X is what % of Y?" (defaults 25 / 200); (c) "Percentage change from X to Y" (defaults 50 → 75; zero-From guard shows "Enter a non-zero starting value.", plus Y=0 guard in tool b); formulas + worked examples + 5 FAQs (JSON-LD FAQPage) + related (Age, BMI, EMI).
- Math verification (shipped JS under DOM stub — coordinator harness, 8 checks, ALL PASS): 20% of 500 = 100 ✓; 25 is 12.5% of 200 ✓; 50 → 75 = +50% ✓; 80 → 60 = −25% ✓; 15% of 240 = 36 ✓; 30 is 60% of 50 ✓; 100 → 120 = +20% ✓; From 0 → validation message, no Infinity/NaN ✓.

## Link updates (Modules 5–8)
- 10 files changed: the 4 new pages + index.html + sitemap.xml + emi/sip/fd/income-tax pages (related-grid 3 → 7 cards each; footer Popular list updated on all 8 calculator pages + homepage).
- Homepage: GST/BMI/Percentage/Age live in Popular strip (now 8 cards) + GST added to Finance; BMI/Percentage/Age soon-divs converted to live links; BMR, Calorie, Fraction, Average, Date, Unit Converter still "Coming soon". Footer Popular order: EMI, SIP, FD, Income Tax, GST, BMI, Age, Percentage.
- sitemap.xml: 13 URLs (9 + gst/age/bmi/percentage, lastmod 2026-11-08), parses as well-formed XML.

## Coordinator verification (independent, not just the workers)
- Math: 39/39 checks PASS on the shipped JS (independent DOM-stub harness /tmp/verify-m58.js, TZ=Asia/Kolkata).
- node --check: all 4 inline scripts PASS.
- Header md5 identical across all 8 calculator pages (15340477c2f29cf45cc62cc2e15cc22b); footer md5 identical across all 8 (3595e31c67c251809fbd2b821246bf68).
- FAQ body text == JSON-LD answers on all 4 new pages (5/5 each, programmatic comparison).
- Link audit: 421 relative href/src checked across index + sitemap + all 8 calculator pages + 5 static pages — 0 missing targets.
- No lorem / TODO / XXX anywhere (only the template header search placeholder attribute).
- styles.css + app.js untouched in this batch (mtimes predate the batch). No push run; remote HEAD confirmed 94eb79a0.

## MORNING PUSH — exact file list (10 files, 215,612 bytes total, well under the 5 MB limit)
- calculator/gst-calculator.html (NEW, 23,739)
- calculator/age-calculator.html (NEW, 18,841)
- calculator/bmi-calculator.html (NEW, 21,334)
- calculator/percentage-calculator.html (NEW, 24,067)
- index.html (15315)
- sitemap.xml (1993)
- calculator/emi-calculator.html (26832)
- calculator/sip-calculator.html (24039)
- calculator/fd-calculator.html (25372)
- calculator/income-tax-calculator.html (34080)
- Suggested message: "Modules 5-8: GST, Age, BMI, Percentage Calculators + homepage/sitemap/link updates (staged overnight)"
- After push: live-verify all 4 new pages (HTTP 200, titles, math spot-check on defaults), homepage links, sitemap; wait + re-check on any fresh 404 (Pages deployment lag).
- Next modules (when ordered): BMR, Calorie, Fraction, Average, Date, Unit Converter — the 6 remaining "Coming soon" cards.

## Modules 9–14 (BMR, Calorie, Fraction, Average, Date, Unit Converter) — 8 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

## Files (8 changed: 6 new + index + sitemap)
- `calculator/bmr-calculator.html` (NEW, 23,598 bytes) — BMR Calculator (Mifflin-St Jeor): gender toggle, age 10–90, height cm/ft+in (BMI pattern), weight kg; big BMR kcal/day + breakdown + BMR per day/week/month table. No donut (table fits better).
- `calculator/calorie-calculator.html` (NEW, 27,735 bytes) — Calorie Calculator (TDEE = BMR × activity factor 1.2–1.9): same inputs + activity select; big maintenance figure + BMR/activity breakdown + targets table (lose −500 / mild −250 / maintain / mild +250 / gain +500) + theme-aware SVG donut (BMR vs activity calories).
- `calculator/fraction-calculator.html` (NEW, 21,120 bytes) — Fraction Calculator: two fractions + operation (+ − × ÷); GCD/Euclidean simplification; big simplified result + decimal (4 dp) + mixed number; step-by-step box; breakdown table; zero-denominator / divide-by-zero guards.
- `calculator/average-calculator.html` (NEW, 17,616 bytes) — Average Calculator: textarea (comma/space/newline separated); big mean (2 dp) + count/sum/mean/median/mode/range/min/max table + sorted list.
- `calculator/date-calculator.html` (NEW, 21,181 bytes) — Date Calculator: two stacked tools — days between two dates (total days, weeks + days, months + days; reversed dates show absolute value + note) and add/subtract days (result date + day of week); UTC-noon dates (no DST off-by-one).
- `calculator/unit-converter.html` (NEW, 19,485 bytes) — Unit Converter: Length/Weight/Temperature/Volume; unit lists swap per category; big converted value + conversion line + table of the value in every unit of the category.
- `index.html` (modified) — all 6 soon-cards converted to live links in their sections (Health: BMR, Calorie; Math: Fraction, Average; Everyday: Date, Unit Converter). **0 soon-cards left.** Popular strip unchanged (8 cards).
- `sitemap.xml` (modified) — 6 new URLs added after Percentage. Now 19 URLs, parses as well-formed XML.

## Math verification (coordinator's independent DOM-stub harness, shipped JS — 33/33 PASS)
- BMR: male 30y/175cm/70kg = 1,649; female 25y/165cm/60kg = 1,345; male 45y/180cm/90kg = 1,805; female 60y/160cm/75kg = 1,289; week 11,541 / month 49,463.
- Calorie: male sedentary 1.2 → TDEE 1,979 (lose 1,479 / gain 2,479); female moderate 1.55 → 2,085; male very active 1.725 → 3,114; worked example moderate → 2,556.
- Fraction: 1/2+1/3 = 5/6 ≈ 0.8333; 3/4−1/2 = 1/4; 2/3×3/4 = 1/2; 3/4÷2/5 = 15/8 = 1 7/8; 1/6+1/6 = 1/3.
- Average: 10–50 → mean 30, median 30, range 40, sum 150; 5,5,10,15 → mean 8.75, median 7.5, mode 5; 2,4,6,8 → mean 5; single 100 → mean 100, range 0.
- Date: 2026-01-01→2026-11-08 = 311 days; +100 days = 2026-04-11 (Saturday); 2024-02-28+1 = 2024-02-29 (leap); 2026-12-31→2027-01-01 = 1 day; 2026-11-08−30 = 2026-10-09.
- Unit: 1 km = 1,000 m; 5 miles = 8.04672 km; 1 kg = 2.20462 lb; 100 °C = 212 °F; 32 °F = 0 °C; 0 °C = 273.15 K; 1 US gallon = 3.78541 L; 2 L = 2,000 mL; 12 in = 1 ft.
- Workers' own harnesses also passed (BMR/Calorie 9, Fraction/Average 10, Date/Unit 23 cases). Harness note: the coordinator's first run showed 12 failures that were harness artifacts, not page bugs — the subtract option value is U+2212 '−' (not ASCII '-'), daysOut/resultOut are written via innerHTML, and the pound unit id is 'pound' (not 'lb'); re-running with the correct values gave 33/33.

## Other verification (coordinator, independent)
- node --check: all 6 inline scripts + app.js PASS.
- Header/footer md5 identical across all 14 calculator pages (28/28 checks).
- FAQ body text == JSON-LD answers on all 6 new pages (5/5 each).
- Link audit: 20 files, 362 relative href/src checked — 0 missing targets.
- No lorem / TODO / XXX anywhere. styles.css + app.js untouched in this batch.
- Remote HEAD verified before push: cd2c1f7b (Modules 5–8) — no divergence.

## PUSH — exact file list (8 files, ~149 KB total, well under the 5 MB limit)
- calculator/bmr-calculator.html, calculator/calorie-calculator.html, calculator/fraction-calculator.html, calculator/average-calculator.html, calculator/date-calculator.html, calculator/unit-converter.html, index.html, sitemap.xml
- Suggested message: "Modules 9-14: BMR, Calorie, Fraction, Average, Date, Unit Converter + homepage/sitemap (all 14 calculators live)"
- After push: live-verify all 6 new pages (HTTP 200, titles, math spot-check on defaults), homepage links, sitemap; wait + re-check on any fresh 404 (Pages deployment lag).
- Site now has 14 live calculators — no "Coming soon" cards remain.

## Modules 9–14 — DONE (pushed + live verified, 8 Nov 2026 ~23:58 IST)
- **Push: APPROVED and LANDED, commit d1bdcee38633a524da6dff94251fcfea996fbf8a** (8 files, 149,091 bytes). Remote head before push was cd2c1f7b (Modules 5–8) — no divergence.
- **Live verification (cache-busting URLs, after ~3 min wait):** homepage + all 14 calculator pages HTTP 200 with correct titles (EMI, SIP, FD, Income Tax, GST, Age, BMI, Percentage, BMR, Calorie, Fraction, Average, Date, Unit Converter); worked-example figures present on all 6 new live pages (BMR 1649 / 1648.75, Calorie 2556, Fraction 5/6, Average 30.00, Date 311, Unit 8.04672); sitemap HTTP 200 with all 6 new URLs. **Site now has 14 live calculators — no "Coming soon" cards remain.**
- Note: the comma-formatted figures (1,649 / 2,556) appear only after JS runs in the browser; the static worked-example text uses unformatted numbers (1649 / 2556), which is what was verified on the live HTML.
- Next (when ordered): domain purchase (allcalculator360.com — Tauheed buys it himself), Search Console, AdSense, next calculator modules (PPF, NPS, RD, Compound Interest, Home Loan EMI, Personal Loan per the to-do list).

## Modules 15–16 (Mortgage, Compound Interest Calculators) — 8 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

## Files (4 changed: 2 new + index + sitemap)
- `calculator/mortgage-calculator.html` (NEW, 31,168 bytes) — Mortgage Calculator (Calculator.net's #1 most-used): currency selector (USD/INR/EUR/GBP, default USD); home price 50,000–5,000,000 (default 400,000); down payment % slider 0–50% (default 20%, amount shown live); term select 10/15/20/30y (default 30); rate 1–15% (default 6.5%); annual property tax (default 4,800), annual home insurance (default 1,800), PMI rate % (default 0, under-20% hint); big total monthly payment + breakdown (P&I, tax/mo, insurance/mo, PMI/mo), loan amount, total interest (P&I only), total cost (all payments); 4-slice theme-aware SVG donut (zero slices hidden); yearly amortisation table (first 5 rows + "Show all years"); formula + worked example + 5 FAQs (JSON-LD FAQPage) + related (EMI, Compound Interest, FD). Header/footer md5-identical to EMI page. No styles.css change.
- `calculator/compound-interest-calculator.html` (NEW, 28,842 bytes) — Compound Interest Calculator: currency selector; initial principal 0–10,000,000 (default 10,000); monthly contribution 0–100,000 (default 500); rate 0.1–30% (default 8%); years 1–50 (default 10); compounding select Monthly (default) / Quarterly / Half-Yearly / Yearly / Daily; big future value + total contributions + total interest earned; 3-slice theme-aware SVG donut (principal blue / contributions amber #f59e0b inline SVG attribute / interest green; zero slices hidden); yearly growth table (first 5 rows + "Show all years"); formula states the exact method (month-by-month simulation, g = (1 + r/n)^(n/12), contribution at START of each month, annuity-due) + closed-form for monthly compounding; worked example + 5 FAQs (JSON-LD FAQPage) + related (SIP, FD, Mortgage). Header/footer md5-identical to EMI page. No styles.css change.
- `index.html` (modified) — Mortgage + Compound Interest cards LIVE in the Finance section (now 7 cards). Popular strip unchanged (8 cards). Footer Popular list unchanged (8 items) — same as Modules 9–14 pattern.
- `sitemap.xml` (modified) — 2 new URLs added after Unit Converter. Now 21 URLs, parses as well-formed XML.

## Math verification (coordinator's independent DOM-stub harness, shipped JS — 42/42 PASS)
- Mortgage: worked example ($400k home, 20% down, loan $320,000, 6.5%, 30y, tax $4,800, ins $1,800, PMI 0%) → P&I **$2,023**, tax $400, ins $150, total **$2,573/mo**, total interest **$408,142**, total cost **$926,142**; amortisation 30 rows, principal sums to $320,000, final balance 0.00, Year 1 principal $3,577 / interest $20,695. Case 2 ($250k, 10% down, loan $225,000, 5%, 15y, tax $3,000, ins $1,200, PMI 0.5%) → P&I $1,779, PMI $94, total $2,223/mo, total interest $95,271; principal sums to $225,000, final balance 0. Case 3 ($600k, 25% down, loan $450,000, 7.5%, 30y, tax $7,200, ins $2,400) → P&I $3,146, total $3,946/mo, total interest $682,728. $0-down check: P&I $2,528 = EMI for the same loan/rate/term. Defaults on load = worked example.
- Compound Interest: worked example ($10,000 + $500/mo @ 8% / 10y monthly) → FV **$114,279**, contributions $70,000, interest $44,279; yearly table final = FV, interest column sums to total interest (display rounding $1). FD cross-check: $100,000, $0/mo @ 7% / 5y monthly → **$141,763** = FD closed form exactly. SIP cross-check: $0, $10,000/mo @ 12% / 10y monthly → **$2,323,391** = SIP closed form exactly. $50,000, $0/mo @ 6% / 20y yearly → **$160,357** (= 50,000 × 1.06^20). $0, $1,000/mo @ 10% / 15y quarterly → **$414,756**. $5,000, $200/mo @ 5% / 3y daily → **$13,593**. Defaults on load = worked example.
- **Brief-correction note:** the task brief's Mortgage total-interest estimate (≈ $408,244) was arithmetically wrong; the true EMI-formula value is $408,142 — shipped the true figure everywhere (worked example + FAQ). The brief's P&I ≈ $2,023 and total ≈ $2,573 were correct.
- Workers' own harnesses also passed (mortgage cases + CI 6 cases incl. both cross-checks).
- Other verification: node --check on both inline scripts (big + small theme script) + app.js PASS; header md5 identical across all 16 calculator pages (15340477c2f29cf45cc62cc2e15cc22b); footer md5 identical across all 16 (3595e31c67c251809fbd2b821246bf68); FAQ body text == JSON-LD answers on both new pages (5/5 each); worked-example figures present on both pages and matching computed values; link audit 706 href/src/loc checked across all files — 0 missing; no lorem / TODO / XXX; styles.css + app.js untouched in this batch.

## PUSH — exact file list (4 files, ~79 KB total, well under the 5 MB limit)
- calculator/mortgage-calculator.html, calculator/compound-interest-calculator.html, index.html, sitemap.xml
- Suggested message: "Modules 15-16: Mortgage + Compound Interest Calculators + homepage/sitemap (16 calculators live)"
- After push: live-verify both new pages (HTTP 200, titles, math spot-check on defaults), homepage links, sitemap; wait + re-check on any fresh 404 (Pages deployment lag).
- Site will have 16 live calculators after this push.

## Modules 15–16 — DONE (pushed + live verified, 8 Nov 2026 ~23:58 IST)
- **Push: APPROVED and LANDED, commit 1ae1195f7e96f23ff455cd2aa4fb0eeb80434e86** (4 files, 79,422 bytes). Remote head before push was d1bdcee3 (Modules 9–14) — no divergence. Both new pages were 404 on the live site before the push (confirmed absent remotely).
- **Live verification (cache-busting URLs, after ~3 min wait):** homepage + all 16 calculator pages HTTP 200 with correct titles (EMI, SIP, FD, Income Tax, GST, Age, BMI, Percentage, BMR, Calorie, Fraction, Average, Date, Unit Converter, Mortgage, Compound Interest); worked-example figures present on both new live pages (Mortgage 2,023 / 2,573 / 408,142 / 926,142; Compound Interest 114,279 / 70,000 / 44,279 / 17,096); sitemap HTTP 200 with both new URLs (21 total); homepage contains both new Finance links. **Site now has 16 live calculators.**
- Next (when ordered): domain purchase (allcalculator360.com — Tauheed buys it himself), Search Console, AdSense, next calculator modules (PPF, NPS, RD, Home Loan EMI, Personal Loan per the to-do list).

## Modules 17–18 (Auto Loan, Retirement Calculators) — 9 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

## Files (4 changed: 2 new + index + sitemap)
- `calculator/auto-loan-calculator.html` (NEW, 30,207 bytes) — Auto Loan Calculator (Calculator.net's most popular loan calculator after mortgage): currency selector (USD/INR/EUR/GBP, default USD); vehicle price 5,000–500,000 (default 30,000); trade-in value (default 0); down payment amount (default 3,000); sales tax rate 0–15% (default 7%); term select 1–7y (default 5); rate 1–20% (default 7%). Math: tax = (price − trade-in) × tax%; loan = price − trade-in − down + tax; monthly payment via EMI formula; total interest = EMI × n − loan; total cost = EMI × n + down + trade-in; zero-loan guard with validation message. Big monthly payment + breakdown (loan, tax, total interest, total cost), 2-slice theme-aware SVG donut (loan vs interest), yearly amortisation table (first 5 rows + "Show all years"). Formula + worked example + 5 FAQs (JSON-LD FAQPage) + related (EMI, Mortgage, Compound Interest). Header/footer md5-identical to mortgage page. No styles.css change.
- `calculator/retirement-calculator.html` (NEW, 34,184 bytes) — Retirement Calculator: currency selector; current age 18–70 (default 30); retirement age 50–80 (default 65); current savings 0–10,000,000 (default 50,000); monthly contribution 0–100,000 (default 1,000); return rate 1–15% (default 8%); inflation rate 0–10% (default 3%). Math: month-by-month simulation, same method as Compound Interest page (g = (1 + r/12), contribution at START of each month, annuity-due); nest egg, total contributions, total growth, inflation-adjusted value = nest egg ÷ (1 + inflation)^years; retirement-age ≤ current-age validation message. Big nest egg + breakdown, 3-slice theme-aware SVG donut (savings / contributions / growth), yearly growth table (first 5 rows + "Show all years"). Formula + worked example + 5 FAQs (JSON-LD FAQPage) + related (Compound Interest, SIP, FD). Header/footer md5-identical to mortgage page. No styles.css change.
- `index.html` (modified) — Auto Loan + Retirement cards LIVE in the Finance section (now 9 cards). Popular strip unchanged (8 cards). Footer Popular list unchanged (8 items) — same as Modules 9–16 pattern.
- `sitemap.xml` (modified) — 2 new URLs added after Compound Interest. Now 23 URLs, parses as well-formed XML.

## Math verification (coordinator's independent DOM-stub harness, shipped JS — 43/43 PASS)
- Auto Loan: defaults ($30,000, $0 trade-in, $3,000 down, 7% tax, 5y @ 7%) → tax **$2,100**, loan **$29,100**, EMI **$576**, total interest **$5,473**, total cost **$37,573**; amortisation 5 rows, principal sums to $29,100 (display rounding $29,099), final balance 0.00, Year 1 principal $5,037 / interest $1,877. Case 2 ($25,000, $2,000 trade-in, $3,000 down, 7%, 5y @ 7%) → tax **$1,610**, loan **$21,610**, EMI **$428**, total interest **$4,064**, total cost **$30,674**. Case 3 ($50,000, $5,000 trade-in, $10,000 down, 0% tax, 3y @ 5%) → loan $35,000, EMI $1,049, interest $2,763. EMI cross-check ($20,000, $0, $0, 0%, 4y @ 6%) → EMI **$470** = EMI formula exactly. Zero-loan guard ($10,000, $8,000 trade-in, $2,000 down, 0%) → validation shown, all outputs $0, no NaN.
- **Brief-correction note:** the task brief's case-2 example (tax $1,400 / loan $21,400 / EMI ≈$424) taxed price−trade-in−down ($20,000 × 7%); per the spec formula tax = (price − trade-in) × rate = $23,000 × 7% = **$1,610** — shipped the spec-correct figures everywhere (worked example + FAQ).
- Retirement: defaults (30→65, $50,000, $1,000/mo @ 8%, inflation 3%) → nest egg **$3,123,803**, contributions **$470,000**, growth **$2,653,803**, inflation-adjusted **$1,110,148**; yearly table 35 rows, final balance = nest egg. CI cross-check ($0, $10,000/mo @ 12%, 10y at ages 50→60, inflation 0) → **$2,323,391** = SIP/CI closed form exactly. FD cross-check ($100,000, $0/mo @ 7%, 5y at ages 60→65, inflation 0) → **$141,763** = FD monthly-compounding closed form exactly. ($0, $500/mo @ 6%, 20y at ages 30→50) → **$232,176**, contributions $120,000, growth $112,176. Inflation 0% → adjusted = nest egg; (1.03)^35 = 2.81386 verified. Validation (retire 60 / current 65, and equal ages 65/65) → message shown, results "—", no NaN.
- **Brief-correction note:** the task brief's rough worked-example estimates were close but off — true nest egg $3,123,803 (not ≈$3,124,000), growth $2,653,803, adjusted $1,110,148 — shipped the true figures everywhere.
- **Retirement-age range note:** the spec'd retirement-age range is 50–80, so the cross-check durations were verified at valid ages (10y as 50→60, 5y as 60→65, 20y as 30→50) — the math is duration-only, so this is equivalent; the simulation matches the closed forms to the cent.
- Workers' own harnesses also passed (Auto Loan 35/36 — 1 fail was a harness artifact, static text not parsed by the stub; Retirement 7 cases incl. both cross-checks).
- Other verification: node --check on both inline scripts (big + small theme script) + app.js PASS; header md5 identical across all 18 calculator pages (15340477c2f29cf45cc62cc2e15cc22b); footer md5 identical across all 18 (3595e31c67c251809fbd2b821246bf68); FAQ body text == JSON-LD answers on both new pages (5/5 each); worked-example figures present on both pages and matching computed values; link audit 0 missing (after index/sitemap integration); no lorem / TODO / XXX; styles.css + app.js untouched in this batch.

## PUSH — exact file list (4 files, ~83 KB total, well under the 5 MB limit)
- calculator/auto-loan-calculator.html, calculator/retirement-calculator.html, index.html, sitemap.xml
- Suggested message: "Modules 17-18: Auto Loan + Retirement Calculators + homepage/sitemap (18 calculators live)"
- After push: live-verify both new pages (HTTP 200, titles, math spot-check on defaults), homepage links, sitemap; wait + re-check on any fresh 404 (Pages deployment lag).
- Site will have 18 live calculators after this push.

## Modules 17–18 — DONE (pushed + live verified, 9 Nov 2026 ~00:05 IST)
- **Push: APPROVED and LANDED, commit 0b1e182e9f99eb61681047dbee70085535fc2c9f** (4 files, 84,808 bytes). Remote head before push was 1ae1195f (Modules 15–16) — no divergence. Both new pages were 404 on the live site before the push (confirmed absent remotely).
- **Live verification (cache-busting URLs, after ~3 min wait):** homepage + all 18 calculator pages HTTP 200 with correct titles (EMI, SIP, FD, Income Tax, GST, Age, BMI, Percentage, BMR, Calorie, Fraction, Average, Date, Unit Converter, Mortgage, Compound Interest, Auto Loan, Retirement); worked-example figures present on both new live pages (Auto Loan 29,100 / 576 / 5,473 / 37,573; Retirement 3,123,803 / 470,000 / 2,653,803 / 1,110,148); sitemap HTTP 200 with both new URLs (23 total); homepage contains both new Finance links. **Site now has 18 live calculators.**
- Next (when ordered): domain purchase (allcalculator360.com — Tauheed buys it himself), Search Console, AdSense, next calculator modules (PPF, NPS, RD, Home Loan EMI, Personal Loan per the to-do list).

## Module 19 (E-commerce Profit Calculator) — 9 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

## Files (4 changed: 1 new + index + sitemap + styles.css)
- `calculator/ecommerce-profit-calculator.html` (NEW, ~66 KB) — E-commerce Profit Calculator (global: India / US / UK). Country selector drives platform chips (India: Amazon India, Flipkart, Meesho; US: Amazon.com, eBay, Etsy, Walmart; UK: Amazon UK, eBay UK), compare up to 3 side by side in a horizontally scrolling table on mobile. Category dropdown (8 categories) drives referral/commission %; weight input (g/kg/lb/oz) + India zone selector (Local/Regional/National). Cost breakdown (product + packaging + transport = final cost, shown live) OR "I know my final cost" toggle (breakdown hides). Mode A "Find my profit" (selling price → profit, margin %, ROI, break-even price, break-even ROAS, max CPA per platform) / Mode B "Find my listing price" (target profit amount or margin % → listing price needed per platform, found by a step-by-step price scan so Indian price-slab fee jumps are exact). Per-platform rows: referral/commission (with derivation "x% × price"), closing/fixed fee, logistics/shipping (with derivation), listing/per-order fee, GST on fees (India 18%), total marketplace fees, returns/RTO cost, net profit, real margin, headline margin, ROI, break-even price, break-even ROAS, max CPA, bank settlement (fees + GST + TCS 0.5% + TDS 0.1% — recoverable taxes shown, excluded from profit). Real-profit waterfall: headline margin vs real margin bars + comparison table. ITC toggle (India) removes GST on fees from costs. Rates in ONE data structure (`RATES`, dated 9 Nov 2026) with a visible "Rates as of 9 Nov 2026" label + EDITABLE rate fields (GST, TCS, per-platform referral %, closing fee, shipping base, FBA fee) + reset button; FAQ states honestly that the static page cannot fetch live rates. "Copy summary" button copies the comparison as text. Currency follows country (INR ₹ / USD $ / GBP £). Formula section + 2 worked examples + 5 FAQs (JSON-LD FAQPage) + related (GST, EMI, Compound Interest). Header/footer md5-identical to all other calculator pages. No styles.css change by the page author — the Module 19 CSS block was added by the coordinator (see below).
- `styles.css` (modified) — additive Module 19 block only: `.platform-chips`, `.chip`, `.check-row`, `.result-sub`, `.profit-bars`/`.bar-*`, `.compare-wrap`, `.compare-table` (+ `.strong`/`.green` cells), `.cell-note`, `.rates-details`, mobile bar-row tweak. No existing styles changed.
- `index.html` (modified) — E-commerce Profit Calculator card LIVE in the Finance section (now 10 cards). Popular strip unchanged (8 cards). Footer Popular list unchanged (8 items) — same as Modules 9–18 pattern.
- `sitemap.xml` (modified) — E-commerce URL added after Retirement. Now 24 URLs, parses as well-formed XML.

## Fee rates used (as of 9 Nov 2026 — from the research report; SOLID vs INDICATIVE flagged)
- SOLID (report-verified 2026 facts): Amazon.in zero referral ≤ ₹1,000 (Mar 2026); Flipkart zero commission ≤ ₹1,000 (Nov 2025) and 0% fashion (Jul 2026); Meesho 0% commission; GST 18% on all India fees; TCS 0.5%; TDS 0.1%; eBay US 13.6% final value fee + $0.40 (>$10) / $0.30 (≤$10) since Feb 2025; Etsy $0.20 listing + 6.5% transaction + 3% + $0.25 payment processing; eBay UK 12.8% + £0.30.
- INDICATIVE (published-card values from the research, every one editable in the page's rates panel): per-category referral % (Amazon.in H&K 8 / Apparel 16 / Electronics 6 / Beauty 6 / Grocery 5 / Books 10 / Toys 10 / Other 10; Flipkart H&K 10 / Apparel 0 / Electronics 6 / Beauty 8 / Grocery 5 / Books 10 / Toys 10 / Other 10; Amazon.com H&K 15 / Apparel 17 / Electronics 8 / Beauty 8 / others 15; Amazon UK H&K 15 / Apparel 15 / Electronics 7 / Beauty 8 / others 15; Walmart 15%); India closing/fixed fees (Amazon ₹5/₹10/₹15/₹30 at ₹300/₹500/₹1,000 bands; Flipkart ₹10/₹20/₹35 at ₹500/₹1,000 bands); India zone shipping (Amazon Local ₹36+₹13/addl 500 g, Regional ₹44+₹16, National ₹57+₹19; Flipkart Local ₹35+₹12, Regional ₹42+₹15, National ₹55+₹18; Meesho Local ₹25+₹10, Regional ₹35+₹10, National ₹45+₹10); FBA tiers (US ≤0.5 lb $3.40, ≤1 lb $3.66, ≤2 lb $4.50, ≤3 lb $5.50, +$0.60/lb; UK ≤0.5 lb £3.00, ≤1 £3.30, ≤2 £4.00, ≤3 £4.80, +£0.50/lb). RTO/returns % is a user input (India default 15%, US/UK default 5%).

## Math verification (coordinator's independent DOM-stub harness, shipped JS — 75/75 PASS, /tmp/verify-ec19.js)
- Case 1 India (cost ₹230, price ₹499, H&K, 500 g, National, RTO 15%, no ITC): Amazon profit **₹181.39** (fees ₹79.06 = closing ₹10 + ship ₹57 + GST ₹12.06; RTO ₹8.55; margin 36.4%; break-even **₹318**); Flipkart profit **₹184.05** (fees ₹76.70; RTO ₹8.25; margin 36.9%; break-even **₹315**); Meesho profit **₹209.15** (fees ₹53.10; RTO ₹6.75; margin 41.9%; break-even **₹290**). Headline margin 53.9% on all three; Meesho beats Flipkart by ₹25.10.
- Case 2 India reverse (target profit ₹100): Amazon listing price **₹418**, Flipkart **₹415**, Meesho **₹390**. Target margin 20% on Amazon → **₹398**.
- Case 3 US ($20 cost, $29.99 price, H&K, 1 lb, $4.00 shipping, 5% returns): Amazon.com profit **$1.65** (referral $4.50, FBA $3.66, returns $0.18; margin 5.5%); eBay profit **$1.31** (FVF $4.08, per-order $0.40, shipping $4.00, returns $0.20; margin 4.4%); Etsy profit **$2.49** (txn $1.95, payment $1.15, listing $0.20; margin 8.3%); Walmart profit **$1.29**.
- Case 4 UK (£20 cost, £29.99 price, 1 lb, £3.00 shipping, 5% returns): Amazon UK profit **£2.03** (FBA £3.30); eBay UK profit **£2.70** (FVF £3.84, per-order £0.30).
- Case 5 ITC on: Amazon.in fees drop to ₹67 (GST excluded), profit **₹193.45**.
- Case 6 slabs/bands: 1200 g National → ship ₹95, profit ₹130.85; price ₹1,500 → referral 8% = ₹120, closing ₹30, GST ₹37.26, profit ₹1,017.19; referral ₹0 at ₹1,000, 8% (₹80.08) at ₹1,001.
- Case 7 FBA override: editing the FBA fee in the rates panel now changes results (was a bug — the editor wrote `fbaOverride` but the engine ignored it; fixed + verified: override $5.00 → profit $0.24; removed → back to $3.66).
- Case 8 display: fmtMoney now shows 2 decimals below 100 ($1.65, $29.99, ₹12.06) and whole units at/above 100 (₹181, ₹499) — previously $1.65 would have displayed as "$2".
- Case 9 toggles: "I know my final cost" → final cost 300 honoured; back to breakdown → 230.
- **Brief-correction note:** the task brief's expected 20%-margin reverse price (405) was arithmetically wrong — it used the ₹501+ closing band (₹15) for a ₹398 price, but ₹398 is in the ≤₹500 band (closing ₹10); the shipped figure **₹398** is correct (profit ₹80.39, margin 20.20%; at ₹397 margin is 19.997%).
- **Bug fixed by coordinator (not in the brief):** Walmart crashed the page — `computePlatform` called the FBA fee table for every non-India referral platform, but Walmart has no FBA table (it uses the user-entered courier cost). Fixed: FBA fee only when the platform has an `fba` table, otherwise `ctx.shipCost`. Verified: Walmart profit $1.29, no crash.
- Other verification: node --check on both inline scripts PASS (re-run after both fixes); header md5 identical across all 19 calculator pages; footer md5 identical across all 19; FAQ body text == JSON-LD answers on the new page (5/5); worked-example figures present on the page and matching computed values; link audit 784 href/src checked across all files — 0 missing; sitemap well-formed XML, 24 URLs incl. E-commerce; no lorem / TODO / XXX; app.js untouched in this batch.

## PUSH — exact file list (4 files, ~85 KB total, well under the 5 MB limit)
- calculator/ecommerce-profit-calculator.html, index.html, sitemap.xml, styles.css
- Suggested message: "Module 19: E-commerce Profit Calculator (India/US/UK, side-by-side) + homepage/sitemap (19 calculators live)"
- After push: live-verify the new page (HTTP 200, title, math spot-check on defaults), homepage link, sitemap; wait + re-check on any fresh 404 (Pages deployment lag).
- Site will have 19 live calculators after this push.

## Module 19 — DONE (pushed + live verified, 9 Nov 2026 ~00:55 IST)
- **Push: APPROVED and LANDED, commit a1e38c6dede93adf70566dca633d1984539d47e2** (4 files, ~106 KB total). Remote head before push was 0b1e182e (Modules 17–18) — no divergence. The new page was 404 on the live site before the push (confirmed absent remotely). Sync record `~/workspace/allcalculator360-website.muse-github-snapshot-sync.json` created with this entry.
- **Live verification (cache-busting URLs, after ~3 min wait):** homepage + all 19 calculator pages HTTP 200 with correct titles (EMI, SIP, FD, Income Tax, GST, Age, BMI, Percentage, BMR, Calorie, Fraction, Average, Date, Unit Converter, Mortgage, Compound Interest, Auto Loan, Retirement, E-commerce Profit); worked-example figures present on the new live page (India 181.39 / 184.05 / 209.15 / 318 / 315 / 290 / 25.10; US $1.65 / $1.31); sitemap HTTP 200 with the new URL (24 total); homepage contains the new Finance link. **Site now has 19 live calculators.**
- Next (when ordered): domain purchase (allcalculator360.com — Tauheed buys it himself), Search Console, AdSense, next calculator modules (PPF, NPS, RD, Home Loan EMI, Personal Loan per the to-do list).

## Modules 20–25 (PPF, RD, NPS, Personal Loan, Discount, Tip) — 9 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

No swaps: Calculator.net's own Financial Calculators list includes both Personal Loan Calculator and Discount Calculator; PPF/RD/NPS are the India-first picks Tauheed's to-do list already named (PPF, NPS, RD, Personal Loan). Home Loan EMI deliberately excluded — the Mortgage calculator already covers home price + down payment + rate + term.

## Files (8 changed: 6 new + index + sitemap)
- `calculator/ppf-calculator.html` (NEW, 25,080 bytes) — PPF Calculator (India, FIXED INR, no currency selector): yearly contribution ₹500–₹1,50,000 (default ₹1,50,000), rate 1–12% (default 7.1%, hint: rate revised by the government), tenure select 15/20/25/30y (default 15). Annual compounding, contribution at START of each year: FV = P × [((1+r)^n − 1)/r] × (1+r). Big maturity value + deposits/interest breakdown + 2-slice donut + yearly table (first 5 rows + "Show all years"). Formula + worked example + 5 FAQs (JSON-LD FAQPage) + related (FD, SIP, NPS).
- `calculator/rd-calculator.html` (NEW, 27,319 bytes) — RD Calculator (India, FIXED INR): monthly deposit ₹100–₹1,00,000 (default ₹5,000), rate 1–12% (default 6.5%), tenure 1–10y (default 5). Quarterly compounding via month-by-month simulation (monthly rate im = (1+r/4)^(1/3) − 1, deposit at start of month — exactly equals the standard RD closed form). Big maturity value + deposits/interest + donut + yearly table. Formula + worked example + 5 FAQs + related (FD, PPF, SIP).
- `calculator/nps-calculator.html` (NEW, 33,147 bytes) — NPS Calculator (India, FIXED INR): monthly contribution ₹500–₹1,00,000 (default ₹5,000), expected return 1–15% (default 10%), current age 18–60 (default 30), retirement age 55–70 (default 60), annuity rate 1–10% (default 6%). Month-by-month simulation, same annuity-due method as the Retirement page. Corpus + lump sum 60% (tax-free) + annuity amount 40% + monthly pension = annuity × annuity rate / 12. Retirement-age ≤ current-age validation (error + "—" results). 3-slice donut + yearly table. Formula + worked example + 6 FAQs + related (PPF, Retirement, SIP).
- `calculator/personal-loan-calculator.html` (NEW, 29,358 bytes) — Personal Loan Calculator (global currency selector, default USD): loan amount 1,000–10,000,000 (default 20,000), rate 1–30% (default 10%), tenure 1–7y (default 5). EMI formula IDENTICAL to the EMI page. Big monthly EMI + total interest/payment + 2-slice donut + yearly amortisation table. Formula + worked example + 6 FAQs + related (EMI, Auto Loan, Mortgage).
- `calculator/discount-calculator.html` (NEW, 27,333 bytes) — Discount Calculator (global currency selector): THREE stacked mini-tools (Percentage-page pattern): (a) original price + discount % → final price + amount saved; (b) discounted price + discount % → original price (100% guard); (c) original + final price → discount % (zero-original guard). No donut. Formula + worked examples + 5 FAQs + related (Percentage, GST, E-commerce Profit).
- `calculator/tip-calculator.html` (NEW, 23,766 bytes) — Tip Calculator (global currency selector): bill 1–100,000 (default 100, decimals accepted), tip % 0–30% (default 15%), split 1–20 people (default 2). 2 decimals on ALL money outputs (tip maths needs cents). Big total bill + breakdown (bill, tip, total, per-person, tip per person) + 2-slice donut. Formula + worked examples + 5 FAQs + related (Percentage, Discount, GST).
- `index.html` (modified) — PPF, RD, NPS, Personal Loan cards LIVE in the Finance section (now 14 cards); Discount + Tip cards LIVE in the Everyday section (now 5 cards). Popular strip unchanged (8 cards). Footer Popular list unchanged (8 items).
- `sitemap.xml` (modified) — 6 new URLs added after E-commerce Profit. Now 30 URLs, parses as well-formed XML.

## Math verification (coordinator's independent DOM-stub harness, shipped JS — 43/43 PASS, /tmp/verify-m20-25.js)
- PPF: ₹1,50,000/yr @ 7.1% / 15y → maturity **₹40,68,209** (deposits ₹22,50,000; interest ₹18,18,209); 20y → **₹66,58,288**; ₹50,000/yr @ 7.1% / 15y → **₹13,56,070**; yearly table final balance = maturity.
- RD: ₹5,000/mo @ 6.5% / 5y → maturity **₹3,54,954** (deposits ₹3,00,000; interest ₹54,954); ₹10,000/mo @ 7% / 3y → **₹4,01,373**; yearly table final = maturity.
- NPS: ₹5,000/mo @ 10% / 30y (30→60) → corpus **₹1,13,96,627** (contributions ₹18,00,000; growth ₹95,96,627; lump 60% ₹68,37,976; annuity 40% ₹45,58,651; pension **₹22,793/mo** @ 6%); ₹10,000/mo @ 12% / 25y → corpus **₹1,89,76,351**; validation (retire 55 / current 60) → error shown, corpus "—", no NaN; yearly table final = corpus.
- Personal Loan: $20,000 @ 10% / 5y → EMI **$424.94** (display $425, same as EMI page), total **$25,496**, interest **$5,496**; ₹5,00,000 @ 11% / 3y → EMI **₹16,369**, total ₹5,89,297, interest ₹89,297; amortisation final balance 0.00. **EMI cross-check: the EMI page itself returns $425 for the same inputs — identical.**
- Discount: (a) $100 @ 25% → final **$75**, saved **$25**; (b) $75 @ 25% → original **$100**, saved $25; (c) $100 → $75 = **25%**; 100% discount in tool B → error shown, no Infinity; original 0 in tool C → error shown.
- Tip: $100 @ 15% split 2 → tip **$15.00**, total **$115.00**, per person **$57.50**; $85.50 @ 20% split 3 → tip $17.10, total $102.60, per person $34.20; 0% tip → tip $0, total = bill; bill 0 → all $0, no NaN.
- Workers' own harnesses also passed on all 6 pages.
- Other verification: node --check on all 6 inline scripts PASS; header md5 identical across all 25 calculator pages (15340477c2f29cf45cc62cc2e15cc22b); footer md5 identical across all 25 (3595e31c67c251809fbd2b821246bf68); FAQ body text == JSON-LD answers on all 6 new pages (PPF 5/5, RD 5/5, NPS 6/6, Personal Loan 6/6, Discount 5/5, Tip 5/5); worked-example figures present on all 6 pages and matching computed values; GA4 snippet on all 6 new pages (exactly 2 occurrences of G-PZHLCGYJ5D each, no GTM); link audit 982 href/src checked across all files — 0 missing; no lorem / TODO / XXX; styles.css + app.js untouched in this batch (mtimes predate the batch).

## Modules 20–25 — DONE (pushed + live verified, 9 Nov 2026 ~12:30 IST)
- **Push: APPROVED and LANDED, commit e36112133fe53ecb3f7ea8f378ad4670ec0cfe63** (8 files, 190,358 bytes). Remote head before push was 0b96b9da (GA4 install) — no divergence: live index.html == local minus the 6 new cards, live sitemap == local minus the 6 new URLs, all 6 new pages 404 remotely before the push. Sync record updated (3 entries). Note: the approval card sat untapped ~27 min before Tauheed approved it — the push itself then landed immediately.
- **Live verification (cache-busting URLs, after ~3 min wait):** homepage + all 25 calculator pages HTTP 200 (EMI, SIP, FD, Income Tax, GST, Age, BMI, Percentage, BMR, Calorie, Fraction, Average, Date, Unit Converter, Mortgage, Compound Interest, Auto Loan, Retirement, E-commerce Profit, PPF, RD, NPS, Personal Loan, Discount, Tip); worked-example figures present on all 6 new live pages (PPF 40,68,209; RD 3,54,954; NPS 1,13,96,627; Personal Loan 424.94; Discount title; Tip 57.50); GA4 ID G-PZHLCGYJ5D present ×2 on all 6 new live pages; sitemap HTTP 200 with all 6 new URLs (30 total); homepage contains all 6 new links (Finance 14 cards, Everyday 5 cards, Popular strip still 8). **Site now has 25 live calculators.**
- Next (when ordered): domain purchase (allcalculator360.com — Tauheed buys it himself), Search Console, AdSense, next calculator modules.

## Modules 26–30 (GPA, Scientific, Loan, Sales Tax, Grade) — 9 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

No swaps: all five are on Calculator.net's most-used lists (GPA, Loan and Sales Tax flagged Popular/Hot; Scientific and Grade/Final Grade on every major list) and each is corroborated as a standard most-used calculator across the major calculator sites. No clearly more-used calculator is missing from this list.

## Files (8 changed: 5 new + index + sitemap + BUILD-LOG)
- `calculator/gpa-calculator.html` (NEW, 25,018 bytes) — GPA Calculator (global, no currency): 4.0 scale, all 11 letter grades (A=4.0 … F=0.0), 4 dynamic course rows to start (optional name, grade select, credits 0.5–6 step 0.5) with Add/Remove; optional cumulative section (previous GPA + previous credits). Big semester GPA + total credits + total grade points + course count + cumulative GPA row (only when previous credits entered) + per-course points breakdown. Formula + worked example + 5 FAQs (JSON-LD FAQPage) + related (Grade, Percentage, Average).
- `calculator/scientific-calculator.html` (NEW, 35,211 bytes) — Scientific Calculator (global, keypad tool — not an inputs/results form, but keeps header/footer, breadcrumb, H1 + description, formula section, worked example, FAQ accordion with JSON-LD, related row): 41-key keypad (trig, log/ln, powers, roots, factorial, π/e, parentheses, DEG/RAD toggle, ANS, keyboard support); NO eval()/Function() — hand-written tokenizer + shunting-yard + RPN evaluator; error cases show a friendly "Error" (no NaN/Infinity). 16-line scoped CSS block added at the end of styles.css (`.sci-*` classes), no existing rules touched. Formula + worked example + 5 FAQs + related (Unit Converter, Fraction, Average).
- `calculator/loan-calculator.html` (NEW, 28,320 bytes) — Loan Calculator (global currency selector USD/INR/EUR/GBP, default USD): amount, rate, tenure; EMI/monthly payment + total interest + total payment + 2-slice donut + year-by-year amortisation table (first 5 rows visible + "Show all years", final balance $0). EMI formula IDENTICAL to the EMI page (cross-checked exactly). Formula + worked example + 5 FAQs + related (EMI, Mortgage, Personal Loan).
- `calculator/sales-tax-calculator.html` (NEW, 26,142 bytes) — Sales Tax Calculator (global currency selector): TWO stacked mini-tools (Discount pattern): (a) price before tax + tax rate % → tax amount + total; (b) reverse mode — price including tax → pre-tax price + tax amount. User-entered rate 0–30%, NO state table. Formula + worked examples + 5 FAQs + related (GST, Discount, Percentage).
- `calculator/grade-calculator.html` (NEW, 28,121 bytes) — Grade Calculator (global, no currency): TWO stacked mini-tools (Discount pattern): (a) Required Final Exam Score — current %, desired %, final weight % → required final score, with a "Not possible — you would need X%, which is above 100%" note when >100% and a note when <0%; (b) Weighted Course Grade — dynamic assignment rows (name, score %, weight %) with add/remove, weighted average = Σ(score×weight)/Σ(weights), warning when weights don't add to 100%. Formula + worked examples + 5 FAQs + related (GPA, Percentage, Average).
- `index.html` (modified) — Loan + Sales Tax cards LIVE in the Finance section (now 16 cards); Scientific card LIVE in the Math section (now 4 cards); GPA + Grade cards LIVE in the Everyday section (now 7 cards). Popular strip unchanged (8 cards). Footer Popular list unchanged (8 items).
- `sitemap.xml` (modified) — 5 new URLs added. Now 35 URLs, parses as well-formed XML.
- `styles.css` (modified, additive only) — 16-line scoped `.sci-*` block appended for the Scientific keypad; no existing rules touched.

## Math verification (coordinator's independent DOM-stub harness, shipped JS — 43/43 PASS, /tmp/verify26-30.js)
- GPA: A(3cr) + B+(4cr) + A−(3cr) + C(2cr) → points 12 + 13.2 + 11.1 + 4 = **40.3**, credits 12 → GPA **3.36**; cumulative with prev 3.00 / 12 cr → **3.18**; all A, 15 credits → **4.00**.
- Grade: (a) current 80%, want 85%, final 40% → (85 − 80×0.6)/0.4 = **92.5%**; want 95% → needs **117.5%**, "Not possible" note shown; (b) HW 90 (20%) + Quiz 80 (30%) + Midterm 85 (50%) → 18 + 24 + 42.5 = **84.5%**.
- Loan: $100,000 @ 8% / 20y → EMI **$836.44** (display $836), total **$200,746**, interest **$100,746**; $10,000 @ 6% / 5y → EMI **$193.33** (display $193), interest **$1,600**; amortisation first 5 rows visible + "Show all" expands to all 20 yearly rows, final balance **$0**. **EMI cross-check: the EMI page itself returns $1,609 for $100,000 @ 9% / 7y — the Loan page returns exactly the same $1,609.**
- Sales Tax: $100 @ 8% → tax **$8.00**, total **$108.00**; $59.99 @ 6.25% → tax **$3.75**, total **$63.74**; reverse $63.74 @ 6.25% → pre-tax **$59.99**.
- Scientific: sin(30°)=**0.5**, cos(60°)=**0.5**, log₁₀(100)=**2**, ln(e)=**1**, 2^10=**1024**, √(144)=**12**, 5!=**120**, 3²+4²=**25**, sin(π/2 rad)=**1**, asin(1)=**90°**, 200×50%=**100**; error cases clean (1/0, log(0), ln(−1), 5.5!, √(−4), asin(2), "2+", "((2)" → all throw → friendly "Error", no NaN/Infinity).
- Workers' own harnesses also passed on all 5 pages (GPA/Grade 19 assertions; Loan/Sales Tax 43 checks; Scientific 48/48).
- Other verification: node --check on all 5 inline scripts PASS; header md5 identical across all 5 new pages vs tip-calculator.html (15340477c2f29cf45cc62cc2e15cc22b); footer md5 identical (3595e31c67c251809fbd2b821246bf68); FAQ body text == JSON-LD answers on all 5 new pages (5/5 each); worked-example figures present on all 5 pages and matching computed values; GA4 snippet on all 5 new pages (exactly 2 occurrences of G-PZHLCGYJ5D each, no GTM — the "googletagmanager" string is the standard gtag.js loader URL only); favicon `<link rel="icon">` exactly 1× per page, byte-identical to index.html line 23 (676 bytes); link audit 0 missing targets across all 5 new pages + index.html; no lorem / TODO / XXX / "Coming soon".

## Modules 26–30 — DONE (pushed + live verified, 9 Nov 2026 ~23:20 IST)
- **Push: APPROVED and LANDED, commit 82fb866f38896e0981cdcc617782ff27e0993191** (9 files, 255,203 bytes — one push, well under the 5 MB limit). Remote head before push was 5eb9e186 (favicon fix) — no divergence: remote index.html == local minus the 5 new cards, remote sitemap == local minus the 5 new URLs, remote styles.css == local minus the 16-line `.sci-*` block, all 5 new pages confirmed absent remotely before the push. Sync record updated (5 entries). Approval card tapped promptly (~3 min).
- **Live verification (cache-busting URLs, after ~4 min wait):** homepage + all 5 new pages HTTP 200 (GPA, Scientific, Loan, Sales Tax, Grade); worked-example figures present on all 5 live pages (GPA 3.36; Scientific keypad present; Loan 836.44 + "Show all years"; Sales Tax 108.00; Grade 92.5 + 84.5); GA4 ID G-PZHLCGYJ5D present ×2 on all 5 new live pages; favicon icon link ×1 on all 5; sitemap HTTP 200 with all 5 new URLs (35 total); homepage contains all 5 new links (Finance 16 cards, Math 4 cards, Everyday 7 cards, Popular strip still 8). **Site now has 30 live calculators.**
- Next (when ordered): domain purchase (allcalculator360.com — Tauheed buys it himself), Search Console for the new domain, AdSense, next calculator modules.

## Ultra-Best On-Page SEO — all 31 pages (9 Nov 2026, Tauheed's order ~23:27 IST)

**Goal:** every page treated as its own website — rank for "All Calculator 360" AND for each calculator's own name (EMI Calculator, GST Calculator, …). Work done by 3 worker batches (10 pages each) + coordinator (homepage, og-image, audit, verification, push).

**Audit first (SEO-AUDIT.md):** 29/30 calculator titles 61–95 chars (over 60); 6 metas >160 chars, 18 <150 (shortest 53); ALL pages missing og:image, BreadcrumbList, WebApplication; 10 pages thin (<300 explanatory words); NO page had "How to use" steps; no duplicate titles/metas; all JSON-LD valid. Homepage meta falsely claimed "200+ calculators" (site has 30).

**Per calculator page (all 30):**
- Title: primary keyword FIRST, 51–59 chars, unique, " | All Calculator 360" at the end.
- Meta: unique, 150–160 chars, keyword + benefit + CTA.
- H1: exactly the primary keyword (India-specific pages: "GST Calculator India", "Income Tax Calculator India", "PPF Calculator India", "RD Calculator India", "NPS Calculator India").
- H2s: "How to Calculate X", "X Formula", "X Example" (worked example moved verbatim — figures byte-identical), "How to Use the X Calculator" (4 steps), FAQs, Related Calculators. Scientific adapted to its keypad (Functions / Examples).
- Explanatory text: every page now ≥486 words (audit method + how-to), all 10 thin pages fixed.
- FAQ: 6 questions per page (was 5 on most); visible FAQ text == FAQPage JSON-LD exactly. One pre-existing EMI FAQ mismatch fixed (visible answer aligned to the fuller JSON-LD text).
- JSON-LD: FAQPage kept; BreadcrumbList (Home > Category > Page) + WebApplication added (FinanceApplication / HealthApplication / UtilitiesApplication / EducationalApplication / BusinessApplication; operatingSystem Any; free Offer USD 0).
- OG/Twitter: og:title = new title, og:description = new meta, og:image + twitter:image = og-image.jpg, twitter:card summary_large_image. Canonical verified = own absolute URL.
- Internal links: 2–4 natural in-body links per page to related calculators.

**Homepage:** title "All Calculator 360 — Free Online Calculators" (44 chars, brand-first by design); meta 159 chars, "200+" claim fixed → "30 calculators"; H1 with brand + "Free Online Calculators"; og:image + twitter large card; 5 FAQs added (visible + matching FAQPage JSON-LD).

**og-image.jpg (NEW, 1200×630, 76 KB):** branded navy/blue with calculator glyph + "All Calculator 360 / Free Online Calculators". Created with PIL, verified visually. NOTE: it is a BINARY file — the push-files tool takes text only, so it is staged locally and must be uploaded via github.com in the browser (same as the Naat Lyrics favicon). Until it lands, og:image URLs will 404 — harmless for ranking, but social previews will fall back.

**Verification (coordinator, cross-batch):** all JSON-LD blocks parse; titles 51–59 / metas 150–160 on all 30 calculator pages, zero duplicates site-wide; FAQ visible == JSON-LD on all 31 pages; GA4 G-PZHLCGYJ5D exactly 2× + favicon icon exactly 1× on every page; header/footer md5 unchanged vs pre-SEO baseline on all pages; canonicals correct; link audit 0 missing targets; no thin pages left.

**Sitemap:** lastmod 2026-11-09 on the 31 changed URLs (homepage + 30 calculators); utility pages (about/contact/privacy/terms) stay 2026-11-08. robots.txt unchanged (Allow: / + sitemap line).

**Honest note:** on-page SEO is now as strong as it can be, but ranking #1 for generic terms like "EMI calculator" also needs time, indexing and authority — no one can guarantee a #1 spot. The site now has the best possible foundation for it.

## Modules 31–36 (Time, Hours, Standard Deviation, Quadratic Formula, Slope, Roman Numeral Converter) — 10 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

No swaps: all six are on Calculator.net's most-used lists and corroborated as standard most-used calculators across the major calculator sites (Calculator.net lists time calculators; every major math list carries Standard Deviation, Quadratic Formula, Slope and Roman Numerals; Hours is a standard work-hours/pay tool). No clearly more-used calculator is missing from this list.

## Files (9 changed: 6 new + index + sitemap + BUILD-LOG)
- `calculator/time-calculator.html` (NEW, 27,831 bytes) — Time Calculator (global): TWO stacked mini-tools: (a) Add/subtract durations (h/m/s each + operation) → result in h/m/s, total seconds, decimal hours, total minutes; (b) Time between two clock times → duration + total minutes/seconds/decimal hours; end earlier than start counts as next day (overnight). Title 58 chars (rendered), meta 155, H1 "Time Calculator", 6 FAQs (JSON-LD FAQPage), BreadcrumbList Home > Everyday, WebApplication UtilitiesApplication, related (Hours, Date, Age).
- `calculator/hours-calculator.html` (NEW, 34,331 bytes) — Hours Calculator (global): (a) One day — start, end, break minutes, hourly rate → hours worked + total pay with breakdown; (b) Weekly — 7-day table (Mon–Fri prefilled from the one-day values, Sat/Sun blank = day off) + "Copy one-day times to Mon–Fri" button → weekly hours + weekly pay, days worked, avg/day, per-day breakdown. Title 56, meta 151, H1 "Hours Calculator", 6 FAQs, BreadcrumbList Home > Everyday, WebApplication UtilitiesApplication, related (Time, Date, Tip).
- `calculator/standard-deviation-calculator.html` (NEW, 29,842 bytes) — Standard Deviation Calculator (global): textarea paste (comma/space/newline separated) + Population/Sample toggle → count, sum, mean, population/sample SD, population/sample variance, min, max + deviation breakdown table (first 5 rows + "Show all"). Title 57, meta 160, H1 "Standard Deviation Calculator", 6 FAQs, BreadcrumbList Home > Math, WebApplication EducationalApplication, related (Average, Percentage, Fraction).
- `calculator/quadratic-formula-calculator.html` (NEW, 30,758 bytes) — Quadratic Formula Calculator (global): a/b/c sliders + synced number inputs → discriminant, real roots (or complex roots a±bi when D < 0), vertex, axis of symmetry + step-by-step solution box. Title 57, meta 158, H1 "Quadratic Formula Calculator", 6 FAQs, BreadcrumbList Home > Math, WebApplication EducationalApplication, related (Scientific, Slope, Fraction).
- `calculator/slope-calculator.html` (NEW, 28,736 bytes) — Slope Calculator (global): x1, y1, x2, y2 sliders + synced number inputs → slope, y-intercept, line equation y = mx + b, distance, midpoint, angle; vertical line handled (slope undefined, equation x = value). Title 55, meta 151, H1 "Slope Calculator", 6 FAQs, BreadcrumbList Home > Math, WebApplication EducationalApplication, related (Scientific, Quadratic Formula, Fraction).
- `calculator/roman-numeral-converter.html` (NEW, 24,570 bytes) — Roman Numeral Converter (global): two-way, instant as you type — number 1–3999 → Roman numerals; Roman numerals → number, with validation (invalid Roman like IIII/VV/IC and out-of-range numbers 0, negative, >3999 rejected with a friendly error; lowercase Roman accepted). Title 58, meta 155, H1 "Roman Numeral Converter", 6 FAQs, BreadcrumbList Home > Math, WebApplication EducationalApplication, related (Scientific, Percentage, Date).
- `index.html` (modified) — Standard Deviation + Quadratic Formula + Slope + Roman Numeral Converter cards LIVE in the Math section (now 8 cards); Time + Hours cards LIVE in the Everyday section (now 9 cards). Popular strip unchanged (8 cards). All "30 calculators" counts updated to "36 calculators" (meta, OG, Twitter, WebSite JSON-LD, FAQ JSON-LD ×2, visible FAQ ×2 — 8 occurrences).
- `sitemap.xml` (modified) — 35 → 41 URLs; 6 new URLs with lastmod 2026-11-10.

## Verification (coordinator, cross-batch — all PASS)
- Maths: Time 25/25, Hours (in Time/Hours harness 25/25 combined), SD + Quadratic 51/51, Slope + Roman 100+ assertions — all PASS on the shipped JS (DOM-stub harnesses). Verified examples: Time 2h 45m + 1h 30m = 4h 15m (15,300 s, 4.25 h); 9:00→17:30 = 8h 30m; Hours 9:00–17:00, 30-min break, $20/h = 7.5 h, $150.00; 5 × 7.5 h week = 37.5 h, $750.00; SD [2,4,4,4,5,5,7,9] → mean 5, pop SD 2, sample SD 2.1381; [10,20,30] → mean 20, pop SD 8.165, sample SD 10; Quadratic x²−5x+6=0 → roots 2 and 3, D=1; x²+2x+5=0 → D=−16, complex roots −1±2i; Slope (0,0)→(4,2) → slope 0.5, y=0.5x, distance 4.472; (1,2)→(1,5) → vertical, slope undefined; Roman 2026 → MMXXVI, 1999 → MCMXCIX, MMXXVI → 2026, 3999 → MMMCMXCIX, "IIII" → error.
- node --check PASS on all 6 inline scripts; link audit 0 missing targets (all 6 pages + index.html).
- Titles 55–58 rendered chars (Time 62 / Hours 60 raw — the raw `&amp;` entity; rendered 58/56), metas 151–160, zero duplicate titles/metas site-wide; FAQ visible == JSON-LD on all 6 pages; GA4 G-PZHLCGYJ5D exactly 2× + favicon icon exactly 1× (byte-identical to grade-calculator.html) on every new page; header/footer md5-identical to grade-calculator.html on all 6 pages; canonicals correct; og:image + Twitter large card on all 6; no lorem/TODO/"Coming soon"; worked-example figures match computed values.
- styles.css / app.js untouched (no additive CSS needed — all 6 are form-based tools).

## Modules 31–36 — DONE (pushed + live verified, 10 Nov 2026 ~02:00 IST)

**Push:** one push, 9 files, 286,099 bytes, commit `ef38d7f2b02e9fadbf4e49cb20ba01a79fa458ab`. Remote head before push was `09c19991` (Tauheed's own og-image.jpg upload + rename from his phone) — newer than the sync record's `fc2fb8e0`, but the only difference was og-image.jpg, which is not in this push; remote index.html/sitemap.xml/BUILD-LOG.md all matched the `fc2fb8e0` sync base and all 6 new pages were confirmed absent remotely. No conflicts. Sync record updated (11 entries). Approval card tapped promptly.

**Live verification (cache-busting URLs, after ~4 min wait):** homepage + all 6 new pages HTTP 200; GA ×2 and icon ×1 on every page; new titles live; worked-example figures present (Time 4h 15m, Hours 7.5, SD 2.1381, Quadratic −1+2i, Slope 0.5, Roman MMXXVI); sitemap 41 URLs with all 6 new pages; homepage contains all 6 new links + "36 calculators". (One live-check needle miss on Quadratic was my check string, not the page — the live page contains "-1 + 2i" / "-1 - 2i" as written.)

**Note:** this DONE paragraph was appended locally after the push (same pattern as Modules 20–25 and 26–30), so the live BUILD-LOG.md lags by this paragraph until the next push.

## Modules 37–41 (Currency Converter, Salary, Investment, Body Fat, VAT) — 10 Nov 2026

**Status: BUILT + VERIFIED locally. Push pending (see below).**

**STRATEGY CHANGE (Tauheed, 10 Nov 2026 ~02:03 IST): quality over quantity. NO obscure or rarely-used calculators. The old ~200-calculator target is dropped — only the most-used / most-searched calculators go on this site. "Kam or best calculator honge."**

**Usage evidence (coordinator research, 10 Nov 2026):** Currency Converter — among the most-searched calculator queries worldwide, on every major site's popular shelf (Premium Converters lists currency among tools opened first). Salary Calculator — UK Calculator lists Salary among its most-used tools; "salary/paycheck calculator" is a huge search term. Investment Calculator — standard finance-shelf item on RoughTools, Calcyo, iCalculators, Calculators.im, CalculatorApp. Body Fat Calculator — standard health item on all of the above (US Navy method). VAT Calculator — UK Calculator most-used list; standard on all major sites. **No swaps** — all 5 confirmed against Calculator.net's most-used lists + web search across the major calculator sites.

## Files (8 changed: 5 new + index + sitemap + BUILD-LOG)
- `calculator/currency-converter.html` (NEW, 32,448 bytes) — Currency Converter: amount slider+number; From/To selects (USD, INR, EUR, GBP, AED, SAR, JPY, AUD, CAD) with swap button; editable rate table (1 USD = INR 88.70, EUR 0.86, GBP 0.75, AED 3.67, SAR 3.75, JPY 154.00, AUD 1.54, CAD 1.40) + reset, labelled "Rates as of 10 Nov 2026", FAQ states plainly the static page cannot fetch live rates; results: big converted amount, rate used, reverse rate + "Amount in Every Currency" table (first 5 + Show all). No donut (none fits a conversion).
- `calculator/salary-calculator.html` (NEW, 32,096 bytes) — Salary Calculator: currency selector (USD/INR/EUR/GBP, default USD); gross pay + frequency (annual/monthly/weekly/daily/hourly); hours/week (40) + weeks/year (52); tax/deduction % slider (0–50%); big annual gross + take-home vs deductions donut + 5-row pay table (Annual/Monthly/Weekly/Daily/Hourly × Gross/Take-home).
- `calculator/investment-calculator.html` (NEW, 33,083 bytes) — Investment Calculator: currency selector; initial investment (default $5,000); monthly contribution (default $300); return % (default 10%); years (default 15); month-by-month simulation, same annuity-due method as Compound Interest page; big future value + invested + returns; theme-aware donut; yearly growth table (first 5 + "Show all years").
- `calculator/body-fat-calculator.html` (NEW, 41,033 bytes) — Body Fat Calculator (US Navy method): gender toggle; height/neck/waist (+hip female) with cm/inches toggle; weight input for fat/lean mass; big body fat % + category (Essential/Athletes/Fitness/Average/Obese) + fat mass + lean mass; FAQ notes tape-measure estimate, not DEXA, not medical advice.
- `calculator/vat-calculator.html` (NEW, 32,818 bytes) — VAT Calculator: currency selector (USD/INR/EUR/GBP, default GBP — VAT's home market); Add/Remove VAT toggle; amount slider+number (£1–£1,000,000, default £100); rate select 0%/5%/20% default/custom (0–100%); big net/VAT/gross + theme-aware donut (net vs VAT) + comparison table at 0%/5%/20%/25%; country-rates note (UK 20%/5%/0%; EU 19–27%).
- `index.html` (modified) — 5 new cards: Finance +Currency Converter (💱), +Salary (💼), +Investment (🌱), +VAT (💷) = 20 cards; Health +Body Fat (📏) = 4 cards. All 8 "36 calculators" occurrences → "41 calculators" (meta, OG, Twitter, WebSite JSON-LD, FAQ JSON-LD ×2, visible FAQ ×2). Popular strip unchanged (8 cards).
- `sitemap.xml` (modified) — 5 new URLs added (lastmod 2026-11-10). Now 46 URLs, parses as well-formed XML.

## Math verification (workers' DOM-stub harnesses on the shipped JS, spot-checked by coordinator)
- Currency Converter (53/53 incl. Salary harness): $100 → **₹8,870** (88.70); €100 → **$116.28**; £50 → **€57.33**; ¥10,000 → **$64.94**; edited INR rate 90 → ₹9,000; swap INR→USD $1.13; reset restores 88.70.
- Salary (53/53 incl. Currency harness): $60,000/yr → **$5,000.00/mo, $1,153.85/wk, $230.77/day, $28.85/hr**; 20% deduction → take-home **$48,000/yr, $4,000/mo**; hourly $30 → $62,400/yr; ₹10,00,000 → ₹83,333.33/mo.
- Investment (45/45): defaults ($5,000 + $300/mo @ 10% / 15y) → FV **$147,647**, invested $59,000, returns $88,647; SIP cross-check $0 + $10,000/mo @ 12% / 10y → **$2,323,391** exact; CI cross-check $10,000 + $500/mo @ 8% / 10y → **$114,279** exact.
- Body Fat (45/45 incl. Investment harness): Male 178cm/neck 40/waist 85 → **14.9% (Fitness)**, fat 11.9 kg / lean 68.1 kg at 80 kg; Female 165cm/neck 35/waist 75/hip 95 → **25.9% (Average)**, fat 16.8 kg / lean 48.2 kg at 65 kg; independent formula re-derivation matches (14.8579% / 25.8920%).
- VAT (43/43): £100 net @ 20% → **VAT £20, gross £120**; £120 gross @ 20% → **net £100, VAT £20**; £200 net @ 5% → **VAT £10, gross £210**; £119 gross @ 20% → net £99.17, VAT £19.83 (sums exactly).

## Other verification (coordinator, independent)
- node --check: all 5 inline scripts PASS.
- Header/footer md5-identical to grade-calculator.html on all 5 pages (verified by coordinator).
- GA4 G-PZHLCGYJ5D exactly 2× per page, no GTM; favicon icon exactly 1× per page, byte-identical to index.html (676 bytes).
- SEO ultra-best standard on all 5: titles 52–57 chars (keyword-first, " | All Calculator 360"), metas 150–158, exact-keyword H1, How-to/Formula/Example H2s, 6 FAQs with visible text == FAQPage JSON-LD, BreadcrumbList + WebApplication JSON-LD, og:image + Twitter large card, canonical = own absolute URL, 2–4 in-body internal links; zero duplicate titles/metas site-wide (to be confirmed in coordinator cross-check).
- Link audit: 0 missing targets on all 5 pages + index.html.
- No lorem / TODO / XXX anywhere. styles.css + app.js untouched in this batch.

## PUSH — exact file list (8 files, ~290 KB total, well under the 5 MB limit)
- calculator/currency-converter.html, calculator/salary-calculator.html, calculator/investment-calculator.html, calculator/body-fat-calculator.html, calculator/vat-calculator.html, index.html, sitemap.xml, BUILD-LOG.md
- Suggested message: "Modules 37-41: Currency Converter, Salary, Investment, Body Fat, VAT + homepage/sitemap (41 calculators live)"
- After push: live-verify all 5 new pages (HTTP 200, titles, math spot-check on defaults), homepage links + "41 calculators", sitemap; wait + re-check on any fresh 404 (Pages deployment lag).
- Site will have 41 live calculators after this push.

## Modules 37–41 — DONE (pushed + live verified, 10 Nov 2026 ~02:45 IST)
- **Push: APPROVED and LANDED, commit 09134f94ac8f1a5bc5617871b7aca3111cf2f3cb** (8 files, 292,095 bytes). Remote head before push was ef38d7f2 (Modules 31–36) — no divergence; the two commits below it (09c19991, 84248f7) were Tauheed's own og-image upload + rename. All 5 new pages confirmed absent remotely before pushing.
- **Live verification (cache-busting URLs, after ~4 min wait):** homepage + all 5 new pages + sitemap HTTP 200; new SEO titles live on all 5 pages; GA ×2 + icon ×1 confirmed on all 5 live pages; worked-example figures present on all 5 live pages (Currency 8,870; Salary 28.85; Investment 147,647; Body Fat 14.9; VAT £120); homepage shows "41 calculators" with all 5 new links; sitemap 46 URLs. **Site now has 41 live calculators.**
- Note: the final DONE paragraph was appended locally after the push (same pattern as Modules 20–25, 26–30, 31–36), so the live BUILD-LOG.md lags by that paragraph until the next push.
- Strategy note for future modules: per Tauheed's 10 Nov 2026 order, quality over quantity — only most-used / most-searched calculators; the ~200-calculator target is dropped.


## Modules 42–46 — built + verified (10 Nov 2026, push pending at log time)
- Usage research (coordinator worker, 10 Nov 2026): ranked by cross-checked "Most Popular / Most Used" shelves across Calculator.net, MiniWebtool, Calculator Soup-style hubs, finance/health specialist sites + American Pregnancy Association. Top 5 not on the site: Pregnancy (APA: due-date calculator "the number one most popular way to calculate your due date"), Inflation (Popular shelf on calculator.place, CalcVerseHub, MoneyTools, FinLoom, ByteTools, MoneyFlock), Credit Card Payoff (same Popular-shelf ubiquity; Calculator.net Amortization page points to its Credit Cards Payoff Calculator), Random Number Generator (MiniWebtool "Most used"; "random number 1 to 10" noted as probably the most searched range of all time), Rent vs Buy (Popular/Most Popular on UniversalCalcTools, SmartMoneyTools, Breadcrumb Tools; WiseBread "15 Personal Finance Calculators Everyone Should Use"). Rejected near-misses: Amortization (duplicate of Loan/EMI/Mortgage schedule), Square Root/Exponent (already inside Scientific), Mean Median Mode (near-duplicate of Average), CGPA (GPA exists), Paycheck (Salary + Income Tax exist).
- **Pregnancy Calculator** (pregnancy-calculator.html, 32,876 B): LMP + cycle length (Naegele's rule, LMP + 280d, cycle-adjusted) + conception-date mode → due date, weeks pregnant, trimester, conception date, milestone table. Verified: LMP 1 Jan 2026, 28d → due date **8 Oct 2026**, conception 15 Jan 2026; 15 Mar 2026 = 10w 3d, first trimester. Harness 36/36 (with Inflation).
- **Inflation Calculator** (inflation-calculator.html, 29,629 B): amount + rate + years → future cost AND today's-money value. Verified: $1,000 @ 3% / 10y → future cost **$1,343.92**, today's money worth **$744.09**; $500 @ 5% / 20y → $1,326.65 / $188.44. Static-safe: user-entered rate, FAQ states no live data.
- **Credit Card Payoff Calculator** (credit-card-payoff-calculator.html, 41,053 B): balance + APR + monthly payment (or payoff-by-date mode) → months to debt-free, total interest, debt-free date, fixed-vs-minimum comparison. Verified: $5,000 @ 18% APR, $150/mo → **47 months, interest $1,983.60**; minimum-only → **370 months, interest $12,327.77** ($10,344.17 more); pay off in 24 months needs $249.62/mo. Harness 25/25 (with RNG).
- **Random Number Generator** (random-number-generator.html, 31,038 B): min + max + count + duplicates? + decimals → list of random numbers, Generate again + Copy. Verified: 200 regenerations in bounds, no-duplicates cap at 10 in 1–10, 2dp formatting.
- **Rent vs Buy Calculator** (rent-vs-buy-calculator.html, 47,557 B): home price, down payment %, term, rate, tax/insurance/maintenance, rent + growth, appreciation, investment return → break-even year + verdict, year-by-year table, unrecovered-cost model. Verified: $300,000 home, 20% down, 7% / 30y, $1,500/mo rent → P&I **$1,597**, break-even **Year 4**, 30y buying $357,959 vs rent $856,357 (saves $498,398); P&I cross-check vs Mortgage page ($400k, 20% down, 6.5%, 30y → $2,023). Harness 24/24.
- All 5: node --check PASS; GA4 ×2 + favicon icon ×1; header/footer md5-identical to grade-calculator.html; ultra-best SEO (titles 52–57, metas 150–159, exact-keyword H1, 6 FAQs == JSON-LD, BreadcrumbList + WebApplication, og:image + Twitter card, canonical, 2–4 in-body links); zero duplicate titles/metas site-wide (coordinator cross-check, 46 pages); link audit 0 missing.
- Homepage: Finance +3 (Inflation, Credit Card Payoff, Rent vs Buy), Health +1 (Pregnancy), Everyday +1 (Random Number Generator); all "41 calculators" → "46 calculators" (8 occurrences); Popular strip unchanged at 8. Sitemap 46 → 51 URLs.

## UI/UX audit + fixes (10 Nov 2026, Tauheed's order: every page mobile + desktop friendly)
- Audit (worker, real headless Chrome 157 via Playwright, local HTTP, 360/390/1280/1440px, all 52 pages): **desktop 0 pages overflow — fully clean. Viewport meta present on all 52 pages.** Mobile horizontal overflow on 12 pages + 1 unstyled-select page; 39 pages clean. Full report: UI-UX-AUDIT.md + ui-audit-shots/ (10 evidence screenshots).
- Root causes: R1 grid items min-width:auto (wide table/select stretches whole page); R2 select intrinsic width from longest option; R3 .input-row wrap only ≤360px; R4 input.num-input rule doesn't match <select>.
- Fixes applied by coordinator (CSS only, additive; no logic/figure/design change):
  - F1: `.calc-panel { min-width: 0; }` — lets the grid track shrink on mobile.
  - F2: wrapped all 23 bare `<table class="amort-table">` in `<div class="table-wrap">` (overflow-x:auto) across 23 pages; ecommerce compare-table already inside .compare-wrap, untouched. New .table-wrap CSS rule added.
  - F3: mobile (≤768px) `.currency-row { flex-wrap: wrap }`, `.currency-row select.currency-select { flex: 1 1 120px; min-width: 0 }`, `.input-group > select.currency-select { width: 100%; max-width: 100% }` (scoped, not global — ecommerce in-row selects untouched).
  - F4: `select.num-input` styled like number inputs (44px height, border, radius, focus ring) — fixes Time #opSel + GPA .course-grade (~21px native height).
  - F5: `.input-row { flex-wrap: wrap }` at ≤768px (was 360px-only) — fixes Time h/m/s rows at 361–500px.
  - F6 (optional minors, applied): `.brand { min-height: 44px }`, `.brand-logo` 36→40px, `.regime-badge` 11→12px (only sub-12px text on the site).
- Re-render check after fixes: 360/390px overflow re-measured on all previously-broken pages (see push verification notes below).
- Note: ui-audit-shots/ PNGs are audit evidence, NOT pushed (push tool is text-only; binaries excluded).

## PUSH — Modules 42–46 + UI/UX fixes (10 Nov 2026)
- Files: 5 new calculator pages + index.html + sitemap.xml + styles.css + 23 wrapped table pages + UI-UX-AUDIT.md + BUILD-LOG.md (see push record for exact list).

- **Push 1: APPROVED and LANDED, commit 86cbde0913b84ad4230f98374fe49de39f050780** (8 files, 312,760 bytes): 5 new pages + index.html + sitemap.xml + BUILD-LOG.md. Remote head before push was 09134f94 (matched sync record, no divergence); all 5 new pages confirmed absent remotely; remote index.html still on "41 calculators" sync base.
- **Push 2: APPROVED and LANDED, commit 40b34938d5e2d9feecaa7c7825eade62f1a61887** (20 files, 640,583 bytes): styles.css + 18 wrapped table pages + UI-UX-AUDIT.md. (4 wrapped new pages were already in push 1, so no file was pushed twice.)
- **Re-render check after fixes (coordinator, local HTTP, headless Chrome 157): 0px overflow on all 15 checked pages at BOTH 360 and 390px** — index, ecommerce-profit (was 250px), calorie (130px), time (96px), investment (52px), compound-interest (49px), nps, tip, retirement, mortgage, rent-vs-buy, auto-loan, ppf, gpa, scientific. Select heights: Time #opSel 44px, GPA .course-grade 44px (were ~21px). Evidence screenshot: ui-audit-shots/ecommerce-mobile-390-fixed.png (not pushed — PNG).
- **Live verification (cache-busting URLs, after ~4 min wait): homepage + all 5 new pages + sitemap HTTP 200**; GA ×2 and icon ×1 on all pages; new SEO titles live (Pregnancy "Due Date", Inflation "Future Cost", Payoff "Free", RNG "1 to 100", Rent vs Buy "Break-Even"); homepage shows "46 calculators" (8×) with all 5 new links; sitemap 51 URLs; styles.css live with F1 min-width, .table-wrap and select.num-input rules; investment page live with table-wrap. **Site now has 46 live calculators.**
- Caveat: a live-browser render spot-check of the fixed pages was NOT possible from this VM — headless Chrome cannot reach the internet (ERR_TUNNEL_CONNECTION_FAILED, retried twice; curl/urllib reach the live site fine). The fixes are verified two ways instead: (1) local render of the exact pushed files = 0px overflow everywhere; (2) the fixed CSS + wrapped HTML confirmed live via fetch. Tauheed's own phone check remains the final confirmation, as with previous modules.
- Note: the final DONE paragraph was appended locally after the push (same pattern as Modules 20–25, 26–30, 31–36, 37–41), so the live BUILD-LOG.md lags by that paragraph until the next push.

## NEUMORPHISM REDESIGN — whole site (Tauheed picked Neomorphism, 10 Nov 2026 ~14:16 IST)
- Decision: Neomorphism wins over Glassmorphism (preview pages emi-calculator-neomorphism.html / emi-calculator-glassmorphism.html). Whole site redesigned in Neomorphism, with full care. Tauheed's 3 requirements: (1) done properly/honestly, (2) the donut CHART must look great, not normal, (3) dark mode must work exactly as before in this style too.
- styles.css v2 (729 lines, 37,845 B): full rewrite from the approved EMI preview, refined for readability. Light: #e0e5ec bg, dual soft shadows (#b8bcc4 dark / #ffffff light), raised panels/cards/buttons, inset inputs, 24px panel / 20px card radii, custom neumorphic sliders (WebKit + Firefox). Dark (html[data-theme="dark"], toggle untouched, same localStorage 'ac360-theme'): #20293d bg, shadows #141b29 / #2c3a55, footer #1a2233 panel (not a black hole). Readability: muted #55677d (4.58:1 on #e0e5ec; preview's #64748b was only 3.76:1), green text #047857; accent #2563eb kept for buttons/active toggle/eq key; links #1d4ed8 light / #60a5fa dark. All UI-UX audit fixes F1–F6, breakpoints, class names, Inter, layout structure preserved. New: .input-error/.validation-msg theme rule.
- Donut restyle: .donut-wrap is an inset neumorphic well (24px radius, inset shadow, padding) with soft drop-shadow on the SVG and enlarged centre text (22px/800 pct). Segment colours recolored per theme via CSS !important overrides of inline stroke attributes (5 colours: blue #2563eb, green #059669, amber #d97706 light / #fbbf24 dark, red #dc2626 / #f87171, purple #7c3aed / #a78bfa); legend dots kept in lock-step. Rent-vs-buy (only 5-segment page) confirmed all five in both themes. JS only touches dasharray/offset, so overrides are safe.
- Inline styles (67 flagged): handled CSS-only — 9 bordered boxes → borderless inset wells; 3 red error texts → theme danger colour; 2 textareas → inset fields; BMI label row → theme muted; RNG chips → raised chips. Deliberately NOT overridden: BMI scale-bar gradient + body-fat JS segment bar/markers (colours encode health categories). Full record: NEUMORPHISM-CHANGELOG.md; donut inventory: donut-stroke-inventory.md; inline-style inventory: inline-style-inventory.md (local working files; changelog pushed, inventories not pushed).
- Cache-bust: stylesheet links on all 54 HTML pages changed to styles.css?v=2 / ../styles.css?v=2 (verified 54/54, zero bare links remain) so returning visitors get the new CSS.
- Verification (headless Chromium, local server): 24 renders round 1 + 56 renders round 2 + focused re-checks — zero page errors, zero page-level horizontal overflow (compare-table scrolls by design inside its container). 10 screenshots in ui-redesign-shots/ (home/EMI/SIP/E-commerce/Scientific/Income Tax/BMI/Hours/Rent-vs-buy/Salary, 390/1280px, light/dark), visually inspected — text readable everywhere, charts look crafted. Not verified: live-browser/phone check (Tauheed's phone is the final confirmation), Firefox/Safari (Chromium only), not all 46 pages individually rendered (14 pages cover every component class).
- Preview files: emi-calculator-neomorphism.html + emi-calculator-glassmorphism.html are NOT deleted by this push — the push tool cannot delete files (snapshot-push limitation). They stay live but unlinked, noindex, not in sitemap. Delete via github.com (browser, needs working GitHub sign-in) or by Tauheed from his phone.
- Sync record: fixed missing Modules 42–46 entries (86cbde09, 40b34938) in chronological position before the preview push eae9edb1.
