[![build](https://github.com/aelassas/movinin/actions/workflows/build.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/build.yml) 
[![test](https://github.com/aelassas/movinin/actions/workflows/test.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/test.yml)
[![codecov](https://img.shields.io/codecov/c/github/aelassas/movinin?label=coverage)](https://codecov.io/gh/aelassas/movinin)
[![live demo](https://img.shields.io/badge/live-demo-brightgreen)](https://movinin.wexdev.com/)
[![docs](https://img.shields.io/badge/docs-wiki-brightgreen)](https://github.com/aelassas/movinin/wiki)

<!--
[![tested with jest](https://img.shields.io/badge/tested_with-jest-brightgreen?logo=jest)](https://github.com/jestjs/jest)
[![docs](https://img.shields.io/badge/docs-wiki-brightgreen)](https://github.com/aelassas/movinin/wiki)
[![live demo](https://img.shields.io/badge/live-demo-brightgreen)](https://movinin.wexdev.com/)
[![loc](https://raw.githubusercontent.com/aelassas/movinin/refs/heads/loc/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/aelassas/movinin/pulls)
[![codecov](https://codecov.io/gh/aelassas/movinin/graph/badge.svg?token=TXD8SM1QHB)](https://codecov.io/gh/aelassas/movinin)
[![codecov](https://img.shields.io/codecov/c/github/aelassas/movinin?label=coverage)](https://codecov.io/gh/aelassas/movinin)
[![coveralls](https://coveralls.io/repos/github/aelassas/movinin/badge.svg?branch=main)](https://coveralls.io/github/aelassas/movinin?branch=main)
[![open-vscode](https://img.shields.io/badge/open-vscode-1f425f.svg)](https://vscode.dev/github/aelassas/movinin/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md)

[![containerize](https://github.com/aelassas/movinin/actions/workflows/containerize.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/containerize.yml)

https://github.com/user-attachments/assets/806cbe2d-9f49-413e-9359-2546306f9653
-->

[![](https://movin-in.github.io/content/cover-1.png)](https://movinin.wexdev.com/)

## Movin' In

Movin' In is an open-source and cross-platform Rental Property Management Platform with an admin panel for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

Movin' In supports both single-agency and multi-agency modes. Agencies have access to an admin panel to manage their properties, customers and bookings, with a property scheduler, flexible time-based availability and automatic email and push notifications. Each newly created agency receives an email prompting them to register and access the system.

The admin panel allows admins to manage agencies, properties, countries, locations, customers, bookings and payments.

Customers can sign up via the frontend or mobile app, browse available properties based on location and date, and complete the booking and payment process seamlessly. Locations are hierarchical, with countries and map integration, so customers can search by broader regions as well as by specific places. Prices are set per rental term (daily, weekly, monthly or yearly) and calculated pro rata for the booked period, with an optional cancellation extra.

Locations are [hierarchical](https://github.com/aelassas/movinin/wiki/Locations), with countries, nested child locations, and a map display.

The platform supports [Stripe and PayPal payment gateways](https://github.com/aelassas/movinin/wiki/Payment-Gateways), allowing you to choose the one best suited for your country or business model. If Stripe isn't available in your region, PayPal serves as a secure and convenient alternative for accepting payments. Customers can pay by credit card, PayPal, Google Pay, Apple Pay, Link or choose to pay later. Prices are stored in a base currency and converted to the customer's currency.

Movin' In supports 8 languages (English, French, Spanish, German, Portuguese, Italian, Chinese, and Japanese) and [134 currencies](https://github.com/aelassas/movinin/wiki/Add-New-Currency), and you can [add a new language](https://github.com/aelassas/movinin/wiki/Add-New-Language) by following the guide. The platform is protected against common web attacks (XSS, CSRF, MITM, and DDoS) and secured with JWT authentication, HttpOnly cookies, TLS encryption, Redis-backed rate limiting, Google reCAPTCHA on public forms, and request validation. It includes error monitoring with [Sentry](https://github.com/aelassas/movinin/wiki/Setup-Sentry), and is easy to deploy with [Docker](https://github.com/aelassas/movinin/wiki/Installing-(Docker)).

## Quick Links
* [Overview](https://github.com/aelassas/movinin/wiki/Overview)  
* [Install Guide (Self-hosted)](https://github.com/aelassas/movinin/wiki/Installing-(Self%E2%80%90hosted))
* [Install Guide (Docker)](https://github.com/aelassas/movinin/wiki/Installing-(Docker))
* [Development Database](https://github.com/aelassas/movinin/wiki/Development-Database)
* [Full Documentation](https://github.com/aelassas/movinin/wiki)

## Stats for Nerds

<!--
[![LoC Prod](https://raw.githubusercontent.com/aelassas/movinin/refs/heads/loc/loc-prod.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml)
[![LoC Tests](https://raw.githubusercontent.com/aelassas/movinin/refs/heads/loc/loc-tests.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml)
-->
[![LoC Total](https://raw.githubusercontent.com/aelassas/movinin/refs/heads/loc/loc-total.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml)

## Support

Movin' In is free and open source. If it helped you, saved you time, or powered your production workflows, consider supporting the project via [PayPal](https://www.paypal.me/aelassaspp), [GitHub Sponsors](https://github.com/sponsors/aelassas), [Liberapay](https://liberapay.com/aelassas/), or [Buy Me a Coffee](https://www.buymeacoffee.com/aelassas) to keep it active, independent, and free for everyone.

<!--
If this project helped you, saved you time, or inspired you, consider supporting its future growth and maintenance. You can show your support by starring the repository, sharing the project, or via [PayPal](https://www.paypal.me/aelassaspp), [GitHub Sponsors](https://github.com/sponsors/aelassas), [Liberapay](https://liberapay.com/aelassas/), or [Buy Me a Coffee](https://www.buymeacoffee.com/aelassas).

Open-source software requires time, effort, and resources to maintain. Your support helps keep this project alive, up-to-date, and accessible to everyone. Every contribution, big or small, makes a difference and motivates continued work on features, bug fixes, and new ideas.
-->

<!--<a href="https://github.com/sponsors/aelassas"><img src="https://aelassas.github.io/content/github-sponsor-button.png" alt="GitHub" width="210"></a>
<a href="https://www.paypal.me/aelassaspp"><img src="https://aelassas.github.io/content/paypal-button-v2.png" alt="PayPal" width="208"></a>
<a href="https://www.buymeacoffee.com/aelassas"><img src="https://aelassas.github.io/content/bmc-button.png" alt="Buy Me A Coffee" width="160"></a>-->

<!--
To contribute code or report issues, please read the [Contribution Guide](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md) to learn about the process, coding standards, and how to submit pull requests.

If you want to customize Movin' In while keeping your fork up to date with the latest changes, check out the [Fork, Customize, and Sync](https://github.com/aelassas/movinin/wiki/Fork,-Customize,-and-Sync) guide in the Wiki.
-->

## Live Demo

| App | URL | Login | Password |
|-----|-----|-------|----------|
| Frontend | https://movinin.wexdev.com/ | `jdoe@movinin.io` | `M00vinin` |
| Admin Panel | https://movinin.wexdev.com:3003/ | `admin@movinin.io` | `M00vinin` |

### Mobile App

Install the Android app on any Android device by scanning the QR code with the Camera app, or by [downloading the APK](https://github.com/aelassas/movinin/releases/download/v7.5/movinin-7.5.apk). Sign in with the frontend login above.

<img alt="QR code to download the Movin' In Android APK" width="120" src="https://github.com/user-attachments/assets/bf2b821f-027c-4add-893c-d947a116f91f">

<details>
<summary>How to install the Mobile App on Android</summary>

* Android 8.0 (API level 26) and higher: open the Install unknown apps system settings screen and allow app installations from the source you are downloading the app from (e.g. your web browser).
* Android 7.1.1 (API level 25) and lower: enable the Unknown sources system setting, found in Settings > Security.

</details>

## License

Movin' In is [MIT licensed](https://github.com/aelassas/movinin/blob/main/LICENSE).
