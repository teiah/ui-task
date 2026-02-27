# OfficeRnD UI Test

## Assignment

Create an automated UI test using any technology or framework of your choice.

### Test Scenario

1. Navigate to the login page
2. Log in with the credentials
3. Navigate to the Members page
4. Apply a filter by Name: `zara`
5. Validate that exactly **2 results** are displayed in the grid

---

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- TypeScript
- Page Object Model pattern

---

## Setup

### Prerequisites

- Node.js (v18+)
- npm

### Install dependencies

```bash
npm install
```

### Install browsers

```bash
npx playwright install
```

### Configure credentials

Create a `.env` file in the project root (use `.env.example` as a reference):

```
EMAIL=your@email.com
PASSWORD=yourpassword
ORG_SLUG=your-org-slug
BASE_URL=https://staging.officernd.com
```

---

## Run the test

```bash
npx playwright test
```

This runs the test against **Chrome, Firefox, Edge, and Safari** in parallel.

To run against a single browser:

```bash
npx playwright test --project=chrome
```

To view the HTML report after a run:

```bash
npx playwright show-report
```
