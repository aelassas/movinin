# Contribution Guide

Welcome to the **Movin' In** Contribution Guide!  

We appreciate your interest in contributing to Movin' In. This guide will help you get started, follow best practices, and make your contributions smooth and effective.



## Table of Contents

1. [Getting Started](#getting-started)  
2. [Code Style and Guidelines](#code-style-and-guidelines)  
3. [Branching and Workflow](#branching-and-workflow)  
4. [Submitting Pull Requests](#submitting-pull-requests)  
5. [Testing](#testing)  
6. [Pre-commit Checks](#pre-commit-checks)  
7. [Reporting Issues](#reporting-issues)  
8. [Code of Conduct](#code-of-conduct)  



## Getting Started

- **Fork the repository** to your own GitHub account.  
- **Clone your fork** locally:
  ```bash
  git clone https://github.com/your-username/movinin.git
  ```
- **Install dependencies**:
  ```bash
  cd ./
  npm install
  cd ./backend
  npm install
  cd ./admin
  npm install
  cd ./frontend
  npm install
  cd ./mobile
  npm install
  ```

- **Setup environment variables** according to the [Run from Source Guide](https://github.com/aelassas/movinin/wiki/Run-from-Source) or [Run from Source Docker Guide](https://github.com/aelassas/movinin/wiki/Run-from-Source-(Docker)).  
- **Start MongoDB**:
  - Run standalone local MongoDB: `mongod`
  - Or use Docker: `docker compose -f docker-compose.dev.yml up -d mongo`

- **Seed Development Database**:
  To quickly populate the local database with a complete dataset (admin, agencies, customers, properties, locations, bookings, notifications):
  ```bash
  # From repository root
  npm run seed:dev
  ```

- **Clean Development Database**:
  To safely remove all seed-generated records while preserving unrelated contributor data and the setup admin:
  ```bash
  # From repository root
  npm run clean:dev
  ```

- **Run the backend development server** to verify your setup:
  ```bash
  cd ./backend
  npm run dev
  ```
- **Run the frontend development server** to verify your setup:
  ```bash
  cd ./frontend
  npm run dev
  ```
- **Run the admin panel development server** to verify your setup:
  ```bash
  cd ./admin
  npm run dev
  ```
- **Run the mobile app** to verify your setup:
  ```bash
  cd ./mobile
  
  # android
  npm run android

  # ios
  npm run ios
  ```

## Development Database Commands

### Available Commands
| Command | Location | Description |
|---|---|---|
| `npm run seed:dev` | Root or `backend/` | Builds backend and seeds deterministic dev dataset idempotently. |
| `npm run clean:dev` | Root or `backend/` | Safely removes seed-owned records without touching contributor data. |
| `npm run setup` | `backend/` | Creates default admin configured by `MI_ADMIN_EMAIL`. |
| `npm run reset` | `backend/` | Deletes default admin configured by `MI_ADMIN_EMAIL`. |

### Development Credentials
All seeded development accounts share the password: **`SeedDev1!`**

| Role | Email | Password | Intended Portal | Description |
|---|---|---|---|---|
| **Admin** | `dev-admin@example.com` | `SeedDev1!` | Admin Panel (`localhost:3003`) | Development superadmin (distinct from `MI_ADMIN_EMAIL`) |
| **Agency** | `sunshine-realty@example.com` | `SeedDev1!` | Admin Panel (`localhost:3003`) | Multi-property agency with `payLater: true` |
| **Agency** | `urban-homes@example.com` | `SeedDev1!` | Admin Panel (`localhost:3003`) | Multi-property agency with `payLater: false` |
| **Customer** | `alice.johnson@example.com` | `SeedDev1!` | Frontend (`localhost:3004`) / Mobile | Verified customer with active bookings & notifications |
| **Customer** | `bob.smith@example.com` | `SeedDev1!` | Frontend (`localhost:3004`) / Mobile | Verified customer with ongoing bookings & notifications |
| **Customer** | `carol.white@example.com` | `SeedDev1!` | Frontend (`localhost:3004`) / Mobile | Verified customer with cancel request & notifications |

### Seed Dataset Details
- **Users**: 1 Admin, 2 Agencies, 3 Customers (all active, verified, hashed passwords).
- **Locations & Countries**: 2 Countries (United States, France), 6 Locations (New York, Los Angeles, San Francisco, Paris, Lyon, Manhattan as a child of NY) with English and French localizations.
- **Properties (20 total)**: Exercises multi-page pagination. Covers all property types (*Apartment, Townhouse, House, Plot, Farm, Commercial, Industrial*) and all rental terms (*Daily, Weekly, Monthly, Yearly*), with varied amenities, pricing, availability, and visibility flags.
- **Bookings (12 total)**: Computed relative to execution date (`now`) to prevent staleness. Covers all booking statuses (*Void, Pending, Deposit, Paid, Reserved, Cancelled*) across multiple agencies and properties without unintentional date collisions.
- **Notifications & Counters**: 8 read and unread notifications linked to seeded bookings and users, with accurately computed `NotificationCounter` records.

### Safety & Cleanup Guarantees
- **Environment Safeguard**: Refuses to run if `NODE_ENV=production` or if `DB_URI` points to a non-local address without explicit `MI_SEED_ALLOW_REMOTE=true`.
- **Targeted Deletion**: Only deletes documents marked with the deterministic seed IDs and ownership tag (`__SEED_DEV__`).
- **Never Touches Unrelated Data**: Does NOT drop collections or databases. Preserves contributor-created users, properties, bookings, and locations.
- **Preserves Setup Admin**: Will never delete the administrator created by `npm run setup` (`MI_ADMIN_EMAIL`).
- **Safe to Re-run**: Running `clean:dev` multiple times is idempotent and safely reports when no seed records are present.


## Code Style and Guidelines

- Movin' In uses **TypeScript** across the stack.  
- Follow **ESLint** rules.  
- Use descriptive variable and function names.  
- Write modular and reusable code whenever possible.  
- Add **JSDoc** comments for public functions and complex logic.  
- Follow existing project architecture and folder structures.  
- For React components, prefer functional components with hooks.  
- Write clear commit messages summarizing your changes.

## Branching and Workflow

- Create feature branches off the `main` branch:
  ```bash
  git checkout main
  git pull origin main
  git checkout -b feature/your-feature-name
  ```

- Keep your branch up-to-date with `main` regularly:
  ```bash
  git fetch origin
  git rebase origin/main
  ```

- Avoid committing directly to `main` or `develop`.

## Submitting Pull Requests

- Push your feature branch to your fork:
  ```bash
  git push origin feature/your-feature-name
  ```

- Open a **Pull Request** (PR) against the Movin' In `main` branch.  
- Provide a clear description of the changes and link any related issues.  
- Include screenshots or logs if your change affects UI or fixes bugs.  
- Ensure all tests pass and pre-commit checks are green before requesting review.

## Testing

- Write unit tests for new features or bug fixes.  
- Run existing tests locally before submitting:
  ```bash
  cd ./backend
  npm run test
  ```

See the [Testing Wiki](https://github.com/aelassas/movinin/wiki/Testing) for more details.

## Pre-commit Checks

- Movin' In uses **Husky** to run pre-commit hooks: linting, type checking, and file size checks.  
- These hooks run automatically when you commit code, helping maintain quality.  
- If any pre-commit check fails, fix the reported issues before proceeding.

## Reporting Issues

- Use the [GitHub Issues](https://github.com/aelassas/movinin/issues) page to report bugs or request features.  
- Provide detailed steps to reproduce, expected and actual results, and any relevant logs or screenshots.  
- Search existing issues before creating a new one to avoid duplicates.

## Code of Conduct

- Be respectful and inclusive in all interactions.  
- Follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).  
- Report any issues or harassment to the repository maintainers.

Thank you for helping make Movin' In better! Your contributions are valued and make a difference.

Happy coding! 🏢✨
