# Outcome Map

This document keeps the build focused on the final product outcome.

## Final outcome

Creator Engine should become a local-first production engine that can turn raw media into organized, platform-ready content packages.

## Core user result

A user should be able to:

1. import media
2. inspect it safely
3. validate it before processing
4. run a recipe
5. create clean exports
6. generate captions and package files
7. download a posting package
8. optionally connect external systems later

## Current engineering outcome

The current repo is building the engine foundation in this order:

```txt
contracts -> registry -> recipe references -> safe probe -> validation -> processing -> packaging -> API -> dashboard
```

## Current phase

We are in the safe inspection phase.

That means the next tool should inspect source files without changing them.

## Next tool outcome

`media.probe` should report basic file metadata from the local filesystem:

- path
- filename
- extension
- size
- modified time
- whether the file exists
- whether it is a file

It should not run FFmpeg yet.
It should not convert media.
It should not create generated media.

## Professional build rule

Every new feature must answer:

1. Where does it live?
2. Which manifest defines it?
3. Which test proves it?
4. Does it preserve originals?
5. Does it avoid generated media unless that is the purpose?
6. Does it fit the clean package MVP?
