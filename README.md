[![build](https://github.com/aelassas/movinin/actions/workflows/build.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/build.yml) [![test](https://github.com/aelassas/movinin/actions/workflows/test.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/test.yml) [![coveralls](https://coveralls.io/repos/github/aelassas/movinin/badge.svg?branch=main)](https://coveralls.io/github/aelassas/movinin?branch=main) [![loc](https://raw.githubusercontent.com/aelassas/movinin/refs/heads/loc/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml) [![docs](https://img.shields.io/badge/docs-wiki-brightgreen)](https://github.com/aelassas/movinin/wiki) [![live demo](https://img.shields.io/badge/live-demo-brightgreen)](https://movinin.dynv6.net:3004/)

<!--
[![tested with jest](https://img.shields.io/badge/tested_with-jest-brightgreen?logo=jest)](https://github.com/jestjs/jest)
[![docs](https://img.shields.io/badge/docs-wiki-brightgreen)](https://github.com/aelassas/movinin/wiki)
[![live demo](https://img.shields.io/badge/live-demo-brightgreen)](https://movinin.dynv6.net:3004/)
[![loc](https://raw.githubusercontent.com/aelassas/movinin/refs/heads/loc/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/aelassas/movinin/pulls)
[![codecov](https://codecov.io/gh/aelassas/movinin/graph/badge.svg?token=TXD8SM1QHB)](https://codecov.io/gh/aelassas/movinin)
[![codecov](https://img.shields.io/codecov/c/github/aelassas/movinin?logo=codecov)](https://codecov.io/gh/aelassas/movinin)
[![coveralls](https://coveralls.io/repos/github/aelassas/movinin/badge.svg?branch=main)](https://coveralls.io/github/aelassas/movinin?branch=main)
[![open-vscode](https://img.shields.io/badge/open-vscode-1f425f.svg)](https://vscode.dev/github/aelassas/movinin/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md)

https://github.com/user-attachments/assets/806cbe2d-9f49-413e-9359-2546306f9653
-->

## Movin' In

Movin' In is an open-source and cross-platform Rental Property Management Platform with an admin panel for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

The platform supports [Stripe](https://stripe.com/global) and [PayPal](https://www.paypal.com/us/webapps/mpp/country-worldwide) payment gateways, allowing you to choose the one best suited for your country or business model. If Stripe isn't available in your region, PayPal serves as a secure and convenient alternative for accepting payments.

Movin' In supports both single-agency and multi-agency modes. Agencies have access to an admin panel to manage their properties, customers, and bookings. Each newly created agency receives an email prompting them to register and access the system.

The admin panel allows admins to manage agencies, properties, countries, locations, customers, bookings and payments.

Customers can sign up via the frontend or mobile app, browse available properties based on location and date, and complete the booking and payment process seamlessly.

## Features

### Agency & Property Management
* Agency management
* Ready for single or multiple agencies
* Property management
* [Flexible Time-Based Car Availability](https://github.com/aelassas/movinin/wiki/FAQ#how-to-automatically-prevent-a-property-from-being-booked-multiple-times-when-its-already-booked)
* Booking management
* [Property scheduler](https://movin-in.github.io/content/screenshots/v4.5/backend-scheduler.png?raw=true)
* [Auto-Notification System](https://github.com/aelassas/movinin/wiki/Auto%E2%80%90Notification-System)

### Pricing & Payments
* Payment management
* [Multiple payment gateways supported (Stripe, PayPal)](https://github.com/aelassas/movinin/wiki/Payment-Gateways)
* Multiple payment methods: Credit Card, PayPal, Google Pay, Apple Pay, Link, Pay Later

### Locations & Mapping
* [Hierarchical locations with country and map integration](https://github.com/aelassas/movinin/wiki/Locations)
* Location-based search with nested location support
* Map display for locations

### User Experience
* Customer management
* [Multiple login options](https://github.com/aelassas/movinin/wiki/Social-Login-Setup): Google, Facebook, Apple, Email
* Multiple language support: English, French
* [Multiple currencies support](https://github.com/aelassas/movinin/wiki/Add-New-Currency)
* Multiple pagination styles: classic (next/previous), infinite scroll
* Push notifications

### Security & Performance
* Secure against XSS, XST, CSRF, MITM, and DDoS attacks
* Responsive admin panel and frontend
* Native mobile app for Android and iOS (single codebase)
* [Docker](https://www.docker.com/) support for easy deployment and a better developer experience
* Error monitoring and performance tracing with Sentry

### Supported Platforms
* iOS
* Android
* Web
* Docker

## Support

If this project helped you, saved you time, or inspired you in any way, please consider supporting its future growth and maintenance. You can show your support by starring the repository (it helps increase visibility and shows your appreciation), sharing the project (recommend it to colleagues, communities, or on social media), or making a donation (if you'd like to financially support the development) via [GitHub Sponsors](https://github.com/sponsors/aelassas) (one-time or monthly), [PayPal](https://www.paypal.me/aelassaspp), or [Buy Me a Coffee](https://www.buymeacoffee.com/aelassas). Open-source software requires time, effort, and resources to maintain—your support helps keep this project alive, up-to-date, and accessible to everyone. Every contribution, big or small, makes a difference and motivates continued work on features, bug fixes, and new ideas.

<!--<a href="https://github.com/sponsors/aelassas"><img src="https://aelassas.github.io/content/github-sponsor-button.png" alt="GitHub" width="210"></a>-->
<a href="https://www.paypal.me/aelassaspp"><img src="https://aelassas.github.io/content/paypal-button-v2.png" alt="PayPal" width="208"></a>
<a href="https://www.buymeacoffee.com/aelassas"><img src="https://aelassas.github.io/content/bmc-button.png" alt="Buy Me A Coffee" height="38"></a>

To contribute code or report issues, please read the [Contribution Guide](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md) to learn about the process, coding standards, and how to submit pull requests.

## Live Demo

### Frontend

* URL: https://movinin.dynv6.net:3004/
* Login: jdoe@movinin.io
* Password: M00vinin

### Admin panel

* URL: https://movinin.dynv6.net:3003/
* Login: admin@movinin.io
* Password: M00vinin

### Mobile App

You can install the Android app on any Android device.

### Scan this code with a device

Open the Camera app and point it at this code. Then tap the notification that appears.

<img alt="" width="120" src="https://movin-in.github.io/content/qr-code-6.1.png">

### How to install the Mobile App on Android

* On devices running Android 8.0 (API level 26) and higher, you must navigate to the Install unknown apps system settings screen to enable app installations from a particular location (i.e. the web browser you are downloading the app from).

* On devices running Android 7.1.1 (API level 25) and lower, you should enable the Unknown sources system setting, found in Settings > Security on your device.

### Alternative Way

You can also install the Android App by downloading the APK and installing it on any Android device.

* [Download APK](https://github.com/aelassas/movinin/releases/download/v6.1/movinin-6.1.apk)
* Login: jdoe@movinin.io
* Password: M00vinin

## Documentation

1. [Overview](https://github.com/aelassas/movinin/wiki/Overview)
   1. [Frontend](https://github.com/aelassas/movinin/wiki/Overview#frontend)
   1. [Admin Panel](https://github.com/aelassas/movinin/wiki/Overview#admin-panel)
   1. [Mobile App](https://github.com/aelassas/movinin/wiki/Overview#mobile-app)
2. [Why Use Movin' In](https://github.com/aelassas/movinin/wiki/Why-Use-Movin'-In)
3. [Software Architecture](https://github.com/aelassas/movinin/wiki/Architecture)
4. [Advanced Features](https://github.com/aelassas/movinin/wiki/Advanced-Features)
5. [Installing (Self-hosted)](https://github.com/aelassas/movinin/wiki/Installing-(Self%E2%80%90hosted))
6. [Installing (Docker)](https://github.com/aelassas/movinin/wiki/Installing-(Docker))
   1. [Docker Image](https://github.com/aelassas/movinin/wiki/Installing-(Docker)#docker-image)
   1. [SSL](https://github.com/aelassas/movinin/wiki/Installing-(Docker)#ssl)
7. [Setup Sentry](https://github.com/aelassas/movinin/wiki/Setup-Sentry)
7. [Payment Gateways](https://github.com/aelassas/movinin/wiki/Payment-Gateways)
8. [Setup Stripe](https://github.com/aelassas/movinin/wiki/Setup-Stripe)
9. [Social Login Setup](https://github.com/aelassas/movinin/wiki/Social-Login-Setup)
10. [Build Mobile App](https://github.com/aelassas/movinin/wiki/Build-Mobile-App)
11. [Demo Database](https://github.com/aelassas/movinin/wiki/Demo-Database)
    1. [Windows, Linux and macOS](https://github.com/aelassas/movinin/wiki/Demo-Database#windows-linux-and-macos)
    1. [Docker](https://github.com/aelassas/movinin/wiki/Demo-Database#docker)
12. [Run from Source](https://github.com/aelassas/movinin/wiki/Run-from-Source)
13. [Run from Source (Docker)](https://github.com/aelassas/movinin/wiki/Run-from-Source-(Docker))
14. [Run Mobile App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App)
    1. [Prerequisites](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#prerequisites)
    1. [Instructions](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#instructions)
    1. [Push Notifications](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#push-notifications)
    1. [Run iOS App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#run-ios-app)
15. [Locations](https://github.com/aelassas/movinin/wiki/Locations)
16. [Auto‐Notification System](https://github.com/aelassas/movinin/wiki/Auto%E2%80%90Notification-System)
17. [Add New Language](https://github.com/aelassas/movinin/wiki/Add-New-Language)
18. [Add New Currency](https://github.com/aelassas/movinin/wiki/Add-New-Currency)
19. [Logs](https://github.com/aelassas/movinin/wiki/Logs)
20. [Testing](https://github.com/aelassas/movinin/wiki/Testing)
    1. [Unit Tests and Coverage](https://github.com/aelassas/movinin/wiki/Unit-Tests-and-Coverage)
    1. [Manual Tests](https://github.com/aelassas/movinin/wiki/Manual-Tests)
21. [FAQ](https://github.com/aelassas/movinin/wiki/FAQ)
22. [Release Notes](https://github.com/aelassas/movinin/blob/main/.github/RELEASES.md)
23. [Contribution Guide](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md)
24. [Code of Conduct](https://github.com/aelassas/movinin/blob/main/.github/CODE_OF_CONDUCT.md)


## License

Movin' In is [MIT licensed](https://github.com/aelassas/movinin/blob/main/LICENSE).
