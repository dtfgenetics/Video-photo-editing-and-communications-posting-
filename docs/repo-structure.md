# Repository Structure Map

This file is the master arrangement map for the project scaffold.

## Structure rule

The repo is arranged by system responsibility, not by random features.

## Top-level folders

```txt
apps/          user-facing applications and local API
core/          shared engine systems
tools/         independent production tools
plugins/       optional expansion modules
schemas/       JSON contracts used by all systems
recipes/       reusable workflow definitions
brand-kits/    example/internal/public brand kit spaces
content-packs/ future template and workflow packs
storage/       local runtime storage ignored by Git
tests/         fixtures and validation tests
docs/          product, architecture, and operating documents
scripts/       setup, validation, and maintenance scripts
release/       release notes, installers, checksums
```

## Core communication path

```txt
Interface -> Local API -> Recipe Engine -> Tool Registry -> Tools -> Jobs -> Packages -> Events -> Optional Connectors
```

## Locked default behavior

- Clean export is default.
- No forced watermark.
- No forced branding.
- Original media is preserved.
- Generated media is stored locally, not committed.
- Plugins and connectors are optional.

## First scaffold target

The first scaffold must support the future Clean Posting Package recipe:

```txt
media.probe
media.validate
video.convert
video.export_vertical
video.export_square
video.export_portrait
video.export_landscape
thumbnail.generate
caption.placeholder
package.create
package.zip
```

## Verification rule

Every new scaffold push should answer:

1. Where does this file belong?
2. Which system owns it?
3. Which schema or doc defines it?
4. Does it support the clean package MVP?
5. Does it avoid secrets, generated media, and private assets?
