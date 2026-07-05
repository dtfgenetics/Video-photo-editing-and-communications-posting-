# Validation Command Plan

This document defines the first validation command before implementation begins.

## Goal

Create a future command that checks the scaffold without generating media or running video tools.

## Future command name

```txt
creator-engine doctor
```

This command should eventually answer:

```txt
Are schemas readable?
Are recipes valid?
Are tool manifests valid?
Do recipe steps reference existing tools?
Are required scaffold folders present?
```

## First command behavior

The first validation command should check:

1. Schema files exist.
2. Schema files parse as JSON.
3. Recipe files parse as JSON.
4. Tool manifests parse as JSON.
5. Recipe IDs are unique.
6. Tool IDs are unique.
7. Each recipe step has a matching tool manifest.

## Expected output format

Example:

```txt
Creator Engine Doctor

Schemas: OK
Recipes: OK
Tools: OK
Recipe references: OK
Storage scaffold: OK

Result: PASS
```

If a check fails:

```txt
Result: FAIL
Missing tool manifest: video.export_vertical
```

## First files to create in the code batch

```txt
core/validation/README.md
core/registry/README.md
core/recipes/README.md
```

After those are verified, add the first validation script.

## Not included yet

- FFmpeg checks
- video conversion
- thumbnail creation
- package ZIP creation
- dashboard UI
- connector checks
