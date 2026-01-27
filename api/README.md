# AWS S3 Documents Indexing

## Description

A NestJS app with custom modules implementing AWS SDK v3 libraries for S3 and SQS and OpenSearch functionality.

## Technologies used

- TypeScript - a high-level, multi-paradigm programming language.

- Node.JS - free, open-source, cross-platform JavaScript runtime environment.

- npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

- AWS S3 - Simple Storage Service, a highly scalable, durable, and secure object storage service offered by AWS

- AWS SQS - Simple Queue Service, a fully managed message queuing service that enables decoupling and scaling of microservices, distributed systems, and serverless applications.

- OpenSearch - a distributed, 100% open-source search and analytics suite derived from Elasticsearch.

## Structure and workflow

The `api` directory consists of `prisma/`, storing all the SQL DB migrations and the schema for the Prisma framework, `src/` with the source TypeScript project files. The application is divided in the `modules/` into separate modules for handling S3, SQS, OpenSearch and HTTP routing to the `/documents` routes.

## Installation

The client app uses `npm` as the package manager.

```shell
npm install
```

## Running the project

The application requires valid database URL and other variables set up in the `.env` file, as shown in `.env.example`, as well as migrations fired on the target PostgreSQL DB. Locally DB can be set up using core `docker-compose.dev.yml`.

```shell
$ npx prisma migrations deploy
```

The source code relies on the generated files for Prisma models and types.

```shell
$ npx prisma generate
```

To run the application in the development mode:

```shell
$ npm run start:dev
```
