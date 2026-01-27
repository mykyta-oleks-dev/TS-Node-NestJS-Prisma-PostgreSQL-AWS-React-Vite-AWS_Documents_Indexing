# AWS S3 Documents Indexing

## Description

The fullstack web application for uploading the .docx and .pdf files on AWS S3 bucket with queued OpenSearch text content indexing. Store your documents in one place with simple query for the needed search terms.

## Technologies used

- TypeScript - a high-level, multi-paradigm programming language.

- Node.JS - free, open-source, cross-platform JavaScript runtime environment.

- npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

- AWS S3 - Simple Storage Service, a highly scalable, durable, and secure object storage service offered by AWS

- AWS SQS - Simple Queue Service, a fully managed message queuing service that enables decoupling and scaling of microservices, distributed systems, and serverless applications.

- OpenSearch - a distributed, 100% open-source search and analytics suite derived from Elasticsearch.

- React - a free and open-source front-end JavaScript library for building user interfaces.

- Vite - a build tool and development server for modern JavaScript projects, designed to provide a fast and lean development experience.

- TanStack Query - a library designed for managing server state in web applications

- Zustand - "A small, fast, and scalable bearbones state management solution".

- Shadcn - "A set of beautifully designed components that you can customize, extend, and build on."

## Structure

The project consists of: `api` directory with NestJS application using AWS SDK v3 libraries for S3 and SQS, custom modules and PostgreSQL migrations; `client` directory with React SPA.

The `api` functionality is divided between custom modules and services, implementing generation of presigned URLs for S3 files upload, their reading and text retrieval, SQS messages resolving, OpenSearch indexing.

The `client` is a React SPA with single purpose of providing UI for displaying and managing the uploaded document files.

## Workflow

Most requests to the `api` application on `/documents` sub-route require providing `X-User-Email` header with the valid email for the user. It is used to authentication and validation of incoming data.

Files are uploaded using S3 PUT presigned URLs, which are valid 60s. The successful uploads as well as deletes trigger creation of SQS messages, which are processed by the `api` to start indexing and status updates.

Indexed files are able to be queried by the search terms as a get query parameters to `api`'s `GET /documents` route.

The `client` application asks the user for their email and saves it into the local storage to later restore the authentication status. Page changes to the list of uploaded files with the action to log out, upload a new file and specify search terms.

Uploading process includes HTTP request to generate the presigned URL and following request on that URL with selected file. DB record is created on URL generation demanding immediate upload for further processing.

The status of the files contents processing is dynamically updated with SSE connection between apps. On pending processing, success or failure the label shows appropriate text and is blue, red or green accordingly.

On file delete, the request is sent to `api` to command the file removal from S3 with SQS event processing asynchronously.

## Installation

The apps use `npm` as the package manager.

Go to corresponding app's folders to learn more from their `README.md`s.

## Running the project

Refer to the apps' inner `README.md`-s for running them in development mode.

## Features

- Email Authentication/Authorization: Authenticate with your email

- Documents Listing Page: The uploaded documents are rendered for the current user

- Uploading Documents: Users are able to upload .pdf and .docx files up to 10MBs. The files are processes on background while the new record with status 'pending' is added

- Searching Indexed Documents: Specify searching terms to query the text contents of the successfully indexed documents with highlights showing the successful search hits

- Delete Documents: Users are able to delete the documents from the storage, issuing the command for the storage and background process for removing the record from DB and the index
