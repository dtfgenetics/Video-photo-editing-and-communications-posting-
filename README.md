# Creator Engine / THC Content Engine

Local-first modular production engine for video/photo editing, content packaging, and optional communications/posting connectors.

## Product rule

Clean exports are the default.

- No forced watermark
- No forced branding
- No required social connection
- No required paid API
- No private assets or secrets committed to the repo

## Core idea

The system is built around independent tools, recipe-based workflows, optional plugins/connectors, schema-defined contracts, runtime storage separation, and future-ready downloadable software packaging.

```txt
Import -> Inspect -> Process -> Format -> Caption -> Package -> Approve -> Publish/Export -> Track -> Reuse
```

## MVP v0.1 target

The first milestone is the **Clean Posting Package Engine**.

Given one supported video file, the system should create a clean ZIP package containing:

- vertical video export
- square video export
- portrait video export
- landscape video export
- thumbnail
- caption placeholder files
- hashtag file
- posting notes
- package manifest

The original file must remain untouched.

## Repo structure

```txt
apps/          user-facing apps and local API
core/          registry, recipes, jobs, events, storage, validation, security
tools/         independent production tools
plugins/       optional connectors, templates, AI providers, compliance packs
schemas/       JSON contracts for tools, recipes, plugins, packages, projects
recipes/       built-in workflow recipes
brand-kits/    example, internal, and public brand kit spaces
content-packs/ future template/content pack structure
storage/       local runtime folders ignored by git
tests/         fixtures and validation tests
docs/          architecture, scope, security, roadmap, and operating docs
scripts/       development and validation scripts
release/       release notes, installers, checksums
```

## Key docs

- `docs/scaffold-verification.md` - verified scaffold batches
- `docs/repo-structure.md` - master structure map
- `docs/push-plan.md` - small batch push plan
- `docs/implementation-order.md` - order for first real implementation work
- `docs/first-code-pass.md` - scope for first code batch
- `docs/validation-plan.md` - validation targets before app code
- `docs/doctor-command.md` - current scaffold validation command
- `docs/acceptance-criteria.md` - completion rules for tools and recipes
- `docs/definition-of-done.md` - project-wide done rules

## Scaffold check

Run the current repo validation check with:

```txt
npm run doctor
```

or:

```txt
npm run check
```

The doctor command checks required files, scaffold folders, readable JSON schemas, recipes, tool manifests, unique IDs, and recipe tool references. It does not run FFmpeg or generate media.

## First build order

1. Validate schemas
2. Register starter tools
3. Build `media.probe`
4. Build `media.validate`
5. Build `video.convert`
6. Build export preset tools
7. Build `thumbnail.generate`
8. Build caption placeholder tool
9. Build package manifest and ZIP tools
10. Build recipe runner for `recipe.clean_posting_package`

## Security

Never commit API keys, OAuth tokens, Discord webhooks, license keys, private media, generated packages, or customer data.

Connector and integration documentation will be added before any connector implementation.
