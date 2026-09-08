# Portfolio Summary Display Implementation Plan

> **For Hermes:** Use this plan as an implementation guide. The user prefers step-by-step implementation and verification, with no automatic code edits.

**Goal:** 将 Portfolio 摘要显示为设计稿中的两行信息：第一行显示带日元符号和千位分隔的总资产，第二行显示带正负号、日元符号、括号和百分号的收益信息，并根据收益正负显示颜色。

**Architecture:** 保持现有 Next.js Client Component 和 `/api/portfolio` 数据流不变。将格式化逻辑放在 `components/ui/chart-pie.tsx` 的组件层，使用 `Portfolio` 中的 `total_asset_amount`、`total_gain_amount`、`total_gain_ratio` 生成展示文本和 SVG-safe 的颜色 class。暂不把金额格式化逻辑移动到 API，避免改变数据契约。

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Recharts Label/SVG, Tailwind CSS。

---

## Desired output

Positive example:

```text
¥115,500
+¥15,500 (+15.5%)
```

Negative example:

```text
¥115,500
-¥15,500 (-15.5%)
```

Zero example:

```text
¥115,500
¥0 (0%)
```

The first line is dark/foreground. The second line is green for positive gain, red for negative gain, and neutral gray for zero.

## Current context and confirmed issues

- File: `components/ui/chart-pie.tsx`
- Portfolio data is loaded with `setPortfolio(data.mock_data)`.
- Current first line renders `portfolio?.total_asset_amount` without currency symbol or grouping.
- Current second line renders `total_gain_amount` and `total_gain_ratio` as adjacent JSX expressions, producing `1550015.5`.
- `gainColor` is computed but not applied.
- The displayed text is inside SVG `<tspan>`, so use SVG-compatible `fill-*` classes or an explicit SVG `fill` attribute rather than relying on HTML-only text color behavior.
- API data fields are numeric and should remain numeric; formatting belongs in the UI.

---

## Step 1: Confirm the display contract

**Files:** No application file changes.

Use these exact semantic rules:

- `total_asset_amount`: format with `toLocaleString()` and prefix `¥`.
- `total_gain_amount`: format with `toLocaleString()` and add `+` only when greater than zero; negative values retain `-` from numeric formatting.
- `total_gain_ratio`: format as a percentage and add `+` only when greater than zero.
- Put one space between amount and percentage: `+¥15,500 (+15.5%)`.
- Keep zero neutral: `¥0 (0%)`.

Do not use the old visitor data or hardcoded `chartData` for this summary.

---

## Step 2: Create derived display values inside the component

**File:** `components/ui/chart-pie.tsx`

After the `portfolio` state declaration, derive:

1. A safe `gain` value using `portfolio?.total_gain_amount ?? 0`.
2. A formatted asset amount using `portfolio?.total_asset_amount.toLocaleString()` with a loading fallback.
3. A formatted gain amount with a conditional plus sign.
4. A formatted gain ratio with a conditional plus sign and `%` suffix.
5. One combined second-line string instead of two adjacent JSX expressions.

Use a loading fallback while `portfolio` is `null`, so the SVG does not briefly render misleading zero values.

Prefer a small local helper for the sign rule if the same rule is used for both gain amount and gain ratio. Do not alter the API response or type definitions for presentation formatting.

---

## Step 3: Apply the gain color to the second `<tspan>`

**File:** `components/ui/chart-pie.tsx`

Replace the currently unused `gainColor` result with an SVG-compatible class decision:

- `gain > 0` -> `fill-green-600` or the project's existing green token.
- `gain < 0` -> `fill-red-600` or the project's existing red token.
- `gain === 0` -> `fill-muted-foreground` or a neutral fill.

Apply that class to the second `<tspan>`. Keep the first amount line using `fill-foreground`.

Do not use `text-green-500` on the SVG text unless verified in the rendered SVG; Tailwind `fill-*` is the direct choice for `<text>`/`<tspan>`.

If the project has a semantic CSS token for success/destructive, prefer that token over hardcoded colors after checking `app/globals.css`.

---

## Step 4: Match the two-line visual hierarchy

**File:** `components/ui/chart-pie.tsx`

Adjust only the Label text presentation if needed:

- First line: bold and larger, representing total assets.
- Second line: smaller, representing gain amount and gain ratio.
- Keep both lines horizontally centered using the existing `viewBox.cx` values.
- Preserve the existing vertical offset between lines.
- Add the `¥` symbol in the rendered string, not to the numeric API data.

The design screenshot appears to show a standalone summary card. If this summary is intended to replace the center of the donut, keep it inside the existing `Label`; if it is intended as a separate card, create a separate presentation component rather than mixing summary markup into Recharts.

---

## Step 5: Remove stale visitor presentation after the new summary works

**File:** `components/ui/chart-pie.tsx`

After verifying the new center text:

- Remove the `totalVisitors` memo if it is no longer referenced.
- Remove `chartData` only if it is no longer needed by the chart configuration.
- Rename stale footer text such as `Visitors`/`last 6 months` to portfolio-appropriate wording, or remove the footer if the design does not require it.
- Keep the chart data and chart color configuration separate from summary formatting.

This cleanup should be done after the display is verified, not in the same debugging step.

---

## Validation checklist

Run from `/Users/allen/Documents/GitHub/newQuiz_3`:

```bash
npm run typecheck
npm run lint
npm run build
```

Browser checks:

1. With the current mock data, verify `¥115,500` appears on line one.
2. Verify `+¥15,500 (+15.5%)` appears on line two.
3. Verify the gain line is green.
4. Temporarily inspect a negative fixture or local test value and verify `-¥... (-...%)` is red.
5. Verify a zero value is neutral and does not display `+-` or duplicate signs.
6. Refresh the page and verify the loading state does not permanently replace the loaded values.
7. Verify the five pie sectors remain colored after the Label formatting changes.

Do not claim completion until typecheck, lint, build, and the rendered positive/negative/zero cases are verified.

## Risks and open questions

- The mock `holding_ratio` values currently sum to `137.1`, not `100`; this is separate from summary formatting and should be resolved before presenting the chart as a true portfolio allocation.
- The screenshot uses a white/light summary background, while the current application screenshot uses a dark card. Confirm whether the design reference applies to the whole card or only to the text block before changing global/card colors.
- The exact success/error color tokens should be checked against `app/globals.css` before choosing final Tailwind classes.
