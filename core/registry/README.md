# Core Registry

This folder will hold the tool and recipe registry system.

## Purpose

The registry is the map of what the engine can run.

It should eventually:

- load tool manifests from `tools/**/tool.json`
- load recipe manifests from `recipes/*.json`
- register each item by ID
- detect repeated IDs
- allow lookups by ID

## First registry target

The first registry pass should list all current tool IDs and recipe IDs without running any media commands.

## Not included here

- video processing
- UI actions
- connector execution
