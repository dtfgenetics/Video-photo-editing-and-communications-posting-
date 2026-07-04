# Tool Registry

The Tool Registry is the list of every independent production tool the engine knows how to run.

## Tool rule

Every tool must have:

- a stable tool ID
- a manifest
- clear inputs
- clear outputs
- settings
- dependency notes
- emitted events
- error codes

## Tool ID format

```txt
category.action
```

Examples:

```txt
media.probe
media.validate
video.convert
video.export_vertical
thumbnail.generate
caption.placeholder
package.create
package.zip
```

## Tool acceptance rule

A tool is not complete until it can:

1. run by itself
2. run inside a recipe
3. report success or failure
4. produce a predictable output
5. log useful status information
