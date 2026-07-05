# Testing Plan

Testing starts before implementation so every future tool has a clear target.

## Test categories

```txt
tests/schema-tests/   validates JSON schemas and manifests
tests/tool-tests/     validates independent tool behavior
tests/recipe-tests/   validates workflow order and outputs
tests/package-tests/  validates generated package structure
tests/fixtures/       small safe test files only
```

## First tests to create later

1. Tool schema loads successfully.
2. Recipe schema loads successfully.
3. Every recipe validates against `recipe.schema.json`.
4. Every tool manifest validates against `tool.schema.json`.
5. `recipe.clean_posting_package` references only existing tools.
6. Runtime storage placeholders exist.
7. `.gitignore` blocks generated media extensions.

## Fixture rule

Only small safe test fixtures should be committed.

Do not commit large videos, private brand assets, real customer content, generated packages, or secret values.

## Test-first rule

Before implementing any tool, define at least one expected success case and one expected failure case.
