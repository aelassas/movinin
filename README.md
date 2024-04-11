[![build](https://github.com/aelassas/movinin/actions/workflows/build.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/build.yml) [![test](https://github.com/aelassas/movinin/actions/workflows/test.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/aelassas/movinin/graph/badge.svg?token=TXD8SM1QHB)](https://codecov.io/gh/aelassas/movinin) [![Latest Release](https://img.shields.io/github/v/release/aelassas/movinin?label=release&logo=github)](https://github.com/aelassas/movinin/releases/latest)

[![Cover](https://movin-in.github.io/content/cover.jpg)](https://movin-in.github.io)

## Live Demo

### Frontend
* URL: http://movinin.ddns.net:3004/
* Login: jdoe@movinin.io
* Password: M00vinin

### Backend
* URL: http://movinin.ddns.net:3003/
* Login: admin@movinin.io
* Password: M00vinin

### Mobile App

You can install the Android app on any Android device.

#### Scan this code with a device

Open the Camera app and point it at this code. Then tap the notification that appears.

![Mobile App Demo QR Code](https://movin-in.github.io/content/mobile-app-demo-qr-code.png)

#### How to install the Mobile App on Android

* On devices running Android 8.0 (API level 26) and higher, you must navigate to the Install unknown apps system settings screen to enable app installations from a particular location (i.e. the web browser you are downloading the app from).

* On devices running Android 7.1.1 (API level 25) and lower, you should enable the Unknown sources system setting, found in Settings > Security on your device.

#### Alternative Way

You can also install the Android App by directly downloading the APK and installing it on your Android device.

* [Download APK](https://expo.dev/artifacts/eas/g2B732wsky9ZCYnvBr9dG1.apk)
* Login: jdoe@movinin.io
* Password: M00vinin

## Movin' In

Movin' In is an open-source and cross-platform Rental Property Management Platform with a backend for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

Movin' In is designed to work with multiple agencies. Agencies can manage their properties and bookings from the backend. Movin' In can also work with only one agency as well.

From the backend, administrators can create and manage agencies, properties, locations, users and bookings.

When new agencies are created, they receive an email prompting them to create their account to access the backend and manage their properties, customers and bookings.

Customers can sign up from the frontend or the mobile app, search for available properties based on location point and time, choose a property and complete the checkout process.

A key design decision was made to use TypeScript instead of JavaScript due to its numerous advantages. TypeScript offers strong typing, tooling, and integration, resulting in high-quality, scalable, more readable and maintainable code that is easy to debug and test.

![Docker](https://movin-in.github.io/content/docker-small.png)

Movin' In can run in a Docker container. Follow this step by step [guide](https://github.com/aelassas/movinin/wiki/Docker) to walk you through on how to build Movin' In Docker image and run it in a Docker container.

Movin' In is user-friendly, straightforward, secure against XSS, XST, CSRF and MITM, and subtly crafted.

## Features

* Agency management
* Ready for one or multiple agencies
* Property management
* Booking management
* Customer management
* Multiple payment methods (Credit Card, Pay Later)
* Multiple language support (English, French)
* Multiple pagination options (Classic pagination with next and previous buttons, infinite scroll)
* Responsive backend and frontend
* Native Mobile app for Android and iOS with single codebase
* Push notifications
* Secure against XSS, XST, CSRF and MITM
* Supported Platforms: ![iOS](https://img.shields.io/badge/iOS-4630EB.svg?logo=APPLE&labelColor=999999&logoColor=fff) ![Android](https://img.shields.io/badge/Android-4630EB.svg?&logo=ANDROID&labelColor=A4C639&logoColor=fff) ![Web](https://img.shields.io/badge/web-4630EB.svg?logo=GOOGLE-CHROME&labelColor=FBC117&logoColor=fff) ![Docker](https://img.shields.io/badge/Docker-4630EB.svg?logo=DOCKER&labelColor=4285F4&logoColor=fff)

## Contents

1. [Overview](https://github.com/aelassas/movinin/wiki/Overview)
2. [Architecture](https://github.com/aelassas/movinin/wiki/Architecture)
3. [Installing](https://github.com/aelassas/movinin/wiki/Installing)
4. [Docker](https://github.com/aelassas/movinin/wiki/Docker)
   1. [Docker Image](https://github.com/aelassas/movinin/wiki/Docker#docker-image)
   2. [SSL](https://github.com/aelassas/movinin/wiki/Docker#ssl)
5. [Build Mobile App](https://github.com/aelassas/movinin/wiki/Build-Mobile-App)
6. [Demo Database](https://github.com/aelassas/movinin/wiki/Demo-Database)
   1. [Windows, Linux and macOS](https://github.com/aelassas/movinin/wiki/Demo-Database#windows-linux-and-macos)
   2. [Docker](https://github.com/aelassas/movinin/wiki/Demo-Database#docker)
7. [Run from Source](https://github.com/aelassas/movinin/wiki/Run-from-Source)
8. [Run Mobile App](https://github.com/aelassas/movinin/wiki/Run-Mobile-App)
   1. [Prerequisites](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#prerequisites)
   2. [Instructions](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#instructions)
   3. [Push Notifications](https://github.com/aelassas/movinin/wiki/Run-Mobile-App#push-notifications)
9. [Change Currency](https://github.com/aelassas/movinin/wiki/Change-Currency)
10. [Add New Language](https://github.com/aelassas/movinin/wiki/Add-New-Language)
11. [Unit Tests and Coverage](https://github.com/aelassas/movinin/wiki/Unit-Tests-and-Coverage)

## License

Movin' In is [MIT licensed](https://github.com/aelassas/movinin/blob/main/LICENSE).

