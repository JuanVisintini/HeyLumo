# 05 - Workflow

# AI Business Platform Workflow

## Overview

This document describes the complete lifecycle of a website generation request.

The workflow defines how every system component collaborates to transform an existing business into a fully deployed digital presence.

Every workflow execution is represented as a Job.

---

# High Level Flow

User

↓

Create Generation Job

↓

Import Business

↓

Build Business Profile

↓

Generate Website

↓

Validate Website

↓

Deploy Website

↓

Notify User

---

# Step 1 - Create Job

The user starts the generation process.

Input examples

- Instagram URL
- Google Business URL
- Existing website
- Facebook page
- Manual upload

The platform creates a new Job.

Example

```json
{
  "jobId": "...",
  "status": "pending"
}
```

---

# Step 2 - Import Business

The Import Capability collects every available source.

Possible actions

- Download images
- Read Instagram profile
- Read Google Business information
- Detect website
- Extract menu
- Download logo

Output

Business Draft

---

# Step 3 - Normalize Data

The imported information is cleaned.

Examples

- Remove duplicated images
- Normalize phone numbers
- Normalize addresses
- Normalize opening hours
- Normalize URLs
- Merge duplicated contacts

Output

Normalized Business Profile

---

# Step 4 - AI Analysis

The AI capabilities enrich the imported information.

Examples

- Detect business category
- Detect brand colors
- Classify images
- Generate descriptions
- Detect missing information
- Build SEO metadata

Output

Complete Business Profile

---

# Step 5 - Validation

The Validation Capability checks the Business Profile.

Example

Missing logo

↓

Warning

Broken menu

↓

Error

Missing address

↓

Warning

The workflow only stops when blocking errors exist.

Warnings never stop generation.

---

# Step 6 - Theme Selection

The platform selects the most appropriate design system.

Inputs

- Category
- Brand style
- Colors
- Images

Outputs

- Theme
- Typography
- Components
- Layout configuration

Users never select templates during the MVP.

---

# Step 7 - Project Generation

The Project Generator creates the website.

Responsibilities

- Configure routes
- Populate content
- Generate metadata
- Configure navigation
- Assemble components

Output

Production-ready Next.js project

---

# Step 8 - Website Validation

Before deployment the project is verified.

Checks

- Build succeeds
- No missing images
- SEO complete
- Lighthouse validation
- Accessibility validation
- Mobile layout validation

If validation fails

↓

Return to Project Generator

↓

Retry

---

# Step 9 - Deployment

Deploy Engine

Responsibilities

- Build application
- Upload assets
- Configure HTTPS
- Configure subdomain

Output

Public URL

Example

https://laguadalupe.businessplatform.app

---

# Step 10 - User Notification

The user receives

Website URL

Preview

Validation score

Possible warnings

Deployment details

Generation time

---

# Job Lifecycle

Pending

↓

Importing

↓

Normalizing

↓

Analyzing

↓

Generating

↓

Validating

↓

Deploying

↓

Completed

Possible failure states

Import Failed

↓

Retry

Generation Failed

↓

Retry

Deployment Failed

↓

Retry

---

# Retry Strategy

Every workflow step must be resumable.

Example

Import

✓

Analysis

✓

Generation

✓

Deployment

❌

Retry Deployment

The workflow resumes from the failed step.

Never restart the entire process.

---

# Progress Events

Frontend should receive events.

Examples

Importing Instagram

Analyzing Images

Generating Content

Selecting Theme

Generating Website

Deploying

Completed

The user should always understand what the platform is doing.

---

# Manual Intervention

The platform should only ask the user for information when automatic discovery fails.

Examples

Logo not found

↓

Upload logo

Domain already exists

↓

Choose another

Phone number missing

↓

Enter phone number

Manual input is always the last option.

---

# Future Workflows

Website Update

Business Profile Updated

↓

Regenerate affected sections

↓

Deploy

Social Post Generation

Business Profile

↓

Campaign Generator

↓

Instagram Post

QR Generation

Business Profile

↓

QR Generator

↓

Digital Menu

NFC Generation

Business Profile

↓

NFC Generator

↓

Landing Page

Every workflow starts from the same Business Profile.

---

# Workflow Principles

Automation First

Every automatic action should happen before requesting user input.

Resumable

Every step can be retried independently.

Observable

Every workflow emits events.

Deterministic

The same input should always produce predictable results.

Business Profile Driven

Every generated asset starts from the Business Profile.