# OfficeRnD UI Test — Playwright + TypeScript

## Project Purpose

Implement a Playwright + TypeScript test framework that executes TC-UI-01 against the OfficeRnD staging UI. The framework should demonstrate good abstraction, clean structure, and sound inheritance — designed to grow and support additional tests in the future, not just to run a single test case.

---


## Test Case

**TC-UI-01 — Filter members by name and verify result count**

| Step | Action |
|---|---|
| 1 | Navigate to the login page |
| 2 | Log in with the credentials |
| 3 | Navigate to the Members page |
| 4 | Apply a filter by **Name** with the value `zara` |
| 5 | Assert that exactly **2 results** are displayed in the members grid |

---

## Implementation Requirements

### Framework constraints

- Use **Playwright** with **TypeScript**
- Use the **Page Object Model** pattern — one page object per distinct page or component
- Structure the framework for growth: use base classes, shared abstractions, and reusable controls where they reflect genuine patterns — not as premature over-engineering, but to show sound design that a real team could extend
- Credentials must be stored in a `.env` file and read via `process.env`; never hard-coded in test or page object files
- The `.env` file must be listed in `.gitignore`

### Required files (minimum set)

```
ui-task/
├── .env                        # EMAIL and PASSWORD (git-ignored)
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── pages/
│   ├── LoginPage.ts
│   ├── MembersPage.ts
│   └── NavigationMenu.ts
└── tests/
    └── members-filter.spec.ts
```

### Locator strategy

Prefer locators in this order:
1. `getByRole` / `getByLabel` / `getByPlaceholder` (ARIA-based)
2. `getByText`
3. `data-testid` attribute
4. CSS selector as a last resort

### Assertions

Use Playwright's built-in `expect` with auto-retry where possible (e.g. `toHaveCount`, `toBeVisible`).

---

## General Notes

- Target browsers: **Chrome, Firefox, Edge, Safari**
- Run command: `npx playwright test`
- Do not add linting, CI configuration, or reporting beyond Playwright's built-in HTML reporter unless explicitly requested

---

## Commit Message Format

- all letters lowercase, except for names of framework files and classes (e.g. `BaseComponent.ts`, `LoginPage`)
- start with a verb prefix followed by a colon: `add:`, `refactor:`, `fix:`, `delete:`
- then list the subject of the change
