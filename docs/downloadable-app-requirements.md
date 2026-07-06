# Downloadable App Requirements

This document tracks what is still needed before Creator Engine becomes a downloadable program.

## Not an app yet

The repo is currently an engine foundation. It is not yet a full app because it does not have:

- app shell
- local API server
- user interface
- installer
- release bundle
- app icon
- settings screen

## Minimum app requirements

### App shell

Required later:

- local web app first
- desktop wrapper later
- version display
- about screen

### Local API

Required later:

- health endpoint
- media probe endpoint
- media validate endpoint
- recipe list endpoint
- recipe run endpoint
- job status endpoint

### Dashboard

Required later:

- project list
- import media button
- media inspection view
- recipe picker
- job progress view
- package download view

### Runtime storage

Already scaffolded:

- `storage/originals`
- `storage/workspace`
- `storage/exports`
- `storage/thumbnails`
- `storage/captions`
- `storage/packages`
- `storage/logs`
- `storage/cache`
- `storage/backups`
- `storage/temp`

### Build and release

Required later:

- build command
- release command
- release notes
- checksums
- installer output
- app signing plan

## Internal prototype requirement

Before a downloadable version, the engine should first run locally with:

```txt
npm run doctor
npm test
```

Then the local API and dashboard can be added.

## Public release requirement

Before a public release, the app needs:

- stable app name
- icon
- installer or bundled app
- release notes
- third-party notices
- code signing plan
- clear storage and privacy rules
