# Tooling Choice

This document defines the first practical tooling direction for the scaffold.

## Goal

Choose simple tooling that supports the validated architecture without locking the project into a bloated framework too early.

## Recommended first code tooling

Use a small Node.js/TypeScript foundation first.

Why:

- JSON schema work is straightforward.
- Tool and recipe manifests are JSON.
- A future web dashboard can share TypeScript types.
- A future local API can use the same package ecosystem.
- It keeps the first validation batch lightweight.

## First packages to consider later

```txt
ajv        JSON schema validation
fast-glob file scanning
vitest     tests
eslint     code quality later
prettier   formatting later
```

Do not install packages until the first code batch is approved.

## Why not start with UI tooling

The dashboard depends on the engine.

The engine needs to prove it can:

1. load schemas
2. load tool manifests
3. load recipes
4. validate references
5. report clear results

Only after that should UI work begin.

## Why not start with video tooling

FFmpeg work should wait until the registry and recipe validation system exists.

That prevents media tools from becoming disconnected scripts.

## First tooling decision

Batch 8 should prepare for:

```txt
Node.js + TypeScript validation foundation
```

No executable implementation is added in this document.
