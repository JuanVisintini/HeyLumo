# 08 - Domain Model

# AI Business Platform

## Overview

The domain model defines the core business entities of the platform.

These entities represent the language of the business and are independent of any database or implementation.

The objective is to create a stable domain that can evolve without breaking existing functionality.

---

# Domain Overview

User

│

└── Businesses

│

└── Business Profile

│

├── Brand

├── Contact

├── Location

├── Menu

├── Gallery

├── Theme

├── SEO

└── Assets

│

└── Jobs

│

└── Deployments

---

# User

Represents a platform account.

Responsibilities

- Own businesses
- Manage subscriptions
- Trigger generations
- View deployments

Properties

```typescript
User
```

Fields

- id
- name
- email
- avatar
- role
- subscription
- createdAt
- updatedAt

Relationships

User

↓

Businesses

---

# Business

Represents a real company.

Examples

- Restaurant
- Hotel
- Bakery
- Gym

Fields

- id
- ownerId
- name
- slug
- category
- status

Relationships

Business

↓

Business Profile

↓

Jobs

↓

Deployments

---

# Business Profile

Represents the Digital Twin of a business.

This is the central entity.

Everything else depends on it.

Fields

- id
- businessId
- version
- status

Relationships

Brand

Contact

Location

Menu

Gallery

Theme

SEO

Assets

---

# Job

Represents one execution of the generation pipeline.

Fields

- id
- businessId
- type
- status
- progress
- startedAt
- finishedAt

Possible types

Generate Website

Regenerate

Deploy

Import

Update Business

---

# Task

Every Job is composed of Tasks.

Fields

- id
- jobId
- capability
- status
- startedAt
- finishedAt
- retries

Examples

Import

Normalize

Analyze

Generate

Validate

Deploy

---

# Deployment

Represents one published version.

Fields

- id
- businessId
- version
- domain
- provider
- status
- deployedAt

Possible status

Pending

Building

Deploying

Ready

Failed

---

# Theme

Represents a reusable visual system.

Fields

- id
- name
- category
- version

Contains

Tokens

Layouts

Components

Animations

Assets

---

# Component

Reusable UI block.

Examples

Hero

Gallery

FAQ

Menu

CTA

Contact

Footer

Each component is configurable.

---

# Asset

Generated or uploaded resource.

Examples

Logo

Images

QR

Favicon

Manifest

OpenGraph

Fields

- id
- type
- location
- size
- mimeType

---

# Prompt

Represents one AI prompt.

Fields

- id
- capability
- version
- provider
- createdAt

Prompts are versioned.

---

# AI Provider

Represents one model provider.

Examples

OpenAI

Anthropic

Gemini

Local Model

Fields

- id
- name
- model
- status

---

# Capability

Represents one executable capability.

Examples

Business Import

SEO

Content Generation

Deployment

Validation

Fields

- id
- name
- version
- inputSchema
- outputSchema

Capabilities can use AI or traditional code.

---

# Event

Represents something that already happened.

Examples

Business Imported

Profile Updated

Website Generated

Deployment Completed

Fields

- id
- type
- timestamp
- payload

Events are immutable.

---

# Relationships

```
User
 └── Business
      ├── BusinessProfile
      ├── Jobs
      │     └── Tasks
      ├── Deployments
      ├── Assets
      └── Themes

BusinessProfile
 ├── Brand
 ├── Contact
 ├── Location
 ├── Gallery
 ├── Menu
 ├── SEO
 ├── Content
 └── Metadata

Job
 ├── Tasks
 ├── Events
 └── Logs
```

---

# Aggregate Roots

The platform has four main aggregates.

Business

Business Profile

Job

Deployment

Everything else belongs to one of these aggregates.

---

# Domain Rules

A Business always owns one active Business Profile.

A Business Profile can have multiple versions.

A Job always belongs to one Business.

A Deployment always belongs to one Business.

A Task cannot exist without a Job.

Events cannot be modified.

Prompts are immutable.

Themes are reusable.

Assets are shared across versions when possible.

---

# Future Extensions

The model supports future modules.

Examples

Reservation

Payments

CRM

Marketing

Loyalty

Inventory

Analytics

AI Assistant

No core entity should require redesign to support future products.