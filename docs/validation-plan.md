# Validation Plan

Batch 6 defines how the scaffold will be checked before real implementation code is added.

## Validation goals

The project must be able to confirm that:

- schemas exist
- recipes match recipe schema
- tool manifests match tool schema
- plugins match plugin schema when added
- package manifests match package schema
- runtime storage folders exist locally
- generated media stays out of Git
- recipe tool IDs point to registered tool manifests

## First validation targets

### Schema validation

Validate these files first:

```txt
schemas/tool.schema.json
schemas/recipe.schema.json
schemas/plugin.schema.json
schemas/connector.schema.json
schemas/event.schema.json
schemas/job.schema.json
schemas/package_manifest.schema.json
schemas/project_manifest.schema.json
schemas/brand_kit.schema.json
schemas/asset_manifest.schema.json
```

### Recipe validation

Validate these recipes:

```txt
recipes/clean-posting-package.json
recipes/short-form-package.json
recipes/thumbnail-only-package.json
```

Each recipe step must reference a real tool manifest under `tools/`.

### Tool manifest validation

Every `tools/**/tool.json` file must match `schemas/tool.schema.json`.

## No-code rule for Batch 6

Batch 6 is documentation and validation planning only. Executable validation code belongs in the next batch after this plan is reviewed.
