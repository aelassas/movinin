# Releases

## [Movin' In 6.4](https://github.com/aelassas/movinin/releases/tag/v6.4) – 2025-10-26

* chore(mobile): upgrade to expo 54
* chore(deps): update dependencies
* fix(frontend): typo in checkout form (#15)
* fix(mobile): update dependencies to resolve expo doctor warnings
* fix(mobile): status bar background color and text color not applied on android
* fix(mobile): drawer navigator bottom inset for devices with home indicator

### Assets
- [movinin-6.4.apk](https://github.com/aelassas/movinin/releases/download/v6.4/movinin-6.4.apk) (99.86 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v6.4)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v6.4)

## [Movin' In 6.3](https://github.com/aelassas/movinin/releases/tag/v6.3) – 2025-07-24

* feat(password-input): add toggle visibility with eye icon
* fix(admin): hide booking prices when dates are not selected
* fix(ci): update mobile app url workflow to push to main branch
* chore: update dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v6.2...v6.3

### Assets
- [movinin-6.3.apk](https://github.com/aelassas/movinin/releases/download/v6.3/movinin-6.3.apk) (92.47 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v6.3/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v6.3)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v6.3)

## [Movin' In 6.2](https://github.com/aelassas/movinin/releases/tag/v6.2) – 2025-07-11

* feat: add flexible [time-based property availability](https://github.com/aelassas/movinin/wiki/FAQ#how-to-automatically-prevent-a-property-from-being-booked-multiple-times-when-its-already-booked)
* feat(backend): integrate [Sentry](https://github.com/aelassas/movinin/wiki/Setup-Sentry) for error tracking and performance monitoring with configurable tracesSampleRate
* feat(ci): add GitHub Actions workflow to update mobile app URL on release
* feat(tests): improve code coverage
* fix(docker): .env file not loaded and setup issues
* fix(sentry): remove unecessary import from app.ts and fix docker issues
* fix(backend): improve TTL index handling and logging for updates
* fix(backend): location created even if image file does not exist
* fix(admin): rental dates issues in create and update booking forms
* fix(frontend): property search filter not updating results on date change
* fix(frontend): remove event listeners when analytics script starts
* fix(tests): cleanup test data
* fix(tests): increase test timeout to for stability
* refactor(models): move manual index creation from models to initialization script
* refactor: rename common folder to utils
* chore(backend): organize and document .env.example
* chore: update dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v6.1...v6.2

### Assets
- [movinin-6.2.apk](https://github.com/aelassas/movinin/releases/download/v6.2/movinin-6.2.apk) (92.46 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v6.2/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v6.2)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v6.2)

## [Movin' In 6.1](https://github.com/aelassas/movinin/releases/tag/v6.1) – 2025-06-28

* feat(backend): add setup script to create admin user
* feat(backend): add reset script to delete admin user
* feat: add [Code of Conduct](https://github.com/aelassas/movinin/blob/main/.github/CODE_OF_CONDUCT.md) to promote a respectful and inclusive community
* feat: add comprehensive[ Contribution Guide](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md) to assist new contributors
* feat: add GitHub Actions workflow to automatically update [RELEASES.md](https://github.com/aelassas/movinin/blob/main/.github/RELEASES.md) on new releases
* fix(tests): add parent location tests
* fix(mobile): auth issues when jwt token expires
* fix(mobile): replace Paragraph with RNPText in BookingList cancellation dialog
* refactor(backend): move Stripe and PayPal integrations to a dedicated payment directory
* refactor(backend): replace bcrypt password hashing with helper function
* docs: add new sections to [software architecture](https://github.com/aelassas/movinin/wiki/Architecture)
* chore: update dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v6.0...v6.1

### Assets
- [movinin-6.1.apk](https://github.com/aelassas/movinin/releases/download/v6.1/movinin-6.1.apk) (92.46 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v6.1/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v6.1)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v6.1)

## [Movin' In 6.0](https://github.com/aelassas/movinin/releases/tag/v6.0) – 2025-06-22

* feat: add [parent locations](https://github.com/aelassas/movinin/wiki/Locations) and include child locations in search results
* feat(mobile): upgrade to React Navigation v7
* feat(frontend): add progress indicator while searching for properties
* fix(mobile): language not updated on login
* fix(mobile): wrong types in autocomplete context
* docs: update README with new features and usage instructions
* chore: update dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.9...v6.0

### Assets
- [movinin-6.0.apk](https://github.com/aelassas/movinin/releases/download/v6.0/movinin-6.0.apk) (92.46 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v6.0/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v6.0)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v6.0)

## [Movin' In 5.9](https://github.com/aelassas/movinin/releases/tag/v5.9) – 2025-06-17

* refactor(admin): rename backend folder to admin for clarity
* refactor(backend): rename api folder to backend for clarity
* feat(admin): add Progress component and integrate loading indicator in agencies and locations
* feat(admin): replace backdrop with progress indicator in properties page
* feat(admin): integrate progress indicator in countries page
* fix(backend): ensure globalAgent.maxSockets is set for HTTP server
* fix(admin): update title in index.html to reflect Admin Panel
* fix(backend): update Docker npm install command to include all dependencies
* fix(docker-compose): update mi-frontend port mapping from 8080 to 8081
* chore: clarify project identities with consistent package.json names and descriptions
* chore: update dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.8...v5.9

### Assets
- [movinin-5.9.apk](https://github.com/aelassas/movinin/releases/download/v5.9/movinin-5.9.apk) (92.46 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.9/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.9)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.9)

## [Movin' In 5.8](https://github.com/aelassas/movinin/releases/tag/v5.8) – 2025-06-13

* fix(env): update CDN URLs to include port 4004 for backend, frontend, and mobile environments
* fix(database): explicitly wait for database connection to be open
* fix(mail): add ethereal test transporter for CI environment
* fix(database): text indexes errors when adding new languages
* fix(logger): improve message formatting for VSCode terminal
* chore(index): update server startup logging for better visibility
* chore(tests): enhance database tests with additional scenarios and index handling
* refactor(database): enhance connection management and improve logging; refactor initialization functions for better clarity
* refactor(api): modularized server creation supporting HTTP/HTTPS with async file reads
* refactor(api): added detailed JSDoc comments for functions and constants
* refactor(api): added robust database connection and initialization checks before starting server
* refactor(api): introduced configurable shutdown timeout to force exit if shutdown hangs
* refactor(api): improved shutdown handler to log received signals and handle cleanup gracefully
* refactor(api): used process.once for signal handling to avoid multiple shutdowns
* refactor(api): improved code readability with consistent naming and minor cleanup
* docs: update self-hosted and run from source docs

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.7...v5.8

### Assets
- [movinin-5.8.apk](https://github.com/aelassas/movinin/releases/download/v5.8/movinin-5.8.apk) (92.47 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.8/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.8)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.8)

## [Movin' In 5.7](https://github.com/aelassas/movinin/releases/tag/v5.7) – 2025-05-22

* chore(mobile): upgrade to expo 53 and react-native 0.79
* feat(admin): add blacklisted field to user and agency pages
* refactor(pre-commit): replace string literals with Symbol constants for check types
* chore(all): update all dependencies to their latest versions across all projects
* fix(frontend,admin): check user and notifications when navigating between routes
* fix(pre-commit): exclude deleted files from ESLint check
* fix(auth): show unauthorized page for blacklisted users
* fix(checkout): show unauthorized page for blacklisted users
* fix(dev): update hmr port for frontend docker service to 8081
* fix(admin): remove agency form height from admin dashboard
* fix(mobile): add custom resolver for axios in Metro configuration

### Assets
- [movinin-5.7.apk](https://github.com/aelassas/movinin/releases/download/v5.7/movinin-5.7.apk) (92.45 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.7/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.7)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.7)

## [Movin' In 5.6](https://github.com/aelassas/movinin/releases/tag/v5.6) – 2025-05-05

* Feat(pre-commit): optimized pre-commit hook to lint and type-check only changed projects with Docker fallback
* Feat(pre-commit): added file size checks for pre-commit validation
* Feat(pre-commit): added p-limit for concurrency control in ESLint checks and improved logging
* Chore: updated dependencies
* Fix(docker): corrected API log volume path in docker-compose files
* Refactor: migrate to `createBrowserRouter` for improved routing structure

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.5...v5.6

### Assets
- [movinin-5.6.apk](https://github.com/aelassas/movinin/releases/download/v5.6/movinin-5.6.apk) (78.97 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.6/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.6)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.6)

## [Movin' In 5.5](https://github.com/aelassas/movinin/releases/tag/v5.5) – 2025-04-28

* Feat: added `api_logs` volume to docker-compose files for logging
* Feat: enabled babel-plugin-react-compiler optimization in vite configuration
* Chore: updated dependencies
* Dev: added custom pre-commit hook for linting and type-checking
* Dev: enabled react-compiler rule in ESLint configuration
* Fix: updated docker compose service names
* Fix: removed unnecessary directory navigation in install dependencies scripts
* Fix: show contact form even if reCAPTCHA is disabled
* Fix: trigger data fetch on property and user changes in BookingList component

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.4...v5.5

### Assets
- [movinin-5.5.apk](https://github.com/aelassas/movinin/releases/download/v5.5/movinin-5.5.apk) (78.97 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.5/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.5)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.5)

## [Movin' In 5.4](https://github.com/aelassas/movinin/releases/tag/v5.4) – 2025-04-22

* Feat: set up [Docker Development Environment](https://github.com/aelassas/movinin/wiki/Run-from-Source-(Docker)) with CDN Integration and Data Persistence
* Feat: Upgrade to @mui/x-data-grid and @mui/x-date-pickers 8.0.0
* Feat: Updated admin dashboard main color
* Feat: Updated dependencies
* Fix: clean up formatting in .env.docker.example
* Fix: update AdapterDateFns import and adjust selectedIds handling in BookingList and UserList components
* Fix: update loading state in BookingList component
* Fix: enable reCAPTCHA check based on environment configuration
* Fix: restrict contact, ToS and About pages to logged in users in admin dashboard
* Fix: update service references in Docker configuration files

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.3...v5.4

### Assets
- [movinin-5.4.apk](https://github.com/aelassas/movinin/releases/download/v5.4/movinin-5.4.apk) (78.97 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.4/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.4)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.4)

## [Movin' In 5.3](https://github.com/aelassas/movinin/releases/tag/v5.3) – 2025-04-12

* Migrated to Express 5 for improved performance and future compatibility
* Updated tos, about and contact pages in admin dashboard
* Improved code coverage
* Fix: add custom indexes to multiple models and handle sync errors
* Fix: add setting to ensure final newline in files
* Fix: improve error handling for language validation
* Fix: no match card is displayed after login from activate and reset password pages
* Fix: hide other properties for agencies in admin dashboard
* Fix: property page layout issues in admin dashboard
* Fix: disable checkout options if PayPal is loaded
* Fix: exclude @react-navigation/* packages from ncu command
* Updated dependencies to their latest version

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.2...v5.3

### Assets
- [movinin-5.3.apk](https://github.com/aelassas/movinin/releases/download/v5.3/movinin-5.3.apk) (78.97 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.3/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.3)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.3)

## [Movin' In 5.2](https://github.com/aelassas/movinin/releases/tag/v5.2) – 2025-03-30

* Upgrade to react 19.1 and mui 7.0
* Fix: remove unnecessary trailing spaces in multiple components for consistency
* Fix: update numeric input pattern to correctly allow decimal values in admin dashboard
* Fix: wrong imports in scheduler component
* Updated dependencies

### Assets
- [movinin-5.2.apk](https://github.com/aelassas/movinin/releases/download/v5.2/movinin-5.2.apk) (78.64 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.2/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.2)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.2)

## [Movin' In 5.1](https://github.com/aelassas/movinin/releases/tag/v5.1) – 2025-03-14

* Fix: Add payPalLoaded prop to CheckoutOptions and update disabled conditions for switches in checkout
* Fix: Merge price calculation in admin dashboard with frontend and mobile app
* Updated dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v5.0...v5.1

### Assets
- [movinin-5.1.apk](https://github.com/aelassas/movinin/releases/download/v5.1/movinin-5.1.apk) (78.63 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.1/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.1)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.1)

## [Movin' In 5.0](https://github.com/aelassas/movinin/releases/tag/v5.0) – 2025-03-10

* Upgrade to ESLint 9
* Updated dependencies
* Fix: update ESLint configuration to enforce single quotes for TS and double quotes for TSX
* Fix: update ncu and eslint commands in package.json
* Fix: add TypeScript build info files to .gitignore

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.9...v5.0

### Assets
- [movinin-5.0.apk](https://github.com/aelassas/movinin/releases/download/v5.0/movinin-5.0.apk) (78.63 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v5.0/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v5.0)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v5.0)

## [Movin' In 4.9](https://github.com/aelassas/movinin/releases/tag/v4.9) – 2025-02-26

* Added PayPal debug environment variable `VITE_MI_PAYPAL_DEBUG` to frontend
* Fix: update PayPal order status check from `APPROVED` to `COMPLETED` and capture order on approval
* Fix: handle PayPal cancellation and error by resetting processing state
* Fix: disable console call removal in Vite configuration for easier debugging
* Fix: update NotificationList component to properly manage notification read/unread state
* Fix: optimize NotificationList state updates
* Fix: update error logging to use console.log

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.8...v4.9

### Assets
- [movinin-4.9.apk](https://github.com/aelassas/movinin/releases/download/v4.9/movinin-4.9.apk) (78.63 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.9/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.9)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.9)

## [Movin' In 4.8](https://github.com/aelassas/movinin/releases/tag/v4.8) – 2025-02-22

* Fix: date and time pickers issues on iOS
* Fix: reduce transition duration for accordion panel for quicker animations
* Fix: update footer component to replace secure payment image with dynamic Stripe/PayPal powered by image
* Updated dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.7...v4.8

### Assets
- [movinin-4.8.apk](https://github.com/aelassas/movinin/releases/download/v4.8/movinin-4.8.apk) (78.63 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.8/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.8)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.8)

## [Movin' In 4.7](https://github.com/aelassas/movinin/releases/tag/v4.7) – 2025-02-13

* Added IPInfo integration for country code retrieval
* Added environment variables in frontend for flexible map settings
* Added [update-version.ps1](https://github.com/aelassas/movinin/blob/main/__scripts/update-version.ps1) for updating versions
* Enhanced PayPal order creation by refining payer and application context settings for improved payment flow
* Fix: async condition handling in api
* Fix: migrate deprecated MUI APIs
* Updated dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.6...v4.7

### Assets
- [movinin-4.7.apk](https://github.com/aelassas/movinin/releases/download/v4.7/movinin-4.7.apk) (78.63 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.7/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.7)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.7)

## [Movin' In 4.6](https://github.com/aelassas/movinin/releases/tag/v4.6) – 2025-02-08

* Added user context to admin dashboard
* Added `VITE_MI_HIDE_AGENCIES` setting to toggle agency visibility in the frontend
* Updated navigation links in admin dashboard
* Updated dependencies
* Fix: PayPal order name and description violate PayPal's max length resulting in error 400
* Fix: Stripe product name and description violate Stripe's max length resulting in error 400
* Fix: Forgot Password, Reset Password and Activate pages not working properly in frontend and admin dashboard
* Fix: update SMTP password and MongoDB URI formats in environment configuration files

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.5...v4.6

### Assets
- [movinin-4.6.apk](https://github.com/aelassas/movinin/releases/download/v4.6/movinin-4.6.apk) (78.63 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.6/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.6)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.6)

## [Movin' In 4.5](https://github.com/aelassas/movinin/releases/tag/v4.5) – 2025-02-02

* [Integrated PayPal Payment Gateway](https://github.com/aelassas/movinin/wiki/Payment-Gateways)
* [Added Property Scheduler](https://movin-in.github.io/content/screenshots/v4.5/backend-scheduler.png?raw=true)
* [Added manual tests](https://github.com/aelassas/bookcars/wiki/Manual-Tests)
* Added `BC_TIMEZONE` setting to api
* Bump date-fns to 4.1.0
* Updated dependencies
* Fix: rental dates not working properly in frontend and mobile app

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.4...v4.5

### Assets
- [movinin-4.5.apk](https://github.com/aelassas/movinin/releases/download/v4.5/movinin-4.5.apk) (78.72 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.5/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.5)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.5)

## [Movin' In 4.4](https://github.com/aelassas/movinin/releases/tag/v4.4) – 2025-01-19

* Added dynamic company/website name setting
* Added cookie policy and privacy pages
* Added AUD currency
* Updated About and ToS pages
* Updated dependencies
* Fix: escape dollar sign in currency environment variable
* Fix: use environment variable for contact email in footer
* Fix: change default VITE_PORT to 3003 in vite.config.ts for backend
* Fix: change default VITE_PORT to 3004 in vite.config.ts for frontend

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.3...v4.4

### Assets
- [movinin-4.4.apk](https://github.com/aelassas/movinin/releases/download/v4.4/movinin-4.4.apk) (77.82 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.4/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.4)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.4)

## [Movin' In 4.3](https://github.com/aelassas/movinin/releases/tag/v4.3) – 2025-01-08

* Added property coordinates
* Added property address and Google Maps link to confirmation email after successful checkout
* Added explicit message after checkout completed
* Added footer to sign in, sign up, forgot password, activate, reset password, settings and change password pages
* Updated MapDialog styles for better layout
* Fix: redirect to checkout from sign in page not working
* Fix: social login not redirecting properly
* Fix: checkout payment options are still active after online payment submitted
* Fix: activate, reset password and checkout pages not working properly after submit
* Fix: sign up not working properly after submit
* Fix: update min-height for checkout session to improve layout
* Fix: No text padding in no match page
* Fix: Jest did not exit one second after the test run has completed

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.2...v4.3

### Assets
- [movinin-4.3.apk](https://github.com/aelassas/movinin/releases/download/v4.3/movinin-4.3.apk) (77.82 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.3/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.3)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.3)

## [Movin' In 4.2](https://github.com/aelassas/movinin/releases/tag/v4.2) – 2025-01-03

* Added map view to checkout page
* Added footer to property page
* Removed min-height and description from Property and PropertyList components for improved layout flexibility
* Fix: page reload not working properly on Firefox
* Fix: react-localization causing conflicting peer dependency with react 19
* Fix: reactjs-social-login causing conflicting peer dependency with react 19
* Fix: adjust footer link width for better layout
* Fix: mismatched styles in footer
* Fix: header not visibile in ForgotPassword, SignIn, and SignUp screens in mobile app

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.1...v4.2

### Assets
- [movinin-4.2.apk](https://github.com/aelassas/movinin/releases/download/v4.2/movinin-4.2.apk) (77.82 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.2/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.2)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.2)

## [Movin' In 4.1](https://github.com/aelassas/movinin/releases/tag/v4.1) – 2024-12-31

* Added user context for managing user state
* Improved Header component responsiveness
* Added NProgress for loading indicators
* Replaced SuspenseRouter with BrowserRouter for routing
* Fix: Admin is not notified when a user pays from mobile app
* Fix: Admin is not notified when a user cancels his booking

**Full Changelog**: https://github.com/aelassas/movinin/compare/v4.0...v4.1

### Assets
- [movinin-4.1.apk](https://github.com/aelassas/movinin/releases/download/v4.1/movinin-4.1.apk) (77.82 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.1/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.1)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.1)

## [Movin' In 4.0](https://github.com/aelassas/movinin/releases/tag/v4.0) – 2024-12-29

* Improved global performance on [Google PageSpeed Insights](https://pagespeed.web.dev/) (95/100)
* Fix: reCAPTCHA context doesn't work properly
* Fix: Location carrousel badges don't have sufficient contrast ratio
* Fix: dev script is not working properly for backend and frontend
* Fix: Dockerfile commands are not working properly for backend and frontend
* Fix: Commands in documentation are not up to date
* Update background image format to WebP for improved performance
* Update dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.9...v4.0

### Assets
- [movinin-4.0.apk](https://github.com/aelassas/movinin/releases/download/v4.0/movinin-4.0.apk) (77.82 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v4.0/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v4.0)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v4.0)

## [Movin' In 3.9](https://github.com/aelassas/movinin/releases/tag/v3.9) – 2024-12-27

* Added [multiple currency support](https://github.com/aelassas/movinin/wiki/Add-New-Currency)
* Added services and customer care sections to homepage
* Added newsletter form to footer
* Added footer to checkout page
* Added custom primary color to theme palette
* Refactor button styles to use outlined variant and adjust properties for consistency across components
* Fix: ImageViewer layout issues in the admin dashboard
* Fix: AutoHeightWebView has wrong height after refresh in mobile app
* Fix: preload link in frontend not working properly and adjust signout icon margin in mobile app
* Updated dependencies

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.8...v3.9

### Assets
- [movinin-3.9.apk](https://github.com/aelassas/movinin/releases/download/v3.9/movinin-3.9.apk) (77.82 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.9/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.9)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.9)

## [Movin' In 3.8](https://github.com/aelassas/movinin/releases/tag/v3.8) – 2024-12-23

* Upgrade to React 19 stable, Expo 52 and React Native 0.76
* Added React Compiler ESLint rules
* Added protection against Brute force, DoS, DDoS and Web scraping
* Added [iOS App instructions](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#run-ios-app)
* Replaced `jsonwebtoken` by `jose`
* Updated homepage and footer
* Updated Docker and NGINX configurations
* Updated dependencies
* Fix: Location page not responding after creating a new location
* Fix: Location and country validation not working properly
* Fix: MultipleSelect issues
* Fix: AutoCompleteDropdown issues on iOS
* Fix: TextField deprecated props
* Fix: Layout and db issues
* Fix: Some issues in unit tests

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.7...v3.8

### Assets
- [movinin-3.8.apk](https://github.com/aelassas/movinin/releases/download/v3.8/movinin-3.8.apk) (77.79 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.8/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.8)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.8)

## [Movin' In 3.7](https://github.com/aelassas/movinin/releases/tag/v3.7) – 2024-09-16

* Added coutries, agencies and destinations pages
* Added destinations carrousel to homepage
* Added destinations map to homepage
* Added location map to search page
* Added pull to refresh to mobile app
* Added @ import alias
* Updated footer component
* Updated tos and contact pages
* Updated cors middleware
* Updated dependencies
* Fix AutocompleteDropdown on iOS
* Fix layout issues
* Fix db issues

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.6...v3.7

### Assets
- [movinin-3.7.apk](https://github.com/aelassas/movinin/releases/download/v3.7/movinin-3.7.apk) (80.36 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.7/movinin-db.zip) (4.74 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.7)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.7)

## [Movin' In 3.6](https://github.com/aelassas/movinin/releases/tag/v3.6) – 2024-08-16

* Added social login
* Added pull to refresh to mobile app
* Updated dependencies
* Updated search filters
* Updated homepage layout
* Updated stripe controller
* Updated unit tests
* Fix layout issues
* Fix mobile locatization issues
* Fix mobile checkout issues

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.5...v3.6

### Assets
- [movinin-3.6.apk](https://github.com/aelassas/movinin/releases/download/v3.6/movinin-3.6.apk) (80.26 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.6/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.6)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.6)

## [Movin' In 3.5](https://github.com/aelassas/movinin/releases/tag/v3.5) – 2024-07-05

* Updated layout and colors
* Updated checkout page
* Fix localization issues
* Fix sort queries
* Fix layout issues
* API:
    * Bump @babel/cli from 7.24.6 to 7.24.7
    * Bump @babel/core from 7.24.6 to 7.24.7
    * Bump @babel/plugin-transform-modules-commonjs from 7.24.6 to 7.24.7
    * Bump @babel/preset-env from 7.24.6 to 7.24.7
    * Bump @babel/preset-typescript from 7.24.6 to 7.24.7
    * Bump @types/node from 20.12.12 to 20.14.9
    * Bump @types/uuid from 9.0.8 to 10.0.0
    * Bump @types/validator from 13.11.10 to 13.12.0
    * Bump @typescript-eslint/eslint-plugin from 7.11.0 to 7.15.0
    * Bump @typescript-eslint/parser from 7.11.0 to 7.15.0
    * Bump mongoose from 8.4.0 to 8.4.4
    * Bump nodemailer from 6.9.13 to 6.9.14
    * Bump nodemon from 3.1.2 to 3.1.4
    * Bump stripe from 15.8.0 to 16.1.0
    * Bump tsx from 4.11.0 to 4.16.2
    * Bump typescript from 5.4.5 to 5.5.3
    * Bump uuid from 9.0.1 to 10.0.0
* Backend and frontend:
    * Bump @mui/icons-material from 5.15.18 to 5.15.21
    * Bump @mui/material from 5.15.18 to 5.15.21
    * Bump @mui/x-data-grid from 7.5.1 to 7.8.0
    * Bump @mui/x-date-pickers from 7.5.1 to 7.8.0
    * Bump @stripe/react-stripe-js from 2.7.1 to 2.7.3
    * Bump @stripe/stripe-js from 3.4.1 to 4.1.0
    * Bump @types/node from 20.12.12 to 20.14.9
    * Bump @types/validator from 13.11.10 to 13.12.0
    * Bump @typescript-eslint/eslint-plugin from 7.11.0 to 7.15.0
    * Bump @typescript-eslint/parser from 7.11.0 to 7.15.0
    * Bump @vitejs/plugin-react from 4.3.0 to 4.3.1
    * Bump react-router-dom from 6.23.1 to 6.24.1
    * Bump stylelint-config-standard from 36.0.0 to 36.0.1
    * Bump vite from 5.2.12 to 5.3.3
* Mobile App:
    * Bump @react-navigation/drawer from 6.6.15 to 6.7.0
    * Bump @react-navigation/native-stack from 6.9.26 to 6.10.0
    * Bump @react-navigation/stack from 6.3.29 to 6.4.0
    * Bump @types/validator from 13.11.10 to 13.12.0
    * Bump axios-retry from 4.3.0 to 4.4.1
    * Bump expo from 51.0.9 to 51.0.18
    * Bump expo-asset from 10.0.6 to 10.0.10
    * Bump expo-image-picker from 15.0.5 to 15.0.7
    * Bump expo-notifications from 0.28.4 to 0.28.9
    * Bump expo-splash-screen from 0.27.4 to 0.27.5
    * Bump expo-updates from 0.25.15 to 0.25.18
    * Bump react-native from 0.74.1 to 0.74.3
    * Bump react-native-gesture-handler from 2.16.2 to 2.16.1
    * Bump @babel/core from 7.24.6 to 7.24.7
    * Bump @typescript-eslint/eslint-plugin from 7.11.0 to 7.15.0
    * Bump @typescript-eslint/parser from 7.11.0 to 7.15.0
    * Bump eslint-plugin-react from 7.34.2 to 7.34.3

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.4...v3.5

### Assets
- [movinin-3.5.apk](https://github.com/aelassas/movinin/releases/download/v3.5/movinin-3.5.apk) (80.25 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.5/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.5)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.5)

## [Movin' In 3.4](https://github.com/aelassas/movinin/releases/tag/v3.4) – 2024-05-29

* Migrate from craco to vite
* Added property sort by daily price
* Added `MI_DB_SERVER_SIDE_JAVASCRIPT` setting to *api/.env*
* Added `VITE_MI_CURRENCY` and `VITE_MI_SET_LANGUAGE_FROM_IP` settings to *frontend/.env*
* Updated backend and frontend components
* Fix layout issues in the backend and the frontend
* Fix some queries in API
* API:
    * Bump @babel/cli from 7.24.5 to 7.24.6
    * Bump @babel/core from 7.24.5 to 7.24.6
    * Bump @babel/plugin-transform-modules-commonjs from 7.24.1 to 7.24.6
    * Bump @babel/preset-env from 7.24.5 to 7.24.6
    * Bump @babel/preset-typescript from 7.24.1 to 7.24.6
    * Bump @typescript-eslint/eslint-plugin from 7.9.0 to 7.10.0
    * Bump @typescript-eslint/parser from 7.9.0 to 7.10.0
    * Bump nodemon from 3.1.0 to 3.1.1
    * Bump stripe from 15.7.0 to 15.8.0
    * Bump tsx from 4.10.4 to 4.11.0
* Backend and frontend:
    * Bump @stripe/stripe-js from 3.4.0 to 3.4.1
    * Bump @types/react from 18.2.66 to 18.3.3
    * Bump @types/react-dom from 18.2.22 to 18.3.0
    * Bump @typescript-eslint/eslint-plugin from 7.2.0 to 7.10.0
    * Bump @typescript-eslint/parser from 7.2.0 to 7.10.0
    * Bump @vitejs/plugin-react from 4.2.1 to 4.3.0
    * Bump axios from 1.6.8 to 1.7.2
    * Bump eslint-plugin-react-hooks from 4.6.0 to 4.6.2
    * Bump eslint-plugin-react-refresh from 0.4.6 to 0.4.7
    * Bump react from 18.2.0 to 18.3.1
    * Bump react-dom from 18.2.0 to 18.3.1
    * Bump stylelint from 16.5.0 to 16.6.0
* Mobile App:
    * Bump axios from 1.6.8 to 1.7.2
    * Bump axios-retry from 4.2.0 to 4.3.0
    * Bump expo from 51.0.8 to 51.0.9
    * Bump @babel/core from 7.24.5 to 7.24.6
    * Bump @typescript-eslint/eslint-plugin from 7.9.0 to 7.10.0
    * Bump @typescript-eslint/parser from 7.9.0 to 7.10.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.3...v3.4

### Assets
- [movinin-3.4.apk](https://github.com/aelassas/movinin/releases/download/v3.4/movinin-3.4.apk) (80.20 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.4/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.4)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.4)

## [Movin' In 3.3](https://github.com/aelassas/movinin/releases/tag/v3.3) – 2024-05-18

* Upgrade to Google reCAPTCHA v3
* Fix checkout issues
* Fix image issues in mobile app
* Fix rendering issue of property's description in mobile app
* API:
    * Bump @types/node from 20.12.11 to 20.12.12
    * Bump @types/validator from 13.11.9 to 13.11.10
    * Bump @typescript-eslint/eslint-plugin from 7.8.0 to 7.9.0
    * Bump @typescript-eslint/parser from 7.8.0 to 7.9.0
    * Bump mongoose from 8.3.4 to 8.4.0
    * Bump rimraf from 5.0.5 to 5.0.7
    * Bump stripe from 15.6.0 to 15.7.0
    * Bump tsx from 4.9.4 to 4.10.4
* Backend and frontend:
    * Bump @mui/icons-material from 5.15.17 to 5.15.18
    * Bump @mui/material from 5.15.17 to 5.15.18
    * Bump @mui/x-data-grid from 7.3.2 to 7.5.0
    * Bump @mui/x-date-pickers from 7.3.2 to 7.5.0
    * Bump @types/node from 20.12.11 to 20.12.12
    * Bump @types/react from 18.3.1 to 18.3.2
    * Bump @types/validator from 13.11.9 to 13.11.10
    * Bump react-router-dom from 6.23.0 to 6.23.1
* Mobile App:
    * Bump @react-native-community/datetimepicker from 7.7.0 to 8.0.1
    * Bump @types/validator from 13.11.9 to 13.11.10
    * Bump axios-retry from 4.1.0 to 4.2.0
    * Bump expo from 51.0.2 to 51.0.8
    * Bump expo-image-picker from 15.0.4 to 15.0.5
    * Bump expo-notifications from 0.28.1 to 0.28.3
    * Bump expo-updates from 0.25.11 to 0.25.14
    * Bump react-native-root-toast from 3.5.1 to 3.6.0
    * Bump @typescript-eslint/eslint-plugin from 7.8.0 to 7.9.0
    * Bump @typescript-eslint/parser from 7.8.0 to 7.9.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.2...v3.3

### Assets
- [movinin-3.3.apk](https://github.com/aelassas/movinin/releases/download/v3.3/movinin-3.3.apk) (80.19 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.3/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.3)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.3)

## [Movin' In 3.2](https://github.com/aelassas/movinin/releases/tag/v3.2) – 2024-05-14

* Upgrade to Expo SDK 51
* Fix checkout issues
* Fix Stripe issues
* Fix Safari issues
* Fix notification issues
* API:
    * Bump @types/node from 20.12.10 to 20.12.11
    * Bump expo-server-sdk from 3.9.0 to 3.10.0
    * Bump stripe from 15.5.0 to 15.6.0
    * Bump tsx from 4.9.3 to 4.9.4
    * Bump validator from 13.11.0 to 13.12.0
* Backend and frontend:
    * Bump @mui/icons-material from 5.15.16 to 5.15.17
    * Bump @mui/material from 5.15.16 to 5.15.17
    * Bump @types/node from 20.12.10 to 20.12.11
    * Bump validator from 13.11.0 to 13.12.0
* Mobile app:
    * Bump @react-native-async-storage/async-storage from 1.21.0 to 1.23.1
    * Bump @react-native-community/datetimepicker from 7.6.1 to 7.7.0
    * Bump expo from 50.0.17 to 51.0.2
    * Bump expo-asset from 9.0.2 to 10.0.6
    * Bump expo-constants from 15.4.6 to 16.0.1
    * Bump expo-device from 5.9.4 to 6.0.2
    * Bump expo-image-picker from 14.7.1 to 15.0.4
    * Bump expo-localization from 14.8.4 to 15.0.3
    * Bump expo-notifications from 0.27.7 to 0.28.1
    * Bump expo-splash-screen from 0.26.5 to 0.27.4
    * Bump expo-status-bar from 1.11.1 to 1.12.1
    * Bump expo-updates from 0.24.12 to 0.25.11
    * Bump react-native from 0.73.6 to 0.74.1
    * Bump react-native-gesture-handler from 2.14.0 to 2.16.2
    * Bump react-native-reanimated from 3.6.2 to 3.10.1
    * Bump react-native-safe-area-context from 4.8.2 to 4.10.1
    * Bump react-native-screens from 3.29.0 to 3.31.1
    * Bump validator from 13.11.0 to 13.12.0
    * Bump @stripe/stripe-react-native from 0.35.1 to 0.37.2
    * Bump @types/react from 18.2.45 to 18.2.79
    * Bump typescript from 5.4.5 to 5.3.3

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.1...v3.2

### Assets
- [movinin-3.2.apk](https://github.com/aelassas/movinin/releases/download/v3.2/movinin-3.2.apk) (80.30 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.2/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.2)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.2)

## [Movin' In 3.1](https://github.com/aelassas/movinin/releases/tag/v3.1) – 2024-05-07

* Added Google Pay and Apple Pay to mobile app
* Added `REACT_APP_BC_STRIPE_CURRENCY_CODE` setting to the frontend
* Added `MI_STRIPE_COUNTRY_CODE` and `MI_STRIPE_CURRENCY_CODE` to the mobile app
* API:
    * Bump @types/node from 20.12.8 to 20.12.10
    * Bump mongoose from 8.3.3 to 8.3.4
    * Bump stripe from 15.4.0 to 15.5.0
    * Bump tsx from 4.8.2 to 4.9.3
* Backend and frontend:
    * Bump @types/node from 20.12.8 to 20.12.10

**Full Changelog**: https://github.com/aelassas/movinin/compare/v3.0...v3.1

### Assets
- [movinin-3.1.apk](https://github.com/aelassas/movinin/releases/download/v3.1/movinin-3.1.apk) (78.50 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.1/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.1)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.1)

## [Movin' In 3.0](https://github.com/aelassas/movinin/releases/tag/v3.0) – 2024-05-03

* Fixed push notifications issues in Android app related to FCM V1
* Fixed some issues in `DateTimePicker` component
* Fixed some issues in api related to sign up and logging
* CSS cleanup
* API:
    * Bump @types/node from 20.12.7 to 20.12.8
    * Bump @types/nodemailer from 6.4.14 to 6.4.15
    * Bump tsx from 4.7.3 to 4.8.2
* Backend and frontend:
    * Bump @mui/icons-material from 5.15.15 to 5.15.16
    * Bump @mui/material from 5.15.15 to 5.15.16
    * Bump @mui/x-data-grid from 7.3.1 to 7.3.2
    * Bump @mui/x-date-pickers from 7.3.1 to 7.3.2
    * Bump @types/node from 20.12.7 to 20.12.8
    * Bump stylelint from 16.4.0 to 16.5.0
* Mobile app:
    * Bump mime from 4.0.1 to 4.0.3
    * Bump react-native-vector-icons from 10.0.3 to 10.1.0
    * Bump @babel/core from 7.24.4 to 7.24.5
    * Bump @types/react from 18.2.79 to 18.2.45
    * Bump @typescript-eslint/eslint-plugin from 7.7.1 to 7.8.0
    * Bump @typescript-eslint/parser from 7.7.1 to 7.8.0
    * Bump eslint-plugin-react-hooks from 4.6.2 to 4.6.2
    * Bump npm-check-updates from 16.14.20 to 16.14.20

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.9...v3.0

### Assets
- [movinin-3.0.apk](https://github.com/aelassas/movinin/releases/download/v3.0/movinin-3.0.apk) (78.50 MB)
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v3.0/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v3.0)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v3.0)

## [Movin' In 2.9](https://github.com/aelassas/movinin/releases/tag/v2.9) – 2024-04-30

* Added all active Stripe Payment methods to the frontend
* Updated Stripe Payment integration in the backend, the frontend and the mobile app
* Updated unit tests
* Fixed jest and babel issues
* Fixed TTL indexing issues
* Fixed some issues in unit tests
* API:
    * Bump @babel/cli from 7.24.1 to 7.24.5
    * Bump @babel/core from 7.24.4 to 7.24.5
    * Bump @babel/preset-env from 7.24.4 to 7.24.5
    * Bump @typescript-eslint/eslint-plugin from 7.7.1 to 7.8.0
    * Bump @typescript-eslint/parser from 7.7.1 to 7.8.0
    * Bump mongoose from 8.3.2 to 8.3.3

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.8...v2.9

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.9/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.9)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.9)

## [Movin' In 2.8](https://github.com/aelassas/movinin/releases/tag/v2.8) – 2024-04-27

* Added [stripe payment gateway](https://github.com/aelassas/bookcars/wiki/Setup-Stripe)
* Fixed some issues in mobile layout
* API:
    * Bump npm-check-updates from 16.14.18 to 16.14.20
    * Bump supertest from 6.3.4 to 7.0.0
    * Bump tsx from 4.7.2 to 4.7.3
* Backend and frontend:
    * Bump @mui/x-data-grid from 7.3.0 to 7.3.1
    * Bump @mui/x-date-pickers from 7.2.0 to 7.3.1
    * Bump @types/react from 18.2.79 to 18.3.1
    * Bump @types/react-dom from 18.2.25 to 18.3.0
    * Bump npm-check-updates from 16.14.18 to 16.14.20
    * Bump react from 18.2.0 to 18.3.1
    * Bump react-dom from 18.2.0 to 18.3.1    
* Mobile App:
    * Bump expo-splash-screen from 0.26.4 0.26.5

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.7...v2.8

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.8/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.8)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.8)

## [Movin' In 2.7](https://github.com/aelassas/movinin/releases/tag/v2.7) – 2024-04-24

* Fixed some issues in `BookingList`, `DatePicker` and `DateTimePicker` components
* Fixed some issues in `Bookings` and `User` pages
* Updated mobile layout
* API:
    * Bump @typescript-eslint/eslint-plugin from 7.7.0 to 7.7.1
    * Bump @typescript-eslint/parser from 7.7.0 to 7.7.1
* Backend and frontend:
    * Bump react-router-dom from 6.22.3 to 6.23.0
    * Bump stylelint from 16.3.1 to 16.4.0
* Mobile app:
    * Bump @typescript-eslint/eslint-plugin from 7.7.0 to 7.7.1
    * Bump @typescript-eslint/parser from 7.7.0 to 7.7.1

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.6...v2.7

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.7/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.7)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.7)

## [Movin' In 2.6](https://github.com/aelassas/movinin/releases/tag/v2.6) – 2024-04-18

* Updated currency and price formats
* Fixed some issues related to `BookingList` and `MultipleSelect` components
* Fixed date and time issues
* Fixed some issues related mobile app local build
* API:
    * Bump @typescript-eslint/eslint-plugin from 7.6.0 to 7.7.0
    * Bump @typescript-eslint/parser from 7.6.0 to 7.7.0
    * Bump babel-plugin-module-resolver from 5.0.0 to 5.0.2
* Backend and frontend:
    * Bump @mui/x-data-grid from 7.1.1 to 7.3.0
    * Bump @mui/x-date-pickers from 7.1.1 to 7.2.0
    * Bump @types/react from 18.2.77 to 18.2.79
    * Bump date-fns from 2.25.0 to 2.29.3
* Mobile App:
    * Bump babel-plugin-module-resolver from 5.0.0 to 5.0.2
    * Bump expo from 50.0.15 to 50.0.17
    * Bump expo-constants from 15.4.5 to 15.4.6
    * Bump expo-device from 5.9.3 to 5.9.4
    * Bump expo-localization from 14.8.3 to 14.8.4
    * Bump expo-notifications from 0.27.6 to 0.27.7
    * Bump @types/react from 18.2.77 to 18.2.79
    * Bump @typescript-eslint/eslint-plugin from 7.6.0 to 7.7.0
    * Bump @typescript-eslint/parser from 7.6.0 to 7.7.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.5...v2.6

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.6/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.6)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.6)

## [Movin' In 2.5](https://github.com/aelassas/movinin/releases/tag/v2.5) – 2024-04-13

* Added winston logging to the API
* Added React Context to the backend, the frontend and the mobile app
* Updated Notifications page
* Updated `AgencyList` and `LocationList` components
* Updated packages
* General cleanup and under the hood updates
* API:
    * Bump @types/node from 20.12.4 to 20.12.7
    * Bump @typescript-eslint/eslint-plugin from 7.5.0 to 7.6.0
    * Bump @typescript-eslint/parser from 7.5.0 to 7.6.0
    * Bump mongoose from 8.3.0 to 8.3.1
    * Bump typescript from 5.4.4 to 5.4.5
* Backend and frontend:
    * Bump @types/node from 20.12.4 to 20.12.7
    * Bump @types/react from 18.2.74 to 18.2.77
    * Bump @types/react-dom from 18.2.24 to 18.2.25
* Mobile App:
    * Bump expo from 50.0.14 to 50.0.15
    * Bump @types/react from 18.2.74 to 18.2.77
    * Bump @typescript-eslint/eslint-plugin from 7.5.0 to 7.6.0
    * Bump @typescript-eslint/parser from 7.5.0 to 7.6.0
    * Bump typescript from 5.4.4 to 5.4.5

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.4...v2.5

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.5/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.5)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.5)

## [Movin' In 2.4](https://github.com/aelassas/movinin/releases/tag/v2.4) – 2024-04-05

* Added `stylelint` scripts
* Updated home, search, property and checkout pages
* Updated `BookingList`, `UserList`, `DatePicker` and `DateTimePicker` components
* Updated CI workflows
* Fixed CSS issues
* API:
    * Bump @babel/cli from 7.23.9 to 7.24.1
    * Bump @babel/core from 7.24.0 to 7.24.4
    * Bump @babel/plugin-transform-modules-commonjs from 7.23.3 to 7.24.1
    * Bump @babel/preset-env from 7.24.0 to 7.24.4
    * Bump @babel/preset-typescript from 7.23.3 to 7.24.1
    * Bump @types/node from 20.11.28 to 20.12.4
    * Bump @typescript-eslint/eslint-plugin from 7.2.0 to 7.5.0
    * Bump @typescript-eslint/parser from 7.2.0 to 7.5.0
    * Bump expo-server-sdk from 3.7.0 to 3.9.0
    * Bump express from 4.18.3 to 4.19.2
    * Bump mongoose from 8.2.2 to 8.3.0
    * Bump nodemailer from 6.9.12 to 6.9.13
    * Bump npm-check-updates from 16.14.17 to 16.14.18
    * Bump tsx from 4.7.1 to 4.7.2
    * Bump typescript from 5.4.2 to 5.4.4
* Backend and frontend:
    * Bump @emotion/styled from 11.11.0 to 11.11.5
    * Bump @mui/icons-material from 5.15.13 to 5.15.15
    * Bump @mui/material from 5.15.13 to 5.15.15
    * Bump @mui/x-data-grid from 6.19.6 to 7.1.1
    * Bump @mui/x-date-pickers from 6.19.7 to 7.1.1
    * Bump @types/node from 20.11.28 to 20.12.4
    * Bump @types/react from 18.2.67 to 18.2.74
    * Bump @types/react-dom from 18.2.22 to 18.2.24
    * Bump npm-check-updates from 16.14.17 to 16.14.18
    * Bump stylelint from 16.2.1 to 16.3.1
* Mobile App:
    * Bump @react-navigation/drawer from 6.6.14 to 6.6.15
    * Bump @react-navigation/native from 6.1.16 to 6.6.17
    * Bump @react-navigation/native-stack from 6.9.25 to 6.6.26
    * Bump @react-navigation/stack from 6.3.28 to 6.6.29
    * Bump axios-retry from 4.0.0 to 4.1.0
    * Bump expo from 50.0.13 to 50.0.14
    * Bump react-native from 0.73.5 to 0.73.6
    * Bump @babel/core from 7.24.0 to 7.24.4
    * Bump @types/react from 18.2.67 to 18.2.74
    * Bump @typescript-eslint/eslint-plugin from 7.2.0 to 7.5.0
    * Bump @typescript-eslint/parser from 7.2.0 to 7.5.0
    * Bump typescript from 5.4.2 to 5.4.4

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.3...v2.4

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.4/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.4)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.4)

## [Movin' In 2.3](https://github.com/aelassas/movinin/releases/tag/v2.3) – 2024-03-18

* Reached 100% code coverage in the API
* Upgrade to TypeScript 5.4
* Fix an issue in checkout process
* Fix an issue related to removing additional property images
* Under the hood updates
* API:
    * Bump @types/cookie-parser from 1.4.6 to 1.4.7
    * Bump @types/node from 20.11.24 to 20.11.28
    * Bump @typescript-eslint/eslint-plugin from 7.1.0 to 7.2.0
    * Bump @typescript-eslint/parser from 7.1.0 to 7.2.0
    * Bump mongoose from 8.2.0 to 8.2.2
    * Bump nodemailer from 6.9.11 to 6.9.12
    * Bump typescript from 5.3.3 to 5.4.2
    * Bump npm-check-updates from 16.14.15 to 16.14.17
* Backend and frontend:
    * Bump @mui/icons-material from 5.15.11 to 5.15.13
    * Bump @mui/material from 5.15.11 to 5.15.13
    * Bump @mui/x-data-grid from 6.19.5 to 6.19.6
    * Bump @mui/x-date-pickers from 6.19.5 to 6.19.7
    * Bump @types/node from 20.11.24 to 20.11.28
    * Bump @types/react from 18.2.61 to 18.2.67
    * Bump @types/react-dom from 18.2.19 to 18.2.22
    * Bump axios from 1.6.7 to 1.6.8
    * Bump npm-check-updates from 16.14.15 to 16.14.17
    * Bump react-router-dom from 6.22.2 to 6.22.3
    * Bump react-toastify from 10.0.4 to 10.0.5
* Mobile App:
    * Bump @react-navigation/drawer from 6.6.11 to 6.6.14
    * Bump @react-navigation/native from 6.1.14 to 6.6.16
    * Bump @react-navigation/native-stack from 6.9.22 to 6.9.25
    * Bump @react-navigation/stack from 6.3.25 to 6.3.28
    * Bump axios from 1.6.7 to 1.6.8
    * Bump date-fns from 3.3.1 to 3.6.0
    * Bump expo from 50.0.8 to 50.0.13
    * Bump expo-updates from 0.24.11 to 0.24.12
    * Bump react-native from 0.73.4 to 0.73.5
    * Bump @types/react from 18.2.61 to 18.2.67
    * Bump @typescript-eslint/eslint-plugin from 7.1.0 to 7.2.0
    * Bump @typescript-eslint/parser from 7.1.0 to 7.2.0
    * Bump eslint-plugin-react from 7.33.2 to 7.34.1
    * Bump typescript from 5.3.3 to 5.4.2

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.2...v2.3

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.3/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.3)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.3)

## [Movin' In 2.2](https://github.com/aelassas/movinin/releases/tag/v2.2) – 2024-02-29

* Added [unit tests and coverage](https://github.com/aelassas/movinin/wiki/Unit-Tests-and-Coverage)
* Updated eslint presets
* Updated the documentation
* Fix create and update property images
* Fix update avatar in mobile app
* Fix push notification issues
* Fix API issues
* Fix CodeFactor issues
* Fix eslint issues
* API:
    *  Bump @babel/core from 7.23.9 to 7.24.0
    *  Bump @babel/preset-env from 7.23.9 to 7.24.0
    *  Bump @types/jsonwebtoken from 9.0.5 to 9.0.6
    *  Bump @types/node from 20.11.10 to 20.11.24
    *  Bump @types/validator from 13.11.8 to 13.11.9
    *  Bump @typescript-eslint/eslint-plugin from 6.19.1 to 7.1.0
    *  Bump @typescript-eslint/parser from 6.19.1 to 7.1.0
    *  Bump dotenv from 16.4.1 to 16.4.5
    *  Bump eslint from 8.56.0 to 8.57.0
    *  Bump express from 4.18.2 to 4.18.3
    *  Bump mongoose from 8.1.1 to 8.2.0
    *  Bump nodemailer from 6.9.8 to 6.9.11
    *  Bump nodemon from 3.0.3 to 3.1.0
    *  Bump npm-check-updates from 16.14.14 to 16.14.15
    *  Bump tsx from 4.7.0 to 4.7.1
* Backend and frontend:
    * Bump @emotion/react from 11.11.3 to 11.11.4
    * Bump @mui/icons-material from 5.15.6 to 5.15.11
    * Bump @mui/material from 5.15.6 to 5.15.11
    * Bump @mui/x-data-grid from 6.19.2 to 6.19.5
    * Bump @mui/x-date-pickers from 6.19.2 to 6.19.5
    * Bump @types/node from 20.11.10 to 20.11.24
    * Bump @types/react from 18.2.48 to 18.2.61
    * Bump @types/react-dom from 18.2.18 to 18.2.19
    * Bump @types/validator from 13.11.8 to 13.11.9
    * Bump npm-check-updates from 16.14.14 to 16.14.15
    * Bump react-router-dom from 6.21.3 to 6.22.2    
* Mobile App:
    * Bump @react-navigation/drawer from 6.6.6 to 6.6.11
    * Bump @react-navigation/native from 6.1.9 to 6.6.14
    * Bump @react-navigation/native-stack from 6.9.17 to 6.9.22 
    * Bump @react-navigation/stack from 6.3.20 to 6.3.25
    * Bump @types/validator from 13.11.8 to 13.11.9
    * Bump expo from 50.0.4 to 50.0.8
    * Bump expo-updates from 0.24.9 to 0.24.11
    * Bump i18n-js from 4.3.2 to 4.4.3
    * Bump react-native from 0.73.2 to 0.73.10
    * Bump react-native-dotenv from 3.4.9 to 3.4.11
    * Bump react-native-gesture-handler from 2.14.1 to 2.14.0
    * Bump @babel/core from 7.23.9 to 7.24.0
    * Bump @types/react from 18.2.48 to 18.2.61
    * Bump @typescript-eslint/eslint-plugin from 6.19.1 to 7.1.0
    * Bump @typescript-eslint/parser from 6.19.1 to 7.1.0
    * Bump eslint from 8.56.0 to 8.57.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.1...v2.2

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.2/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.2)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.2)

## [Movin' In 2.1](https://github.com/aelassas/movinin/releases/tag/v2.1) – 2024-01-29

* Upgrade to Expo SDK 50
* Fixed `react-toastify` issues
* Fixed Mobile Drawer issues
* API:
    * @babel/cli from 7.23.4 to 7.23.9
    * @babel/preset-env from 7.23.8 to 7.23.9
    * @types/node from 20.10.8 to 20.11.10
    * @types/uuid from 9.0.7 to 9.0.8
    * @typescript-eslint/eslint-plugin from 6.18.1 to 6.19.1
    * @typescript-eslint/parser from 6.18.1 to 6.19.1
    * dotenv from 16.3.1 to 16.4.1
    * mongoose from 8.0.4 to 8.1.1
    * nodemon from 3.0.2 to 3.0.3
    * npm-check-updates from 16.14.12 to 16.14.14
* Backend and frontend:
    * @mui/icons-material from 5.15.3 to 5.15.6
    * @mui/material from 5.15.3 to 5.15.6
    * @mui/x-data-grid from 6.18.7 to 6.19.2
    * @mui/x-date-pickers from 6.18.7 to 6.19.2
    * @types/node from 20.10.8 to 20.11.10
    * @types/react from 18.2.47 to 18.2.48
    * axios from 1.6.5 to 1.6.7
    * npm-check-updates from 16.14.12 to 16.14.14
    * react-router-dom from 6.21.1 to 6.21.3
    * react-toastify from 9.1.3 to 10.0.4
* Mobile App:
    * Bump @react-native-async-storage/async-storage from 1.18.2 to 1.21.0
    * Bump @react-native-community/datetimepicker from 7.2.0 to 7.6.1
    * Bump axios from 1.6.5 to 1.6.7
    * Bump date-fns from 3.2.0 to 3.3.1
    * Bump expo from 49.0.21 to 50.0.4
    * Bump expo-asset from 8.10.1 to 9.0.2
    * Bump expo-constants from 14.4.2 to 15.4.5
    * Bump expo-device from 5.4.0 to 5.9.3
    * Bump expo-image-picker from 14.3.2 to 14.7.1
    * Bump expo-localization from 14.3.0 to 14.8.3
    * Bump expo-notifications from 0.20.1 to 0.27.6
    * Bump expo-splash-screen from 0.20.5 to 0.26.4
    * Bump expo-status-bar from 1.6.0, ~1.11.1
    * Bump expo-updates from 0.18.19 to 0.24.9
    * Bump react-native from 0.72.6 to 0.73.2
    * Bump react-native-gesture-handler from 2.12.0 to 2.14.1
    * Bump react-native-paper from 5.11.7 to 5.12.3
    * Bump react-native-reanimated from 3.3.0 to 3.6.2
    * Bump react-native-safe-area-context from 4.6.3 to 4.8.2
    * Bump react-native-screens from 3.22.0 to 3.29.0
    * Bump @babel/core from 7.23.7 to 7.23.9
    * Bump @types/react from 18.2.47 to 18.2.48
    * Bump @typescript-eslint/eslint-plugin from 6.18.1 to 6.19.1
    * Bump @typescript-eslint/parser from 6.18.1 to 6.19.1

**Full Changelog**: https://github.com/aelassas/movinin/compare/v2.0...v2.1

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.1/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.1)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.1)

## [Movin' In 2.0](https://github.com/aelassas/movinin/releases/tag/v2.0) – 2024-01-10

* Updated Search component
* Replaced `ts-node` by `tsx`
* Fixed permission issues on Android 13 and above
* API:
    * Bump @babel/preset-env from 7.23.6 to 7.23.8
    * Bump @types/node from 20.10.4 to 20.10.8
    * Bump @types/validator from 13.11.7 to 13.11.8
    * Bump @typescript-eslint/eslint-plugin from 6.14.0 to 6.18.1
    * Bump @typescript-eslint/parser from 6.14.0 to 6.18.1
    * Bump eslint from 8.55.0 to 8.56.0
    * Bump eslint-plugin-import from 2.29.0 to 2.29.1
    * Bump mongoose from 8.0.3 to 8.0.4
    * Bump nodemailer from 6.9.7 to 6.9.8
* Backend and frontend:
    * Bump @emotion/react from 11.11.1 to 11.11.3
    * Bump @mui/icons-material from 5.15.0 to 5.15.3
    * Bump @mui/material from 5.15.0 to 5.15.3
    * Bump @mui/x-data-grid from 6.18.5 to 6.18.7
    * Bump @mui/x-date-pickers from 6.18.5 to 6.18.7
    * Bump @types/node from 20.10.4 to 20.10.8
    * Bump @types/react from 18.2.45 to 18.2.47
    * Bump @types/react-dom from 18.2.17 to 18.2.18
    * Bump @types/validator from 13.11.7 to 13.11.8
    * Bump axios from 1.6.2 to 1.6.5
    * Bump date-fns from 2.30.0 to 3.2.0
    * Bump react-router-dom from 6.21.0 to 6.21.1
* Mobile app:
    * Bump @types/validator from 13.11.7 to 13.11.8
    * Bump axios from 1.6.2 to 1.6.5
    * Bump date-fns from 2.30.0 to 3.2.0
    * Bump expo-updates from 0.18.17 to 0.18.19
    * Bump mime from 4.0.0 to 4.0.1
    * Bump react-native-paper from 5.11.4 to 5.11.7
    * Bump react-native-web from 0.19.9 to 0.19.10
    * Bump @babel/core from 7.23.6 to 7.23.7
    * Bump @types/react from 18.2.45 to 18.2.47
    * Bump @typescript-eslint/eslint-plugin from 6.14.0 to 6.18.1
    * Bump @typescript-eslint/parser from 6.14.0 to 6.18.1
    * Bump eslint from 8.55.0 to 8.56.0
    * Bump eslint-plugin-import from 2.29.0 to 2.29.1

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.9...v2.0

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v2.0/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v2.0)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v2.0)

## [Movin' In 1.9](https://github.com/aelassas/movinin/releases/tag/v1.9) – 2023-12-14

* Fixed autocomplete issues
* Fixed TextField clear issues
* Updated dependencies
* API:
    * Bump ts-node from 10.9.1 to 10.9.2
    * Bump @babel/preset-env from 7.23.5 to 7.23.6
    * Bump @types/node from 20.10.2 to 20.10.4
    * Bump @typescript-eslint/eslint-plugin from 6.13.1 to 6.14.0
    * Bump @typescript-eslint/parser from 6.13.1 to 6.14.0
    * Bump mongoose from 8.0.2 to 8.0.3
    * Bump npm-check-updates from 16.14.11 to 16.14.12
    * Bump typescript from 5.3.2 to 5.3.3
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.19 to 5.15.0
    * Bump @mui/material from 5.14.19 to 5.15.0
    * Bump @mui/x-data-grid from 6.18.2 to 6.18.5
    * Bump @mui/x-date-pickers from 6.18.2 to 6.18.5
    * Bump @types/node from 20.10.2 to 20.10.4
    * Bump @types/react from 18.2.41 to 18.2.45
    * Bump npm-check-updates from 16.14.11 to 16.14.12
    * Bump react-router-dom from 6.20.1 to 6.21.0
* Mobile app:
    * Bump react-native-paper from 5.11.3 to 5.11.4
    * Bump react-native-vector-icons from 10.0.2 to 10.0.3
    * Bump @babel/core from 7.23.5 to 7.23.6
    * Bump @types/react from 18.2.41 to 18.2.45
    * Bump @typescript-eslint/eslint-plugin from 6.13.1 to 6.14.0
    * Bump @typescript-eslint/parser from 6.13.1 to 6.14.0
    * Bump typescript from 5.3.2 to 5.3.3

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.8...v1.9

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.9/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.9)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.9)

## [Movin' In 1.8](https://github.com/aelassas/movinin/releases/tag/v1.8) – 2023-12-03

* Upgrade to TypeScript 5.3
* API:
    * Bump @babel/cli from 7.23.0 to 7.23.4
    * Bump @babel/preset-env from 7.23.3 to 7.23.5
    * Bump @types/cors from 2.8.16 to 2.8.17
    * Bump @types/multer from 1.4.10 to 1.4.11
    * Bump @types/node from 20.9.1 to 20.10.2
    * Bump @types/validafromr from 13.11.6 to 13.11.7
    * Bump @typescript-eslint/eslint-plugin from 6.11.0 to 6.13.1
    * Bump @typescript-eslint/parser from 6.11.0 to 6.13.1
    * Bump eslint from 8.54.0 to 8.55.0
    * Bump mongoose from 8.0.1 to 8.0.2
    * Bump nodemon from 3.0.1 to 3.0.2
    * Bump npm-check-updates from 16.14.6 to 16.14.11
    * Bump typescript from 5.2.2 to 5.3.2
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.18 to 5.14.19
    * Bump @mui/material from 5.14.18 to 5.14.19
    * Bump @mui/x-data-grid from 6.18.1 to 6.18.2
    * Bump @mui/x-date-pickers from 6.18.1 to 6.18.2
    * Bump @types/node from 20.9.1 to 20.10.2
    * Bump @types/react from 18.2.37 to 18.2.41
    * Bump @types/react-dom from 18.2.15 to 18.2.17
    * Bump @types/validator from 13.11.6 to 13.11.7
    * Bump npm-check-updates from 16.14.6 to 16.14.11
    * Bump react-router-dom from 6.19.0 to 6.20.1
* Mobile app:
    * Bump @types/validator from 13.11.6 to 13.11.7
    * Bump axios-retry from 3.9.1 to 4.0.0
    * Bump expo from 49.0.19 to 49.0.21
    * Bump mime from 3.0.0 to 4.0.0
    * Bump react-native-paper from 5.11.1 to 5.11.3
    * Bump @babel/core from 7.23.3 to 7.23.5
    * Bump @types/react from 8.2.37 to 18.2.41
    * Bump @typescript-eslint/eslint-plugin from 6.11.0 to 6.13.1
    * Bump @typescript-eslint/parser from 6.11.0 to 6.13.1
    * Bump eslint from 8.54.0 to 8.55.0
    * Bump typescript from 5.2.2 to 5.3.2

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.7...v1.8

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.8/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.8)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.8)

## [Movin' In 1.7](https://github.com/aelassas/movinin/releases/tag/v1.7) – 2023-11-18

* Updated MongoDB queries
* Updated nodemon configuration
* Updated dependencies
* API:
    * Bump @babel/preset-env from 7.23.2 to 7.23.3
    * Bump @types/bcrypt from 5.0.1 to 5.0.2
    * Bump @types/compression from 1.7.4 to 1.7.5
    * Bump @types/cookie-parser from 1.4.5 to 1.4.6
    * Bump @types/cors from 2.8.15 to 2.8.16
    * Bump @types/express from 4.17.20 to 4.17.21
    * Bump @types/jsonwebtoken from 9.0.4 to 9.0.5
    * Bump @types/multer from 1.4.9 to 1.4.10
    * Bump @types/node from 20.8.10 to 20.9.1
    * Bump @types/nodemailer from 6.4.13 to 6.4.14
    * Bump @types/uuid from 9.0.6 to 9.0.7
    * Bump @types/validator from 13.11.5 to 13.11.6
    * Bump @typescript-eslint/eslint-plugin from 6.9.1 to 6.11.0
    * Bump @typescript-eslint/parser from 6.9.1 to 6.11.0
    * Bump eslint from 8.52.0 to 8.54.0
    * Bump helmet from 7.0.0 to 7.1.0
    * Bump mongoose from 8.0.0 to 8.0.1
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.16 to 5.14.18
    * Bump @mui/material from 5.14.16 to 5.14.18
    * Bump @mui/x-data-grid from 6.17.0 to 6.18.1
    * Bump @mui/x-date-pickers from 6.17.0 to 6.18.1
    * Bump @types/draftjs-to-html from 0.8.3 to 0.8.4
    * Bump @types/html-to-draftjs from 1.4.2 to 1.4.3
    * Bump @types/node from 20.8.10 to 20.9.1
    * Bump @types/react from 18.2.34 to 18.2.37
    * Bump @types/react-dom from 18.2.14 to 18.2.15
    * Bump @types/react-draft-wysiwyg from 1.13.6 to 1.13.7
    * Bump @types/validator from 13.11.5 to 13.11.6
    * Bump axios from 1.6.0 to 1.6.2
    * Bump react-router-dom from 6.18.0 to 6.19.0
* Mobile app:
    * Bump @react-navigation/native-stack from 6.9.16 to 6.9.17
    * Bump @types/lodash.debounce from 4.0.8 to 4.0.9
    * Bump @types/mime from 3.0.3 to 3.0.4
    * Bump @types/react-native-dotenv from 0.2.1 to 0.2.2
    * Bump @types/react-native-vector-icons from 6.4.16 to 6.4.18
    * Bump @types/validator from 13.11.5 to 13.11.6
    * Bump axios from 1.6.0 to 1.6.2
    * Bump axios-retry from 3.8.1 to 3.9.1
    * Bump expo from 49.0.16 to 49.0.19
    * Bump react-native-vector-icons from 10.0.1 to 10.0.2
    * Bump @babel/core from 7.23.2 to 7.23.3
    * Bump @types/react from 18.2.34 to 18.2.37
    * Bump @typescript-eslint/eslint-plugin from 6.9.1 to 6.11.0
    * Bump @typescript-eslint/parser from 6.9.1 to 6.11.0
    * Bump eslint from 8.52.0 to 8.54.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.6...v1.7

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.7/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.7)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.7)

## [Movin' In 1.6](https://github.com/aelassas/movinin/releases/tag/v1.6) – 2023-11-02

* Added Babel transcompiler to api
* Updated eslint preset
* Updated backend, frontend and mobile components
* Updated documentation
* Updated dependencies
* API:
    * Bump @types/bcrypt from 5.0.0 to 5.0.1
    * Bump @types/compression from 1.7.3 to 1.7.4
    * Bump @types/cookie-parser from 1.4.4 to 1.4.5
    * Bump @types/cors from 2.8.14 to 2.8.15
    * Bump @types/express from 4.17.19 to 4.17.20
    * Bump @types/jsonwebtoken from 9.0.3 to 9.0.4
    * Bump @types/multer from 1.4.8 to 1.4.9
    * Bump @types/node from 20.8.6 to 20.8.10
    * Bump @types/nodemailer from 6.4.11 to 6.4.13
    * Bump @types/uuid from 9.0.5 to 9.0.6
    * Bump @types/validator from 13.11.3 to 13.11.5
    * Bump @typescript-eslint/eslint-plugin from 6.7.5 to 6.9.1
    * Bump @typescript-eslint/parser from 6.7.5 to 6.9.1
    * Bump eslint from 8.51.0 to 8.52.0
    * Bump eslint-plugin-import from 2.28.1 to 2.29.0
    * Bump mongoose from 7.6.2 to 8.0.0
    * Bump nodemailer from 6.9.6 to 6.9.7
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.13 to 5.14.16
    * Bump @mui/material from 5.14.13 to 5.14.16
    * Bump @mui/x-data-grid from 6.16.2 to 6.17.0
    * Bump @mui/x-date-pickers from 6.16.2 to 6.17.0
    * Bump @types/node from 20.8.6 to 20.8.10
    * Bump @types/react from 18.2.28 to 18.2.34
    * Bump @types/react-dom from 18.2.13 to 18.2.14
    * Bump @types/validator from 13.11.3 to 13.11.5
    * Bump axios from 1.5.1 to 1.6.0
    * Bump react-router-dom from 6.16.0 to 6.18.0
* Mobile app:
    * Bump @react-navigation/drawer from 6.6.4 to 6.6.6
    * Bump @react-navigation/native from 6.1.8 to 6.1.9
    * Bump @react-navigation/native-stack from 6.9.14 to 6.9.16
    * Bump @react-navigation/stack from 6.3.18 to 6.3.20
    * Bump @types/lodash.debounce from 4.0.7 to 4.0.8
    * Bump @types/mime from 3.0.2 to 3.0.3
    * Bump @types/react-native-dotenv from 0.2.0 to 0.2.1
    * Bump @types/react-native-vector-icons from 6.4.15 to 6.4.16
    * Bump @types/validator from 13.11.3 to 13.11.5
    * Bump axios from 1.5.1 to 1.6.0
    * Bump axios-retry from 3.8.0 to 3.8.1
    * Bump expo from 49.0.13 to 49.0.16
    * Bump expo-updates from 0.18.16 to 0.18.17
    * Bump react-native from 0.72.5 to 0.72.6
    * Bump react-native-paper from 5.10.6 to 5.11.1
    * Bump react-native-vector-icons from 10.0.0 to 10.0.1
    * Bump @types/react from 18.2.28 to 18.2.34
    * Bump @typescript-eslint/eslint-plugin from 6.7.5 to 6.9.1
    * Bump @typescript-eslint/parser from 6.7.5 to 6.9.1
    * Bump eslint from 8.51.0 to 8.52.0
    * Bump eslint-plugin-import from 2.28.1 to 2.29.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.5...v1.6

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.6/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.6)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.6)

## [Movin' In 1.5](https://github.com/aelassas/movinin/releases/tag/v1.5) – 2023-10-14

* Added `cors` and `allowedMethods` middlewares
* Fixed some issues related to bookings
* API:
    * Bump @types/express from 4.17.18 to 4.17.19
    * Bump @types/node from 20.8.3 to 20.8.6
    * Bump @types/validator from 13.11.2 to 13.11.3
    * Bump @typescript-eslint/eslint-plugin from 6.7.4 to 6.7.5
    * Bump @typescript-eslint/parser from 6.7.4 to 6.7.5
    * Bump mongoose from 7.6.0 to 7.6.2
    * Bump nodemailer from 6.9.5 to 6.9.6
    * Bump npm-check-updates from 16.14.5 to 16.14.6
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.12 to 5.14.13
    * Bump @mui/material from 5.14.12 to 5.14.13
    * Bump @mui/x-data-grid from 6.16.1 to 6.16.2
    * Bump @mui/x-date-pickers from 6.16.1 to 6.16.2
    * Bump @types/node from 20.8.3 to 20.8.6
    * Bump @types/react from 18.2.25 to 18.2.28
    * Bump @types/react-dom from 18.2.11 to 18.2.13
    * Bump @types/validator from 13.11.2 to 13.11.3
    * Bump npm-check-updates from 16.14.5 to 16.14.6
* Mobile app:
    * Bump @babel/core from 7.23.0 to 7.23.2
    * Bump @types/validator from 13.11.2 to 13.11.3
    * Bump @types/react from 18.2.25 to 18.2.28
    * Bump @typescript-eslint/eslint-plugin from 6.7.4 to 6.7.5
    * Bump @typescript-eslint/parser from 6.7.4 to 6.7.5

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.4...v1.5

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.5/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.5)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.5)

## [Movin' In 1.4](https://github.com/aelassas/movinin/releases/tag/v1.4) – 2023-10-09

* Secured the backend and the frontend against XSS, XST, CSRF and MITM
* Updated eslint preset
* Updated dependencies
* Updated documentation
* Updated CI workflows
* Fixed some issues in the mobile app
* Fixed some typos
* API:
    * Bump @types/node from 20.8.2 to 20.8.3
    * Bump @types/uuid from 9.0.4 to 9.0.5
    * Bump eslint from 8.50.0 to 8.51.0
    * Bump mongoose from 7.5.4 to 7.6.0
* Backend and frontend:
    * Bump @types/node from 20.8.2 to 20.8.3
    * Bump @types/react-dom from 18.2.10 to 18.2.11
* Mobile app:
    * Bump eslint from 8.50.0 to 8.51.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.3...v1.4

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.4/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.4)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.4)

## [Movin' In 1.3](https://github.com/aelassas/movinin/releases/tag/v1.3) – 2023-10-06

* Made localization more generic
* Updated language menu color in the mobile app
* Updated eslint preset
* API:
    * Bump mongoose from 7.5.3 to 7.5.4
    * Bump npm-check-updates from 16.14.4 to 16.14.5
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.11 to 5.14.12
    * Bump @mui/material from 5.14.11 to 5.14.12
    * Bump @mui/x-data-grid from 6.16.0 to 6.16.1
    * Bump @mui/x-date-pickers from 6.16.0 to 6.16.1
    * Bump @types/react from 18.2.24 to 18.2.25
    * Bump @types/react-dom from 18.2.8 to 18.2.10
    * Bump npm-check-updates from 16.14.4 to 16.14.5
* Mobile app:
    * Bump expo-updates from 0.18.14 to 0.18.16
    * Bump @types/react from 18.2.24 to 18.2.25

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.2...v1.3

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.3/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.3)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.3)

## [Movin' In 1.2](https://github.com/aelassas/movinin/releases/tag/v1.2) – 2023-10-04

* Added airbnb preset
* Updated deployment scripts and services
* Fixed an issue in properties page
* Fixed other issues in the api, the backend, the frontend and the mobile app
* API:
    * Bump @types/node from 20.8.0 to 20.8.2
    * Bump @typescript-eslint/eslint-plugin from 6.7.3 to 6.7.4
    * Bump @typescript-eslint/parser from 6.7.3 to 6.7.4
* Backend and frontend:
    * Bump @mui/icons-material from 5.14.9 to 5.14.11
    * Bump @mui/material from 5.14.10 to 5.14.11
    * Bump @mui/x-data-grid from 6.15.0 to 6.16.0
    * Bump @mui/x-date-pickers from 6.15.0 to 6.16.0
    * Bump @types/node from 20.6.5 to 20.8.2
    * Bump @types/react from 18.2.22 to 18.2.24
    * Bump @types/react-dom from 18.2.7 to 18.2.8
    * Bump @types/react-draft-wysiwyg from 1.13.4 to 1.13.5
    * Bump @types/validator from 13.11.1 to 13.11.2
    * Bump @types/react-google-recaptcha from 2.1.5 to 2.1.6
    * Bump axios from 1.5.0 to 1.5.1
* Mobile app:
    * Bump expo from 49.0.11 to 49.0.13
    * Bump @types/mime from 3.0.1 to 3.0.2
    * Bump @types/react-native-vector-icons from 6.4.14 to 6.4.15
    * Bump react-native-size-matters from 0.4.0 to 0.4.2
    * Bump @types/react from 18.2.23 to 18.2.24
    * Bump @typescript-eslint/eslint-plugin from 6.7.3 to 6.7.4
    * Bump @typescript-eslint/parser from 6.7.3 to 6.7.4
    * Bump axios from 1.5.0 to 1.5.1

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.1...v1.2

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.2/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.2)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.2)

## [Movin' In 1.1](https://github.com/aelassas/movinin/releases/tag/v1.1) – 2023-09-29

* Added `build:android:preview` and `build:ios:preview` commands
* Added jsdoc to the api, the backend, the frontend and the mobile app
* Updated mobile menu and switch colors
* Upgrade to `node:lts-alpine`
* Fixed some issues related to locations, bookings, users and properties
* Fixed some issues related to dates
* Fixed some issues related to cancellation
* API:
    * Bump mongoose from 7.5.1 to 7.5.2
    * Bump eslint from 8.49.0 to 8.50.0
    * Bump @types/express from 4.17.17 to 4.17.18
    * Bump @types/jsonwebtoken from 9.0.2 to 9.0.3
    * Bump @types/node from 20.6.0 to 20.6.5
    * Bump @types/nodemailer from 6.4.10 to 6.4.11
    * Bump @types/uuid from 9.0.3 to 9.0.4
    * Bump @typescript-eslint/eslint-plugin from 6.7.0 to 6.7.3
    * Bump @typescript-eslint/parser from 6.7.0 to 6.7.3
* Backend and frontend:
    * Bump @mui/material from 5.14.9 to 5.14.
    * Bump @mui/x-data-grid from 6.14.0 to 6.15.0
    * Bump @mui/x-date-pickers from 6.14.0 to 6.15.0
    * Bump @types/draftjs-to-html from 0.8.1 to 0.8.2
    * Bump @types/node from 20.6.2 to 20.6.5
    * Bump @types/react from 18.2.21 to 18.2.22
    * Bump npm-check-updates from 16.14.3 to 16.14.4
* Mobile app:
    * Bump @react-navigation/drawer from 6.6.3 to 6.6.4
    * Bump @react-navigation/native from 6.1.7 to 6.1.8
    * Bump @react-navigation/native-stack from 6.9.13 to 6.9.14
    * Bump @react-navigation/stack from 6.3.17 to 6.3.18
    * Bump axios-retry from 3.7.0 to 3.8.0
    * Bump react-native from 0.72.4 to 0.72.5
    * Bump react-native-paper from 5.10.5 to 5.10.6
    * Bump react-native-web from 0.19.8 to 0.19.9
    * Bump @babel/core from 7.22.20 to 7.23.0
    * Bump @typescript-eslint/eslint-plugin from 6.7.2 to 6.7.3
    * Bump @typescript-eslint/parser from 6.7.2 to 6.7.3
    * Bump eslint from 8.49.0 to 8.50.0

**Full Changelog**: https://github.com/aelassas/movinin/compare/v1.0...v1.1

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.1/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.1)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.1)

## [Movin' In 1.0](https://github.com/aelassas/movinin/releases/tag/v1.0) – 2023-09-20

Initial release

### Assets
- [movinin-db.zip](https://github.com/aelassas/movinin/releases/download/v1.0/movinin-db.zip) (4.02 MB)

### Source Code
- [Source code (zip)](https://api.github.com/repos/aelassas/movinin/zipball/v1.0)
- [Source code (tar)](https://api.github.com/repos/aelassas/movinin/tarball/v1.0)
