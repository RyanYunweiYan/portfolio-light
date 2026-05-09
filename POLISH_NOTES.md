# Codex Polish Notes

## Direction

Apple-style, but less generic. The Codex version turns Ryan's strongest signals into the first-screen visual system: AI product manager, builder, high weekly AI usage, shipped products, international users, and personal AI investment.

## What Changed

1. Hero
   - Added a restrained "AI product signal" frame around the name and metrics.
   - Moved the four proof metrics from a plain row into a glass signal panel.
   - Added a subtle grid and orbital line system for memorability while staying light and Apple-like.
   - Added icons to the primary actions.

2. Projects
   - Reframed the section from a generic project grid into a case-study wall.
   - Added project sequence badges and a hover signal line.
   - Tightened card radius, hierarchy, shadows, and link affordance.
   - Added a short section thesis about shipped signal and measurable outcome.

3. Contact
   - Changed the ending from a simple contact row into a darker invitation section.
   - Added a current-signal panel using the existing availability copy.
   - Improved social-link animation so responsive audits do not misread collapsed text.

## Constraints Kept

- Did not change `client/src/data/siteData.ts`.
- Did not add dependencies.
- Kept the single-page information architecture.
- Kept the light Apple baseline rather than moving toward the dark Lovable-style version.

## Verification

- `pnpm run check` passed.
- `pnpm run build` passed.
- Playwright screenshot audit passed on desktop `1440`, tablet `768`, and mobile `375`.
- No horizontal overflow detected.
- No console errors detected.
