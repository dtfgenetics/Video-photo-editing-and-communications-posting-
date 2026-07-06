# App Roadmap

This document defines the path from engine scaffold to usable app.

## Current state

The repo currently has:

- engine contracts
- schema files
- recipe files
- tool manifests
- registry loading
- recipe reference checks
- doctor command
- first tests
- safe `media.probe` tool

## App milestone path

### Milestone 1 - Safe inspection engine

Goal: inspect and validate imported media without changing it.

Required:

- `media.probe`
- `media.validate`
- tests for both tools
- doctor command passes
- test command passes

### Milestone 2 - Project and import layer

Goal: create app-owned project folders and preserve originals.

Required:

- project manifest creator
- media import tool
- file hash check
- duplicate detection
- original file preservation

### Milestone 3 - Recipe runner foundation

Goal: run recipe steps in order with consistent tool results.

Required:

- tool result contract
- tool runner
- recipe runner
- job record shape
- ordered step output handoff

### Milestone 4 - Package creator

Goal: create user-facing posting package folders.

Required:

- caption placeholder writer
- posting notes writer
- package manifest writer
- package folder creator
- ZIP creator later

### Milestone 5 - Local API

Goal: allow a future UI to call the engine.

Required:

- health route
- tools route
- recipes route
- probe route
- validate route
- run recipe route
- job status route

### Milestone 6 - Web dashboard

Goal: make the local engine usable by a non-technical user.

Required:

- project screen
- import screen
- media details screen
- recipe picker
- job status screen
- package download screen

### Milestone 7 - Downloadable wrapper

Goal: package the local app as a desktop program.

Required later:

- app name
- icon
- desktop shell
- build command
- release notes
- checksums
- installer plan

## Current next milestone

Finish Milestone 1 before starting project import or UI work.
