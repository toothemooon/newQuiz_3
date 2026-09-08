# Holding Asset Card List Implementation Plan

> **For Hermes:** Implement this plan incrementally with the user writing the code and verifying each step before continuing.

**Goal:** 将 `portfolio.holding_assets.map(...)` 从只显示资产名称的简单 Card，逐步实现为目标设计中的资产卡片列表：图标、资产名称、ticker、收益金额、收益率，并根据收益正负显示颜色。

**Architecture:** 保持当前 `Page` 负责获取 portfolio 数据和遍历 `holding_assets`。第一阶段不新增复杂状态管理，也不改 API；先在现有 `app/page.tsx` 中完成一个可读的卡片结构，再根据重复程度决定是否提取为独立组件。所有金额和百分比格式化属于展示逻辑，API 继续返回数字。

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, 现有 `Card` 组件。

---

## Target card contract

每个 `holding_assets` 项目显示：

```text
[asset icon]  S&P 500 ETF (Vanguard)             +¥5,242
              VOO                               +12.87%
```

字段映射：

| UI 内容 | 数据字段 |
|---|---|
| 资产图标 | `item.asset.logo_url` |
| 资产名称 | `item.asset.name` |
| ticker | `item.asset.ticker_symbol` |
| 收益金额 | `item.gain_amount` |
| 收益率 | `item.gain_ratio` |

颜色规则：

- `gain_amount > 0`: 绿色
- `gain_amount < 0`: 红色
- `gain_amount === 0`: 中性灰色

---

## Task 1: Remove the weak type and confirm the data contract

**File:** `app/page.tsx`

The current map uses:

```ts
(item: any)
```

Remove the explicit `any` annotation first. TypeScript should infer the item type from `portfolio?.holding_assets`, provided the state is typed as `Portfolio | null`.

Before continuing, confirm these fields are available from `lib/type.ts`:

- `asset.name`
- `asset.ticker_symbol`
- `asset.logo_url`
- `gain_amount`
- `gain_ratio`

Verification:

```bash
npm run typecheck
```

Expected: no new TypeScript errors.

---

## Task 2: Design one card as three layout regions

**File:** `app/page.tsx`

Replace the current one-line Card content with three conceptual regions:

```text
Card
├── icon region
├── identity region
│   ├── asset name
│   └── ticker
└── performance region
    ├── gain amount
    └── gain ratio
```

Use a horizontal flex layout on the Card. The identity region should take available width, and the performance region should align to the right.

Suggested layout reasoning:

```text
Card: horizontal alignment + internal padding
icon: fixed-size circular/contained area
identity: flex-grow / min-width handling
performance: right-aligned text
```

Do not add interactivity yet. First make one mapped item visually match the target structure.

---

## Task 3: Add the asset icon with a safe fallback

**File:** `app/page.tsx`

Use `item.asset.logo_url` as the image source. Keep the icon inside a fixed-size container so different logo dimensions do not change card height.

Decide one fallback behavior before coding:

```text
If logo_url exists:
    render the asset logo
Otherwise:
    render a simple neutral placeholder
```

Because the current mock data uses external Google Storage URLs, check whether the project already configures `next/image` remote domains. If not, use the simplest existing-compatible image approach for this first iteration, or explicitly add the required Next image configuration only if you choose that route.

Verification: all five cards render without a missing-image layout shift or broken URL crash.

---

## Task 4: Format performance values as UI strings

**File:** `app/page.tsx` or a small local helper section in the same file.

Keep the source values numeric and create display values per item:

```text
amount:
    positive -> +¥5,242
    negative -> -¥890
    zero     -> ¥0

ratio:
    positive -> +12.87%
    negative -> -4.1%
    zero     -> 0%
```

Use the same sign rule already learned for the donut center. Avoid manually adding `-` to a value that already contains a minus sign. Prefer formatting the absolute value and deciding the sign explicitly, so the behavior is consistent for both amount and ratio.

Verification: compare all five mock items with the target data, especially Alphabet and Bitcoin negative values.

---

## Task 5: Apply positive/negative styling

**File:** `app/page.tsx`

Derive one color decision from `item.gain_amount`, then apply it to both the gain amount and gain ratio.

Conceptually:

```text
if gain_amount > 0 -> positive class
else if gain_amount < 0 -> negative class
else -> neutral class
```

Use Tailwind classes supported by the current project. If the text is regular HTML text, `text-green-*` / `text-red-*` are appropriate. This is different from the donut's SVG `<tspan>`, where `fill-*` is more direct.

Verification:

- VOO, AAPL, MSFT use green.
- GOOGL, BTC use red.
- Both lines for the same asset use the same color.

---

## Task 6: Match spacing and card treatment

**File:** `app/page.tsx`, only after the content is correct.

Tune the layout in this order:

1. Card width and vertical gap.
2. Card internal padding.
3. Icon size and alignment.
4. Identity typography hierarchy.
5. Right-side performance alignment.
6. Border radius and selected-card border.

The reference shows the first row with a blue border and the other rows visually de-emphasized. Treat this as a separate selection feature. For the first implementation, either:

- keep all cards equally styled, or
- use a temporary selected ticker value for visual comparison.

Do not introduce click state until the static layout is correct.

---

## Task 7: Decide whether to extract a reusable component

Only after the inline map works, evaluate repetition.

If the map JSX becomes large, create:

```text
components/ui/holding-asset-card.tsx
```

The component should receive one `holding_assets` item as a prop and own only presentation logic. `app/page.tsx` should retain fetching and mapping responsibilities.

For learning and minimal scope, first implement inline. Extracting too early would add a prop boundary before the card structure is understood.

---

## Task 8: Add loading and empty states

**File:** `app/page.tsx`

Current behavior renders no cards while `portfolio` is `null`. Add explicit UI only after the normal list works:

```text
portfolio is null -> loading state
portfolio exists but holding_assets is empty -> empty state
portfolio has assets -> mapped cards
```

Also check the fetch response before assuming JSON is valid. Keep error handling small; do not introduce a data-fetching library for this feature.

---

## Verification sequence

Run after each small task:

```bash
npm run typecheck
```

After the full card layout is complete:

```bash
npm run lint
npm run build
```

Browser acceptance checks:

1. Exactly five asset cards render.
2. Each card uses the correct asset name and ticker.
3. Each card shows its own gain amount and ratio.
4. Positive and negative colors match `gain_amount`.
5. Amounts contain `¥` and comma grouping.
6. Percentages contain `%` and correct signs.
7. Long asset names do not push the performance column off-screen.
8. Missing or empty portfolio data does not crash the page.
9. The donut chart remains unchanged while the list is implemented.

## Open decisions

- Whether the target's first-card blue border represents selection; defer interactive selection until static rendering works.
- Whether to use `next/image` or a plain image element for external logo URLs; inspect current Next configuration first.
- Whether the target's gray rows represent disabled state, hover/selection contrast, or simply the screenshot's visual style; do not infer interaction behavior from the image alone.
