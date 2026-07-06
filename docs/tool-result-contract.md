# Tool Result Contract

This document defines the shared result shape every tool should use before the recipe runner is built.

## Purpose

Every tool must return the same outer structure so the engine can run tools in recipes, collect errors, show job status, and stop safely when something fails.

## Standard result shape

```json
{
  "ok": true,
  "toolId": "media.probe",
  "output": {},
  "errors": [],
  "warnings": [],
  "metadata": {}
}
```

## Fields

### `ok`

Boolean pass/fail value.

### `toolId`

Stable tool ID from the tool manifest.

Examples:

```txt
media.probe
media.validate
package.create
```

### `output`

Tool-specific successful output.

Examples:

```txt
mediaMetadata
validationReport
packageManifest
```

### `errors`

Array of error objects.

```json
{
  "code": "MEDIA_001",
  "message": "Media file does not exist."
}
```

### `warnings`

Array of non-blocking warning objects.

### `metadata`

Optional debug or timing metadata.

## Rule

Direct helper functions can return tool-specific data, but every runnable tool must also expose a wrapper that returns this standard result shape.

## Current target tools

- `media.probe`
- `media.validate`

## Not included yet

- job records
- recipe runner execution
- progress events
- FFmpeg output
