# CI Plan

This document defines the first continuous check for the repo.

## Goal

Run the doctor command automatically on future pushes and pull requests.

## First check

```txt
npm run doctor
```

## What the check should verify

- required project files exist
- required scaffold folders exist
- JSON schema files can be read
- recipe files can be read
- tool manifest files can be read
- recipe IDs are unique
- tool IDs are unique
- recipe steps reference existing tool manifests

## Not included yet

- FFmpeg checks
- video conversion
- media generation
- dashboard build
- connector tests

## Future workflow shape

```txt
checkout repo
setup Node 20
run npm run doctor
```

The workflow file can be added after the current scaffold and doctor command are reviewed.
