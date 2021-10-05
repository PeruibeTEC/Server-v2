<h1 align="center">
  <img alt="logo-gobarber" src="https://res.cloudinary.com/hmartiins/image/upload/v1633443566/Frame_2_puiw6j.png" width="168px">
</h1>

<h3 align="center">
  🌆 PeruibeTec Server API 🌆
</h3>

<p align="center">The best way to connect with Peruíbe !</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PeruibeTEC/Server-v2?color=%232196F3">

  <a href="https://www.linkedin.com/in/henrique-martins-5b2bb71a5/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-PeruibeTec%20Team-%232196F3">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/PeruibeTEC/Server-v2?color=%232196F3">

  <a href="https://github.com/PeruibeTEC/Server-v2/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PeruibeTEC/Server-v2?color=%232196F3">
  </a>

  <a href="https://github.com/PeruibeTEC/Server-v2/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/PeruibeTEC/Server-v2?color=%232196F3">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/PeruibeTEC/Server-v2?color=%232196F3">
</p>

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Installing and configuring the project](#Installing-and-configuring-the-project)
- [How to contribute](#how-to-contribute)
- [License](#license)

## 👀 Overview

PeruibeTec is an app for the city of Peruibe in the state of São Paulo, Brazil. The goal is to make the city more technological and integrated, helping the viability and traffic of information in the city, at PeruibeTec you really connect with Peruíbe, whether you are a resident or a tourist.

Tourists enjoy a usability specifically prepared for tourists

While the residents stay on top of everything that is happening in Peruíbe

## 🚀 Technologies

The main technologies used in this API are:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Adonis](https://adonisjs.com/)
- [JWT-token](https://jwt.io/)
- [uuid-v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Japa](https://github.com/thetutlage/japa)
- [SuperTest](https://github.com/visionmedia/supertest)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [AWS](https://aws.amazon.com/pt/)
- [Azure](https://azure.microsoft.com/pt-br/)

## 💻 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [NPM](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Fyi.: We recommend using the docker


### Installing and configuring the project

*Clone the project and access the folder*

```bash
$ git clone https://github.com/PeruibeTec/Server-v2 && cd Server-v2
```

*Follow the steps below*

```bash
# Install the dependencies
$ yarn install

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Create the instance of PostgreSQL using docker
$ docker run --name peruibeTec-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=peruibeTec -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Once the services are running, run the migrations
$ node ace migration:run

# Finally, run the api service in a development environment :)
$ yarn dev

# Well done, project is started!
```

## 🤔 How to contribute

Thank you for being interested in making this package better. We encourage everyone to help improve this project with new features, bug fixes or performance improvements. Take some time to read our contribution guide to make this process faster and easier.

### Contribution Guidelines

To understand how to submit an issue, commit and create pull requests, check our [Contribution Guidelines](https://github.com/PeruibeTEC/Server-v2/blob/main/.github/CONTRIBUTING.md).

## 📝 License

This project is licensed under the GPL 3.0 License - see the [LICENSE](LICENSE) file for details.

<br><hr>
<div align="center">
  Copyright © 2021-Present, PeruibeTec.
</div>
<hr>

