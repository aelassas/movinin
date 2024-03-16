[![](https://movin-in.github.io/content/cover.jpg)](https://movin-in.github.io)

|**Supported Platforms**|  ![](https://img.shields.io/badge/iOS-4630EB.svg?logo=APPLE&labelColor=999999&logoColor=fff) ![](https://img.shields.io/badge/Android-4630EB.svg?&logo=ANDROID&labelColor=A4C639&logoColor=fff) ![](https://img.shields.io/badge/web-4630EB.svg?logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff) |
| ----------- | ----------- |
| **Lines of Code** | [![loc](https://raw.githubusercontent.com/aelassas/movinin/loc/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/loc.yml) |
| **CodeFactor**    | [![CodeFactor](https://www.codefactor.io/repository/github/aelassas/movinin/badge)](https://www.codefactor.io/repository/github/aelassas/movinin) |
| **API**           | [![API CI](https://github.com/aelassas/movinin/actions/workflows/api.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/api.yml) |
| **Backend**       | [![Backend CI](https://github.com/aelassas/movinin/actions/workflows/backend.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/backend.yml) |
| **Frontend**      | [![Frontend CI](https://github.com/aelassas/movinin/actions/workflows/frontend.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/frontend.yml) |
| **Mobile App**    | [![Mobile CI](https://github.com/aelassas/movinin/actions/workflows/mobile.yml/badge.svg)](https://github.com/aelassas/movinin/actions/workflows/mobile.yml) |
| **Coverage**      | [![codecov](https://codecov.io/gh/aelassas/movinin/graph/badge.svg?token=TXD8SM1QHB)](https://codecov.io/gh/aelassas/movinin) |

Movin' In is an open-source and cross-platform Rental Property Management Platform with a backend for managing properties, customers and bookings, a frontend and a mobile app for renting properties.

Movin' In is designed to work with multiple agencies. Agencies can manage their properties and bookings from the backend. Movin' In can also work with only one agency as well.

From the backend, administrators can create and manage agencies, properties, locations, users and bookings.

When new agencies are created, they receive an email prompting them to create their account to access the backend and manage their properties, customers and bookings.

Customers can sign up from the frontend or the mobile app, search for available properties based on location point and time, choose a property and complete the checkout process.

A key design decision was made to use TypeScript instead of JavaScript due to its numerous advantages. TypeScript offers strong typing, tooling, and integration, resulting in high-quality, scalable, more readable and maintainable code that is easy to debug and test.

<img src="https://movin-in.github.io/content/docker.png" alt="" width="220" />

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

