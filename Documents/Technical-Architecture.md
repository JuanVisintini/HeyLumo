# 07 - Technical Architecture

# AI Business Platform

## Overview

The platform is built using a modular, event-driven architecture designed for scalability, maintainability, and AI orchestration.

Every major capability runs independently and communicates through well-defined contracts.

The architecture should support horizontal scaling, multiple AI providers, and future digital products beyond websites.

---

# Architecture Overview

                    Frontend
                       │
                 Next.js Web App
                       │
               REST / GraphQL API
                       │
                Backend (NestJS)
                       │
             Generation Orchestrator
                       │
    ┌──────────┬──────────┬──────────┐
    │          │          │          │
 Import     AI Engine  Project Gen Deploy
 Workers      Workers     Workers   Workers
    │          │          │          │
    └──────────┴──────────┴──────────┘
                       │
              PostgreSQL + Storage
                       │
                 CDN + Deployment

---

# Technology Stack

## Frontend

Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form

Responsibilities

- Dashboard
- Website Preview
- Authentication
- Job Monitoring
- Asset Management

---

## Backend

Technology

- NestJS
- TypeScript

Responsibilities

- Authentication
- API
- Job creation
- Business management
- Permissions
- Event publishing

---

## Database

Technology

PostgreSQL

Stores

- Users
- Businesses
- Business Profiles
- Jobs
- Deployments
- Prompt Versions
- Themes
- Generated Assets

---

## Cache

Technology

Redis

Responsibilities

- Job state
- Sessions
- Temporary data
- Rate limiting
- Queue metadata

---

## Object Storage

Possible providers

- AWS S3
- Cloudflare R2
- Google Cloud Storage

Stores

- Images
- Logos
- Generated assets
- Website builds
- Documents

---

# Queue System

Technology

BullMQ

Purpose

Every expensive operation becomes a background job.

Example

Import Business

↓

Queue

↓

Worker

↓

Completed

Possible queues

Import Queue

AI Queue

Project Queue

Deploy Queue

Notification Queue

---

# Event Bus

Every important action emits an event.

Examples

BusinessImported

BusinessValidated

ThemeGenerated

WebsiteGenerated

DeploymentCompleted

GenerationFailed

Events should be immutable.

---

# AI Layer

The platform should support multiple providers.

Example

AI Provider Interface

↓

OpenAI

Anthropic

Google Gemini

Local LLM

Business logic must never depend on one provider.

---

# Prompt Repository

Prompts should be stored separately from application code.

Example

/prompts

business-analysis.md

brand.md

content.md

seo.md

validation.md

Every prompt has

- version
- owner
- creation date
- changelog

---

# Theme Repository

Themes are independent packages.

Example

/themes

restaurant-rustic

restaurant-modern

hotel-luxury

clinic-clean

Each theme contains

- components
- styles
- layouts
- tokens
- assets

---

# Website Generator

Generates real Next.js projects.

Output

/app

/components

/content

/public

/styles

Configuration only.

Never AI-generated React components.

---

# Deployment Layer

Responsibilities

- Build
- Deploy
- SSL
- Domain
- CDN
- Cache invalidation

Future support

- Vercel
- Cloudflare
- AWS

Deployment provider should be replaceable.

---

# Authentication

Recommended

Clerk

or

Auth.js

Possible providers

Google

GitHub

Email

Magic Link

---

# Monitoring

Recommended

OpenTelemetry

Sentry

PostHog

Metrics

Generation Time

Deployment Time

AI Cost

Worker Usage

Failures

---

# Logging

Every job should have logs.

Example

Import started

↓

Instagram connected

↓

Images downloaded

↓

Profile generated

↓

Website deployed

Logs should be searchable.

---

# API Design

REST first.

GraphQL optional.

Endpoints

POST /jobs

GET /jobs/:id

GET /businesses

POST /businesses

POST /deployments

GET /themes

POST /regenerate

---

# Scalability

Every worker should scale independently.

Example

Import Workers

2

AI Workers

20

Deploy Workers

5

Each capability scales according to demand.

---

# Infrastructure

Containers

Docker

Orchestration

Kubernetes (future)

CI/CD

GitHub Actions

Infrastructure as Code

Terraform (future)

---

# Security

HTTPS everywhere

Encrypted secrets

Signed uploads

Rate limiting

Role-based access

Audit logs

---

# Guiding Principles

Modular

Every capability is isolated.

Observable

Everything produces logs and metrics.

Provider Agnostic

External services can be replaced.

AI Optional

AI assists the platform.

It never owns the platform.

Scalable

Every expensive task runs asynchronously.

Future Proof

The architecture should support new digital products without redesigning the core.