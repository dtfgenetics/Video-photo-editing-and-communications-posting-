# Implementation Order

This document defines the order for the first real code work after scaffold verification.

## Locked rule

Do not build the dashboard first. Build the engine contracts and validation path first.

## Phase 1 - Validation foundation

Goal: prove the repository contracts can be checked automatically.

1. Add schema validation helper.
2. Validate every schema file can load.
3. Validate recipe files against `schemas/recipe.schema.json`.
4. Validate tool manifests against `schemas/tool.schema.json`.
5. Check that every recipe step references an existing tool manifest.

## Phase 2 - Registry foundation

Goal: create the engine map of available tools and recipes.

1. Load tool manifests from `tools/**/tool.json`.
2. Load recipe manifests from `recipes/*.json`.
3. Return registered tools by ID.
4. Return registered recipes by ID.
5. Report missing or duplicate IDs.

## Phase 3 - Recipe runner foundation

Goal: run recipe structure without real media processing yet.

1. Load a recipe by ID.
2. Resolve every tool step through the registry.
3. Create a job record for the recipe.
4. Simulate step order.
5. Emit basic started/completed/failed events.

## Phase 4 - First real tools

Goal: implement the first safe media tools.

1. `media.probe`
2. `media.validate`

These come before video conversion because they inspect and validate media without changing it.

## Phase 5 - First processing tools

Goal: create the first actual output files.

1. `video.convert`
2. export preset tools
3. `thumbnail.generate`
4. `caption.placeholder`
5. `package.create`
6. `package.zip`

## Phase 6 - Local API

Goal: expose the engine to future UI and automation.

First endpoints:

```txt
GET /api/tools
GET /api/recipes
POST /api/recipes/run
GET /api/jobs/:id
```

## Phase 7 - Minimal dashboard

Goal: give users a simple interface over the engine.

First flow:

```txt
Create project -> Import video -> Choose recipe -> Run recipe -> Download package
```

## What not to build yet

- Instagram connector
- TikTok connector
- payment/license system
- full editor timeline
- marketplace
- cloud sync
- advanced AI clipping
