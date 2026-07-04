# System Map

Creator Engine is organized so each part can communicate through contracts instead of direct hardcoded links.

## Main communication flow

```txt
App UI
  -> Local API
  -> Recipe Engine
  -> Tool Registry
  -> Tool Runner
  -> Job System
  -> Storage System
  -> Package System
  -> Event Bus
  -> Optional Plugins and Connectors
```

## Why this structure matters

- Tools can run alone.
- Tools can be chained in recipes.
- Recipes can be exposed through the API.
- Jobs can track long-running work.
- Events let future modules react without rewriting core code.
- Plugins can be enabled later without changing the core engine.

## Core data objects

- Project
- Media Asset
- Tool
- Recipe
- Job
- Event
- Package
- Brand Kit
- Plugin
- Connector

## Default output rule

Clean exports are default. Branding steps are optional recipe steps.
