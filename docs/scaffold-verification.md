# Scaffold Verification Log

This file tracks small scaffold batches before code implementation begins.

## Verification rule

Before a new batch is added, check that the prior batch matches `docs/repo-structure.md` and supports the MVP clean package flow.

## Batch status

### Batch 1 - Foundation identity

Status: in progress / partial verified

Expected:

- README.md
- docs/scope.md
- docs/architecture.md
- docs/repo-structure.md
- docs/push-plan.md
- VERSION
- .env.example
- .gitignore

### Batch 2 - System contracts

Status: in progress / partial verified

Expected:

- schemas/tool.schema.json
- schemas/recipe.schema.json
- schemas/plugin.schema.json
- schemas/connector.schema.json
- schemas/event.schema.json
- schemas/job.schema.json
- schemas/package_manifest.schema.json
- schemas/project_manifest.schema.json
- schemas/brand_kit.schema.json
- schemas/asset_manifest.schema.json

### Batch 3 - MVP recipes

Status: in progress / partial verified

Expected:

- recipes/clean-posting-package.json
- recipes/short-form-package.json
- recipes/thumbnail-only-package.json

### Batch 4 - MVP tool manifests

Status: in progress / partial verified

Expected:

- tools/metadata/media.probe/tool.json
- tools/metadata/media.validate/tool.json
- tools/video/video.convert/tool.json
- tools/video/video.export_vertical/tool.json
- tools/video/video.export_square/tool.json
- tools/video/video.export_portrait/tool.json
- tools/video/video.export_landscape/tool.json
- tools/thumbnails/thumbnail.generate/tool.json
- tools/captions/caption.placeholder/tool.json
- tools/packaging/package.create/tool.json
- tools/packaging/package.zip/tool.json

### Batch 5 - Placeholder folder structure

Status: in progress

Expected:

- apps/web/.gitkeep
- apps/api/.gitkeep
- apps/desktop/.gitkeep
- core/registry/.gitkeep
- core/recipes/.gitkeep
- core/jobs/.gitkeep
- core/events/.gitkeep
- core/storage/.gitkeep
- core/database/.gitkeep
- core/validation/.gitkeep
- core/config/.gitkeep
- core/security/.gitkeep

## Next verification action

Verify each expected file in Batches 1-5, then continue with remaining placeholder folders for plugins, brand-kits, content-packs, storage, tests, scripts, and release.
