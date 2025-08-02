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

[![](https://movin-in.github.io/content/cover-1.png)](https://movinin.dynv6.net:3004/)

## Movin' In

Movin' In is an open-source and cross-platform Rental Property Management Platform with an admin panel for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

The platform supports [Stripe](https://stripe.com/global) and [PayPal](https://www.paypal.com/us/webapps/mpp/country-worldwide) payment gateways, allowing you to choose the one best suited for your country or business model. If Stripe isn't available in your region, PayPal serves as a secure and convenient alternative for accepting payments.

Movin' In supports both single-agency and multi-agency modes. Agencies have access to an admin panel to manage their properties, customers, and bookings. Each newly created agency receives an email prompting them to register and access the system.

The admin panel allows admins to manage agencies, properties, countries, locations, customers, bookings and payments.

Customers can sign up via the frontend or mobile app, browse available properties based on location and date, and complete the booking and payment process seamlessly.

## Quick Links
* [Overview](https://github.com/aelassas/movinin/wiki/Overview)  
* [Software Architecture](https://github.com/aelassas/movinin/wiki/Software-Architecture)  
* [Install Guide (Self-hosted)](https://github.com/aelassas/movinin/wiki/Installing-(Self%E2%80%90hosted))
* [Install Guide (Docker)](https://github.com/aelassas/movinin/wiki/Installing-(Docker))
* [Build Mobile App](https://github.com/aelassas/movinin/wiki/Build-Mobile-App)
* [Locations](https://github.com/aelassas/movinin/wiki/Locations)
* [Auto‐Notification System](https://github.com/aelassas/movinin/wiki/Auto%E2%80%90Notification-System)    
* [Payment Gateways](https://github.com/aelassas/movinin/wiki/Payment-Gateways)
* [Social Login Setup Guide](https://github.com/aelassas/movinin/wiki/Social-Login-Setup)  
* [Free SSL Setup Guide](https://github.com/aelassas/movinin/wiki/Free-SSL-Setup-Guide)
* [Run from Source](https://github.com/aelassas/movinin/wiki/Run-from-Source)
* [Run from Source (Docker)](https://github.com/aelassas/movinin/wiki/Run-from-Source-(Docker))
* [Run Mobile App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App)
* [Fork, Customize, and Sync](https://github.com/aelassas/movinin/wiki/Fork,-Customize,-and-Sync)
* [FAQ](https://github.com/aelassas/movinin/wiki/FAQ)  

## Features

### Agency & Property Management
* Agency management
* Ready for single or multiple agencies
* Property management
* [Flexible Time-Based Property Availability](https://github.com/aelassas/movinin/wiki/FAQ#how-to-automatically-prevent-a-property-from-being-booked-multiple-times-when-its-already-booked)
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
* Error monitoring and performance tracing with [Sentry](https://github.com/aelassas/movinin/wiki/Setup-Sentry)

### Supported Platforms
* iOS
* Android
* Web
* Docker

## Support

If this project helped you, saved you time, or inspired you in any way, please consider supporting its future growth and maintenance. You can show your support by starring the repository (it helps increase visibility and shows your appreciation), sharing the project (recommend it to colleagues, communities, or on social media), or making a donation (if you'd like to financially support the development) via [GitHub Sponsors](https://github.com/sponsors/aelassas) (one-time or monthly), [PayPal](https://www.paypal.me/aelassaspp), or [Buy Me a Coffee](https://www.buymeacoffee.com/aelassas). Open-source software requires time, effort, and resources to maintain—your support helps keep this project alive, up-to-date, and accessible to everyone. Every contribution, big or small, makes a difference and motivates continued work on features, bug fixes, and new ideas.

<!--<a href="https://github.com/sponsors/aelassas"><img src="https://aelassas.github.io/content/github-sponsor-button.png" alt="GitHub" width="210"></a>-->
<a href="https://www.paypal.me/aelassaspp"><img src="https://aelassas.github.io/content/paypal-button-v2.png" alt="PayPal" width="208"></a>
<a href="https://www.buymeacoffee.com/aelassas"><img src="https://aelassas.github.io/content/bmc-button.png" alt="Buy Me A Coffee" width="160"></a>

To contribute code or report issues, please read the [Contribution Guide](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md) to learn about the process, coding standards, and how to submit pull requests.

If you want to customize Movin' In while keeping your fork up to date with the latest changes, check out the [Fork, Customize, and Sync](https://github.com/aelassas/movinin/wiki/Fork,-Customize,-and-Sync) guide in the Wiki.

## Live Demo

### Frontend

* URL: https://movinin.dynv6.net:3004/
* Login: jdoe@movinin.io
* Password: M00vinin

### Admin Panel

* URL: https://movinin.dynv6.net:3003/
* Login: admin@movinin.io
* Password: M00vinin

### Mobile App

You can install the Android app on any Android device.

### Scan this code with a device

Open the Camera app and point it at this code. Then tap the notification that appears.

<img alt="" width="120" src="https://movin-in.github.io/content/qr-code-6.3.png">

### How to install the Mobile App on Android

* On devices running Android 8.0 (API level 26) and higher, you must navigate to the Install unknown apps system settings screen to enable app installations from a particular location (i.e. the web browser you are downloading the app from).

* On devices running Android 7.1.1 (API level 25) and lower, you should enable the Unknown sources system setting, found in Settings > Security on your device.

### Alternative Way

You can also install the Android App by downloading the APK and installing it on any Android device.

* [Download APK](https://github.com/aelassas/movinin/releases/download/v6.3/movinin-6.3.apk)
* Login: jdoe@movinin.io
* Password: M00vinin
<!--
## Website Source Code (movin-in.github.io)

The source code for the official Movin' In website is available here:

[https://github.com/movin-in/movin-in.github.io](https://github.com/movin-in/movin-in.github.io)

It features a clean landing page with multilingual support, dark mode, and SEO optimizations to help it reach users in different languages and regions.

The codebase follows the Separation of Concerns (SoC) principle, with a modular and maintainable architecture that aligns with the Single Responsibility Principle (SRP), modularity, and modern frontend best practices. It uses GitHub Actions for automatic builds and deployments. The Android demo app download link is dynamically fetched and updated on the site.

⚡ **Ultra-fast performance**

The website loads in under 1.5 seconds on slow 4G with **0ms blocking**, **0 layout shift**, and a blazing **Speed Index of 0.8**.

Feel free to explore the code, suggest improvements, or use it as a template for your own landing page.
-->
## Documentation

<!--
1. [Overview](https://github.com/aelassas/movinin/wiki/Overview)  
   1. [Frontend](https://github.com/aelassas/movinin/wiki/Overview#frontend)  
   1. [Admin Panel](https://github.com/aelassas/movinin/wiki/Overview#admin-panel)  
   1. [Mobile App](https://github.com/aelassas/movinin/wiki/Overview#mobile-app)  
1. [Why Use Movin' In](https://github.com/aelassas/movinin/wiki/Why-Use-Movin'-In)  
1. [Advanced Features](https://github.com/aelassas/movinin/wiki/Advanced-Features)  
-->
1. [Overview](https://github.com/aelassas/movinin/wiki/Overview)  
1. [Software Architecture](https://github.com/aelassas/movinin/wiki/Software-Architecture)  
1. [Install Guide (Self-hosted)](https://github.com/aelassas/movinin/wiki/Installing-(Self%E2%80%90hosted))  
1. [Install Guide (Docker)](https://github.com/aelassas/movinin/wiki/Installing-(Docker))  
   1. [Docker Image](https://github.com/aelassas/movinin/wiki/Installing-(Docker)#docker-image)  
   1. [SSL](https://github.com/aelassas/movinin/wiki/Installing-(Docker)#ssl)  
1. [Free SSL Setup Guide](https://github.com/aelassas/movinin/wiki/Free-SSL-Setup-Guide)
1. [Setup Sentry](https://github.com/aelassas/movinin/wiki/Setup-Sentry)  
1. [Payment Gateways](https://github.com/aelassas/movinin/wiki/Payment-Gateways)  
1. [Setup Stripe](https://github.com/aelassas/movinin/wiki/Setup-Stripe)  
1. [Social Login Setup Guide](https://github.com/aelassas/movinin/wiki/Social-Login-Setup)  
1. [Build Mobile App](https://github.com/aelassas/movinin/wiki/Build-Mobile-App)  
1. [Demo Database](https://github.com/aelassas/movinin/wiki/Demo-Database)  
   1. [Windows, Linux and macOS](https://github.com/aelassas/movinin/wiki/Demo-Database#windows-linux-and-macos)  
   1. [Docker](https://github.com/aelassas/movinin/wiki/Demo-Database#docker)  
1. [Run from Source](https://github.com/aelassas/movinin/wiki/Run-from-Source)  
1. [Run from Source (Docker)](https://github.com/aelassas/movinin/wiki/Run-from-Source-(Docker))  
1. [Run Mobile App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App)  
   1. [Prerequisites](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#prerequisites)  
   1. [Instructions](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#instructions)  
   1. [Push Notifications](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#push-notifications)  
   1. [Run iOS App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#run-ios-app)  
1. [Fork, Customize, and Sync](https://github.com/aelassas/movinin/wiki/Fork,-Customize,-and-Sync)
1. [Locations](https://github.com/aelassas/movinin/wiki/Locations)  
1. [Auto‐Notification System](https://github.com/aelassas/movinin/wiki/Auto%E2%80%90Notification-System)  
1. [Add New Language](https://github.com/aelassas/movinin/wiki/Add-New-Language)  
1. [Add New Currency](https://github.com/aelassas/movinin/wiki/Add-New-Currency)  
1. [Logs](https://github.com/aelassas/movinin/wiki/Logs)  
1. [Testing](https://github.com/aelassas/movinin/wiki/Testing)  
   1. [Integration Tests and Coverage](https://github.com/aelassas/movinin/wiki/Integration-Tests-and-Coverage)  
   1. [Manual Tests](https://github.com/aelassas/movinin/wiki/Manual-Tests)  
1. [FAQ](https://github.com/aelassas/movinin/wiki/FAQ)  
1. [Release Notes](https://github.com/aelassas/movinin/blob/main/.github/RELEASES.md)  
1. [Contribution Guide](https://github.com/aelassas/movinin/blob/main/.github/CONTRIBUTING.md)  
1. [Code of Conduct](https://github.com/aelassas/movinin/blob/main/.github/CODE_OF_CONDUCT.md)


## License

Movin' In is [MIT licensed](https://github.com/aelassas/movinin/blob/main/LICENSE).
