[![build](https://github.com/aelassas/movinin/actions/workflows/build.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/build.yml) [![test](https://github.com/aelassas/movinin/actions/workflows/test.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/aelassas/movinin/graph/badge.svg?token=TXD8SM1QHB)](https://codecov.io/gh/aelassas/movinin) [![](https://img.shields.io/badge/docs-wiki-brightgreen)](https://github.com/aelassas/movinin/wiki) [![](https://img.shields.io/badge/live-demo-brightgreen)](https://movinin.dynv6.net:3004/)

## Movin' In

Movin' In is a Rental Property Management Platform, agency-oriented with a backend for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

Movin' In is designed to work with multiple agencies. Agencies can manage their properties and bookings from the backend. Movin' In can also work with only one agency and can be used as a property rental aggregator.

From the backend, administrators can create and manage agencies, properties, locations, users and bookings.

When new agencies are created, they receive an email prompting them to create their account to access the backend and manage their properties, customers and bookings.

Customers can sign up from the frontend or the mobile app, search for available properties based on location point and time, choose a property and complete the checkout process.

A key design decision was made to use TypeScript instead of JavaScript due to its numerous advantages. TypeScript offers strong typing, tooling, and integration, resulting in high-quality, scalable, more readable and maintainable code that is easy to debug and test.

Movin' In can run in a Docker container. Follow this step by step [guide](https://github.com/aelassas/movinin/wiki/Docker) to walk you through on how to build Movin' In Docker image and run it in a Docker container.

## Features

* Agency management
* Ready for one or multiple agencies
* Property management
* Booking management
* Payment management
* Customer management
* Multiple payment methods (Credit Card, PayPal, Google Pay, Apple Pay, Link, Pay Later)
* Operational Stripe Payment Gateway
* Multiple language support (English, French)
* Multiple pagination options (Classic pagination with next and previous buttons, infinite scroll)
* Responsive backend and frontend
* Native Mobile app for Android and iOS with single codebase
* Push notifications
* Secure against XSS, XST, CSRF and MITM
* Supported Platforms: iOS, Android, Web, Docker

## Live Demo

### Frontend
* URL: https://movinin.dynv6.net:3004/
* Login: jdoe@movinin.io
* Password: M00vinin

### Backend
* URL: https://movinin.dynv6.net:3003/
* Login: admin@movinin.io
* Password: M00vinin

### Mobile App

* [Download APK](https://github.com/aelassas/movinin/releases/download/v3.5/movinin-3.5.apk)
* Login: jdoe@movinin.io
* Password: M00vinin

## Resources

1. [Overview](https://github.com/aelassas/movinin/wiki/Overview)
2. [Architecture](https://github.com/aelassas/movinin/wiki/Architecture)
3. [Installing](https://github.com/aelassas/movinin/wiki/Installing)
4. [Installing on VPS](https://github.com/aelassas/movinin/wiki/Installing-on-VPS)
5. [Setup Stripe](https://github.com/aelassas/movinin/wiki/Setup-Stripe)
6. [Docker](https://github.com/aelassas/movinin/wiki/Docker)
   1. [Docker Image](https://github.com/aelassas/movinin/wiki/Docker#docker-image)
   2. [SSL](https://github.com/aelassas/movinin/wiki/Docker#ssl)
7. [Build Mobile App](https://github.com/aelassas/movinin/wiki/Build-Mobile-App)
8. [Demo Database](https://github.com/aelassas/movinin/wiki/Demo-Database)
   1. [Windows, Linux and macOS](https://github.com/aelassas/movinin/wiki/Demo-Database#windows-linux-and-macos)
   2. [Docker](https://github.com/aelassas/movinin/wiki/Demo-Database#docker)
9. [Run from Source](https://github.com/aelassas/movinin/wiki/Run-from-Source)
10. [Run Mobile App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App)
    1. [Prerequisites](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#prerequisites)
    2. [Instructions](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#instructions)
    3. [Push Notifications](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#push-notifications)
11. [Change Currency](https://github.com/aelassas/movinin/wiki/Change-Currency)
12. [Add New Language](https://github.com/aelassas/movinin/wiki/Add-New-Language)
13. [Unit Tests and Coverage](https://github.com/aelassas/movinin/wiki/Unit-Tests-and-Coverage)
14. [Logs](https://github.com/aelassas/movinin/wiki/Logs)

## License

Movin' In is [MIT licensed](https://github.com/aelassas/movinin/blob/main/LICENSE).
