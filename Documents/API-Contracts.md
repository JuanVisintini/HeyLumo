# 10 - API Contracts

# AI Business Platform

## Overview

This document defines the public API exposed by the platform.

The API is responsible for managing businesses, generation jobs, deployments, assets, and capabilities.

The API should remain stateless.

All long-running operations are executed asynchronously through Jobs.

---

# API Principles

REST First

JSON Only

Stateless

Versioned

Async by Default

Idempotent

---

# Authentication

Authorization

Bearer Token

Future Providers

- Google
- GitHub
- Magic Link

Every request must include

Authorization: Bearer <token>

---

# Business

## Create Business

POST /api/v1/businesses

Request

```json
{
    "name": "La Guadalupe",
    "source": {
        "type": "instagram",
        "url": "https://instagram.com/laguadalupe"
    }
}
```

Response

```json
{
    "id": "business_123",
    "status": "created"
}
```

---

## Get Business

GET

/api/v1/businesses/{id}

Response

Business

---

## Update Business

PATCH

/api/v1/businesses/{id}

---

## Delete Business

DELETE

/api/v1/businesses/{id}

---

# Business Profile

GET

/api/v1/businesses/{id}/profile

Returns

Business Digital Twin

---

# Jobs

## Create Generation Job

POST

/api/v1/jobs

Request

```json
{
    "businessId": "...",
    "type": "website-generation"
}
```

Response

```json
{
    "jobId": "...",
    "status": "pending"
}
```

---

## Get Job

GET

/api/v1/jobs/{id}

Returns

Current status

Current step

Progress

Started At

Estimated completion

---

## Cancel Job

POST

/api/v1/jobs/{id}/cancel

---

# Tasks

GET

/api/v1/jobs/{id}/tasks

Returns

Every executed capability.

Example

Import

Completed

SEO

Running

Deployment

Pending

---

# Events

GET

/api/v1/jobs/{id}/events

Returns

Chronological execution history.

---

# Deployments

GET

/api/v1/businesses/{id}/deployments

Returns

Deployment history.

---

## Deploy

POST

/api/v1/deployments

Request

```json
{
    "businessId": "...",
    "environment": "production"
}
```

---

# Assets

GET

/api/v1/businesses/{id}/assets

Returns

Uploaded assets.

---

## Upload Asset

POST

/api/v1/assets

Multipart upload.

Returns

Asset ID

---

# Themes

GET

/api/v1/themes

Returns

Available themes.

---

# Regeneration

POST

/api/v1/regenerate

Request

```json
{
    "businessId": "...",
    "sections": [
        "hero",
        "gallery"
    ]
}
```

Creates a new Job.

---

# Capabilities

GET

/api/v1/capabilities

Returns

Registered capabilities.

Example

Business Import

SEO

Deployment

Validation

---

# Health

GET

/api/v1/health

Returns

Platform health.

---

# Metrics

GET

/api/v1/metrics

Internal only.

---

# Webhooks

Supported events

BusinessCreated

GenerationCompleted

DeploymentCompleted

GenerationFailed

AssetUploaded

Users can subscribe to events.

---

# Pagination

Every collection supports

page

pageSize

sort

filter

search

---

# Standard Response

```json
{
    "data": {},
    "meta": {},
    "links": {}
}
```

---

# Standard Error

```json
{
    "error": {
        "code": "BUSINESS_NOT_FOUND",
        "message": "...",
        "details": {}
    }
}
```

---

# HTTP Status

200 OK

201 Created

202 Accepted

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Error

---

# Idempotency

Long-running POST requests should support

Idempotency-Key

This prevents duplicate Jobs.

---

# Async Pattern

Request

↓

202 Accepted

↓

Job Created

↓

Worker Executes

↓

Client Polls

or

↓

Webhook

or

↓

Server Sent Events

---

# API Versioning

Current

/api/v1/

Future

/api/v2/

Breaking changes only.

---

# OpenAPI

Every endpoint should generate

OpenAPI Specification

Swagger

SDKs

Generated clients

---

# API Design Principles

Predictable

Consistent

Versioned

Documented

Async

Secure

Composable