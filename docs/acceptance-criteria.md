# Acceptance Criteria

Acceptance criteria define what counts as correct before a task is considered complete.

## Global acceptance rules

Every completed system piece must:

- match the relevant schema or documented structure
- preserve original media when media is involved
- avoid forced watermark or forced branding
- avoid committing generated media or private assets
- provide predictable inputs and outputs
- report useful success or failure information

## Tool acceptance criteria

A tool is complete only when:

1. It has a `tool.json` manifest.
2. The manifest validates against `schemas/tool.schema.json`.
3. Inputs and outputs are documented.
4. Expected success behavior is defined.
5. Expected failure behavior is defined.
6. It can be used by a recipe later.

## Recipe acceptance criteria

A recipe is complete only when:

1. It validates against `schemas/recipe.schema.json`.
2. Every step references an existing tool manifest.
3. Outputs are listed clearly.
4. Failure behavior is defined.
5. Clean export remains default unless branding is explicitly added as an optional step.

## MVP recipe acceptance

`recipe.clean_posting_package` is acceptable when one supported video can produce:

- vertical video
- square video
- portrait video
- landscape video
- thumbnail
- caption placeholders
- hashtags file
- posting notes
- package manifest
- ZIP package

The original file must remain untouched.
