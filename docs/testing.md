# Testing Plan

Testing starts before implementation so every future tool has a clear target.

## Test categories

```txt
tests/schema-tests/   validates JSON schemas, manifests, contracts, and registry links
tests/tool-tests/     validates independent tool behavior
tests/recipe-tests/   validates workflow order and outputs
tests/package-tests/  validates generated package structure
tests/fixtures/       small safe test files only
```

## Current test command

```txt
npm test
```

The current test suite uses Node's built-in test runner and does not require installed dependencies.

## Current tests

```txt
tests/schema-tests/registry-check.test.mjs
tests/schema-tests/tool-result-contract.test.mjs
tests/schema-tests/tool-runner.test.mjs
tests/tool-tests/media-probe.test.mjs
tests/tool-tests/media-validate.test.mjs
tests/tool-tests/metadata-tool-result.test.mjs
```

These tests check that:

1. the registry loads current tool manifests
2. the registry loads current recipes
3. key tool IDs exist
4. `recipe.clean_posting_package` exists
5. recipe steps resolve through registered tool manifests
6. tool result helpers return the standard result shape
7. tool runner lists and runs supported tools
8. tool runner fails cleanly for unknown tools
9. `media.probe` can inspect safe local test files
10. `media.validate` can validate probe output
11. metadata tool wrappers return the standard result shape

## Manual scaffold check

Run:

```txt
npm run doctor
```

The doctor command should pass before any media processing code is added.

## First tests still to add later

1. Tool schema loads successfully.
2. Recipe schema loads successfully.
3. Every recipe validates against `recipe.schema.json`.
4. Every tool manifest validates against `tool.schema.json`.
5. Runtime storage placeholders exist.
6. `.gitignore` blocks generated media extensions.

## Fixture rule

Only small safe test fixtures should be committed.

Do not commit large videos, private brand assets, real customer content, generated packages, or secret values.

## Test-first rule

Before implementing any tool, define at least one expected success case and one expected failure case.
