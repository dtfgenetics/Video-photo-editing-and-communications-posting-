# Core Validation

This folder will hold validation utilities for the engine.

## Purpose

Validation checks the project contracts before media processing begins.

The first validation work should check:

- schema files can be read
- recipe files can be read
- tool manifest files can be read
- recipe step tool IDs match existing tool manifests

## First planned command

```txt
creator-engine doctor
```

## Not included here

- video conversion
- thumbnail generation
- package ZIP creation
- dashboard UI
