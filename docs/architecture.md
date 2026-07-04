# Architecture

The project is arranged around stable systems instead of temporary feature ideas.

## Flow

```txt
Interface -> Local API -> Recipe Engine -> Tool Registry -> Tools -> Jobs -> Packages
```

## Main systems

- Tool Registry
- Recipe Engine
- Job Queue
- Event Bus
- Plugin Framework
- Runtime Storage
- Schema Validation
- Package System
- Health Check

## Build order

1. Schemas
2. Tool manifests
3. Tool runner
4. Recipe runner
5. Job tracker
6. Package generator
7. Local API
8. Simple dashboard
9. Optional connectors
