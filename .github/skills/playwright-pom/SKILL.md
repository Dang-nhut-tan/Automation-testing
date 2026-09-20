---

name: skill-playwright
description: Playwright JavaScript Page Object Model expert skill for creating maintainable and scalable test automation using POM architecture.
------------------------------------------------------------------------------------------------------------------------------------------------

# Skills: Playwright JavaScript Page Object Model (POM)

**Skill Name**: Playwright POM Expert
**Version**: 1.0
**Language**: JavaScript
**Framework**: Playwright Test Runner

## Core Expertise

### 1. Playwright Framework Mastery

* Full command of `@playwright/test`
* Advanced locator strategies and auto-waiting mechanisms
* Network, DOM, and Load state handling
* Tracing, screenshots, video recording on failure
* Parallel testing, retries, and CI optimization
* API testing using `request` fixture
* Authentication flows (`storageState`, auth fixtures)
* Device emulation and mobile testing

### 2. Page Object Model Architecture

* Strict Page Object Model implementation
* BasePage and BaseComponent pattern
* Composition over inheritance (Pages containing Components)
* Fluent API design (`return this`)
* Separation of concerns: Locators, Actions, Assertions
* Reusable component library creation
* Maintainable and scalable page objects

### 3. JavaScript Best Practices

* Modern JavaScript (ES6+)
* ES Modules (`import` / `export`)
* `const` and `let`; avoid `var`
* Proper async/await patterns
* Object and array destructuring where appropriate
* Reusable modules and helper functions
* JSDoc when type documentation improves maintainability
* Error handling and custom assertions

### 4. Locator Strategy (Priority Order)

1. **`getByTestId()`** — Preferred (`data-testid`)
2. **`getByRole()`** — With accessible name
3. **`getByLabel()`**
4. **`getByPlaceholder()`**
5. **`getByAltText()`**
6. **`getByText()`** — Only when necessary
7. CSS selectors — Last resort with justification

### 5. Prohibited Practices

* Inline locators in methods
* XPath locators
* Hard-coded timeouts
* Using `page.locator()` directly in tests
* Mixing assertions inside page objects
* Non-accessible locators without reason
* Using `var`
* Unnecessary callback-based asynchronous code when async/await is available

## Advanced Skills

* Custom test fixtures for pages and components
* Environment configuration (`.env` + `process.env`)
* Data-driven and parameterized testing
* Visual regression testing readiness
* Accessibility testing support
* Component library development (Header, Sidebar, Modal, Table, Toast, etc.)
* Authentication & Authorization helpers
* Reporting and CI/CD integration

## Deliverables

I can create and maintain:

* Complete Page Objects
* Reusable UI Components
* Base classes (`BasePage`, `BaseComponent`)
* Custom fixtures
* Optimized `playwright.config.js`
* Utility functions
* Authentication flows
* Full test specifications

## Quality Standards

All code I produce will meet these standards:

* Modern JavaScript (ES6+)
* Locators declared at class level
* Clear, descriptive method names
* Small, focused methods
* Fluent interface where beneficial
* Proper async/await usage
* Full compatibility with CI/CD
* Accessibility-first approach

---

**Skills Activated**: Playwright JavaScript Page Object Model Expert
