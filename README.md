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

https://github.com/user-attachments/assets/806cbe2d-9f49-413e-9359-2546306f9653
-->

## Movin' In

Movin' In is a Rental Property Management Platform designed to streamline property rentals for agencies. It offers an admin dashboard for managing countries, locations, properties, customers, bookings, and payments along with a frontend and mobile app for customer interactions.

Movin' In integrates Stripe and PayPal [payment gateways](https://github.com/aelassas/movinin/wiki/Supported-Payment-Gateways). If your country is not supported by [Stripe](https://stripe.com/global), you can check if it is supported by [PayPal](https://www.paypal.com/us/webapps/mpp/country-worldwide). And if so, you can use PayPal payment gateway instead of Stripe.

With Movin' In, you can deploy your own customizable property rental marketplace at minimal cost using the [Docker-based setup](https://github.com/aelassas/movinin/wiki/Installing-(Docker)). The platform integrates Stripe and PayPal for secure payments and can be efficiently hosted on a 1GB RAM droplet, making it an ideal choice for single/multi-agency operations looking for a scalable and cost-effective solution. You can deploy this solution for under $5/month using cloud providers like [Hetzner](https://www.hetzner.com/cloud/) or [DigitalOcean](https://www.digitalocean.com/pricing/droplets).

Movin' In is free and open source. You can customize it as you want and deploy it yourself by following the [documentation](https://github.com/aelassas/movinin/wiki). If you want me to customize it and deploy it for you, contact me by email. You can find my email in my [GitHub profile page](https://github.com/aelassas). You need to be logged in to GitHub to view my email. I can deploy the platform to the cloud for you, configure your DNS, emailing, webmail and all related tasks.

Movin' In is designed to work with multiple agencies. Agencies can manage their properties and bookings from the admin dashboard. Movin' In can also work with a single agency and can be used as a property rental aggregator.

From the admin dashboard, admins can create and manage agencies, properties, countries, locations, customers, bookings and payments.

When new agencies are created, they receive an email prompting them to create their account to access the admin dashboard and manage their properties, customers and bookings.

Customers can sign up from the frontend or the mobile app, search for available properties based on location point and time, choose a property and complete the checkout process.

## Features

* Agency management
* Ready for one or multiple agencies
* Property management
* Booking management
* [Property Scheduler](https://movin-in.github.io/content/screenshots/v4.5/backend-scheduler.png?raw=true)
* Payment management
* Customer management
* Multiple login options (Google, Facebook, Apple, Email)
* Multiple payment methods (Credit Card, PayPal, Google Pay, Apple Pay, Link, Pay Later)
* Multiple language support (English, French)
* [Multiple currencies support](https://github.com/aelassas/movinin/wiki/Add-New-Currency)
* Multiple pagination options (Classic pagination with next and previous buttons, infinite scroll)
* [Multiple Payment Gateways supported](https://github.com/aelassas/movinin/wiki/Payment-Gateways)
* Responsive admin dashboard and frontend
* Native Mobile app for Android and iOS with single codebase
* Push notifications
* Secure against XSS, XST, CSR, MITM and DDoS
* Supported Platforms: iOS, Android, Web, Docker

## Live Demo

### Frontend

* URL: https://movinin.dynv6.net:3004/
* Login: jdoe@movinin.io
* Password: M00vinin

### Admin Dashboard

* URL: https://movinin.dynv6.net:3003/
* Login: admin@movinin.io
* Password: M00vinin

### Mobile App

You can install the Android app on any Android device.

### Scan this code with a device

Open the Camera app and point it at this code. Then tap the notification that appears.

![QR](https://movin-in.github.io/content/qr-code-4.5.png)

### How to install the Mobile App on Android

* On devices running Android 8.0 (API level 26) and higher, you must navigate to the Install unknown apps system settings screen to enable app installations from a particular location (i.e. the web browser you are downloading the app from).

* On devices running Android 7.1.1 (API level 25) and lower, you should enable the Unknown sources system setting, found in Settings > Security on your device.

### Alternative Way

You can also install the Android App by downloading the APK and installing it on any Android device.

* [Download APK](https://github.com/aelassas/movinin/releases/download/v4.5/movinin-4.5.apk)
* Login: jdoe@movinin.io
* Password: M00vinin

## Documentation

1. [Overview](https://github.com/aelassas/movinin/wiki/Overview)
2. [Why Use Movin' In](https://github.com/aelassas/movinin/wiki/Why-Use-Movin'-In)
2. [Architecture](https://github.com/aelassas/movinin/wiki/Architecture)
3. [Installing (Self-hosted)](https://github.com/aelassas/movinin/wiki/Installing-(Self%E2%80%90hosted))
4. [Installing (VPS)](https://github.com/aelassas/movinin/wiki/Installing-(VPS))
5. [Installing (Docker)](https://github.com/aelassas/movinin/wiki/Installing-(Docker))
   1. [Docker Image](https://github.com/aelassas/movinin/wiki/Installing-(Docker)#docker-image)
   2. [SSL](https://github.com/aelassas/movinin/wiki/Installing-(Docker)#ssl)
5. [Payment Gateways](https://github.com/aelassas/movinin/wiki/Payment-Gateways)
6. [Setup Stripe](https://github.com/aelassas/movinin/wiki/Setup-Stripe)
7. [Build Mobile App](https://github.com/aelassas/movinin/wiki/Build-Mobile-App)
8. [Demo Database](https://github.com/aelassas/movinin/wiki/Demo-Database)
   1. [Windows, Linux and macOS](https://github.com/aelassas/movinin/wiki/Demo-Database#windows-linux-and-macos)
   2. [Docker](https://github.com/aelassas/movinin/wiki/Demo-Database#docker)
9. [Run from Source](https://github.com/aelassas/movinin/wiki/Run-from-Source)
10. [Run Mobile App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App)
    1. [Prerequisites](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#prerequisites)
    2. [Instructions](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#instructions)
    3. [Push Notifications](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#push-notifications)
    4. [Run iOS App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#run-ios-app)
11. [Add New Language](https://github.com/aelassas/movinin/wiki/Add-New-Language)
12. [Add New Currency](https://github.com/aelassas/movinin/wiki/Add-New-Currency)
13. [Unit Tests and Coverage](https://github.com/aelassas/movinin/wiki/Unit-Tests-and-Coverage)
14. [Manual Tests](https://github.com/aelassas/movinin/wiki/Manual-Tests)
15. [Logs](https://github.com/aelassas/movinin/wiki/Logs)
16. [FAQ](https://github.com/aelassas/movinin/wiki/FAQ)

## License

Movin' In is [MIT licensed](https://github.com/aelassas/movinin/blob/main/LICENSE).

