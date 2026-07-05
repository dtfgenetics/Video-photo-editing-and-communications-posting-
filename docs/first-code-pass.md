# First Code Pass

This document defines the first small implementation batch after scaffold verification.

## Goal

Build the smallest engine foundation before any video processing work begins.

The first code pass should confirm that the project can:

- read JSON schema files
- read tool manifest files
- read recipe files
- build a list of tools
- build a list of recipes
- check that recipe steps point to existing tool IDs

## Included

### Schema check

Location:

```txt
core/validation/
```

Purpose:

- load JSON files
- check recipe files
- check tool manifests
- return clear results

### Registry loader

Location:

```txt
core/registry/
```

Purpose:

- find `tools/**/tool.json`
- find `recipes/*.json`
- register IDs
- detect missing or repeated IDs

### Recipe step checker

Location:

```txt
core/recipes/
```

Purpose:

- read recipe steps
- confirm each step has a matching tool manifest
- return the ordered recipe plan

## Not included yet

- FFmpeg commands
- video conversion
- thumbnails
- ZIP creation
- dashboard UI
- API server
- connectors
- AI features

## Done when

1. Current tool IDs can be listed.
2. Current recipe IDs can be listed.
3. Clean posting package recipe resolves all tool references.
4. Invalid JSON gives a clear error.
5. No generated media is created.
