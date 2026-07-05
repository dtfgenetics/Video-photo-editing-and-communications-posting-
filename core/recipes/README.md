# Core Recipes

This folder will hold recipe loading and recipe step planning.

## Purpose

Recipes connect registered tools into ordered workflows.

This system should eventually:

- load a recipe by ID
- read its ordered steps
- confirm each step references a registered tool
- return an ordered execution plan
- report missing tools before any work begins

## First recipe target

The first target recipe is:

```txt
recipe.clean_posting_package
```

It should resolve every step through the registry before media processing is implemented.

## Not included here

- real video conversion
- ZIP packaging
- dashboard UI
- connector publishing
