# 09 - Capability Catalog

# AI Business Platform

## Overview

A Capability represents a business function that can be executed independently.

Capabilities are the building blocks of the platform.

A capability:

- Has one responsibility
- Receives structured input
- Produces structured output
- Emits events
- Can be versioned
- Can evolve independently

Capabilities should never depend on implementation details of other capabilities.

---

# Capability Lifecycle

Input

↓

Validation

↓

Execution

↓

Output

↓

Events

↓

Logs

---

# Business Import

## Purpose

Import business information from external providers.

### Input

```json
{
    "source": "instagram",
    "url": "https://..."
}
```

### Output

Business Draft

### Uses

- Instagram Connector
- Google Business Connector
- Website Scraper

### Emits

BusinessImported

ImportFailed

---

# Business Normalization

## Purpose

Normalize imported information.

Responsibilities

- normalize addresses
- normalize phones
- normalize URLs
- merge duplicates
- clean data

Input

Business Draft

Output

Normalized Business

Events

BusinessNormalized

---

# Business Analysis

## Purpose

Understand the business.

Responsibilities

- detect category
- detect business type
- detect products
- detect services
- detect missing information

Input

Normalized Business

Output

Business Knowledge

Events

BusinessAnalyzed

---

# Brand Detection

## Purpose

Understand visual identity.

Responsibilities

- logo detection
- color extraction
- typography suggestion
- visual style

Output

Brand Profile

Events

BrandDetected

---

# Gallery Classification

## Purpose

Organize images.

Responsibilities

- classify photos
- remove duplicates
- score quality
- select hero image

Events

GalleryProcessed

---

# Content Generation

## Purpose

Generate business copy.

Produces

- Hero
- About
- Services
- CTA
- FAQ
- Footer

Events

ContentGenerated

---

# SEO Generation

## Purpose

Generate SEO metadata.

Produces

- title
- description
- schema.org
- OpenGraph
- robots
- sitemap

Events

SEOGenerated

---

# Theme Selection

## Purpose

Choose design system.

Produces

Theme Configuration

Events

ThemeSelected

---

# Experience Definition

## Purpose

Create a renderer-independent description.

Produces

```json
{
  "pages": [],
  "sections": [],
  "navigation": []
}
```

No HTML.

No React.

Only structure.

Events

ExperienceDefined

---

# Project Rendering

## Purpose

Convert Experience Definition into a real project.

Possible renderers

Next.js

Email

Landing Page

QR Experience

Future Mobile App

Events

ProjectGenerated

---

# Validation

## Purpose

Verify generated output.

Checks

Accessibility

SEO

Performance

Broken assets

Missing content

Events

ValidationCompleted

ValidationFailed

---

# Deployment

## Purpose

Publish generated assets.

Responsibilities

Build

Deploy

SSL

Domain

Cache

Events

DeploymentStarted

DeploymentCompleted

DeploymentFailed

---

# Notification

## Purpose

Notify users.

Possible channels

Email

Dashboard

Webhook

Slack

Teams

Events

NotificationSent

---

# Regeneration

## Purpose

Regenerate only one section.

Examples

Hero

Menu

Gallery

SEO

No full rebuild required.

Events

SectionRegenerated

---

# Capability Dependencies

Business Import

↓

Normalization

↓

Business Analysis

↓

Brand Detection

↓

Theme Selection

↓

Content Generation

↓

Experience Definition

↓

Project Rendering

↓

Validation

↓

Deployment

↓

Notification

---

# Capability Contracts

Every capability exposes

Input Schema

Output Schema

Events

Version

Owner

Timeout

Retry Policy

Dependencies

---

# Retry Strategy

Capabilities should be idempotent.

Running twice should never create duplicated data.

---

# Versioning

Capabilities evolve independently.

Business Analysis

v1

↓

v2

↓

v3

Other capabilities remain unchanged.

---

# Future Capabilities

Reservation

Inventory

CRM

Marketing

Email Campaigns

Ads Generator

Review Monitor

AI Assistant

Analytics

Payments

Every new feature should become a capability instead of modifying existing ones.

---

# Design Principles

Capabilities are independent.

Capabilities communicate through contracts.

Capabilities emit events.

Capabilities never know implementation details.

Capabilities can be replaced.

Capabilities can scale independently.