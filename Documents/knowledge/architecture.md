# 03 - Architecture

# AI Business Platform Architecture

## Overview

The platform is designed around a modular architecture where each component has a single responsibility.

Instead of relying on a single AI prompt to generate an entire website, the system orchestrates multiple specialized services that progressively transform raw business information into a production-ready digital experience.

This architecture improves reliability, scalability and maintainability.

---

# High-Level Architecture

                  Frontend

                      │

            Website Generation API

                      │

             Website Orchestrator

                      │

 ┌────────────┬────────────┬────────────┬────────────┐
 │            │            │            │            │
 │            │            │            │            │
Importer   AI Engine   Project Gen   Deploy Engine Storage
 │            │            │            │            │
 └────────────┴────────────┴────────────┴────────────┘

                      │

                Business Profile

                      │

            Generated Website

---

# Core Principle

The orchestrator never generates content.

Its only responsibility is coordinating the execution flow.

Each service performs one specific task.

---

# Main Components

## Frontend

Responsibilities

- Business creation
- Progress visualization
- Website preview
- Regeneration requests
- Website management

The frontend never performs AI operations directly.

---

## API

Acts as the public entry point.

Responsibilities

- Authentication
- Validation
- Job creation
- Job status
- User management

The API should remain stateless.

---

## Website Orchestrator

The orchestrator is the brain of the platform.

Responsibilities

- Execute workflows
- Coordinate services
- Retry failed operations
- Maintain execution state
- Handle errors
- Emit events

The orchestrator never knows implementation details.

It only knows which service should execute next.

Example flow

Import Business

↓

Analyze Content

↓

Generate Business Profile

↓

Select Theme

↓

Generate Website

↓

Deploy

↓

Notify User

---

# Business Import Service

Responsible for collecting business information.

Possible providers

- Instagram
- Facebook
- Google Business
- Existing Website
- PDF Menu
- Manual Upload

Output

Business Profile Draft

---

# AI Engine

Transforms imported data into structured information.

Responsibilities

- Image analysis
- Logo detection
- Color extraction
- Content generation
- Copywriting
- SEO optimization
- Data cleanup
- Missing information detection

The AI Engine should never generate application code.

Only structured business content.

---

# Business Profile

The Business Profile is the central asset of the platform.

Every other service depends on it.

Example

Business

Contact

Location

Brand

Media

Products

Opening Hours

SEO

Social Links

Generated Content

This object becomes the source of truth.

---

# Theme Engine

Chooses the visual identity.

Inputs

- Business category
- Brand colors
- Uploaded images
- AI recommendations

Outputs

Selected Theme

Typography

Layout

Component configuration

The user should never select a theme manually during the MVP.

---

# Project Generator

Transforms the Business Profile into a real application.

Output

Next.js project

Responsibilities

- Generate routes
- Configure assets
- Configure metadata
- Configure SEO
- Generate content files
- Configure components

The generator never invents layouts.

It assembles predefined components.

---

# Deploy Engine

Responsible for publishing websites.

Responsibilities

- Build application
- Deploy
- Configure HTTPS
- Configure subdomain
- Return public URL

Future versions

- Custom domains
- Automatic DNS
- CDN
- Edge deployment

---

# Storage

Stores every persistent resource.

Examples

Business Profiles

Projects

Images

Generated assets

Deployment history

Logs

---

# Event Flow

The platform should be event-driven.

Example

Business Imported

↓

Business Profile Created

↓

Theme Selected

↓

Website Generated

↓

Website Built

↓

Website Published

↓

User Notified

Each service reacts only to the events it needs.

---

# AI Philosophy

AI should never control the workflow.

AI generates content.

The platform makes decisions.

This guarantees deterministic behavior.

---

# Error Handling

Every step should be resumable.

If deployment fails:

Business Import

✓

Business Profile

✓

Website

✓

Deployment

❌

Retry Deployment

No previous work should be lost.

---

# Scalability

Every service should be independently scalable.

Example

100 imports

↓

10 AI workers

↓

5 deploy workers

↓

Shared storage

No service should depend on another service's implementation.

Only on contracts.

---

# Design Principles

Single Responsibility

Every service performs one task.

Loose Coupling

Services communicate through contracts.

Deterministic Workflow

The orchestrator controls execution.

AI as a Tool

AI assists services.

It never controls business logic.

Business Profile First

Everything starts from the Business Profile.

The website is only one possible output.

---

# Future Architecture

Once the Business Profile exists, additional generators can reuse it.

Business Profile

├── Website Generator
├── QR Generator
├── NFC Generator
├── Social Media Generator
├── AI Chatbot Generator
├── Booking Generator
├── Marketing Generator
└── Analytics Generator

The platform does not generate websites.

It generates digital products from a unified Business Profile.