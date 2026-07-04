# Recipe System

A recipe is a reusable workflow made from registered tools.

## Recipe rule

Recipes do not contain application code. They describe the steps the engine should run.

## Recipe ID format

```txt
recipe.name
```

Examples:

```txt
recipe.clean_posting_package
recipe.short_form_package
recipe.full_social_package
```

## Recipe structure

A recipe defines:

- required inputs
- ordered steps
- tool settings
- outputs
- failure behavior
- events emitted

## MVP recipe

The first required recipe is `recipe.clean_posting_package`.

It must create platform-ready clean exports and package files without modifying the original video and without adding forced branding.
