# 04 - AI Agents

# AI Business Platform

## Overview

The platform uses multiple specialized AI agents instead of a single large prompt.

Each agent has one responsibility.

Agents never communicate directly with each other.

They only receive structured input from the orchestrator and return structured output.

This approach makes the platform predictable, testable and maintainable.

---

# AI Philosophy

AI should never decide the platform workflow.

AI is responsible only for generating or enriching information.

Business logic always belongs to the application.

---

# AI Pipeline

Business Import

↓

Business Analysis Agent

↓

Brand Agent

↓

Content Agent

↓

SEO Agent

↓

Project Agent

↓

Validation Agent

↓

Website Generator

---

# Business Analysis Agent

## Responsibility

Analyze imported business information.

## Input

Business Import Result

Example

- Instagram profile
- Images
- Existing website
- Google Business information

## Output

Business Profile

Example

```json
{
  "name": "",
  "category": "",
  "description": "",
  "contacts": {},
  "socialLinks": {},
  "openingHours": [],
  "images": [],
  "products": []
}
```

The agent should never invent missing data.

Unknown information should remain empty.

---

# Brand Agent

## Responsibility

Understand the business identity.

Responsibilities

- detect visual style
- extract colors
- identify logo
- infer brand personality
- recommend theme

Output

```json
{
    "style": "Rustic",
    "primaryColor": "#...",
    "secondaryColor": "#...",
    "recommendedTheme": "restaurant-rustic"
}
```

---

# Content Agent

## Responsibility

Generate business content.

Generates

- Hero title
- Hero subtitle
- About section
- CTA
- Service descriptions
- FAQs
- Contact descriptions

The generated content should always match the detected business category.

---

# Menu Agent

Specialized agent for restaurants.

Responsibilities

- read PDF menus
- classify dishes
- organize categories
- normalize prices
- generate descriptions
- detect duplicated items

Output

Structured menu.

---

# Gallery Agent

Responsible for image selection.

Responsibilities

- remove duplicated images
- classify images
- detect poor quality photos
- recommend hero image
- generate image captions
- optimize gallery order

The gallery agent never edits images.

---

# SEO Agent

Responsible for search engine optimization.

Generates

- title
- meta description
- keywords
- OpenGraph
- Twitter Cards
- structured data
- sitemap metadata

Output is always structured.

---

# Theme Agent

Chooses the visual presentation.

Input

Business Profile

Brand Profile

Output

Theme configuration

Example

```json
{
    "theme": "restaurant-rustic",
    "font": "Playfair Display",
    "spacing": "comfortable"
}
```

The Theme Agent never creates components.

Only selects them.

---

# Project Agent

Transforms structured information into application configuration.

Responsibilities

- configure routes
- assign components
- populate content
- configure navigation
- prepare build configuration

Output

Project Configuration

The Project Agent never writes React components.

---

# Validation Agent

Final quality verification.

Checks

- missing logo
- missing contact information
- broken menu
- missing images
- SEO completeness
- accessibility issues

Returns

Validation Report

Example

```json
{
    "warnings": [],
    "errors": [],
    "score": 96
}
```

---

# Future Agents

Possible future additions

Reservation Agent

Booking configuration

Marketing Agent

Landing pages

Email campaigns

Promotion generation

QR Agent

Restaurant QR menus

NFC Agent

NFC landing experiences

Chatbot Agent

Business assistant

Analytics Agent

Recommendations based on visitor behavior

Review Agent

Business review monitoring

Campaign Agent

Seasonal campaigns

---

# Agent Contracts

Every AI agent must follow the same contract.

Input

Structured JSON

↓

Execution

↓

Structured JSON

No agent should generate free-form application files.

Only structured data.

---

# Prompt Versioning

Every agent should have versioned prompts.

Example

Brand Agent

v1

v2

v3

This allows improvements without affecting the rest of the platform.

---

# Model Independence

Agents should not depend on a specific AI provider.

Possible providers

- OpenAI
- Anthropic
- Google
- Local LLMs

Changing providers should not require changing business logic.

---

# Long-Term Goal

The platform should behave as an AI company where every employee has a clearly defined responsibility.

Instead of asking one AI to create an entire website, the orchestrator coordinates multiple specialized experts working together.